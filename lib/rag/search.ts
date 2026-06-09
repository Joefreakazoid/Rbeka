import type { ChunkSearchResult } from "@/types";

interface SearchOptions {
  matchThreshold?: number;
  matchCount?: number;
}

export async function searchChunks(
  queryEmbedding: number[],
  options: SearchOptions = {}
): Promise<ChunkSearchResult[]> {
  const { matchThreshold = 0.4, matchCount = 5 } = options;

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/match_chunks`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    },
    body: JSON.stringify({
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Similarity search failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return (data ?? []) as ChunkSearchResult[];
}
