import { useEffect, useRef } from "react";
import type { UIMessage } from "ai";
import MessageBubble from "./MessageBubble";
import type { Source } from "@/types";

const SUGGESTIONS = [
  "What are the paper submission guidelines at MIVA?",
  "How should I format citations in my MBA paper?",
  "Explain Porter's Five Forces for my strategy paper",
  "What is the VRIO framework?",
  "How do I structure a business case analysis?",
  "What is working capital management?",
  "Explain competitive advantage with examples",
  "How does DCF valuation work?",
];

interface Props {
  messages: UIMessage[];
  sourcesMap: Record<string, Source[]>;
  isLoading: boolean;
  onSuggest: (question: string) => void;
}

export default function MessageList({ messages, sourcesMap, isLoading, onSuggest }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6 py-10 overflow-y-auto">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              className="w-8 h-8 text-blue-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Start a Conversation</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Ask any question about your MBA coursework. I&apos;ll search through the class notes and provide answers with citations.
          </p>
        </div>

        <div className="w-full max-w-lg">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            Try asking
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => onSuggest(q)}
                disabled={isLoading}
                className="text-left text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all disabled:opacity-50 leading-snug shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            sources={msg.role === "assistant" ? sourcesMap[msg.id] : undefined}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1 mr-2">
              R
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
