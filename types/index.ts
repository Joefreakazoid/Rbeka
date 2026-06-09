export interface Document {
  id: string;
  storage_path: string;
  name: string;
  mime_type: string;
  modified_time: string;
  web_view_link: string | null;
  synced_at: string;
}

export interface DocumentChunk {
  id: string;
  document_id: string;
  chunk_index: number;
  content: string;
  embedding: number[] | null;
  created_at: string;
}

export interface ChunkSearchResult {
  id: string;
  document_id: string;
  chunk_index: number;
  content: string;
  similarity: number;
  doc_name: string;
  web_view_link: string | null;
}

export interface StorageFile {
  name: string;
  updatedAt: string;
  mimeType: string;
  size: number;
  publicUrl: string;
}

export interface SyncResult {
  total: number;
  synced: number;
  skipped: number;
  deleted: number;
  errors: string[];
}

export interface Source {
  name: string;
  url: string | null;
  similarity: number;
}

export interface StatsResponse {
  documents: number;
  chunks: number;
  lastSyncedAt: string | null;
}
