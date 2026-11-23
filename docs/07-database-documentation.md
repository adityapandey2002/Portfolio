# 07 — Database Documentation

## Database engine

**Supabase** — managed PostgreSQL with the `pgvector` extension (for vector similarity search) and `pgcrypto` (for `gen_random_uuid()`). Accessed via `@supabase/supabase-js` and `@supabase/ssr`.

## Important note on two schemas

The repository contains **two** SQL definitions that disagree on table names:

1. `supabase/migrations/0001_init.sql` — V1 tables: `messages`, `presence`, `knowledge_chunks` + `match_knowledge()` (1536-dim).
2. `supabase/schema.sql` — V2 tables: `contact_submissions`, `knowledge_base` (1536-dim).
3. `supabase/migrations/0002_contact_fields.sql` — alters `contact_submissions` (adds `phone`, `category`), references `contact_submissions` (V2 naming).

The application code uses the **V2** tables:
- `src/app/api/contact/route.ts` → `contact_submissions`.
- `src/app/api/ask/route.ts` → `knowledge_base`.
- `src/lib/rag.ts` `searchKnowledge` (unused) → `knowledge_chunks` + `match_knowledge` (V1).

Recommendation: treat `supabase/schema.sql` as the authoritative schema for the current app, and reconcile/remove `0001_init.sql` + `0002_contact_fields.sql` to avoid confusion. See `docs/18-maintenance-and-troubleshooting.md`.

## Tables (V2 schema — `supabase/schema.sql`)

### `contact_submissions`

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PK |
| name | text | NO | — | |
| email | text | NO | — | |
| phone | text | YES | — | added in 0002 |
| category | text | YES | — | added in 0002 |
| message | text | NO | — | |
| created_at | timestamp | NO | now() | (note: `timestamp` not `timestamptz`) |
| read | boolean | NO | false | |

RLS: enabled. Policies: anon+authenticated INSERT allowed; authenticated SELECT allowed. (No public read.)

### `knowledge_base`

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PK |
| content | text | NO | — | chunk text |
| embedding | vector(1536) | YES | — | 1536-dim (text-embedding-3-small) |
| source | text | NO | 'resume' | e.g. about, gandhi-fellowship |
| metadata | jsonb | NO | '{}' | |
| created_at | timestamp | NO | now() | |

RLS: enabled. Policy: anon SELECT allowed (RAG retrieval). HNSW index on `embedding` (cosine ops).

## V1 tables (`supabase/migrations/0001_init.sql`) — legacy

### `messages`

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO | — |
| email | text | NO | — |
| subject | text | YES | '' |
| message | text | NO | — |
| created_at | timestamptz | NO | now() |

RLS enabled; anon+authenticated INSERT; no anon read.

### `presence`

| Column | Type | Nullable | Default |
|---|---|---|---|
| visitor_key | text | NO | — | PK |
| user_agent | text | YES | '' |
| first_seen | timestamptz | NO | now() |
| last_seen | timestamptz | NO | now() |

Indexes: `presence_last_seen_idx`, `presence_visitor_idx`. RLS enabled; anon insert/update allowed (loose policy).

### `knowledge_chunks`

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | bigint | NO | identity |
| content | text | NO | — |
| source | text | NO | 'resume' |
| embedding | vector(1536) | YES | — |
| created_at | timestamptz | NO | now() |

HNSW index; `match_knowledge(query_embedding, match_threshold, match_count)` RPC returns `(content, source, similarity)`.

## Relationships

There are **no foreign keys** between tables. Each table is independent. `knowledge_base.source` / `knowledge_chunks.source` is a free-text label, not a FK.

## Indexes

- `knowledge_base_embedding_hnsw` — HNSW on `embedding` (cosine ops).
- `knowledge_chunks_hnsw` — HNSW on `embedding` (cosine ops).
- `presence_last_seen_idx`, `presence_visitor_idx`.

## Enums / views / triggers / stored procedures

- None defined except the `match_knowledge` PL/pgSQL function (V1).
- No triggers, views, or enums.

## Migration strategy

- Migrations are plain SQL files applied manually via the Supabase SQL Editor (no migration runner/CLI configured in this repo).
- `0001_init.sql` creates V1 tables; `0002_contact_fields.sql` alters `contact_submissions` (V2). Inconsistent.
- Recommendation: consolidate into a single `schema.sql` run, or adopt Supabase CLI migrations. Not verified as automated.

## Seeding strategy

- `npm run db:seed` → `seed-kb.mjs` → deletes + inserts into `knowledge_chunks` (V1 table) using `EMBEDDINGS_*` (1536-dim, OpenAI-compatible). Falls back to NULL embeddings (keyword search only).
- `npm run seed-knowledge-base` → `seed-knowledge-base.mjs` → prints JSON to stdout (chunks + 384-dim hash/Groq embeddings) for manual insert into `knowledge_base` (V2 table). Does not insert. It embeds a **hardcoded `KB` array** (14 entries: about, gandhi-fellowship, biharkaswaad-experience, prodigy-internship, auroville-fablab, projects-india-dashboard, projects-spacex, projects-vhsnd, projects-biharkaswaad, skills, education, certifications, health-field-work, contact) — it does **not** read `knowledge-base/resume.md`. Verified output: 14 chunks, 384 dims.
- Note dimension mismatch: V1 seed uses 1536-dim; V2 seed uses 384-dim hash embeddings, while `knowledge_base.embedding` is `vector(1536)`. The `/api/ask` path loads `knowledge_base` rows and runs in-memory cosine similarity, which tolerates dimension differences (compares shared prefix), but `match_knowledge` RPC requires 1536-dim. This is a known inconsistency.

### Known seeding defect

`knowledge-base/resume.md` contains **no blank lines** (54 single-newline-separated lines). Both seed scripts chunk by splitting on `/\n{2,}/` (blank-line-delimited blocks) and then packing blocks up to a max length. With a single 5,099-character block, `seed-kb.mjs` produces **one oversized chunk**, not the expected ~7. Verified by running it: `Loaded 1 file(s) → 1 chunks`.

Consequences:

- The `knowledge_chunks` table ends up with a single row containing the entire resume, which degrades retrieval quality for the keyword/vector path.
- Fix by adding blank lines between resume sections, or by changing the chunker to also split on single newlines / headings.

## Transaction handling

No explicit transactions in application code; single-statement inserts/updates via Supabase client.

## ER diagram

See `docs/diagrams/database-er-diagram.md`.
