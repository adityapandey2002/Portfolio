# 09 — Authentication and Authorization

## Summary

This portfolio has **no end-user authentication**. There are no login, registration, or session flows for visitors. All API routes are public.

## What exists

- **Supabase RLS policies** on tables (`contact_submissions`, `knowledge_base`, and legacy `messages`/`presence`/`knowledge_chunks`).
  - `contact_submissions`: anon+authenticated INSERT; authenticated SELECT.
  - `knowledge_base`: anon SELECT (for RAG retrieval).
  - Legacy `messages`: anon+authenticated INSERT; no anon read.
  - Legacy `presence`: anon insert/update allowed (loose policy `or true`).
- **Service role key** (`SUPABASE_SERVICE_ROLE_KEY`) is used server-side in API routes to bypass RLS for inserts.
- **No JWT/session handling** in this app for end users. (BiharKaSwaad — a separate project mentioned in content — uses JWT, but that is not part of this repo.)
- **Middleware**: none (`middleware.ts` not present).

## Secrets handling

- Supabase service role key and Groq/Web3Forms/embeddings keys are server-only env vars (not `NEXT_PUBLIC_`), used only in route handlers and scripts.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public by design (Supabase anon key is safe to expose; RLS protects data).
- `.env` is gitignored; `.env.example` is committed.

## Authorization rules (implemented vs. recommended)

Implemented:
- RLS on all tables.
- Service role used only server-side.
- Input validation and length limits on contact.

Not implemented (recommendations only):
- Rate limiting on `/api/ask` and `/api/contact`.
- CAPTCHA on contact form.
- Authenticated admin view for `contact_submissions` (RLS already restricts read to authenticated, but no admin UI exists in this repo).
- CSRF protection (not applicable for JSON API without cookies; no cookie auth here).

## Login/registration workflows

Not applicable — no user accounts.

## Token handling / password hashing / RBAC

Not applicable in this repository. (No passwords, no tokens issued by this app.)
