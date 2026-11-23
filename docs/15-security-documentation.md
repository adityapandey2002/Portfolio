# 15 — Security Documentation

## Implemented protections

- **Security headers** (in `next.config.js`/`next.config.mjs`): `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`. `next.config.js` also sets `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- `poweredByHeader: false` (in `next.config.mjs`).
- **RLS** on all Supabase tables (insert/select policies).
- **Service role key** is server-only; never exposed to client (`SUPABASE_SERVICE_ROLE_KEY` without `NEXT_PUBLIC_`).
- **Input validation** on `/api/contact`: required fields, length limits, email regex.
- **Placeholder detection** for env vars (`src/lib/env.ts`, `isPlaceholder` in ask route) so example values aren't treated as real config.
- **No secrets in client bundle**: only `NEXT_PUBLIC_SUPABASE_URL`/`ANON_KEY` are public (by design).
- **Image optimization** formats (avif/webp) — not security, but hygiene.

### Known exposure: `WEB3FORMS_ACCESS_KEY` is client-visible

`src/app/page.tsx` and `src/app/contact/page.tsx` pass `process.env.WEB3FORMS_ACCESS_KEY` into the `Contact` client component, so the key is serialized into the browser payload. This is deliberate — Web3Forms' free tier rejects server-side submissions, and the access key is not an account secret in the usual sense (it only permits sending mail to the owner's inbox). The consequence is that **anyone can submit arbitrary mail through the Web3Forms endpoint** and consume the owner's 250-message monthly quota. Rate limiting or an email-alias per purpose would limit the blast radius. Not verified from the current repository whether Web3Forms applies its own abuse controls.

## Not implemented (gaps)

- No rate limiting on `/api/ask` or `/api/contact`.
- No CAPTCHA on contact form.
- No CSRF tokens (not strictly needed for stateless JSON APIs without cookie auth, but worth noting).
- No request size limits beyond field length checks.
- No authentication on any route (by design for a portfolio, but contact submissions are readable by any authenticated Supabase user).
- `presence` RLS policy is overly permissive (`using (true)` / `or true`) — legacy, and the route doesn't exist.
- Two Next.js config files with divergent headers (one includes Permissions-Policy, one doesn't) — unclear which applies.
- `.env` in the working tree contained a real `WEB3FORMS_ACCESS_KEY` value during this documentation pass. It is gitignored, but verify it is not committed. Never document real secrets.
- `src/lib/supabase.ts` `createClient` (SSR) does not set secure cookie options explicitly (relies on @supabase/ssr defaults).

## Recommendations (not applied — documentation only)

- Consolidate `next.config.js`/`.mjs`.
- Add rate limiting (e.g., Vercel edge or middleware).
- Add CAPTCHA to contact.
- Reconcile DB schemas and RLS policies.
- Remove dead realtime components or implement the missing API routes.
- Rotate the Web3Forms key that appeared in `.env` if it was ever committed.

## Distinguishing implemented vs. recommended

Everything in "Implemented protections" is verified in source. Everything in "Not implemented"/"Recommendations" is a gap or suggestion, not currently in code.
