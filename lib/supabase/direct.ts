const BASE = () => process.env.NEXT_PUBLIC_SUPABASE_URL!;
const KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY!;

function headers(extra?: Record<string, string>) {
  return {
    Authorization: `Bearer ${KEY()}`,
    apikey: KEY(),
    ...extra,
  };
}

// ── Storage ────────────────────────────────────────────────────────────────

export interface StorageObject {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  metadata: Record<string, unknown> | null;
}

export async function storageList(bucket: string): Promise<StorageObject[]> {
  const res = await fetch(`${BASE()}/storage/v1/object/list/${bucket}`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      prefix: "",
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
    }),
  });
  if (!res.ok) throw new Error(`Storage list error: ${await res.text()}`);
  return res.json();
}

export async function storageDownload(bucket: string, path: string): Promise<Buffer> {
  const res = await fetch(
    `${BASE()}/storage/v1/object/${bucket}/${encodeURIComponent(path)}`,
    { headers: headers() }
  );
  if (!res.ok) throw new Error(`Storage download error (${res.status}): ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

export async function storageUpload(
  bucket: string,
  path: string,
  buffer: ArrayBuffer,
  contentType: string
): Promise<{ error?: string }> {
  const res = await fetch(
    `${BASE()}/storage/v1/object/${bucket}/${encodeURIComponent(path)}`,
    {
      method: "POST",
      headers: headers({ "Content-Type": contentType, "x-upsert": "true" }),
      body: buffer,
    }
  );
  if (!res.ok) return { error: await res.text() };
  return {};
}

export function storagePublicUrl(bucket: string, path: string): string {
  return `${BASE()}/storage/v1/object/public/${bucket}/${encodeURIComponent(path)}`;
}

// ── Database (PostgREST) ───────────────────────────────────────────────────

export async function dbSelect<T>(
  table: string,
  qs: string
): Promise<T[]> {
  const res = await fetch(`${BASE()}/rest/v1/${table}?${qs}`, {
    headers: headers({ "Content-Type": "application/json" }),
  });
  if (!res.ok) throw new Error(`DB select error: ${await res.text()}`);
  return res.json();
}

export async function dbUpsert<T>(
  table: string,
  data: Record<string, unknown>,
  onConflict: string
): Promise<T> {
  const res = await fetch(
    `${BASE()}/rest/v1/${table}?on_conflict=${onConflict}`,
    {
      method: "POST",
      headers: headers({
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      }),
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error(`DB upsert error: ${await res.text()}`);
  const rows = await res.json();
  return rows[0];
}

export async function dbDelete(table: string, qs: string): Promise<void> {
  const res = await fetch(`${BASE()}/rest/v1/${table}?${qs}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error(`DB delete error: ${await res.text()}`);
}

export async function dbInsert(
  table: string,
  rows: Record<string, unknown>[]
): Promise<void> {
  const res = await fetch(`${BASE()}/rest/v1/${table}`, {
    method: "POST",
    headers: headers({
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    }),
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`DB insert error: ${await res.text()}`);
}
