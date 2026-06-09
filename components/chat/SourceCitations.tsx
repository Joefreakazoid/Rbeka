import type { Source } from "@/types";

interface Props {
  sources: Source[];
}

export default function SourceCitations({ sources }: Props) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-xs text-[#9A9A9A] font-medium">Sources:</span>
      {sources.map((src, i) => (
        <a
          key={i}
          href={src.url ?? "#"}
          target={src.url ? "_blank" : undefined}
          rel="noopener noreferrer"
          title={`Similarity: ${(src.similarity * 100).toFixed(0)}%`}
          className="inline-flex items-center gap-1 rounded-full border border-[#F2D4D4] bg-[#FAF5F5] px-2.5 py-0.5 text-xs text-[#C1292E] hover:bg-[#F2D4D4] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-3 h-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          {src.name}
        </a>
      ))}
    </div>
  );
}
