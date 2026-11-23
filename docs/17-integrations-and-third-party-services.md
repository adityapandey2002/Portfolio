# 17 — Integrations and Third-Party Services

## Supabase

- **Purpose**: Postgres database, pgvector embeddings, Realtime broadcasts, RLS.
- **Used by**: `src/lib/supabase.ts`, `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/app/api/contact/route.ts`, `src/app/api/ask/route.ts`, `src/lib/rag.ts`, `src/scripts/seed-kb.mjs`.
- **Tables**: `contact_submissions`, `knowledge_base` (V2); legacy `messages`, `presence`, `knowledge_chunks`.
- **Config**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## Groq

- **Purpose**: LLM inference for the Ask AI chat (`llama-3.3-70b-versatile` default).
- **Used by**: `src/app/api/ask/route.ts` via `@ai-sdk/openai` `createOpenAI` with base URL `https://api.groq.com/openai/v1`.
- **Config**: `GROQ_API_KEY`, `GROQ_MODEL` (optional).

## Web3Forms

- **Purpose**: Contact form email delivery (free, 250 msg/month).
- **Used by**: `src/components/sections/Contact.tsx` POSTs to `https://api.web3forms.com/submit` **from the browser** (Web3Forms' free plan rejects server-side calls). The access key is passed to the client via the `web3formsKey` prop.
- **Fallback**: `/api/contact` stores the submission in Supabase when the browser relay is unavailable or fails.
- **Config**: `WEB3FORMS_ACCESS_KEY` (intentionally public — see `docs/15-security-documentation.md`).

## Embeddings provider (OpenAI-compatible)

- **Purpose**: Generate 1536-dim embeddings for knowledge base chunks and queries.
- **Used by**: `src/scripts/seed-kb.mjs`, `src/lib/rag.ts` (`embedQuery`, `isEmbeddingsConfigured`), `/api/ask` does NOT re-embed at runtime (loads precomputed embeddings from DB).
- **Config**: `EMBEDDINGS_API_KEY` (or `OPENAI_API_KEY`), `EMBEDDINGS_BASE_URL`, `EMBEDDINGS_MODEL`.

## India Development Data Dashboard (upstream)

- **Purpose**: Healthcare indicators for `/health` page.
- **Used by**: `src/app/api/healthcare/route.ts` fetches `https://india-dashboard-delta.vercel.app/api/rankings?indicator=<id>`.
- **Timeout**: 8s per indicator; 8 indicators in parallel.

## Google Fonts

- **Purpose**: Inter, Space Grotesk, JetBrains Mono, Outfit, Lora via `next/font/google`.
- **Used by**: `src/app/layout.tsx`.

## Material Symbols

- **Purpose**: Icon font.
- **Used by**: `src/app/layout.tsx` (Google Fonts CSS link), components reference `material-symbols-outlined`.

## External links (content)

- GitHub: https://github.com/adityapandey2002/
- LinkedIn: https://www.linkedin.com/in/aditya-pandey-a-fellow/
- Live site: https://biharkaswaad.in/
- Deployed portfolio: https://aditya-pandey-beryl.vercel.app

## Not integrated (mentioned but not wired)

- Supabase Realtime broadcast (`LiveToasts`) — defined, not mounted; contact route does not broadcast.
- Visitor presence (`VisitorsPulse`) — defined, not mounted; API routes missing.
- `/api/chat` — referenced by `AskClient.tsx`, not implemented.
- Playwright E2E — mentioned in skills, no config.
- Docker — mentioned in skills, no config.
