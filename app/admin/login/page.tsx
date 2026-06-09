"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#F2D4D4] flex items-center justify-center mx-auto mb-4">
            <img src="/rbeka-logo.svg" alt="Rbeka" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Admin Access</h1>
          <p className="text-sm text-[#4A4A4A] mt-1">Enter your admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E0E0E0] p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full rounded-lg border border-[#E0E0E0] bg-[#FAF5F5] px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C1292E]"
            />
          </div>

          {error && <p className="text-sm text-[#C1292E]">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-xl bg-[#C1292E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8B1A1A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
