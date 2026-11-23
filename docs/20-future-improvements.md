# 20 — Future Improvements

Derived from `tasks/todo.md`, code inspection, and maintenance notes. Items are grouped; none are implemented.

## From task list (incomplete)

- Work page — Selected work / projects grid (Task 7) — marked incomplete in `tasks/todo.md`, but `/work` exists; verify fidelity.
- Health page — Health field impact (Task 8) — marked incomplete, but `/health` exists.
- Ask AI page — chat interface polish (Task 10) — duplicate entry; verify.
- RAG pipeline — knowledge base + retrieval + Groq (Task 11) — duplicate entry; verify.
- Deploy to Vercel preview + merge to master (Task 18).

## Technical

- Consolidate duplicate Supabase clients, Next.js configs, DB schemas, seed scripts, RAG implementations.
- Implement or remove dead realtime components (presence, live toasts) and missing API routes (`/api/chat`, `/api/status`, `/api/presence/*`).
- Wire `AskClient.tsx` to `/api/ask` or remove.
- Mount or delete the large dead-component block (`health/*`, `pillars/*`, `HealthDashboard`, `HeroScene`, `ProjectCard`/`ProjectGrid`, `Cursor`, `Terminal`, `FieldTour`, `useEasterEggs`, `useScroll`, `src/hooks/useTheme.tsx`).
- Either mount `HealthcarePanel` so `/api/healthcare` output is visible, or remove the route.
- Reconcile embedding dimensions (384 vs 1536).
- Fix the knowledge-base chunker: `knowledge-base/resume.md` has no blank lines, so both seed scripts emit a single oversized chunk.
- Make `seed-knowledge-base.mjs` read `knowledge-base/*.md` so both scripts share one source of truth.
- Fix encoding/mojibake in content strings.
- Make the legacy `data-theme` palettes reachable or remove them (only light/dark work today).
- Add automated tests (Vitest + Playwright) and CI.
- Add rate limiting and CAPTCHA to contact (and consider rotating the Web3Forms key, which is public by design).
- Add OpenAPI spec for API routes.
- Add structured logging and error monitoring.
- Optimize 3D bundle (dynamic imports) — currently only the ambient icosahedron ships.
- Add admin view for contact submissions.
- Add `LICENSE` file (currently absent).

## Content

- Add screenshots/demo to README (placeholder section included).
- Update `metadataBase` to production domain (partially done).
- Keep `knowledge-base/resume.md` in sync with `src/lib/data/*`.
- Reference the committed `public/health/*.jpg` photos from the health page (or remove them).
- Re-export the `/work` page from `src/lib/data/projects.ts` instead of hardcoded inline content.
