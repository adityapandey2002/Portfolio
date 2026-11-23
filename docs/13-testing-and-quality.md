# 13 — Testing and Quality

## Automated tests

**None.** There is no test framework installed (no Jest/Vitest/Playwright config, no `*.test.*`/`*.spec.*` files). `projects.ts` mentions Playwright E2E in skill pills, but no Playwright config exists. The `tasks/qa/` folder contains manual QA screenshots and scripts, not automated tests.

## Quality gates available

| Gate | Command | Status (verified) |
|---|---|---|
| TypeScript | `npm run typecheck` | Passes (0 errors) |
| ESLint | `npm run lint` | Passes (3 warnings: google-font-display, no-page-custom-font) |
| Production build | `npm run build` | Passes (9 routes) |

## Manual QA

- `tasks/qa/` contains screenshots (desktop/mobile, light/dark) and capture scripts (`capture-all.js`, `audit.js`, etc.). These are ad-hoc, not part of CI.
- `tasks/qa/build*.txt` are build logs.

## Recommended (not implemented)

- Add a test runner (Vitest for unit, Playwright for E2E) — not done; do not add dependencies without approval.
- Add CI (GitHub Actions) — `.github/` not present at root.
- Add pre-commit hooks (Husky + lint-staged) — not configured.

## What to verify manually before shipping

- All pages render in light + dark on mobile and desktop.
- Contact form submits and returns a success `via`.
- Ask page streams an answer (canned fallback is acceptable when unconfigured).
- `/api/healthcare` returns items + failed list.
- No console errors in browser.
- Lighthouse / accessibility not measured in repo.
