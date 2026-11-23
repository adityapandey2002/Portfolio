# 18 — Maintenance and Troubleshooting

## Known inconsistencies / tech debt

1. **Two Supabase client modules**: `src/lib/supabase.ts` and `src/lib/supabase/{client,server}.ts`. Both read the same env vars. API routes mix them (`/api/ask` and `/api/healthcare`-adjacent use `server.ts`; `/api/contact` uses `supabase.ts`). Reconcile to one.
2. **Two Next.js config files**: `next.config.js` (CJS) and `next.config.mjs` (ESM) with different header sets. Consolidate to one (prefer `.mjs` for ESM/Next 15).
3. **Two DB schemas**: `supabase/schema.sql` (V2) vs `supabase/migrations/0001_init.sql` + `0002_contact_fields.sql` (V1 + alter). Table names differ (`contact_submissions` vs `messages`; `knowledge_base` vs `knowledge_chunks`). Consolidate.
4. **Two seed scripts**: `seed-kb.mjs` (writes `knowledge_chunks`, 1536-dim) vs `seed-knowledge-base.mjs` (emits JSON for `knowledge_base`, 384-dim). Align dimensions and target table.
5. **Two RAG implementations**: `searchKnowledge` (Supabase RPC + keyword) vs `searchKnowledgeBase` (in-memory). `/api/ask` uses the in-memory one. `searchKnowledge`/`buildSystemPrompt` are unused.
6. **Dead realtime components**: `VisitorsPulse`, `LiveToasts` not mounted; presence API missing; contact route doesn't broadcast.
7. **Unused `AskClient.tsx`**: targets `/api/chat` which doesn't exist.
8. **Legacy `data-theme` palettes**: `globals.css` defines four (`light`, `dark`, `sunset`, `cyberpunk`) but the active theme system only toggles the `dark` class, so only light/dark are reachable. Either wire `data-theme` or delete the dead palettes.
9. **Old README project tree** referenced `/api/messages` and `/api/presence` which don't exist — the README has been rewritten against the current tree.
10. **Dimension mismatch**: V2 seed uses 384-dim hash embeddings but `knowledge_base.embedding` is `vector(1536)`. Cosine similarity tolerates it (shared prefix) but is not ideal.
11. **`created_at` types**: V2 uses `timestamp` (no tz); V1 uses `timestamptz`. Inconsistent.
12. **Mojibake** in source strings (e.g., `A�` artifacts) from encoding issues — visible in README/profile text. Not blocking.
13. **Large dead-component block**: `src/components/sections/health/*`, `src/components/sections/pillars/*`, `HealthDashboard.tsx`, `HeroScene.tsx`/`DataSphere.tsx`/`shaders.ts`, `ProjectCard.tsx`/`ProjectGrid.tsx`/`WorkProjectCard.tsx`, `Cursor.tsx`, `Terminal.tsx`, `Nav.tsx`, `ScrollProgress.tsx`, `ThemeToggle.tsx`, `MagnifyDock.tsx`, `AiAssistant.tsx`, `RouteScrollMode.tsx`, `ScrollChaining.tsx`, `Magnetic.tsx`, `useEasterEggs.ts`, `useLiveStatus.ts`, `useScroll.ts`, `src/hooks/useTheme.tsx` are all unreachable from `src/app/**`. They compile and lint clean but never render.
14. **`/api/status`** is fetched by the unmounted `useLiveStatus` hook — the route does not exist.
15. **`/api/healthcare`** has no mounted consumer (`HealthcarePanel` is only reachable via `HealthDashboard`).
16. **`public/health/*.jpg`** images are committed but not referenced by any component.
17. **`WEB3FORMS_ACCESS_KEY` is serialized into the client bundle** — intentional (Web3Forms rejects server-side calls on the free plan), but the key is therefore public.
18. **`knowledge-base/resume.md` has no blank lines**, so the blank-line-based chunker in both seed scripts emits a single oversized chunk. Verified: `npm run db:seed` reports `Loaded 1 file(s) → 1 chunks`. Add blank lines between resume sections or change the chunker.
19. **`seed-knowledge-base.mjs` ignores `knowledge-base/resume.md`** — it embeds a hardcoded 14-entry `KB` array, so the two seed scripts do not share a source of truth.

## Common issues

### Build fails with module not found
Ensure `npm install` ran and `node_modules` present. Check `tsconfig.json` paths.

### Contact form returns `not-configured`
Set `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` for the storage fallback, and `WEB3FORMS_ACCESS_KEY` for browser-side email delivery. Placeholders are rejected by `isSet`.

### Contact form shows the error state
The browser-side Web3Forms relay failed **and** the `/api/contact` fallback failed. Check the browser console for `[contact] web3forms rejected:` and confirm the Supabase insert path.

### Chat always returns canned answer
Set `GROQ_API_KEY` and ensure Supabase configured + `knowledge_base` seeded. Otherwise fallback is expected.

### `/api/healthcare` returns empty `items`
Upstream `india-dashboard-delta.vercel.app` may be down or slow (>8s). Check `failed` array and network.

### Theme not persisting
Check `localStorage.theme` and the inline script in `layout.tsx`. Clear storage to reset. Note that the `data-theme` palettes in `globals.css` are legacy and are not applied at runtime.

### Supabase insert errors
Verify schema applied (`contact_submissions` table exists) and service role key correct. RLS may block if using anon key for writes (writes use service role).

## Troubleshooting checklist

1. `npm run typecheck` — any errors?
2. `npm run lint` — any new warnings?
3. `npm run build` — succeeds?
4. Env vars set and not placeholders?
5. Supabase schema applied?
6. Knowledge base seeded (if testing RAG)?

## Files requiring extra care

See `docs/AI_AGENT_CONTEXT.md`.
