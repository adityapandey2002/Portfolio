-- =========================================================
-- Portfolio DB for Aditya Pandey — run in Supabase SQL editor
-- 1) messages        → contact form
-- 2) presence        → "visitors online" heartbeat
-- 3) knowledge_chunks→ RAG knowledge base (pgvector)
-- =========================================================

create extension if not exists vector;

-- ---------- CONTACT MESSAGES ----------
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text default '',
  message text not null,
  created_at timestamptz not null default now()
);

alter table messages enable row level security;

-- API writes go through the service role (bypasses RLS).
-- Nobody can read messages anonymously.
create policy "messages_allow_anon_insert" on messages
  for insert to anon, authenticated
  with check (true);

-- ---------- VISITOR PRESENCE ----------
create table if not exists presence (
  visitor_key text primary key,
  user_agent text default '',
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now()
);

alter table presence enable row level security;

-- Service role handles upserts. Selects stay locked down; we count
-- via the API route instead.
create policy "presence_allow_anon_insert" on presence
  for insert to anon, authenticated
  with check (true);

create policy "presence_allow_anon_update" on presence
  for update to anon, authenticated
  using (visitor_key = current_setting('request.headers')::jsonb ->> 'visitor_key'
         or true)
  with check (true);

-- Keep the table small.
create index if not exists presence_last_seen_idx on presence (last_seen);
create index if not exists presence_visitor_idx on presence (visitor_key);

-- ---------- RAG KNOWLEDGE BASE ----------
create table if not exists knowledge_chunks (
  id bigint generated always as identity primary key,
  content text not null,
  source text not null default 'resume',
  embedding vector(1536),  -- text-embedding-3-small
  created_at timestamptz not null default now()
);

create index if not exists knowledge_chunks_hnsw
  on knowledge_chunks using hnsw (embedding vector_cosine_ops);

create or replace function match_knowledge(
  query_embedding vector(1536),
  match_threshold float default 0.35,
  match_count int default 6
) returns table (content text, source text, similarity float)
language plpgsql
as $$
begin
  return query
  select k.content, k.source, 1 - (k.embedding <=> query_embedding) as similarity
  from knowledge_chunks k
  where 1 - (k.embedding <=> query_embedding) > match_threshold
  order by k.embedding <=> query_embedding
  limit match_count;
end;
$$;
