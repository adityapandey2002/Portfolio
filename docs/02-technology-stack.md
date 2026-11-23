# 02 — Technology Stack

All versions are taken from `package.json` (dependencies/devDependencies) and config files. Only technologies evidenced in the repository are listed.

## Runtime / language

| Technology | Version | Where used | Purpose |
|---|---|---|---|
| Node.js | 18.18+ (tested on 24, per README) | All scripts, dev server, build | Runtime. Seed script needs `node --env-file` (Node 20.6+) |
| TypeScript | 5.8.3 | `src/**`, `tsconfig.json` | Type-safe application code |
| JavaScript (ESM) | — | `src/scripts/*.mjs`, `next.config.mjs` | Seed scripts, config |

## Frameworks

| Technology | Version | Where used | Purpose |
|---|---|---|---|
| Next.js | 15.3.0 | `src/app/**`, `next.config.*` | App Router framework, SSR/SSG, API routes |
| React | 19.1.0 | `src/**` | UI library |
| React DOM | 19.1.0 | `src/**` | DOM rendering |

## Styling

| Technology | Version | Where used | Purpose |
|---|---|---|---|
| Tailwind CSS | 3.4.17 | `tailwind.config.ts`, `src/app/globals.css` | Utility-first styling, dark mode via `class` |
| PostCSS | 8.5.3 | `postcss.config.mjs` | CSS processing |
| Autoprefixer | 10.4.21 | `postcss.config.mjs` | Vendor prefixes |

Tailwind theme uses CSS variables (`--v2-*`) for theme-adaptive colors; `darkMode: 'class'`.

## Animation / 3D

| Technology | Version | Where used | Purpose |
|---|---|---|---|
| Framer Motion | 11.15.0 | `src/components/motion/*`, sections | Page transitions, reveals, tilt, magnetic |
| Three.js | 0.174.0 | `src/components/three/*` | 3D rendering |
| @react-three/fiber | 9.1.2 | `src/components/three/*` | React renderer for Three.js |
| @react-three/drei | 10.0.6 | `src/components/three/*` | R3F helpers |
| @types/three | 0.174.0 | dev | Three.js types |

## Data / backend

| Technology | Version | Where used | Purpose |
|---|---|---|---|
| Supabase JS | 2.49.1 | `src/lib/supabase.ts`, `src/lib/supabase/*.ts`, seed script | Postgres + Auth + Realtime client |
| @supabase/ssr | 0.6.1 | `src/lib/supabase.ts` (`createClient`) | Server-side Supabase client with cookies |
| pgvector | extension | `supabase/*.sql` | Vector similarity search for RAG |
| Groq (via ai SDK) | ai 4.3.10 | `src/app/api/ask/route.ts`, `src/lib/rag.ts` | LLM streaming (llama-3.3-70b-versatile) |
| @ai-sdk/openai | 1.3.12 | `src/app/api/ask/route.ts`, `src/lib/rag.ts` | OpenAI-compatible client (Groq + embeddings) |
| @ai-sdk/react | 1.2.9 | `src/app/ask/AskClient.tsx` | `useChat` hook |

## UI / icons

| Technology | Version | Where used | Purpose |
|---|---|---|---|
| lucide-react | 0.474.0 | components | Icon set |
| Material Symbols Outlined | (web font) | `src/app/layout.tsx`, `globals.css` | Material icons |

## Utilities

| Technology | Version | Where used | Purpose |
|---|---|---|---|
| clsx | 2.1.1 | `src/lib/utils.ts` | Conditional class names |
| tailwind-merge | 2.6.0 | `src/lib/utils.ts` | Tailwind class merging (`cn`) |
| `server-only` (Next.js built-in alias) | bundled with Next 15 | `src/lib/rag.ts`, `src/lib/supabase/server.ts` | Compile-time guard that throws if a server module is imported into a client bundle |

> `server-only` is not a declared dependency. Next.js aliases the `server-only` / `client-only` specifiers internally (see `node_modules/next/dist/build/webpack-config.js`), which is why the import resolves without an install and the build succeeds.

## Type definitions (dev)

| Package | Version |
|---|---|
| @types/node | 22.15.0 |
| @types/react | 19.1.0 |
| @types/react-dom | 19.1.0 |

## Build / tooling

| Technology | Version | Where used | Purpose |
|---|---|---|---|
| ESLint | 9.0.0 | `eslint.config.mjs` | Linting |
| eslint-config-next | 15.3.0 | `eslint.config.mjs` | Next.js lint rules |
| TypeScript compiler | 5.8.3 | `tsc --noEmit` | Type checking |

## Fonts (via next/font/google)

Inter, Space Grotesk, JetBrains Mono, Outfit, Lora — configured in `src/app/layout.tsx`.

## External services (not npm packages)

- **Supabase** — Postgres, pgvector, Realtime, RLS.
- **Groq** — LLM inference (`llama-3.3-70b-versatile` by default).
- **Web3Forms** — contact form email delivery.
- **OpenAI-compatible embeddings endpoint** — any provider (OpenAI, OpenRouter, Ollama, etc.); default base URL `https://api.openai.com/v1`.
- **india-dashboard-delta.vercel.app** — upstream healthcare rankings API consumed by `/api/healthcare`.

## Not used (despite references in code/docs)

- No test framework (Jest/Vitest/Playwright) is installed; `projects.ts` mentions Playwright E2E but no config/test files exist.
- No CI/CD config (`.github/`) present at repo root.
- No Dockerfile; `Docker` is mentioned in skill pills but no container config exists in this repo.
- `next.config.js` and `next.config.mjs` both exist (see `docs/18-maintenance-and-troubleshooting.md`).
- `@ai-sdk/react` is a declared dependency, but the only component using it (`src/app/ask/AskClient.tsx`) targets a non-existent route and is not mounted.
- `zod` is not a declared dependency and is not imported by application code; it only appears transitively in the dependency tree (AI SDK).
