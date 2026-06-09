import { createGroq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  isTextUIPart,
  streamText,
  type UIMessage,
} from "ai";
import { embedQuery } from "@/lib/embeddings";
import { searchChunks } from "@/lib/rag/search";
import { buildSystemPrompt } from "@/lib/rag/prompt";
import { NextResponse } from "next/server";
import type { Source } from "@/types";

export const maxDuration = 60;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: UIMessage[] = body.messages ?? [];

    const lastMsg = messages[messages.length - 1];
    const userQuestion =
      lastMsg?.parts.filter(isTextUIPart).map((p) => p.text).join("") ?? "";

    // Attempt RAG — if embedding or search fails, fall back to general knowledge
    let chunks: Awaited<ReturnType<typeof searchChunks>> = [];
    try {
      const queryEmbedding = await embedQuery(userQuestion);
      chunks = await searchChunks(queryEmbedding, {
        matchThreshold: 0.4,
        matchCount: 5,
      });
    } catch (ragErr) {
      console.warn("[chat] RAG unavailable, falling back to general knowledge:", ragErr instanceof Error ? ragErr.message : ragErr);
    }

    const systemPrompt = buildSystemPrompt(chunks);
    const sources: Source[] = chunks.map((c) => ({
      name: c.doc_name,
      url: c.web_view_link,
      similarity: c.similarity,
    }));

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      headers: {
        "x-sources": JSON.stringify(sources),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[chat] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
