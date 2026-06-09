const JINA_API_URL = "https://api.jina.ai/v1/embeddings";
const EMBEDDING_MODEL = "jina-embeddings-v3";
const EMBEDDING_DIMENSIONS = 1024;

type EmbeddingTask = "retrieval.query" | "retrieval.passage";

export async function embedTexts(
  texts: string[],
  task: EmbeddingTask = "retrieval.passage"
): Promise<number[][]> {
  const response = await fetch(JINA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.JINA_API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      dimensions: EMBEDDING_DIMENSIONS,
      task,
      input: texts,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Jina API error ${response.status}: ${text}`);
  }

  const json = await response.json();
  return json.data
    .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
    .map((item: { embedding: number[] }) => item.embedding);
}

export async function embedQuery(text: string): Promise<number[]> {
  const results = await embedTexts([text], "retrieval.query");
  return results[0];
}
