import { dbSelect } from "@/lib/supabase/direct";
import { NextResponse } from "next/server";
import type { StatsResponse } from "@/types";

export async function GET() {
  try {
    const [docs, chunks, lastSyncRows] = await Promise.all([
      dbSelect<{ id: string }>("documents", "select=id"),
      dbSelect<{ id: string }>("document_chunks", "select=id"),
      dbSelect<{ synced_at: string }>(
        "documents",
        "select=synced_at&order=synced_at.desc&limit=1"
      ),
    ]);

    const stats: StatsResponse = {
      documents: docs.length,
      chunks: chunks.length,
      lastSyncedAt: lastSyncRows[0]?.synced_at ?? null,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { documents: 0, chunks: 0, lastSyncedAt: null },
      { status: 200 }
    );
  }
}
