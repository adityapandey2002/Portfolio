# 14 — Deployment and Infrastructure

## Supported deployment

**Vercel** (inferred from README and `metadataBase`). Framework auto-detected as Next.js.

### Steps (from README)

1. Push repo to GitHub.
2. Import into vercel.com.
3. In Project → Settings → Environment Variables, add all variables from `.env.example`.
4. Deploy.
5. (Optional) Update `metadataBase` in `src/app/layout.tsx` to your domain.

## Environment variables in production

Add all 7+ variables from `.env.example` (Supabase URL/anon/service role, Web3Forms, Groq, embeddings). See `docs/10-configuration-and-environment.md`.

## Infrastructure

- Hosting: Vercel (serverless functions for API routes).
- Database: Supabase (managed Postgres + pgvector + Realtime).
- No Dockerfile / container config in this repo.
- No IaC (Terraform/Pulumi) in this repo.
- No `.github/` CI config at root.

## Build output (verified)

`npm run build` produces 9 routes (6 static pages + 3 dynamic API routes + `_not-found`), First Load JS ~103–158 kB. See `tasks/qa/build*.txt` for historical logs.

## Runtime requirements

- Node.js 18.18+ on the serverless runtime (Vercel default is compatible).
- API routes use Node.js runtime (`runtime = 'nodejs'` for `/api/ask`; default for others).

## Post-deploy tasks

- Run Supabase schema SQL.
- Seed knowledge base (optional).
- Verify `/api/healthcare` upstream availability.
- Update `metadataBase` if using a custom domain.

## Rollback

Not documented in repo. Vercel provides deployment rollback via dashboard (not verified here).
