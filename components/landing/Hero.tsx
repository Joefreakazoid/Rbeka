import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-24 px-4 bg-[#FAF5F5]">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#F2D4D4] bg-white px-4 py-1.5 text-sm text-[#4A4A4A] mb-8 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-4 h-4 text-[#C1292E]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
          />
        </svg>
        Powered by AI &amp; RAG Technology
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] leading-tight max-w-3xl mb-6">
        Your Personal{" "}
        <span className="text-[#C1292E]">MBA Knowledge Assistant</span>
      </h1>

      <p className="text-xl text-[#4A4A4A] max-w-2xl mb-10">
        Meet Rbeka — your AI-powered study companion, built by an MBA alumnus
        who knows the grind. Ask questions about your coursework and get
        instant, well-sourced answers from class materials.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 rounded-xl bg-[#C1292E] px-6 py-3.5 text-base font-semibold text-white shadow hover:bg-[#8B1A1A] transition-colors"
        >
          Get Started Free
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
        <a
          href="https://www.linkedin.com/in/freakazoid"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[#E0E0E0] bg-white px-6 py-3.5 text-base font-semibold text-[#4A4A4A] shadow-sm hover:bg-[#FAF5F5] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" className="w-5 h-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Connect with Me
        </a>
      </div>
    </section>
  );
}
