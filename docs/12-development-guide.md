# 12 — Development Guide

## Day-to-day workflow

1. `git checkout v2-redesign` (active branch).
2. `npm install` (if deps changed).
3. `npm run dev`.
4. Edit under `src/`. Path alias `@/*` → `src/*`.
5. Run `npm run typecheck` and `npm run lint` before committing.
6. Run `npm run build` to catch build-time issues.

## Conventions

- **TypeScript strict mode** (`tsconfig.json` `strict: true`). Avoid `any` (ESLint rule disabled, but prefer types).
- **Components**: `'use client'` only when needed (interactivity, browser APIs, hooks). Server components by default.
- **Styling**: Tailwind utilities + CSS variables for theme colors. Use `cn()` from `src/lib/utils.ts` for conditional classes.
- **Content**: edit `src/lib/data/*` (single source of truth for copy). Do not hardcode portfolio copy in components.
- **Magic numbers**: add to `src/lib/constants.ts`.
- **Env access**: use `src/lib/env.ts` guards; never assume env vars are set.
- **Supabase**: prefer `src/lib/supabase/server.ts` (`getSupabaseAdmin`) in route handlers; check `isSupabaseConfigured()` first.

## Adding a page

Create `src/app/<route>/page.tsx` (and optional `layout.tsx`). Export `metadata`. Add to nav if needed (`src/components/ui/DesktopNav.tsx`, `MobileTabBar.tsx`).

## Adding an API route

Create `src/app/api/<name>/route.ts`. Export `POST`/`GET`. Set `export const dynamic = 'force-dynamic'`. Validate input. Return structured JSON. Handle missing config gracefully.

## Adding a component

Place in the appropriate `src/components/*` folder. Keep `'use client'` minimal. Reuse primitives from `src/components/ui`.

## Theme tokens

Colors are CSS variables (`--v2-*`) defined in `src/app/globals.css` under `:root` / `html.dark`. Tailwind maps them via `tailwind.config.ts`. Add new tokens in both places.

## Build commands reference

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (Turbopack not enabled; default webpack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:seed` | Seed `knowledge_chunks` |
| `npm run seed-knowledge-base` | Emit JSON for `knowledge_base` |

## Git

- Active branch: `v2-redesign`. `master` is the production-tracking branch.
- Commit messages follow conventional-ish prefixes (`feat`, `fix`, `chore`, `refactor`) seen in git log.
- No pre-commit hooks configured (despite `setup-pre-commit` skill availability).

## Files requiring extra care

See `docs/AI_AGENT_CONTEXT.md` ("Files that require extra care").
