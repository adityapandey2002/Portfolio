# 03 — Project Structure

## Root-level tree (excluding generated/dependency directories)

```
portfolio/
├── .env                       # local secrets (gitignored)
├── .env.example               # template for env vars
├── .gitignore
├── AGENTS.md                  # (created by this documentation pass)
├── README.md                  # GitHub README
├── docs/                      # this documentation
│   ├── design/                # Stitch UI redesign reference bundle
│   ├── diagrams/
│   └── *.md
├── eslint.config.mjs
├── knowledge-base/
│   └── resume.md              # source doc for the RAG brain
├── next.config.js             # Next.js config (CJS)
├── next.config.mjs            # Next.js config (ESM) — duplicate
├── next-env.d.ts              # generated (gitignored)
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public/
│   ├── icon.svg
│   ├── health/                 # photos (asha-training.jpg, clinical-refresher.jpg) — not yet referenced
│   └── work/                  # project screenshots
├── src/
│   ├── app/                   # Next.js App Router
│   ├── components/            # React components
│   ├── hooks/                 # React hooks
│   ├── lib/                   # utilities, data, supabase, RAG
│   └── scripts/               # seed scripts
├── supabase/
│   ├── migrations/            # 0001_init.sql, 0002_contact_fields.sql
│   └── schema.sql             # V2 schema (contact_submissions, knowledge_base)
├── tailwind.config.ts
├── tasks/                     # planning notes + QA artifacts (not runtime)
├── tsconfig.json
└── tsconfig.tsbuildinfo       # generated
```

Excluded: `node_modules/`, `.next/`, `dist/`, `build/`, `coverage/`.

## `src/` layout

```
src/
├── app/
│   ├── layout.tsx              # root layout, fonts, metadata, providers
│   ├── page.tsx                # home
│   ├── globals.css             # global styles + theme tokens
│   ├── ask/
│   │   ├── page.tsx
│   │   ├── AskClient.tsx       # (unused V1 chat client — /api/chat does not exist)
│   │   └── AskTerminal.tsx     # active ask UI
│   ├── contact/page.tsx
│   ├── health/page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── biharkaswaad/page.tsx
│   └── api/
│       ├── ask/route.ts        # RAG chat (SSE)
│       ├── contact/route.ts    # contact form delivery
│       └── healthcare/route.ts # proxy to india-dashboard
├── components/
│   ├── motion/                 # PageShell, Reveal, TiltCard, Magnetic
│   ├── projects/               # ProjectCard, ProjectGrid, case studies
│   ├── providers/              # Providers, ThemeProvider
│   ├── realtime/               # LiveToasts, VisitorsPulse (defined, unused)
│   ├── sections/               # page sections (Hero, About, …)
│   │   ├── health/             # health page subcomponents
│   │   └── pillars/            # PillarsOfWork subcomponents
│   ├── three/                  # DataSphere, HeroScene, shaders, particles
│   ├── ui/                     # primitives + Nav, CommandPalette, Terminal, …
│   └── work/                   # WorkFilterBar, WorkMobile
├── hooks/
│   ├── useEasterEggs.ts
│   ├── useLiveStatus.ts
│   ├── useScroll.ts
│   ├── useTheme.tsx
│   └── useToaster.tsx
├── lib/
│   ├── constants.ts            # magic numbers
│   ├── env.ts                  # env guards (isSet, isHttpUrl)
│   ├── glideEngine.ts
│   ├── rag.ts                  # RAG core
│   ├── supabase.ts             # browser/server/admin clients (V1 style)
│   ├── utils.ts                # cn helper
│   ├── data/                   # profile, experience, projects, skills, pillars
│   └── supabase/               # client.ts, server.ts (V2 style)
├── scripts/
│   ├── seed-kb.mjs             # seeds knowledge_chunks (pgvector)
│   └── seed-knowledge-base.mjs # emits JSON for knowledge_base
└── (no tests)
```

## Important directories explained

- `src/app/` — Next.js App Router; each folder is a route; `api/` holds serverless route handlers.
- `src/components/sections/` — large page sections; `health/` and `pillars/` are sub-features.
- `src/lib/data/` — all textual portfolio content (single source of truth for copy).
- `src/lib/supabase/` and `src/lib/supabase.ts` — two parallel Supabase client implementations (see maintenance notes).
- `supabase/` — SQL definitions; `schema.sql` is the V2 schema, `migrations/` contains 0001 (V1 tables) and 0002 (contact fields).
- `docs/design/` — reference UI bundle, not runtime.
- `tasks/` — planning notes and QA screenshots, not runtime.

## Entry points

- Web: `src/app/layout.tsx` → `src/app/page.tsx`.
- API: `src/app/api/*/route.ts`.
- Seed: `src/scripts/seed-kb.mjs`, `src/scripts/seed-knowledge-base.mjs`.

## Route map (verified from build)

| Route | Type | Source |
|---|---|---|
| `/` | Static | `src/app/page.tsx` |
| `/work` | Static | `src/app/work/page.tsx` |
| `/work/biharkaswaad` | Static | `src/app/work/biharkaswaad/page.tsx` |
| `/ask` | Static | `src/app/ask/page.tsx` |
| `/contact` | Static | `src/app/contact/page.tsx` |
| `/health` | Static | `src/app/health/page.tsx` |
| `/api/ask` | Dynamic | `src/app/api/ask/route.ts` |
| `/api/contact` | Dynamic | `src/app/api/contact/route.ts` |
| `/api/healthcare` | Dynamic | `src/app/api/healthcare/route.ts` |
| `/_not-found` | Static | Next.js default |
