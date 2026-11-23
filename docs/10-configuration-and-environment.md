# 10 — Configuration and Environment

## Environment variables

Source of truth: `.env.example`. The app also reads `.env` (for seed scripts) and `.env.local` (Next.js dev).

| Variable | Required | Purpose | Example placeholder | Default |
|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | For Supabase features | Supabase project URL | `your-supabase-project-url.supabase.co` | none |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For Supabase features | Supabase anon (public) key | `your-anon-public-key` | none |
| `SUPABASE_SERVICE_ROLE_KEY` | For server writes (contact, ask KB load) | Service role key (server-only) | `your-service-role-key` | none |
| `WEB3FORMS_ACCESS_KEY` | For email delivery | Web3Forms access key — **public by design**, sent to the browser because Web3Forms rejects server-side calls on the free plan | `your-web3forms-access-key` | none (contact falls back to Supabase) |
| `GROQ_API_KEY` | For live AI chat | Groq API key | `your-groq-api-key` | none (canned fallback) |
| `GROQ_MODEL` | Optional | Groq model id | — | `llama-3.3-70b-versatile` |
| `GROQ_BASE_URL` | Optional | Groq base URL | — | `https://api.groq.com/openai/v1` |
| `GROQ_EMBEDDING_MODEL` | Optional | Groq embedding model | — | `text-embedding-3-small` |
| `EMBEDDINGS_API_KEY` | Optional | Embeddings provider key | `your-embeddings-api-key` | falls back to `OPENAI_API_KEY` |
| `OPENAI_API_KEY` | Optional | Alternative embeddings key | — | none |
| `EMBEDDINGS_BASE_URL` | Optional | Embeddings base URL | `https://api.openai.com/v1` | `https://api.openai.com/v1` |
| `EMBEDDINGS_MODEL` | Optional | Embeddings model | `text-embedding-3-small` | `text-embedding-3-small` |

Placeholder detection: `src/lib/env.ts` `isSet()` rejects values starting with `your-` (or empty). `isHttpUrl()` additionally requires an http(s) URL. `src/app/api/ask/route.ts` `isPlaceholder()` rejects values starting with `your|change|placeholder|replace|xxx`.

## Config files

- `next.config.js` (CJS) and `next.config.mjs` (ESM) — both define image formats, package import optimization, security headers. Slightly different header sets (js includes `Permissions-Policy`; mjs does not). See maintenance notes.
- `tailwind.config.ts` — Tailwind config with CSS-variable-based theme tokens.
- `postcss.config.mjs` — Tailwind + Autoprefixer.
- `tsconfig.json` — strict TS, path alias `@/*` → `./src/*`, noEmit.
- `eslint.config.mjs` — flat config extending `next/core-web-vitals`; ignores `.next`, `node_modules`, `src/scripts`, `next-env.d.ts`.
- `.gitignore` — ignores node_modules, .next, env files (except .env.example), .vercel, tsbuildinfo, next-env.d.ts.

## Runtime constants

`src/lib/constants.ts` centralizes magic numbers (scroll, animation, cursor, contact, three, glide, layout). `PRELOADER.DURATION` is 2000ms.

## Metadata

`src/app/layout.tsx` sets `metadataBase` to `https://aditya-pandey-beryl.vercel.app` (updated from `fix(meta): use the real production domain`). OG/Twitter tags reference this.
