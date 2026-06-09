import Link from "next/link";
import StatsPanel from "@/components/admin/StatsPanel";
import SyncPanel from "@/components/admin/SyncPanel";

export const metadata = {
  title: "Admin — Rbeka",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
          <span className="font-semibold text-gray-900 text-sm">Admin Panel</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Rbeka Admin</h1>
          <p className="text-sm text-gray-500">
            Manage the knowledge base. Upload notes and manage the index.
          </p>
        </div>
        <StatsPanel />
        <SyncPanel />
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <p className="font-semibold mb-1">Supabase Setup Reminder</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Run the SQL schema (pgvector extension, documents &amp; document_chunks tables, HNSW index, match_chunks function) in your Supabase SQL editor before syncing for the first time. See the project README for the full schema.
          </p>
        </div>
      </main>
    </div>
  );
}
