# AGENTS.md

This repository is the personal portfolio of Aditya Pandey. Before making changes, read `docs/AI_AGENT_CONTEXT.md` for architecture, conventions, and pitfalls.

## Quick facts

- Stack: Next.js 15 (App Router), React 19, TypeScript 5.8 (strict), Tailwind 3.4, Supabase, Groq RAG.
- Active branch: `v2-redesign`. Default remote branch: `master`.
- No tests, no CI, no LICENSE file.
- No end-user authentication; all API routes public.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run db:seed` / `npm run seed-knowledge-base` — seed scripts

## Conventions

- Path alias `@/*` → `src/*`.
- Content lives in `src/lib/data/*`; magic numbers in `src/lib/constants.ts`.
- Env access via `src/lib/env.ts` guards (`isSet`, `isHttpUrl`).
- `'use client'` only when needed.
- Use `cn()` from `src/lib/utils.ts` for classes.

## Caution

- Presence/Realtime components (`VisitorsPulse`, `LiveToasts`) and `/api/chat`, `/api/messages`, `/api/presence/*`, `/api/status` are referenced but NOT implemented.
- A large block of components exists but is NOT mounted (`health/*`, `pillars/*`, `HealthDashboard`, `HeroScene`/`DataSphere`, `ProjectCard`/`ProjectGrid`, `Cursor`, `Terminal`, `FieldTour`, `useEasterEggs`, `src/hooks/useTheme.tsx`). Verify a component is imported from `src/app/**` before assuming it renders.
- Contact delivery is browser-side (Web3Forms); `/api/contact` is the Supabase storage fallback.
- Two Supabase client modules, two Next.js configs, two DB schemas, two seed scripts, two RAG implementations coexist — reconcile carefully.
- Never commit real secrets; `.env` is gitignored. `WEB3FORMS_ACCESS_KEY` is intentionally public.
- Run `npm run typecheck`, `npm run lint`, and `npm run build` after changes.

## Documentation

Full documentation index: `docs/README.md`.
