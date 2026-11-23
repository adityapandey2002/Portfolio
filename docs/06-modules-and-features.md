# 06 — Modules and Features

## Modules (by directory)

### `src/app` — routing & API

| File | Purpose |
|---|---|
| `layout.tsx` | Root layout: fonts, metadata, theme pre-paint script, providers, nav, ambient background |
| `page.tsx` | Home composition |
| `globals.css` | Global styles, theme tokens, effects |
| `ask/page.tsx`, `ask/AskTerminal.tsx` | Ask AI page + active terminal UI |
| `ask/AskClient.tsx` | Unused V1 chat client (targets `/api/chat`) |
| `contact/page.tsx` | Contact page |
| `health/page.tsx` | Health field impact page |
| `work/page.tsx` | Projects grid |
| `work/biharkaswaad/page.tsx` | BiharKaSwaad case study |
| `api/ask/route.ts` | RAG chat SSE endpoint |
| `api/contact/route.ts` | Contact delivery endpoint |
| `api/healthcare/route.ts` | Healthcare indicators proxy |

### `src/components/motion`

- `PageShell.tsx` — page transition wrapper (Framer Motion).
- `Reveal.tsx` — scroll-reveal animation.
- `TiltCard.tsx` — 3D tilt on hover.
- `Magnetic.tsx` — magnetic cursor-follow effect.

### `src/components/projects`

- `ProjectCard.tsx`, `ProjectGrid.tsx` — project listing.
- `WorkProjectCard.tsx`, `WorkFilterBar.tsx` (in `work/`), `WorkMobile.tsx` — work page variants.
- `BiharKaSwaadCase.tsx`, `LiveShot.tsx` — case study pieces.

### `src/components/providers`

- `Providers.tsx` — wraps ToasterProvider, PreloaderProvider, CommandPaletteProvider, PageShell.
- `ThemeProvider.tsx` — light/dark theme context.

### `src/components/realtime`

- `LiveToasts.tsx` — subscribes to Supabase Realtime broadcast `messages`/`new_message`. Not mounted.
- `VisitorsPulse.tsx` — visitor heartbeat/count. Not mounted; depends on missing `/api/presence/*`.

### `src/components/sections`

Home sections: `Hero`, `About`, `HomeJumpNav`, `Experience`, `SelectedSystems`, `Education`, `Pipeline`, `AiTerminal`, `Contact`, `Footer`, `Skills`, `Capabilities`, `CountUp`, `DistrictVisitMap`, `FieldSection`, `FieldMap`, `BeyondField`, `AiSection`, `SectionHeading`, `RadarChart`, `PipelineSection`.

- `pillars/*` — PillarsOfWork subcomponents (AmbientBg, CapabilityGrid, ChapterBlock, DomainStage, DualLayer, EnergyConduit, HeroLayer, SystemScrub, types, useStageStepper, index).
- `health/*` — health page subcomponents (constants, DiagnosticsPanel, FieldKmMeter, FieldMindSection, Gauge, index, VitalsGrid).

### `src/components/three`

- `AmbientBackground.tsx` — ambient particle background mounted in layout.
- `DataSphere.tsx`, `HeroScene.tsx` — home hero 3D.
- `shaders.ts` — GLSL shaders.

### `src/components/ui`

Primitives: `Button`, `Card`, `Chip`, `Input`, `Container`, `Grid`, `Section`. Navigation: `Nav`, `DesktopNav`, `MobileHeader`, `MobileTabBar`. Overlays: `CommandPalette`, `Terminal`, `FieldTour`, `Preloader`, `Cursor`, `ThemeToggle`, `MagnifyDock`, `ScrollProgress`, `AiAssistant`.

### `src/hooks`

- `useTheme.tsx` — theme context hook.
- `useToaster.tsx` — toast notifications.
- `useEasterEggs.ts` — typed-sequence easter eggs.
- `useLiveStatus.ts` — live status polling.
- `useScroll.ts` — scroll utilities.

### `src/lib`

- `constants.ts` — centralized magic numbers.
- `env.ts` — `isSet`, `isHttpUrl`.
- `glideEngine.ts` — scroll/glide engine.
- `rag.ts` — RAG core (chunking, embeddings, retrieval, prompt).
- `supabase.ts` — V1-style clients.
- `utils.ts` — `cn` (clsx + tailwind-merge).
- `data/*` — content (profile, experience, projects, skills, pillars).
- `supabase/*` — V2-style clients.

### `src/scripts`

- `seed-kb.mjs` — seeds `knowledge_chunks` (pgvector).
- `seed-knowledge-base.mjs` — emits JSON for `knowledge_base`.

## Features

### Core features

- Landing page with a split-text hero, live-kernel telemetry panel, three impact metric blocks, and a sticky section jump strip (`/`).
- Full project showcase with filters and dedicated case-study pages (`/work`, `/work/biharkaswaad`).
- RAG chat over Aditya's resume/projects (`/ask`), streamed over SSE.
- Contact form → email via Web3Forms from the browser, with Supabase storage as the fallback (`/contact`).
- Health field impact page (`/health`).
- "Vector RAG Terminal" home section with quick-query deep links into `/ask`.
- Command palette (Ctrl/Cmd+K) with navigation and external links.

### User features

