-- ============================================================
-- Portfolio V2 — Supabase schema
-- Run in the Supabase SQL Editor (Project Settings → SQL).
-- ============================================================

-- pgvector extension for embedding storage / similarity search.
create extension if not exists vector;
-- gen_random_uuid() for the uuid primary keys.
create extension if not exists pgcrypto;

-- ---------- CONTACT FORM SUBMISSIONS ----------
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp not null default now(),
  read boolean not null default false
);

alter table contact_submissions enable row level security;

-- The public contact form (anon) can submit. Only authenticated users can read.
create policy "contact_submissions_anon_insert"
  on contact_submissions
  for insert
  to anon, authenticated
  with check (true);

create policy "contact_submissions_auth_read"
  on contact_submissions
  for select
  to authenticated
  using (true);

-- ---------- RAG KNOWLEDGE BASE (pgvector embeddings) ----------
create table if not exists knowledge_base (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(1536),
  source text not null default 'resume',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamp not null default now()
);

alter table knowledge_base enable row level security;

-- The public knowledge base is readable by anon (RAG retrieval).
create policy "knowledge_base_anon_read"
  on knowledge_base
  for select
  to anon
  using (true);

-- Cosine-similarity index for vector search (wired in Task 10/11).
create index if not exists knowledge_base_embedding_hnsw
  on knowledge_base
  using hnsw (embedding vector_cosine_ops);
