---
name: Obsidian Bauhaus Brutalism
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#d1c6ab'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#303032'
  outline: '#9a9078'
  outline-variant: '#4d4632'
  surface-tint: '#eec200'
  primary: '#ffecb9'
  on-primary: '#3c2f00'
  primary-container: '#facc15'
  on-primary-container: '#6c5700'
  inverse-primary: '#735c00'
  secondary: '#ffb690'
  on-secondary: '#552100'
  secondary-container: '#ec6a06'
  on-secondary-container: '#4a1c00'
  tertiary: '#e8edff'
  on-tertiary: '#002e6a'
  tertiary-container: '#bed1ff'
  on-tertiary-container: '#0055b9'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe083'
  primary-fixed-dim: '#eec200'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.04em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.06em
spacing:
  gutter: 1.5rem
  margin: 2rem
  gutter-mobile: 1rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system synthesizes the foundational geometric rigor of the Bauhaus school with the tactile, high-voltage energy of Neo-Brutalism, engineered entirely within a dark-mode paradigm. It abandons simulated physical lighting and atmospheric blurs in favor of raw structural clarity, stark contrast, and visible functional scaffolding.

The visual tone is severe, deliberate, and engineered. It communicates technical authority, uncompromising utility, and avant-garde confidence. The interface treats screen space as an architectural canvas—constructed from hard-edged structural blocks, uncompromising grid partitions, and aggressive typographic scale. Surfaces are dark charcoal and obsidian, energized by concentrated strikes of primary Bauhaus pigments: cadmium yellow, vermilion flame, and electric cobalt blue.

## Colors

The palette establishes an obsidian core punctuated by saturated chromatic signals:

- **Foundation (Neutrals):** 
  - Canvas Base: `#121214` (Deep Obsidian)
  - Surface Level 1: `#1a1a1e` (Structural Charcoal)
  - Surface Level 2: `#222226` (Elevated Panel Charcoal)
  - Structural Outlines: `#2e2e34` (Base Border) and `#ffffff` (High-Contrast Active Border)
  - Typography Base: `#ffffff` (Primary High-Contrast), `#a1a1aa` (Secondary Metadata Muted), `#71717a` (Tertiary Functional)

- **Accents (Bauhaus Primaries):**
  - **Bauhaus Primary (`#facc15`):** Signal Yellow. Reserved for primary calls-to-action, active selection frames, and high-priority states. Pairs strictly with black text (`#121214`) when applied as fill.
  - **Bauhaus Secondary (`#f97316`):** Vermilion. Deployed for critical interactive states, destructive or imperative actions, and secondary focal highlights.
  - **Bauhaus Tertiary (`#3b82f6`):** Electric Blue. Deployed for navigation indicators, technical readouts, operational tags, and interactive links.

Do not use gradients, translucent washes, or ambient color bleeds. Colors are applied flat, opaque, and boundary-contained.

## Typography

Typography functions as both functional structure and decorative mass:

- **Display & Headlines (Space Grotesk):** Geometric, tense, and heavy. Headlines maintain tight leading and deliberate negative letter-spacing to emphasize brutalist mass. Set in uppercase or sentence case; avoid italicizing.
- **Body Text (Space Grotesk):** Neutral and legible, providing balance against dense borders and intense color blocks.
- **Labels & System Readouts (JetBrains Mono):** Monospaced, high-precision technical text. Used strictly for badges, table figures, UI labels, breadcrumbs, parameters, and timecodes. Labels must feature increased tracking and consistent uppercase formatting where visual hierarchy demands stark division.

## Layout & Spacing

The layout philosophy follows a rigid, visible modular grid inspired by constructivist and Bauhaus posters. 

- **Grid Structure:** A 12-column desktop grid collapsing to 6 columns on tablet and 4 columns on mobile. Elements sit within visible structural cells. Containers should share borders where possible, generating a tiled architectural facade rather than floating islands.
- **Responsive Rules:**
  - **Desktop (1024px+):** Outer margin of `2rem` (`margin`), column gutters of `1.5rem` (`gutter`).
  - **Tablet (768px - 1023px):** Outer margin of `1.5rem`, column gutters of `1rem`. Multi-column layouts step down symmetrically.
  - **Mobile (< 768px):** Outer margin of `1rem` (`margin-mobile`), column gutters of `1rem` (`gutter-mobile`). Visual borders remain intact; elements stack vertically with zero radius and full width.
