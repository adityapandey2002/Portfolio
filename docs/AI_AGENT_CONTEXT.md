# AI Agent Context

Quick context for AI coding agents working on this repository. Load this before starting a task.

## Project purpose

Personal portfolio for Aditya Pandey (data analyst / full-stack / AI practitioner, Gandhi Fellow at Piramal Foundation). Next.js 15 App Router, Supabase, Groq RAG chat, Web3Forms contact.

## Overall architecture

- Frontend: Next.js 15 App Router, React 19, TS, Tailwind. Pages are statically generated.
- Backend: 3 serverless route handlers (Node.js): `/api/ask`, `/api/contact`, `/api/healthcare`.
- Data: Supabase Postgres + pgvector. Auth: none for end users.
- AI: Groq LLM + in-memory RAG (`src/lib/rag.ts`).
- Deploy: Vercel.

## Technology stack (key)

Next.js 15.3, React 19.1, TS 5.8, Tailwind 3.4, Framer Motion 11.15, Three.js 0.174 + R3F 9.1.2, Supabase JS 2.49 + SSR 0.6, ai 4.3.10, @ai-sdk/openai 1.3.12, lucide-react 0.474.

## Important entry points

- `src/app/layout.tsx` — root layout, fonts, metadata, providers.
- `src/app/page.tsx` — home.
- `src/app/api/ask/route.ts`, `src/app/api/contact/route.ts`, `src/app/api/healthcare/route.ts`.
- `src/lib/data/*` — all portfolio content.
- `src/lib/rag.ts` — RAG core.
- `src/lib/env.ts` — env guards.
- `src/lib/supabase/server.ts` and `src/lib/supabase.ts` — Supabase clients.
- `supabase/schema.sql` — authoritative DB schema (V2).

## Critical directories

- `src/app/` (routes), `src/components/` (UI), `src/lib/` (logic/data), `src/hooks/`, `supabase/`, `knowledge-base/`.

## Module relationships

- Pages compose sections from `src/components/sections/*`.
- Sections read content from `src/lib/data/*`.
- API routes use `src/lib/supabase/server.ts` and `src/lib/rag.ts`.
- Contact route uses `src/lib/supabase.ts` (`createAdminClient`).

## Database overview

- V2 tables (use these): `contact_submissions`, `knowledge_base` (vector(1536)).
- Legacy V1 tables: `messages`, `presence`, `knowledge_chunks` + `match_knowledge()`.
- No FKs. RLS enabled. See `docs/07-database-documentation.md`.

## API conventions

- Routes under `src/app/api/<name>/route.ts`.
- `export const dynamic = 'force-dynamic'`.
- Validate body; return `{ ok, reason }` JSON with status codes.
- Handle missing env gracefully (return 503 or fallback).
- SSE for chat: `data: {"text":"..."}` lines, end with `data: [DONE]`.
- Contact delivery is browser-side (Web3Forms); `/api/contact` is the Supabase storage fallback.

## Coding standards

- TS strict. Path alias `@/*` → `src/*`.
- `'use client'` only when needed.
- Tailwind + CSS variables for theme colors; use `cn()` helper.
- Content in `src/lib/data/*`; magic numbers in `src/lib/constants.ts`.
- Env via `src/lib/env.ts` guards.

## Naming conventions

- Components: PascalCase files in `src/components`.
- Hooks: `useXxx`.
- Data modules: lowercase in `src/lib/data`.
- Routes: lowercase folders.

## Error-handling patterns

- API: structured JSON `{ ok, reason }`, status codes 400/503/502.
- Graceful degradation when env missing.
- `console.error`/`console.warn` for logging.

## Authentication and authorization rules

- No end-user auth. All routes public.
- Supabase service role key server-only.
- RLS on tables; anon read allowed for `knowledge_base`.

## Testing procedures

- No automated tests.
- Run `npm run typecheck`, `npm run lint`, `npm run build`.

## Build and execution commands

- `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run db:seed`, `npm run seed-knowledge-base`.

## Important business rules

- Contact form: name/email/message required; length limits; email regex.
- Chat: falls back to canned answer when unconfigured.
- Healthcare: 8 indicators, 8s timeout each, partial results OK.

## Known limitations

- Presence API and live toasts not implemented (dead code, not mounted).
- `AskClient.tsx` targets non-existent `/api/chat`.
- `useLiveStatus` targets non-existent `/api/status`.
- Large blocks of component code exist but are **not mounted**: `health/*`, `pillars/*`, `HealthDashboard`, `HeroScene`/`DataSphere`, `ProjectCard`/`ProjectGrid`, `Cursor`, `Terminal`, `FieldTour`, `useEasterEggs`, `useScroll`, `src/hooks/useTheme.tsx`. Do not assume they run.
- Only 2 themes are reachable (light/dark) even though `globals.css` defines 4 `data-theme` palettes.
- `/api/healthcare` has no mounted consumer.
- Two schemas/clients/configs/seed scripts (see maintenance docs).
- `knowledge-base/resume.md` has no blank lines → both seed scripts emit one oversized chunk.
- No LICENSE file.
- Embedding dimension mismatch (384 vs 1536).
- No tests/CI.

## Common development pitfalls

- Editing `next.config.js` vs `.mjs` — unclear which applies; consolidate.
- Forgetting `.env` (not just `.env.local`) for seed scripts.
- Assuming presence/realtime works — it doesn't.
- Assuming `/api/chat` exists — it doesn't; use `/api/ask`.
- Treating placeholder env values as real — `isSet` rejects `your-*`.

## Files that require extra care

- `src/app/api/ask/route.ts` — RAG + streaming; complex.
- `src/lib/rag.ts` — two implementations; check which is used.
- `src/lib/supabase*.ts` — duplicate client modules.
- `src/app/layout.tsx` — metadata, fonts, theme script.
- `src/app/globals.css` — theme tokens, `zoom: 0.8` desktop scale, legacy `data-theme` palettes.
- `supabase/schema.sql` + migrations — schema source of truth unclear.
- `src/app/work/page.tsx` (1,923 lines) and `src/app/health/page.tsx` — very large self-contained pages; edit carefully.
- `.env` / `.env.example` — never commit real secrets.

## Safe modification guidelines

- Don't change business logic when only docs are requested.
- Run typecheck + lint + build after changes.
- Keep content in `src/lib/data/*`.
- Don't install packages without approval.
- Preserve existing conventions.
- Don't expose secrets.
- When unsure if a feature exists, check source; mark "Not verified from the current repository."
