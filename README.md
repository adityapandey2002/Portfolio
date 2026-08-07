# Aditya Pandey — Portfolio

Tier-4 "extreme" portfolio built with **Next.js 15**, **Three.js (R3F)**, **Framer Motion**, **Supabase** (Postgres + Realtime + pgvector), and **Groq** for a RAG chat assistant.

**Tagline:** Field Data → Clean Insights → Real Decisions.

---

## What's inside

| Route | What it is |
| --- | --- |
| `/` | Landing — 3D GLSL data sphere, split-text hero, animated Bihar field map, counters, skills radar, featured work |
| `/work` | Full project grid with filters + case-study modals |
| `/ask` | RAG chat over Aditya's resume/projects (Groq + pgvector, streamed) |
| `/contact` | Contact form → stored in Supabase + broadcast live to visitors (email fallback) |

**Extras:** 4 themes (press `T`), ⌘K command palette, custom cursor + gooey blob, interactive terminal, 5-step field tour, easter eggs (type `aditya`, `data`, `bihar`, `asha`, `hire`, Konami code), realtime "visitors online", particles background, curtain/glitch route transitions.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, Providers
│   ├── page.tsx              # home
│   ├── work/ · ask/ · contact/
│   ├── api/
│   │   ├── chat/route.ts     # RAG streaming chat (edge)
│   │   ├── messages/route.ts # contact form + realtime broadcast
│   │   └── presence/…        # visitor heartbeat + count
├── components/
│   ├── three/                # shaders, DataSphere, HeroScene, particles
│   ├── motion/               # PageShell, Reveal, TiltCard, Magnetic
│   ├── ui/                   # Cursor, Preloader, Nav, CommandPalette, Terminal, FieldTour…
│   ├── sections/             # Hero, Impact, FieldSection, About, Experience…
│   └── projects/             # ProjectCard + ProjectGrid
├── lib/
│   ├── data/                 # profile, experience, projects, skills (all content)
│   ├── supabase/             # server & browser clients
│   └── rag.ts                # embeddings + vector search + system prompt
├── hooks/                    # theme, toaster, easter eggs
└── scripts/seed-kb.mjs       # chunk knowledge-base/*.md → pgvector
supabase/migrations/0001_init.sql   # messages, presence, knowledge_chunks + match_knowledge()
knowledge-base/resume.md            # source for the RAG brain
```

---

## Step-by-step: run it locally

### 1. Install

```bash
npm install
```

Node 18.18+ (tested on Node 24). Requires `node --env-file` (Node 20.6+) for the seed script.

### 2. Set up Supabase (free)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → run the entire contents of `supabase/migrations/0001_init.sql`.
   - This creates `messages`, `presence`, `knowledge_chunks` (with an HNSW vector index) and the `match_knowledge()` function.
3. Install the **vector** extension if prompted (the script calls `create extension if not exists vector`).

### 3. Get keys

- **Supabase**: Project Settings → API → copy `Project URL`, `anon` key, and `service_role` key.
- **Groq**: [console.groq.com](https://console.groq.com) → create a free API key.
- **Embeddings** (optional — used for semantic search; defaults to `text-embedding-3-small` on the OpenAI-compatible base URL you provide, e.g. from OpenRouter, Together, or Groq itself):
  - `EMBEDDINGS_API_KEY`, `EMBEDDINGS_BASE_URL`, `EMBEDDINGS_MODEL`.

### 4. Create `.env.local` (dev) / `.env` (seed) — copy from `.env.example`

```bash
# Copy the example, then fill it in
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GROQ_API_KEY=...
EMBEDDINGS_API_KEY=...
EMBEDDINGS_BASE_URL=https://api.openai.com/v1
EMBEDDINGS_MODEL=text-embedding-3-small
```

### 5. Seed the knowledge base (once)

```bash
npm run db:seed
```

> Uses `node --env-file=.env` — so create `.env` (plain, same values as `.env.local`) for this step.

Verify: in Supabase Table Editor, `knowledge_chunks` should have ~5–10 rows. If the embeddings provider isn't configured yet, the script inserts chunks with `NULL` embeddings — the chat falls back to keyword search, so it still works.

### 6. Run

```bash
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

Other scripts: `npm run lint` · `npm run typecheck`.

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import into [vercel.com](https://vercel.com) (framework auto-detected: Next.js).
3. In Project → Settings → Environment Variables, add the **same 7 variables** from `.env.example`.
4. Deploy. The `/ask` chat and contact form light up automatically once Supabase + Groq keys are set.
5. (Optional) In Vercel, update `metadataBase` in `src/app/layout.tsx` to your domain.

---

## How the RAG chat works

1. `knowledge-base/resume.md` is chunked by `src/scripts/seed-kb.mjs` and embedded into `knowledge_chunks` (pgvector, 1536-dim).
2. `/api/chat` embeds the user's question → `match_knowledge()` returns top-N chunks → they become context in the system prompt.
3. `streamText` (Groq `llama-3.3-70b-versatile`) streams tokens back over the data-stream protocol.
4. No embeddings configured? It falls back to an ILIKE keyword search. No Supabase at all? The route returns a clear 503 and the UI shows a friendly error.

## How presence works

`VisitorsPulse` generates a `visitor_key` (localStorage), heartbeats every 15s via `/api/presence/heartbeat` (upsert `last_seen`), and `/api/presence/count` counts rows with `last_seen` within the last 30 seconds. Contact messages trigger a Supabase Realtime broadcast shown as live toasts.

---

**Design system:** 4 themes via `[data-theme]` in `globals.css` · fonts: Outfit (sans), JetBrains Mono, Lora (serif) · cursor/blob/glitch/scanline/noise effects · full `prefers-reduced-motion` support.
