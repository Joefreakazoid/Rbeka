"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useCallback, useMemo } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import type { Source } from "@/types";

export default function ChatInterface() {
  const [sourcesMap, setSourcesMap] = useState<Record<string, Source[]>>({});
  const [input, setInput] = useState("");
  const pendingSourcesRef = useRef<Source[] | null>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        fetch: async (url, options) => {
          const response = await fetch(url as string, options as RequestInit);
          const rawSources = response.headers.get("x-sources");
          if (rawSources) {
            try {
              pendingSourcesRef.current = JSON.parse(rawSources) as Source[];
            } catch {
              // ignore malformed header
            }
          }
          return response;
        },
      }),
    []
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    onFinish({ message }) {
      if (pendingSourcesRef.current) {
        setSourcesMap((prev) => ({
          ...prev,
          [message.id]: pendingSourcesRef.current!,
        }));
        pendingSourcesRef.current = null;
      }
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;
      setInput("");
      await sendMessage({ text: trimmed });
    },
    [input, isLoading, sendMessage]
  );

  const handleSuggest = useCallback(
    async (question: string) => {
      if (isLoading) return;
      setInput("");
      await sendMessage({ text: question });
    },
    [isLoading, sendMessage]
  );

  return (
    <div className="flex flex-col h-full">
      <MessageList
        messages={messages}
        sourcesMap={sourcesMap}
        isLoading={isLoading}
        onSuggest={handleSuggest}
      />
      <ChatInput
        input={input}
        isLoading={isLoading}
        onChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
