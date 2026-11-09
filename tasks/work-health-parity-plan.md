# Work & Health — Exact Design Parity Plan

Source of truth:
- Work light: `.../WORK/work_systems_aditya_pandey_bauhaus_redesign/code.html`
- Work dark/live previews: `.../WORK/work_systems_aditya_pandey_flagship_architecture_live_previews/code.html`
- Health light: `.../health/health_field_impact_aditya_pandey_bauhaus_neo_brutalist/code.html`
- Health dark: `.../health/health_field_impact_aditya_pandey_bauhaus_dark_mode/code.html`

## Audit findings

### Global
- [x] V1 desktop `html { zoom: 0.8 }` hack removed — it shrank `max-w-7xl`
      content to 1024px at 1440 and broke design-width parity.
- [ ] Dark tokens are not the dark-design palette: borders should be
      `#39393b` (not white), shadows `#0e0e10` (not white), accents
      `#facc15 / #ff6b4a / #60a5fa` (not `#ffcc00 / #e63b2e / #0055ff`).
- [ ] Shared footer does not match the design footer (telemetry strip +
      System Registries + Coordinates & Ops).
- [ ] Desktop nav height (80px) vs design (96px) — sticky offsets must use
      the real header height.

### Work page
- [ ] Section order is wrong: current Bihar → Matru → Sadar → India.
      Design: Bihar → Sadar → Matru → India.
- [ ] Matru PWA simulator + browser preview are accidentally rendered after
      the India section (DOM nesting bug).
- [ ] Matru is missing the design's dual-pane structure, 8-danger-sign
      matrix, client/backend engine specs, simulator buttons, and
      zero-knowledge security callout.
- [ ] All three screenshots were lazy/placeholder/iframe-blocked:
      `biharkaswaad.in` sends `X-Frame-Options: SAMEORIGIN` so the iframe can
      never render. Use local captures. Matru has no live URL — use the
      design's PWA capture until the user supplies one.
- [ ] Filter bar is missing the sixth pill (`HARDWARE & CAPSTONE (03)`) and
      the pills do not filter anything.
- [ ] CTA is generic ("Engage Fellowship") instead of the design's
      "SOURCE CODE & AUDIT PRIVILEGES" banner with two buttons.
- [ ] Section padding is `py-10 lg:py-12`; design is `py-12 lg:py-16`.
- [ ] Mobile: verify 1-up stacking, no horizontal overflow, sticky filter
      offset clears the mobile header.

### Health page
- [ ] Metric ledger has 4 cards; design has 5 (add the analog
      gauge/odometer card if missing).
- [ ] Design section "SECTION 03: INTERACTIVE FIELD FOOTPRINT & ROUTE MAP"
      is absent.
- [ ] Verify dark palette/borders/shadows against the dark design.

## Implementation order

1. Global: remove zoom (done), align dark tokens, footer, nav height.
2. Work: rewrite sections in design order with exact wording + dark classes.
3. Work: restore images (eager loading, local assets) and Matru preview.
4. Work: functional filter bar + design CTA.
5. Health: missing metric/gauge cards + route map section.
6. QA: Playwright screenshots at 1440 and 390, light + dark; fix overflow
   and contrast; `npm run build`; commit/push each slice.
