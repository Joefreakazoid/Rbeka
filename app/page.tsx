import Link from "next/link";
import Hero from "@/components/landing/Hero";
import FeatureCards from "@/components/landing/FeatureCards";
import WhyRbeka from "@/components/landing/WhyRbeka";
import MivaTips from "@/components/landing/MivaTips";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF5F5]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#E0E0E0]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/rbeka-logo.svg" alt="Rbeka" className="h-8 w-auto" />
            <span className="font-bold text-[#1A1A1A] text-lg">Rbeka</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="rounded-lg bg-[#C1292E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8B1A1A] transition-colors"
            >
              Start Chatting
            </Link>
            <Link
              href="/admin"
              className="text-sm text-[#4A4A4A] hover:text-[#C1292E] transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <Hero />
        <FeatureCards />
        <MivaTips />
        <WhyRbeka />
      </main>

      <footer className="border-t border-[#E0E0E0] bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#4A4A4A]">
          <span>© {new Date().getFullYear()} Rbeka — MBA Knowledge Assistant</span>
          <a
            href="https://www.linkedin.com/in/freakazoid"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C1292E] transition-colors"
          >
            Built by an MBA Alumnus
          </a>
        </div>
      </footer>
    </div>
  );
}
