import { isTextUIPart, type UIMessage } from "ai";
import SourceCitations from "./SourceCitations";
import type { Source } from "@/types";

interface Props {
  message: UIMessage;
  sources?: Source[];
}

export default function MessageBubble({ message, sources }: Props) {
  const isUser = message.role === "user";
  const content = message.parts.filter(isTextUIPart).map((p) => p.text).join("");

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#C1292E] flex items-center justify-center shrink-0 mt-1 mr-2 overflow-hidden">
          <img src="/rbeka-logo.svg" alt="Rbeka" className="w-6 h-6 object-contain" />
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-[#C1292E] text-white rounded-br-sm"
              : "bg-[#F2D4D4] text-[#1A1A1A] rounded-bl-sm"
          }`}
        >
          {content}
        </div>
        {!isUser && sources && <SourceCitations sources={sources} />}
      </div>
    </div>
  );
}
