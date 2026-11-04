# Implementation Plan: Portfolio V2 — Exact Design Fidelity

## Overview
Rebuild all portfolio pages to strictly match the design files in `docs/design/` with:
- Light + dark theme toggle on every page (no layout shift, persistent)
- Mobile-first responsive layouts with tailored mobile variants
- WCAG contrast compliance
- Bauhaus Neo-Brutalist visual fidelity (thick borders, hard shadows, 0px radius, uppercase tracking)

## Context Hierarchy (from context-engineering skill)
- **Level 1 Rules:** `CONSTRAINTS.md` + design tokens
- **Level 2 Spec:** Design files in `docs/design/` (bauhaus_neo_brutalist_portfolio_1, mobile variants)
- **Level 3 Source:** Existing V1 components as reference only (not to be copied blindly)
- **Level 4 Errors:** Build failures, contrast failures, contrast ratio < 4.5:1

## Recorded Context from Design Files

### Light Mode Design Tokens (from aditya_pandey_bauhaus_neo_brutalist_portfolio_1/code.html)
- `primary`: `#1a1a1a` (near-black)
- `surface`: `#f5f0e8` (warm off-white background)
- `surface-container-lowest`: `#ffffff`
- `surface-container-low`: `#f2ede5`
- `surface-container`: `#eee9e0`
- `surface-container-high`: `#e8e3da`
- `surface-container-highest`: `#e2ddd4`
- `primary-container`: `#ffcc00` (accent yellow)
- `on-primary-container`: `#1a1a1a`
- `secondary`: `#e63b2e` (accent red)
- `tertiary`: `#0055ff` (accent blue)
- `on-surface`: `#1a1a1a`
- `on-surface-variant`: `#4a4a4a`
- `outline`: `#1a1a1a`
- `borderRadius.DEFAULT`: `0px` (zero radius — brutalist contract)

### Component Rules (Non-negotiable)
- `rounded-0` on ALL elements (0px border-radius)
- Thick solid borders: `border-2` (2px) minimum, `border-3` (3px), `border-4` (4px)
- Hard offset shadows: `shadow-[4px_4px_0px_#1a1a1a]` (no blur)
- Active state: `translate-x-0.5 translate-y-0.5` + shadow collapse to `2px_2px_0`
- Uppercase, tracking-wider text for labels/headlines
- Space Grotesk (headlines/display), Inter (body), JetBrains Mono (labels/metrics)

### Layout Rules
- Mobile-first: `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-4` / `lg:grid-cols-12`
- Desktop gutters: `px-8` / `lg:px-12`; Mobile: `px-4` / `sm:px-6`
- Section spacing: `py-10 lg:py-16`

## Task List (Small, Vertical Slices)

### Phase 1: Design System Foundation
- [ ] Task 1: Design tokens file (colors, typography, spacing, borders, shadows)
- [ ] Task 2: Theme provider (light/dark, localStorage, no layout shift)
- [ ] Task 3: Brutalist UI primitives (Button, Card, Input, Chip, Section, SectionHeading)
- [ ] Task 4: Layout shell (header with theme toggle, mobile drawer)

### Phase 2: Home Page Sections (in design order)
- [ ] Task 5: Top Marquee Ticker
- [ ] Task 6: Hero Section (meta grid, headline grid, telemetry box, 4 metric blocks)
- [ ] Task 7: Profile Dossier / About Section
- [ ] Task 8: Experience Section (health banner + experience cards)
- [ ] Task 9: Selected Systems Section (3 flagship cards)
- [ ] Task 10: Education Section (degrees + accreditations)
- [ ] Task 11: Pipeline Section (4-stage + competency bars)
- [ ] Task 12: AI Terminal Section
- [ ] Task 13: Contact Section (dispatch form + coordinates + manifesto)
- [ ] Task 14: Footer

### Phase 3: Other Pages (matching home design system)
- [ ] Task 15: Work page redesign
- [ ] Task 16: Health page redesign
- [ ] Task 17: Ask AI page redesign

### Phase 4: Quality Gates
- [ ] Task 18: Contrast audit (WCAG 4.5:1 check)
- [ ] Task 19: Mobile layout audit (all breakpoints)
- [ ] Task 20: Build verification + commit/push

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Design files use Tailwind CDK classes not in our config | High | Add all design token colors to tailwind.config.ts |
| Mobile variants differ significantly from desktop | High | Build mobile-first, test at 375px, 768px, 1024px |
| Contrast ratios below 4.5:1 | Medium | Audit every text/bg combination |
| Theme toggle causes layout shift | Medium | Use `class` strategy + localStorage, apply on `<html>` |

## Open Questions
- None — all decisions from design files