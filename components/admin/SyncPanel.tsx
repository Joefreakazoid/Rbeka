"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SyncResult } from "@/types";

const ACCEPTED = ".pdf,.docx,.txt,.zip";

export default function SyncPanel() {
  const router = useRouter();

  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [syncStatus, setSyncStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [syncError, setSyncError] = useState("");

  async function handleUpload() {
    const files = fileRef.current?.files;
    if (!files || files.length === 0) {
      setUploadError("Select at least one file.");
      setUploadStatus("error");
      return;
    }

    setUploadStatus("loading");
    setUploadedFiles([]);
    setUploadError("");

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const body = await res.json();
      if (!res.ok && res.status !== 207) {
        throw new Error(body.error ?? res.statusText);
      }
      const names = (body.uploaded as { name: string; ok: boolean }[])
        .filter((r) => r.ok)
        .map((r) => r.name);
      setUploadedFiles(names);
      setUploadStatus("done");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Unknown error");
      setUploadStatus("error");
    }
  }

  async function handleSync() {
    setSyncStatus("loading");
    setSyncResult(null);
    setSyncError("");

    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? res.statusText);
      }
      const data: SyncResult = await res.json();
      setSyncResult(data);
      setSyncStatus("done");
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : "Unknown error");
      setSyncStatus("error");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="space-y-5">
      {/* Upload notes */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Upload Notes
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Supports PDF, DOCX, TXT, and ZIP. Upload a ZIP to extract and store
          all files inside at once. Index them below when ready.
        </p>

        <input
          ref={fileRef}
          type="file"
          multiple
          accept={ACCEPTED}
          className="w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={uploadStatus === "loading"}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {uploadStatus === "loading" ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Uploading…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              Upload Files
            </>
          )}
        </button>

        {uploadStatus === "done" && uploadedFiles.length > 0 && (
          <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4 text-sm">
            <p className="font-semibold text-green-800 mb-1">
              {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""} uploaded
            </p>
            <ul className="text-green-700 text-xs space-y-0.5">
              {uploadedFiles.map((n) => <li key={n}>{n}</li>)}
            </ul>
            <p className="text-green-600 text-xs mt-2">
              Run &ldquo;Index Notes&rdquo; below to make them searchable.
            </p>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {uploadError}
          </div>
        )}
      </div>

      {/* Index notes */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Index Notes
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Parses, chunks, and embeds all files in Supabase Storage. Skips
          unchanged files. Runs automatically every night via cron.
        </p>

        <button
          onClick={handleSync}
          disabled={syncStatus === "loading"}
          className="w-full rounded-xl bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {syncStatus === "loading" ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Indexing… this may take a few minutes
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Index Notes
            </>
          )}
        </button>

        {syncStatus === "done" && syncResult && (
          <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4 text-sm">
            <p className="font-semibold text-green-800 mb-2">Indexing complete</p>
            <ul className="text-green-700 space-y-1">
              <li>Total files: <strong>{syncResult.total}</strong></li>
              <li>Indexed: <strong>{syncResult.synced}</strong></li>
              <li>Skipped (unchanged): <strong>{syncResult.skipped}</strong></li>
              <li>Deleted (removed from storage): <strong>{syncResult.deleted}</strong></li>
            </ul>
            {syncResult.errors.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold text-orange-700 mb-1">
                  Errors ({syncResult.errors.length}):
                </p>
                <ul className="text-orange-600 text-xs space-y-0.5">
                  {syncResult.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {syncStatus === "error" && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {syncError}
          </div>
        )}
      </div>

      {/* Sign out */}
      <button
        onClick={handleLogout}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
