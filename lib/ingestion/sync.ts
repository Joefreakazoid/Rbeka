import {
  storageList,
  storageDownload,
  storagePublicUrl,
  dbSelect,
  dbUpsert,
  dbDelete,
  dbInsert,
} from "@/lib/supabase/direct";
import { parseFile } from "./parse";
import { chunkText } from "./chunk";
import { embedTexts } from "@/lib/embeddings";
import type { StorageFile, SyncResult } from "@/types";

const EMBED_BATCH_SIZE = 20;
export const BUCKET = "Notes";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function listStorageFiles(): Promise<StorageFile[]> {
  const objects = await storageList(BUCKET);
  return objects
    .filter((f) => f.name !== ".emptyFolderPlaceholder" && f.id !== null)
    .map((f) => ({
      name: f.name,
      updatedAt: f.updated_at ?? f.created_at ?? new Date().toISOString(),
      mimeType: (f.metadata?.mimetype as string) ?? "application/octet-stream",
      size: (f.metadata?.size as number) ?? 0,
      publicUrl: storagePublicUrl(BUCKET, f.name),
    }));
}

async function syncFile(
  file: StorageFile
): Promise<{ synced: boolean; skipped: boolean; error?: string }> {
  try {
    const existing = await dbSelect<{ id: string; modified_time: string }>(
      "documents",
      `select=id,modified_time&storage_path=eq.${encodeURIComponent(file.name)}&limit=1`
    );

    if (existing[0]?.modified_time === file.updatedAt) {
      return { synced: false, skipped: true };
    }

    const buffer = await storageDownload(BUCKET, file.name);
    const rawText = await parseFile(buffer, file.mimeType);
    if (!rawText.trim()) return { synced: false, skipped: true };

    const chunks = chunkText(rawText);
    if (chunks.length === 0) return { synced: false, skipped: true };

    const doc = await dbUpsert<{ id: string }>(
      "documents",
      {
        storage_path: file.name,
        name: file.name,
        mime_type: file.mimeType,
        modified_time: file.updatedAt,
        web_view_link: file.publicUrl,
        synced_at: new Date().toISOString(),
      },
      "storage_path"
    );

    if (!doc?.id) return { synced: false, skipped: false, error: "Upsert returned no row" };

    await dbDelete("document_chunks", `document_id=eq.${doc.id}`);

    for (let i = 0; i < chunks.length; i += EMBED_BATCH_SIZE) {
      const batch = chunks.slice(i, i + EMBED_BATCH_SIZE);
      const embeddings = await embedTexts(batch, "retrieval.passage");

      const rows = batch.map((content, j) => ({
        document_id: doc.id,
        chunk_index: i + j,
        content,
        embedding: JSON.stringify(embeddings[j]),
      }));

      await dbInsert("document_chunks", rows);

      if (i + EMBED_BATCH_SIZE < chunks.length) {
        await sleep(500);
      }
    }

    return { synced: true, skipped: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { synced: false, skipped: false, error: message };
  }
}

export async function runSync(): Promise<SyncResult> {
  const result: SyncResult = {
    total: 0,
    synced: 0,
    skipped: 0,
    deleted: 0,
    errors: [],
  };

  const storageFiles = await listStorageFiles();
  result.total = storageFiles.length;

  const storagePaths = new Set(storageFiles.map((f) => f.name));

  const existingDocs = await dbSelect<{ id: string; storage_path: string }>(
    "documents",
    "select=id,storage_path"
  );

  for (const doc of existingDocs) {
    if (!storagePaths.has(doc.storage_path)) {
      await dbDelete("documents", `id=eq.${doc.id}`);
      result.deleted++;
    }
  }

  for (const file of storageFiles) {
    const outcome = await syncFile(file);
    if (outcome.synced) result.synced++;
    else if (outcome.skipped) result.skipped++;
    else if (outcome.error)
      result.errors.push(`${file.name}: ${outcome.error}`);
  }

  return result;
}
