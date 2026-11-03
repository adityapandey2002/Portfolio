# Implementation Plan: Portfolio V2 — Bauhaus Neo-Brutalist Redesign

## Overview

Rebuild Aditya Pandey's portfolio (currently V1 on GitHub `adityapandey2002/Portfolio`, deployed on Vercel at https://aditya-pandey-beryl.vercel.app/) as V2 with a full Bauhaus / Neo-Brutalist redesign. Every page supports light mode, dark mode, and mobile variants. Built on Next.js 15.3 + React 19 + TypeScript + Tailwind 3.4 + Supabase + AI SDK (Groq RAG) + Framer Motion + three.js. Developed on branch `v2-redesign`, merged to `master` when complete.

## Recorded Context (User Decisions)

| Decision | Detail |
|----------|--------|
| Theme modes | Light + dark mode toggle on **every page**; mobile variants for each page |
| Pages | Home, Work, Health, Ask AI, Contact — all redesigned per design files |
| AI assistant | `/ask` fully functional RAG with Supabase integration (not static) |
| Effects | Production grade — brutalist hard-edged base + best market effects (three.js, motion) |
| Version control | New branch `v2-redesign`; merge to `master` when ready |
| Content | Fill all content from V2 designs first; decide what to subtract at the end |
| Design system | Space Grotesk headlines, Inter body, JetBrains Mono labels; thick 2–4px borders; hard offset shadows; 0px border-radius; uppercase tracking; 12-col desktop → 6-col tablet → 4-col mobile |

## Architecture Decisions

- **Next.js App Router** — matches existing V1 structure (`src/app/*`)
- **Tailwind 3.4** with custom design tokens in `tailwind.config.ts` (Bauhaus colors, fonts, radii)
- **CSS variables** for light/dark theme switching, applied via `class` strategy on `<html>`
- **React Context** for theme state (light/dark), persisted in `localStorage`
- **Supabase** backend for contact form storage and RAG knowledge base (pgvector)
- **AI SDK + Groq** (Llama-3-70B) for the `/ask` RAG assistant, fully functional
- **Framer Motion** + **three.js** for production-grade effects layered on brutalist base
- **Mobile-first responsive**: every component checks mobile/tablet/desktop breakpoints

## Design Token Reference (from DESIGN.md files)

Light mode:
- Primary: `#1a1a1a` (near-black), Surface: `#f5f0e8` (warm off-white)
- Accent Yellow: `#ffcc00`, Accent Red: `#e63b2e`, Accent Blue: `#0055ff`
- Typography: Space Grotesk / Inter / JetBrains Mono

Dark mode (Obsidian Bauhaus Brutalism):
- Surface: `#131315`, Surface variants: `#1a1a1e` / `#222226`
- Primary Yellow: `#facc15`, Vermilion: `#f97316`, Electric Blue: `#3b82f6`
- Same typography, same hard-edged component style

Component rules:
- 0px border-radius on all elements
- Thick solid borders 2–4px (`#1a1a1a` light / `#ffffff` dark active)
- Hard offset shadows: `4px 4px 0 #000000` (standard), `6px 6px 0` (high emphasis)
- Active state: `translate(4px, 4px)` + shadow collapse to none
- Uppercase, tracking-wider text for labels and headlines

## Task List

### Phase 1: Foundation & Tooling

- [ ] **Task 1: Scaffold V2 branch & design system**
  - Create branch `v2-redesign` from `master`
  - Set up `tailwind.config.ts` with Bauhaus color tokens (light + dark)
  - Add Space Grotesk, Inter, JetBrains Mono fonts
  - Create theme provider (light/dark toggle, localStorage persistence)
  - Create base layout shell with nav + theme toggle
  - **Acceptance criteria:** `npm run dev` runs; theme toggle switches light/dark; fonts load
  - **Verification:** `npm run dev` builds without errors; manual theme switch works
  - **Dependencies:** None
  - **Files:** `tailwind.config.ts`, `src/app/layout.tsx`, `src/components/providers/ThemeProvider.tsx`, `src/components/ui/ThemeToggle.tsx`
  - **Estimated scope:** S

- [ ] **Task 2: Reusable brutalist UI primitives**
  - Button (primary/secondary/ghost/destructive) with thick borders + hard shadows
  - Card/Panel with thick border + offset shadow + 0 radius
  - Input field with thick bottom border + focus ring
  - Chip/badge with zero radius + colored borders
  - Section container with max-width + gutters
  - **Acceptance criteria:** All primitives render in light + dark mode; zero border-radius; thick borders visible
  - **Verification:** Storybook-style preview page or Storybook; visual check light/dark
  - **Dependencies:** Task 1
  - **Files:** `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Input.tsx`, `src/components/ui/Chip.tsx`, `src/components/ui/Section.tsx`
  - **Estimated scope:** M

