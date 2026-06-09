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
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6 py-10 overflow-y-auto bg-[#FAF5F5]">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-[#F2D4D4] flex items-center justify-center mx-auto mb-4">
            <img src="/rbeka-logo.svg" alt="Rbeka" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-1">Start a Conversation</h2>
          <p className="text-[#4A4A4A] text-sm max-w-xs mx-auto">
            Ask any question about your MBA coursework. I&apos;ll search through the class notes and provide answers with citations.
          </p>
        </div>

        <div className="w-full max-w-lg">
          <p className="text-xs font-medium text-[#9A9A9A] uppercase tracking-wider mb-3">
            Try asking
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => onSuggest(q)}
                disabled={isLoading}
                className="text-left text-sm text-[#1A1A1A] bg-white border border-[#E0E0E0] rounded-xl px-4 py-3 hover:border-[#D94040] hover:bg-[#F2D4D4] hover:text-[#C1292E] transition-all disabled:opacity-50 leading-snug shadow-sm"
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
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-[#FAF5F5]">
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
            <div className="w-8 h-8 rounded-full bg-[#C1292E] flex items-center justify-center shrink-0 mt-1 mr-2 overflow-hidden">
              <img src="/rbeka-logo.svg" alt="Rbeka" className="w-6 h-6 object-contain" />
            </div>
            <div className="bg-[#F2D4D4] rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <span className="w-2 h-2 bg-[#C1292E] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-[#C1292E] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-[#C1292E] rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
