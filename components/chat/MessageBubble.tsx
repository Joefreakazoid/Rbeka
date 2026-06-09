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
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1 mr-2">
          R
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
          }`}
        >
          {content}
        </div>
        {!isUser && sources && <SourceCitations sources={sources} />}
      </div>
    </div>
  );
}