- [ ] **Task 3: Responsive grid system**
  - 12-col desktop → 6-col tablet → 4-col mobile
  - Gutter/margin tokens from DESIGN.md (desktop 2rem/1.5rem, mobile 1rem/1rem)
  - **Acceptance criteria:** Layout reflows correctly at 1024px, 768px, <768px breakpoints
  - **Verification:** Resize browser / dev tools device toolbar
  - **Dependencies:** Task 1
  - **Files:** `src/components/ui/Grid.tsx`, `src/components/ui/Container.tsx`
  - **Estimated scope:** S

### Checkpoint: Foundation
- [ ] `npm run build` succeeds
- [ ] Theme toggle works on all breakpoints
- [ ] UI primitives render correctly in light + dark

### Phase 2: Pages — Home

- [ ] **Task 4: Home — Hero section**
  - Marquee ticker (STATUS // FIELD ACTIVE + telemetry items)
  - Meta grid (SPEC field tag + coordinates)
  - Headline grid (8-col text + 4-col live telemetry box)
  - 4 brutalist key metric blocks
  - Action buttons (Explore Systems / Ask AI / Direct Dispatch)
  - **Acceptance criteria:** Matches light + dark design exactly; metrics animate; buttons hover with translate effect
  - **Verification:** Visual comparison against design files; light/dark toggle
  - **Dependencies:** Task 2, Task 3
  - **Files:** `src/app/page.tsx`, `src/components/sections/Hero.tsx`
  - **Estimated scope:** M

- [ ] **Task 5: Home — Pipeline section (Collect → Clean → Analyse → Decide)**
  - 4-stage DAG pipeline visualization
  - Stage cards with thick borders + offset shadows
  - Mobile stack, desktop horizontal
  - **Acceptance criteria:** 4 stages render; responsive stack on mobile; brutalist styling
  - **Dependencies:** Task 2, Task 3
  - **Files:** `src/components/sections/Pipeline.tsx`
  - **Estimated scope:** M

- [ ] **Task 6: Home — Capabilities section (4 lanes)**
  - Data Science / Web Dev & AI Automation / Community & Leadership
  - Skill bars with percentage fills
  - **Acceptance criteria:** 4 capability cards; percentage bars; responsive grid
  - **Dependencies:** Task 2, Task 3
  - **Files:** `src/components/sections/Capabilities.tsx`
  - **Estimated scope:** M

### Phase 3: Pages — Work & Health

- [ ] **Task 7: Work page — Selected work / projects grid**
  - Project cards (India Development Data Dashboard, BiharKaSwaad, SpaceX Launch)
  - Case study links, live site links, tech stacks
  - 12-col → 6-col → 4-col grid
  - **Acceptance criteria:** All V1 work projects shown; cards match brutalist design; live/case-study links work
  - **Dependencies:** Task 2, Task 3
  - **Files:** `src/app/work/page.tsx`, `src/components/projects/ProjectCard.tsx`, `src/components/projects/ProjectsGrid.tsx`
  - **Estimated scope:** M

- [ ] **Task 8: Health page — Health field impact**
  - Field telemetry / live kernel data
  - Bihar health ops metrics
  - Health system strengthening content
  - **Acceptance criteria:** Health-specific content from V1 + design variants; brutalist metric boxes
  - **Dependencies:** Task 2, Task 3
  - **Files:** `src/app/health/page.tsx`, `src/components/sections/HealthMetrics.tsx`
  - **Estimated scope:** M

### Phase 4: Pages — Ask AI (RAG, fully functional)

- [ ] **Task 9: Supabase setup for contact + RAG**
  - Supabase client config
  - Contact form submissions table
  - RAG knowledge base table (pgvector embeddings)
  - **Acceptance criteria:** Supabase client initialized; tables exist; contact form writes to DB
  - **Verification:** Supabase connection test; contact submission appears in table
  - **Dependencies:** Task 1
  - **Files:** `src/lib/supabase.ts`, `supabase/schema.sql`, `src/app/api/contact/route.ts`
  - **Estimated scope:** M

- [ ] **Task 10: Ask AI page — Chat interface**
  - Terminal-style input + output
  - Quick prompt chips
  - Streaming responses from Groq (Llama-3-70B)
  - Grounded/verified badges
  - **Acceptance criteria:** User can type question; AI streams answer; quick chips work; light/dark mode
  - **Verification:** Send test question; verify streaming response; check Supabase storage
  - **Dependencies:** Task 9, Task 2
  - **Files:** `src/app/ask/page.tsx`, `src/components/sections/AIChat.tsx`, `src/app/api/ask/route.ts`
  - **Estimated scope:** L (break into 9a/9b if needed)

- [ ] **Task 11: RAG pipeline — knowledge base + retrieval**
  - Chunk portfolio content into vector DB
  - Similarity search on user query
  - Context injection into Groq prompt
  - **Acceptance criteria:** Asking "what did you build in Bihar?" returns grounded answer from knowledge base
  - **Verification:** Test retrieval with portfolio-specific questions
  - **Dependencies:** Task 9, Task 10
  - **Files:** `src/lib/rag.ts`, `src/scripts/seed-knowledge-base.mjs`, `src/app/api/ask/route.ts`
  - **Estimated scope:** M

### Phase 5: Pages — Contact & About

- [ ] **Task 12: Contact page — Contact form**
  - Name, email, message fields
  - Supabase submission storage
  - Success/error states with brutalist styling
  - **Acceptance criteria:** Form submits to Supabase; success toast; validation errors
  - **Dependencies:** Task 9, Task 2
  - **Files:** `src/app/contact/page.tsx`, `src/components/ui/ContactForm.tsx`
  - **Estimated scope:** M

- [ ] **Task 13: About / Experience / Education sections**
  - Experience timeline (GAVB Gandhi Fellow, BiharKaSwaad, Prodigy InfoTech, Auroville)
  - Education (MCA, MA Pol Sci, BSc Math)
  - Certifications (IBM Data Science, NPTEL)
  - Identity card (location, focus, languages)
  - **Acceptance criteria:** All V1 content migrated; timeline renders; brutalist cards
  - **Dependencies:** Task 2, Task 3
  - **Files:** `src/components/sections/Experience.tsx`, `src/components/sections/Education.tsx`, `src/components/sections/Certifications.tsx`, `src/components/sections/IdentityCard.tsx`
  - **Estimated scope:** M

### Phase 6: Effects & Polish

- [ ] **Task 14: Framer Motion + scroll effects**
  - Scroll chaining (from V1 ScrollChaining component)
  - Page transitions
  - Reveal-on-scroll animations
  - **Acceptance criteria:** Smooth scroll behavior; elements animate on scroll entry
  - **Dependencies:** Task 2
  - **Files:** `src/components/motion/ScrollReveal.tsx`, `src/components/RouteScrollMode.tsx`
  - **Estimated scope:** M

- [ ] **Task 15: three.js ambient effects**
  - Subtle 3D background or geometric elements (not overwhelming brutalist base)
  - Performance-conscious (Lighthouse budget respected)
  - **Acceptance effects:** three.js loads without blocking; falls back gracefully on mobile
  - **Dependencies:** Task 2
  - **Files:** `src/components/three/AmbientBackground.tsx`
  - **Estimated scope:** M

- [ ] **Task 16: Mobile polish & cross-browser QA**
  - Verify all pages on mobile (<768px), tablet (768–1023px), desktop (1024px+)
  - Light + dark mode on every breakpoint
  - Touch targets, readable text, no horizontal overflow
  - **Acceptance criteria:** All pages usable on mobile; no overflow; theme toggle works everywhere
  - **Verification:** Device toolbar testing + physical device if available
  - **Dependencies:** Tasks 4–15
  - **Files:** All page/component files
  - **Estimated scope:** L

### Checkpoint: All Pages Complete
- [ ] All 5 pages render in light + dark + mobile
- [ ] RAG assistant answers grounded questions
- [ ] Contact form submits to Supabase

### Phase 7: Content Review & Subtraction Decision

- [ ] **Task 17: Content review — decide what to keep/subtract**
  - Compare V2 content against V1
  - Identify anything to remove (analytics pages, redundant sections)
  - User sign-off on final content set
  - **Acceptance criteria:** User approves final content; subtraction list defined
  - **Dependencies:** Task 16
  - **Estimated scope:** S

### Phase 8: Deployment

- [ ] **Task 18: Build, test, deploy to Vercel**
  - `npm run build` succeeds
  - Deploy `v2-redesign` to Vercel preview
  - User reviews preview
  - Merge `v2-redesign` → `master`
  - **Acceptance criteria:** Production deploy at vercel URL; V2 live
  - **Dependencies:** Task 17
  - **Estimated scope:** S

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Design files are HTML/Tailwind, not React components | High | Translate carefully; preserve exact colors, spacing, borders, shadows |
| RAG + Supabase setup complexity | Medium | Use existing V1 Supabase config as reference; test incrementally |
| Mobile variants for every page increase surface area | Medium | Build mobile-first; reuse grid system; QA each breakpoint |
| Brutalist thick borders/shadows may hurt Lighthouse performance | Medium | Keep three.js subtle; use CSS-only shadows; audit with Lighthouse |
| Theme toggle state persistence | Low | localStorage + `class` strategy on `<html>` |

## Open Questions

- None — all decisions recorded from user conversation

## Verification Checklist (before merge to master)

- [ ] `npm run build` succeeds with no errors
- [ ] All 5 pages render correctly in light mode + dark mode + mobile
- [ ] RAG assistant returns grounded answers
- [ ] Contact form submits to Supabase
- [ ] Lighthouse score acceptable (LCP ≤ 2500ms target)
- [ ] User has reviewed Vercel preview and signed off