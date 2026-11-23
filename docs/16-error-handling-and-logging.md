# 16 — Error Handling and Logging

## Error handling patterns

### API routes

- `/api/ask`:
  - Invalid JSON → 400 `{ ok:false, reason:'invalid-body' }`.
  - Missing question → 400 `{ ok:false, reason:'missing-fields' }`.
  - Unconfigured (no Groq key / no Supabase) → 200 SSE stream of canned fallback answer, header `x-ai-gateway: fallback`.
  - KB load failure → swallowed, `console.error`, answers without context.
  - Groq call failure → 502 `text/plain` "AI model call failed: ...".
  - SSE stream errors → emitted as `data: {"error":"..."}` then stream closes.
- `/api/contact`:
  - Invalid JSON → 400 `invalid-body`.
  - Missing fields → 400 `missing-fields`.
  - Too long → 400 `too-long`.
  - Bad email → 400 `bad-email`.
  - Supabase failure → 503 `delivery-failed` (if configured) or `not-configured`.

### Client

- `Contact.tsx` posts to Web3Forms first; on a non-OK response it logs `[contact] web3forms rejected:` and falls through to `POST /api/contact`. If that also fails, the component sets its `error` status and the user sees an error state.
- The client performs only a required-field check before sending; the server performs the full validation (lengths, email regex).
- `/api/healthcare`:
  - Per-indicator failures captured via `Promise.allSettled`; reported in `failed` array. Upstream timeout 8s. No top-level error response (always 200 with partial data).

### Client

- `VisitorsPulse` swallows fetch errors silently (component is not mounted — see `docs/06-modules-and-features.md`).
- `LiveToasts` swallows subscription errors (component is not mounted).
- `AskTerminal` surfaces stream errors to the user.

### Env

- `isSet`/`isHttpUrl` prevent crashes from placeholder env values; clients return null instead of throwing.

## Logging

- No structured logger. Uses `console.error` / `console.warn` / `console.log`.
- Locations: API routes (contact, ask), seed scripts.
- No log levels, no request IDs, no correlation.
- No monitoring/APM configured (Sentry, etc.) — not in dependencies.

## Recommendations (not applied)

- Add structured logging and request IDs.
- Add error monitoring (Sentry) if needed.
- Surface `/api/healthcare` upstream failures more explicitly.
- Add rate-limit logging.