- **Spacing Scale:** Layout and component spacing values are locked strictly to an 8pt-derived rhythm (`0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2.5rem`). Whitespace is intentional, planar, and framed by structural line work.

## Elevation & Depth

This system rejects soft atmospheric drops, radial blurs, and pseudo-skeuomorphic diffusion. Depth is binary, planar, and hard-edged:

- **Hard-Edged Neo-Brutalist Offsets:** Elevated components achieve separation through crisp, zero-blur solid offset shadows. 
  - Standard Shadow: `4px 4px 0px 0px #000000`
  - High-Emphasis / Active Shadow: `6px 6px 0px 0px #facc15` or `6px 6px 0px 0px #000000`
  - Micro Elevation (Chips/Buttons): `2px 2px 0px 0px #000000`
- **Surface Layering:** Surfaces do not dissolve; they overlap. A raised card sits on `#1a1a1e` or `#222226` with a hard `1px` or `2px` solid border (`#ffffff` or `#2e2e34`), casting a hard offset black block into the backdrop.
- **Tactile Interaction Model:** On hover, elevated items increase their hard offset displacement (translating `-2px, -2px`). On click/active, elements translate directly into their shadow coordinates (`translate(4px, 4px)` with shadow reset to `0px 0px 0px 0px`), creating an unequivocal mechanical click-feel.

## Shapes

The geometric grammar is absolute zero roundedness (`0px` border-radius). 

Curvature is entirely absent from structural and interactive elements. Buttons, inputs, modals, tags, tooltips, and badges are absolute sharp-cornered polygons. The geometric spirit relies purely on squares, rectangles, right angles, and sharp orthogonal dividers. This reinforces the raw manufacturing and drafting ethos of the Bauhaus aesthetic.

## Components

- **Buttons:**
  - *Primary:* Background `#facc15`, text `#121214` (Space Grotesk, Bold), border `2px solid #ffffff`, hard shadow `4px 4px 0px 0px #000000`. On active: `transform: translate(4px, 4px)`, shadow collapses to none.
  - *Secondary:* Background `#1a1a1e`, text `#ffffff`, border `2px solid #ffffff`, hard shadow `4px 4px 0px 0px #000000`.
  - *Destructive / Vermilion:* Background `#f97316`, text `#ffffff`, border `2px solid #ffffff`, hard shadow `4px 4px 0px 0px #000000`.
  - *Ghost / Structural:* Transparent fill, text `#ffffff`, border `1px solid #71717a`, no shadow. On hover: border `#facc15`, text `#facc15`.

- **Cards & Panels:**
  - Constructed using `#1a1a1e` or `#222226` background, enclosed in a `2px solid #2e2e34` (or `2px solid #ffffff` for focused modules). Hard shadow `4px 4px 0px 0px #000000`.
  - Headers feature an edge-to-edge dividing rule (`1px solid #2e2e34`) separating title and body, frequently accented with a colored status box or tag.

- **Input Fields:**
  - Background `#121214`, border `2px solid #2e2e34`, text `#ffffff`, placeholder text `#71717a`, padding `0.75rem 1rem`.
  - Focus state: Border color changes to `#facc15` with an instant, non-blurred ring/shadow: `3px 3px 0px 0px #facc15`.
  - Labels: JetBrains Mono uppercase, set directly above the field with `0.5rem` spacing.

- **Chips & Status Badges:**
  - JetBrains Mono uppercase label, zero corner radius, padding `0.25rem 0.5rem`.
  - Default: Border `1px solid #71717a`, background `#121214`, text `#a1a1aa`.
  - Operational/Alert: Border `1px solid #facc15`, background `#1a1a1e`, text `#facc15`.
  - Blue Technical Tag: Border `1px solid #3b82f6`, background `#121214`, text `#3b82f6`.

- **Checkboxes & Radios:**
  - Checkboxes: Strict `18x18px` squares, border `2px solid #ffffff`, background `#121214`. Checked state: Background `#facc15` with a stark black block or geometric `X` tick.
  - Radios: Designed as diamond checkmarks (`rotate-45` squares) or sharp square toggles rather than circles, keeping the anti-round aesthetic absolute.

- **Data Grids & Lists:**
  - High-density rows separated by crisp horizontal `1px solid #2e2e34` rules.
  - Alternating or interactive row states shift to `#222226` on hover with a `3px` left edge border in `#facc15` or `#3b82f6`.
  - Metric values, numerical data, and timestamps strictly utilize JetBrains Mono with tabular figures enabled.