const WORDS_PER_CHUNK = 380; // ~500 tokens at 1.3 tokens/word
const OVERLAP_WORDS = 38;   // ~50 tokens overlap

export function chunkText(text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + WORDS_PER_CHUNK, words.length);
    const chunk = words.slice(start, end).join(" ");
    if (chunk.trim().length > 80) {
      chunks.push(chunk);
    }
    if (end === words.length) break;
    start = end - OVERLAP_WORDS;
  }

  return chunks;
}