- Light/dark theme toggle (button in `DesktopNav` / `MobileHeader`; persisted in `localStorage.theme`).
- Command palette (Ctrl/Cmd+K) — mounted via `CommandPaletteProvider` in `src/components/providers/Providers.tsx`.
- Boot/preloader screen on first paint (`PreloaderProvider`, ~3.6s, once per session, skipped for reduced motion).
- Per-route fade-in transition (`PageShell`).
- "Vector RAG Terminal" section on the home page with quick-query deep links into `/ask`.
- Sticky home section jump strip (`HomeJumpNav`).
- Mobile bottom tab bar + mobile header.
- 3D ambient background (wireframe icosahedron, `lg` and up only) mounted in the root layout.

> **Not verified as active:** the `T` theme hotkey, custom cursor ring, standalone terminal UI, 5-step field tour, and easter eggs are implemented in source but the components/hooks that provide them are **not mounted** in the current tree. See "Not mounted" below.

### Not mounted (implemented but disconnected)

The following components exist and compile, but nothing in `src/app/**` imports them, so they do not render:

- `src/components/realtime/VisitorsPulse.tsx`, `src/components/realtime/LiveToasts.tsx`
- `src/components/ui/Cursor.tsx`, `Terminal.tsx`, `Nav.tsx`, `ScrollProgress.tsx`, `ThemeToggle.tsx`, `MagnifyDock.tsx`, `AiAssistant.tsx`
- `src/components/ui/FieldTour.tsx` (`FieldTourProvider` — `useFieldTour` is consumed by `FieldSection`, which is itself only reachable from the unmounted `HealthDashboard`)
- `src/components/projects/ProjectCard.tsx`, `ProjectGrid.tsx`, `WorkProjectCard.tsx`
- `src/components/sections/AiSection.tsx`, `BeyondField.tsx`, `Capabilities.tsx`, `HealthDashboard.tsx`, `HealthMetrics.tsx`, `HealthSystemStrengthening.tsx`, `PipelineSection.tsx`, `RadarChart.tsx`, `Skills.tsx`
- `src/components/sections/health/*` and `src/components/sections/pillars/*` (only reachable via `HealthDashboard` → `PillarsOfWork`)
- `src/components/three/HeroScene.tsx` (and therefore `DataSphere.tsx` / `shaders.ts`)
- `src/components/RouteScrollMode.tsx`, `src/components/ScrollChaining.tsx`
- `src/components/motion/Magnetic.tsx` (`Reveal` is used by `BiharKaSwaadCase`; `TiltCard` is used only by the unmounted `ProjectCard`)
- `src/hooks/useEasterEggs.ts`, `src/hooks/useLiveStatus.ts`, `src/hooks/useScroll.ts`, `src/hooks/useTheme.tsx`

Consequences worth noting:

- The **3D data sphere / GLSL shaders are not rendered anywhere** — only the simpler `AmbientBackground` icosahedron is mounted.
- `src/hooks/useTheme.tsx` (the `data-theme` "light / cyberpunk" area-locked variant) is **not** the active theme system. The active one is `src/components/providers/ThemeProvider.tsx`, which toggles the `dark` class on `<html>`. `globals.css` still defines four `data-theme` palettes (`light`, `dark`, `sunset`, `cyberpunk`), but nothing sets `data-theme` at runtime, so **only light and dark are reachable**.
- `useLiveStatus` fetches `/api/status`, which does not exist.
- `HealthcarePanel` (the only consumer of `/api/healthcare`) is reachable only from the unmounted `HealthDashboard`, so the live healthcare indicators are not currently shown on any route.

### Administrative features

None (no admin panel in this repo).

### Technical features

- Static generation for all pages.
- Serverless API routes (Node.js runtime).
- Graceful degradation when env vars missing.
- Security headers (CSP-lite: X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy).
- Image optimization formats (avif, webp).
- Package import optimization.

### Security features

See `docs/15-security-documentation.md`.

## Known incomplete / not wired

- `VisitorsPulse`, `LiveToasts` defined but not mounted; presence API missing.
- `AskClient.tsx` targets non-existent `/api/chat`.
- `/api/messages` referenced in `LiveToasts` does not exist (actual route is `/api/contact`).
- `/api/status` referenced by `useLiveStatus` does not exist.
- Four `data-theme` palettes defined in CSS, but only light/dark are reachable at runtime.
- Two Supabase client modules and two Next.js config files.
- Two DB schemas (`0001_init.sql` vs `schema.sql`) with different table names.
- Two seed scripts targeting different tables.
- Two RAG implementations (`searchKnowledge` vs `searchKnowledgeBase`).
- `next.config.js` vs `next.config.mjs` duplicate.
- `src/lib/supabase.ts` vs `src/lib/supabase/*.ts` duplicate.
- Knowledge base seed not run → `knowledge_base`/`knowledge_chunks` may be empty; chat falls back to canned answers.
- Large block of component code (`health/*`, `pillars/*`, `HealthDashboard`, `HeroScene`, `ProjectCard`/`ProjectGrid`, `Cursor`, `Terminal`, `FieldTour`, `useEasterEggs`) exists but is not mounted — it is dead code from earlier revisions of the site.
- `public/health/*.jpg` assets exist but are not referenced by any component.
- Desktop layout renders at `zoom: 0.8` (commit `0f0cb4a`) with `--zoom-inv: 1.25` compensating for full-viewport bands.
