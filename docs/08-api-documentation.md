# 08 — API Documentation

Base URL: the deployed site origin (e.g. `https://aditya-pandey-beryl.vercel.app`). All routes are dynamic (`force-dynamic`).

## `POST /api/ask`

RAG chat endpoint. Streams answers as Server-Sent Events.

- **Runtime**: Node.js (`runtime = 'nodejs'`).
- **Auth**: none.
- **Request body** (`application/json`):
  ```json
  { "question": "string (required, trimmed)" }
  ```
- **Validation**: missing/empty `question` → 400 `{ ok:false, reason:'missing-fields' }`; invalid JSON → 400 `{ ok:false, reason:'invalid-body' }`.
- **Responses**:
  - `200 text/event-stream` — SSE lines:
    - `data: {"text":"..."}` per token chunk.
    - `data: [DONE]` on completion.
    - `data: {"error":"..."}` on stream error.
  - Headers include `x-ai-gateway: fallback` (canned) or `x-ai-gateway: groq` (live).
  - `502 text/plain` — `AI model call failed: ...` if Groq call throws.
- **Behavior**:
  - If `GROQ_API_KEY` missing/placeholder OR Supabase not configured → streams a canned grounded answer (`fallbackStream`), `x-ai-gateway: fallback`.
  - Else loads `knowledge_base` (content + embedding), retrieves top-5 by cosine similarity, builds grounded prompt, calls Groq `llama-3.3-70b-versatile` (or `GROQ_MODEL`), streams tokens.
  - KB load failure is swallowed; answers without context.

## `POST /api/contact`

Contact form **storage fallback** (Supabase). Email delivery via Web3Forms happens in the browser — see `src/components/sections/Contact.tsx`.

- **Auth**: none.
- **Request body** (`application/json`):
  ```json
  {
    "name": "string (required)",
    "email": "string (required)",
    "phone": "string (optional)",
    "category": "string (optional, default 'General enquiry')",
    "message": "string (required)"
  }
  ```
- **Validation**:
  - body is not a JSON object (e.g. `null`, array, scalar) → 400 `{ ok:false, reason:'invalid-body' }`.
  - `name`/`email`/`message`/`phone`/`category` present but not a string → 400 `{ ok:false, reason:'bad-type' }`.
  - missing name/email/message → 400 `{ ok:false, reason:'missing-fields' }`.
  - length limits: name 120, email 200, phone 40, category 120, message 4000 → 400 `{ ok:false, reason:'too-long' }`.
  - email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` → 400 `{ ok:false, reason:'bad-email' }`.
  - invalid JSON → 400 `{ ok:false, reason:'invalid-body' }`.
- **Responses**:
  - `200 { ok:true, via:'supabase' }` — stored in `contact_submissions`.
  - `503 { ok:false, reason:'delivery-failed' }` — Supabase configured but the insert failed.
  - `503 { ok:false, reason:'not-configured' }` — Supabase not configured.
- **Behavior**: inserts into `contact_submissions` via the service-role client (`getSupabaseAdmin()` from `src/lib/supabase/server.ts`, same module as `/api/ask`). Returns 503 when Supabase is missing or the insert fails.

> Note: the `via: 'web3forms'` response branch existed in an earlier revision of this route and was removed in commit `5fcbdc8` ("fix(contact): submit Web3Forms from the browser") because Web3Forms' free plan rejects server-side calls. The client now posts to Web3Forms directly and only falls back to this route.

## `GET /api/healthcare`

Proxies India healthcare indicators.

- **Auth**: none.
- **Query params**: none (indicator list is hardcoded).
- **Response** `200 application/json`:
  ```json
  {
    "fetchedAt": "ISO timestamp",
    "source": "https://india-dashboard-delta.vercel.app/explore?category=healthcare",
    "items": [
      { "id": "...", "name": "...", "unit": "...", "description": "...",
        "value": number|null, "year": number|null, "rank": number|null,
        "total": number, "percentile": number|null, "higherIsBetter": boolean }
    ],
    "failed": ["indicator-id", ...]
  }
  ```
- **Indicators**: `uhc_idx`, `haq_idx`, `life_expectancy`, `infant_mortality`, `maternal_mortality`, `physicians_per_1k`, `hospital_beds_per_1k`, `vaccination_dpt`.
- **Upstream**: `https://india-dashboard-delta.vercel.app/api/rankings?indicator=<id>`, 8s timeout per request, `cache: 'no-store'`. Uses `Promise.allSettled`; failed indicators listed in `failed`.

## Not implemented (referenced but absent)

- `/api/chat` — referenced by `AskClient.tsx` and README; does not exist. Current ask UI uses `/api/ask`.
- `/api/messages` — referenced by `LiveToasts.tsx`; does not exist. Current route is `/api/contact`.
- `/api/presence/heartbeat`, `/api/presence/count` — referenced by `VisitorsPulse.tsx`; do not exist.

## Swagger / OpenAPI

Not implemented. No OpenAPI spec in the repo. (Marked: "Not verified from the current repository.")
