# 01 — Project Overview

## Project name

**Aditya Pandey Portfolio** (package name: `aditya-pandey-portfolio`).

## What the application does

A personal portfolio website for Aditya Pandey — a data analyst, full-stack developer, and AI practitioner who is a Gandhi Fellow with the Piramal Foundation in Muzaffarpur, Bihar, India. The site presents his background, field work, projects, skills, education, and provides two interactive features:

1. **Ask AI** — a RAG chat assistant ("Ask Aditya") that answers questions about Aditya's experience, projects, and skills, grounded in a knowledge base and streamed from Groq.
2. **Contact** — a contact form that delivers submissions to the owner's inbox (Web3Forms) and stores them in Supabase, with a Supabase Realtime broadcast channel (defined but not wired in the current tree).

## Problem it solves

A static portfolio cannot answer recruiter/visitor questions or capture leads reliably. This site combines a rich, brutalist-design presentation (split-text hero, live-kernel telemetry panel, impact metrics, a "Vector RAG Terminal" section, 3D ambient background, command palette) with a grounded AI assistant and a working contact pipeline, so visitors can explore and reach Aditya without back-and-forth email.

## Intended audience

- Recruiters and hiring managers evaluating Aditya for data analyst / full-stack / public-health data roles.
- Collaborators and public-health organizations.
- Visitors curious about the Gandhi Fellowship field work and the BiharKaSwaad e-commerce platform.

## Value proposition

- **Field-grounded identity**: the content is built around real public-health field work (700+ ASHA workers trained, 185-hour clinical skills refresher, NQAS support, ODK data pipelines).
- **Interactive, not just a CV**: Bauhaus/neo-brutalist design system, split-text hero, live-kernel telemetry panel, light/dark theme, command palette, boot screen, per-route transitions, 3D ambient background.
- **Grounded AI**: RAG over a curated knowledge base (resume + projects) with a fallback canned answer when services are not configured, so the UI always works end-to-end.
- **Resilient contact**: browser-side Web3Forms delivery with a Supabase storage fallback; validates input; never crashes when env vars are missing.

> A large body of earlier-revision components (3D data sphere, field tour, easter eggs, visitor presence, live toasts, custom cursor) exists in `src/components/**` but is **not mounted** in the current tree. See `docs/06-modules-and-features.md` → "Not mounted".

## Project status

- Branch in use: `v2-redesign` (current). `master` and `origin/*` exist.
- Version: `1.0.0` (package.json). Marked `private: true`.
- No license file present (see README).
- No automated test suite.

## High-level feature list

See the root `README.md` "Features" section and `docs/06-modules-and-features.md`.

## Repository

- Remote: `https://github.com/adityapandey2002/Portfolio.git`
- Default branch on remote: `master`; active development branch: `v2-redesign`.

## Key entry points

- `src/app/layout.tsx` — root layout, fonts, metadata, providers.
- `src/app/page.tsx` — home page composition.
- `src/app/api/ask/route.ts`, `src/app/api/contact/route.ts`, `src/app/api/healthcare/route.ts` — API routes.
- `src/lib/data/*` — all portfolio content.
- `src/lib/rag.ts` — RAG core (chunking, embeddings, retrieval, prompt building).
- `supabase/schema.sql`, `supabase/migrations/*.sql` — database definitions.
- `knowledge-base/resume.md` — source document for the RAG brain.
- `src/scripts/seed-kb.mjs`, `src/scripts/seed-knowledge-base.mjs` — seeding scripts.
