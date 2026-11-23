# 11 — Installation and Setup

## Prerequisites

- Node.js 18.18+ (tested on Node 24). Seed script needs `node --env-file` (Node 20.6+).
- npm (package-lock.json present; package manager is npm).
- A Supabase project (free tier works) — optional but needed for contact storage and RAG.
- (Optional) Groq API key for live AI chat.
- (Optional) Web3Forms access key for email delivery.
- (Optional) An OpenAI-compatible embeddings provider.

## Steps

### 1. Clone

```bash
git clone https://github.com/adityapandey2002/Portfolio.git
cd Portfolio
git checkout v2-redesign
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
# also create .env for the seed script (same values)
cp .env.example .env
```

Fill in values per `docs/10-configuration-and-environment.md`. At minimum for a working site with no external services, you can leave placeholders — the app degrades gracefully.

### 4. Set up Supabase (optional)

1. Create a project at https://supabase.com.
2. Open SQL Editor and run `supabase/schema.sql` (V2 tables: `contact_submissions`, `knowledge_base`).
   - Alternatively run `supabase/migrations/0001_init.sql` for V1 tables. Do not run both without reconciling (see maintenance notes).
3. Ensure the `vector` extension is enabled (the SQL calls `create extension if not exists vector`).

### 5. Seed the knowledge base (optional)

For `knowledge_chunks` (V1 path, used by keyword fallback in `src/lib/rag.ts`):

```bash
npm run db:seed
```

This reads `knowledge-base/*.md`, chunks it, embeds via `EMBEDDINGS_*`, and replaces the contents of `knowledge_chunks`.

> Current behavior: `knowledge-base/resume.md` contains no blank lines, so the chunker emits **one** chunk for the whole file (`Loaded 1 file(s) → 1 chunks`). Add blank lines between sections to get proper chunking. See `docs/07-database-documentation.md`.

For `knowledge_base` (V2 path, used by `/api/ask`): run `npm run seed-knowledge-base`, then insert the emitted JSON rows into `knowledge_base` manually (the script prints JSON to stdout, it does not insert). It embeds a hardcoded 14-entry array, not `knowledge-base/resume.md`.

### 6. Run

```bash
npm run dev        # http://localhost:3000
```

### 7. Build / start (production)

```bash
npm run build && npm run start
```

### 8. Lint / typecheck

```bash
npm run lint
npm run typecheck
```

## Verification

- `npm run build` should succeed (verified: 9 routes generated).
- `npm run typecheck` should pass with no errors.
- `npm run lint` passes with 3 warnings (font-display) — non-blocking.

## Notes

- The seed script uses `node --env-file=.env`; create `.env` with the same values as `.env.local`.
- If embeddings are not configured, `seed-kb.mjs` inserts chunks with NULL embeddings (keyword search only).
- If Supabase is not configured, contact form returns 503 `not-configured` and chat streams a canned answer.
