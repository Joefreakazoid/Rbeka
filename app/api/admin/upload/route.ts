import { storageUpload } from "@/lib/supabase/direct";
import { NextResponse } from "next/server";
import { BUCKET } from "@/lib/ingestion/sync";
import JSZip from "jszip";

export const runtime = "nodejs";
export const maxDuration = 60;

const SUPPORTED_EXT = /\.(pdf|docx|txt)$/i;

type UploadResult = { name: string; ok: boolean; error?: string };

async function upload(
  name: string,
  buffer: ArrayBuffer,
  contentType: string
): Promise<UploadResult> {
  const { error } = await storageUpload(BUCKET, name, buffer, contentType);
  return { name, ok: !error, error };
}

function mimeFromExt(ext: string): string {
  if (ext === "pdf") return "application/pdf";
  if (ext === "docx")
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return "text/plain";
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const results: UploadResult[] = [];

  for (const file of files) {
    const buffer = await file.arrayBuffer();

    if (file.name.endsWith(".zip") || file.type === "application/zip") {
      try {
        const zip = await JSZip.loadAsync(buffer);
        const entries = Object.values(zip.files).filter(
          (f) => !f.dir && SUPPORTED_EXT.test(f.name)
        );

        if (entries.length === 0) {
          results.push({
            name: file.name,
            ok: false,
            error: "Zip contains no supported files (PDF, DOCX, TXT)",
          });
          continue;
        }

        for (const entry of entries) {
          const entryBuffer = await entry.async("arraybuffer");
          const ext = entry.name.split(".").pop()?.toLowerCase() ?? "txt";
          const fileName = entry.name.split("/").pop() ?? entry.name;
          results.push(await upload(fileName, entryBuffer, mimeFromExt(ext)));
        }
      } catch (err) {
        results.push({
          name: file.name,
          ok: false,
          error: err instanceof Error ? err.message : "Failed to read zip",
        });
      }
    } else if (SUPPORTED_EXT.test(file.name)) {
      results.push(
        await upload(file.name, buffer, file.type || "application/octet-stream")
      );
    } else {
      results.push({
        name: file.name,
        ok: false,
        error: `Unsupported file type`,
      });
    }
  }

  const allOk = results.every((r) => r.ok);
  return NextResponse.json({ uploaded: results }, { status: allOk ? 200 : 207 });
}
