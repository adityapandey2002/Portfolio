# 04 — System Architecture

## Architectural pattern

- **Frontend**: Next.js 15 App Router (React Server/Client Components), static generation for pages, dynamic serverless route handlers for APIs.
- **Backend**: Serverless functions (Next.js route handlers) running on Node.js runtime.
- **Data**: Supabase (managed Postgres + pgvector + Realtime + RLS). Two client styles coexist (see maintenance notes).
- **AI**: Groq LLM via OpenAI-compatible API, with an in-memory RAG layer (`src/lib/rag.ts`) and a DB-backed vector search (`match_knowledge` RPC).
- **Deployment**: Vercel (inferred from README and `metadataBase`).

## High-level architecture

```mermaid
flowchart LR
  Browser[Browser / Client] -->|HTTP| Next[Next.js App Router]
  Next -->|SSR/SSG| Pages[Pages: /, /work, /ask, /contact, /health]
  Next -->|Route Handlers| API[API: /api/ask, /api/contact, /api/healthcare]
  API -->|service role| Supabase[(Supabase Postgres + pgvector)]
  API -->|HTTPS| Groq[Groq LLM API]
  API -->|HTTPS| Web3Forms[Web3Forms]
  API -->|HTTPS| IndiaDash[india-dashboard-delta.vercel.app]
  Browser -->|anon client| SupabaseRealtime[Supabase Realtime (defined, unused)]
```

## Layers

1. **Presentation layer** — `src/app/*`, `src/components/*`. React components, Three.js scenes, Framer Motion. Mostly client components for interactivity.
2. **Application / API layer** — `src/app/api/*/route.ts`. Request validation, orchestration, fallback logic.
3. **Domain / service layer** — `src/lib/rag.ts`, `src/lib/supabase*.ts`, `src/lib/data/*`, `src/lib/env.ts`.
4. **Data layer** — Supabase Postgres tables (`contact_submissions`, `knowledge_base`, `knowledge_chunks`, `messages`, `presence`).
5. **External services** — Groq, Web3Forms, embeddings provider, India dashboard.

## Frontend architecture

- App Router with a single root layout (`src/app/layout.tsx`) providing fonts, metadata, theme script, providers, nav, ambient background.
- Pages compose sections from `src/components/sections/*`.
- Client interactivity via `'use client'` components and hooks (`useTheme`, `useToaster`, `useEasterEggs`, `useLiveStatus`, `useScroll`). Only `useToaster` and the `ThemeProvider` in `src/components/providers/` are actually mounted; the others are orphaned.
- Theming: `html.dark` class + `--v2-*` CSS variables; persisted in `localStorage.theme`. `globals.css` also defines four legacy `data-theme` palettes that are not reachable at runtime.
- 3D: `AmbientBackground` (wireframe icosahedron, desktop only) mounted in the layout. The heavier `HeroScene`/`DataSphere` (GLSL shaders) is not mounted.
- Desktop (≥1024px) renders at `zoom: 0.8` with `--zoom-inv: 1.25`.

## Backend architecture

- Three route handlers, all `force-dynamic`:
  - `POST /api/ask` — RAG chat, SSE stream, Node.js runtime.
  - `POST /api/contact` — validates input, tries Web3Forms then Supabase.
  - `GET /api/healthcare` — proxies 8 indicators from upstream India dashboard.
- No middleware file (`middleware.ts`) present.
- No authentication middleware.

## Data access architecture

- Two parallel Supabase client modules:
  - `src/lib/supabase.ts` — `createBrowserClient`, `createClient` (SSR, cookies), `createAdminClient` (service role). Null-safe.
  - `src/lib/supabase/server.ts` — `getSupabaseAdmin` (throws if unconfigured), `isSupabaseConfigured`.
  - `src/lib/supabase/client.ts` — `getSupabaseBrowser` (singleton).
- API routes use `src/lib/supabase/server.ts` (`getSupabaseAdmin`); contact route uses `src/lib/supabase.ts` (`createAdminClient`). Both target the same env vars.
- `src/lib/supabase.ts` `isSupabaseConfigured` requires URL + (anon OR service role). `src/lib/supabase/server.ts` `isSupabaseConfigured` requires URL + (service role OR anon).

## Communication between components

- Pages import section components directly.
- Realtime: `LiveToasts` and `VisitorsPulse` define Supabase Realtime subscriptions but are not imported anywhere in the current tree (dead code).
- Contact form: the client posts to Web3Forms directly (browser-side), falling back to `POST /api/contact` for Supabase storage.
- Home → Ask: `AiTerminal` quick-query buttons and the command palette navigate to `/ask` with a pre-filled question via query string.

## Authentication flow

There is no end-user authentication in this portfolio. See `docs/09-authentication-and-authorization.md`.

## Authorization flow

Supabase RLS policies gate table access; API routes use the service role key (bypasses RLS) for writes. See database docs.

## Error-handling strategy

- API routes return structured JSON `{ ok, reason }` with appropriate status codes (400/503/502).
- `/api/ask` degrades gracefully: no Groq key or no Supabase → canned fallback stream; KB load failure → empty context.
- `/api/healthcare` uses `Promise.allSettled` and reports `failed` indicators.
- Client components swallow network errors (e.g., VisitorsPulse) or surface them (AskClient).
- See `docs/16-error-handling-and-logging.md`.

## Logging strategy

- `console.error` / `console.warn` in API routes and seed scripts. No structured logger. See `docs/16-error-handling-and-logging.md`.

## Caching strategy

- `export const dynamic = 'force-dynamic'` on all API routes (no caching).
- `/api/healthcare` sends `Cache-Control: no-store`.
- `next.config` enables `optimizePackageImports` for lucide-react, framer-motion, @react-three/drei.
- No ISR/revalidation configured for pages (static by default).

## Background jobs

None in the application. Seed scripts are manual CLI tasks.

## Real-time communication

- Supabase Realtime broadcast channel `messages` / event `new_message` is referenced in `LiveToasts.tsx` but the contact route does not broadcast, and `LiveToasts` is not mounted. Not verified as working.
- Visitor presence heartbeat/count is referenced in `VisitorsPulse.tsx` but `/api/presence/*` routes do not exist. Not verified as working.
- The only live client↔server channel that works today is the SSE stream from `/api/ask`.

## Third-party integrations

See `docs/17-integrations-and-third-party-services.md`.

## End-to-end request example (Ask)

1. User submits question on `/ask`.
2. Client POSTs `{ question }` to `/api/ask`.
3. Route validates body; checks Groq key + Supabase config.
4. If unconfigured → streams canned fallback answer (SSE).
5. If configured → loads `knowledge_base` rows (content + embedding), runs `searchKnowledgeBase` (in-memory cosine similarity over hash/Groq embeddings), builds grounded prompt, calls Groq `streamText`, bridges to SSE.
6. Client parses `data: { text }` lines and renders tokens.

Note: there are two RAG implementations. `src/lib/rag.ts` exports both a Supabase-backed `searchKnowledge`/`buildSystemPrompt` (unused by `/api/ask`) and an in-memory `searchKnowledgeBase`/`buildContextPrompt` (used by `/api/ask`). The seed script `seed-kb.mjs` writes to `knowledge_chunks` (used by `searchKnowledge` keyword fallback), while `seed-knowledge-base.mjs` emits JSON for `knowledge_base` (used by `/api/ask`). This split is a known inconsistency.
