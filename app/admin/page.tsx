import Link from "next/link";
import StatsPanel from "@/components/admin/StatsPanel";
import SyncPanel from "@/components/admin/SyncPanel";

export const metadata = {
  title: "Admin — Rbeka",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#FAF5F5]">
      <header className="bg-white border-b border-[#E0E0E0]">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#4A4A4A] hover:text-[#C1292E] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
          <span className="font-semibold text-[#1A1A1A] text-sm">Admin Panel</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">Rbeka Admin</h1>
          <p className="text-sm text-[#4A4A4A]">Upload notes and manage the index.</p>
        </div>
        <StatsPanel />
        <SyncPanel />
      </main>
    </div>
  );
}
