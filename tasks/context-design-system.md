# Context Pointer: V2 Design System

## Source of Truth
- Design files: `C:\Users\ADITYA\Downloads\portfolio/design/stitch_interactive_portfolio_ui_redesign/stitch_interactive_portfolio_ui_redesign/`
- Key DESIGN.md files: `bauhaus/DESIGN.md` (light), `obsidian_bauhaus_brutalism/DESIGN.md` (dark)
- HTML variants: `aditya_pandey_bauhaus_neo_brutalist_portfolio_1/`, `interactive_ai_aditya_pandey_clean_bauhaus_light_1/`, etc.

## Stack
- Next.js 15.3 (App Router), React 19, TypeScript, Tailwind 3.4, Supabase, AI SDK (Groq), Framer Motion, three.js
- Branch: `v2-redesign` (from GitHub master)

## Design Tokens (Light Mode)
- Primary: `#1a1a1a` (near-black)
- Surface/Background: `#f5f0e8` (warm off-white)
- Accent Yellow: `#ffcc00`, Accent Red: `#e63b2e`, Accent Blue: `#0055ff`
- Typography: Space Grotesk (headlines), Inter (body), JetBrains Mono (labels)

## Design Tokens (Dark Mode - Obsidian Bauhaus Brutalism)
- Surface: `#131315`, Surface L1: `#1a1a1e`, Surface L2: `#222226`
- Primary Yellow: `#facc15`, Vermilion: `#f97316`, Electric Blue: `#3b82f6`
- Text: `#e5e1e4` primary, `#a1a1aa` secondary, `#71717a` tertiary

## Component Rules
- 0px border-radius on ALL elements
- Thick solid borders 2–4px (`#1a1a1a` light / `#ffffff` dark active)
- Hard offset shadows: `4px 4px 0 #000000` standard, `6px 6px 0 #000000` high emphasis
- Active state: `translate(4px, 4px)` + shadow collapse to none
- Uppercase, tracking-wider text for labels/headlines

## Layout
- 12-col desktop → 6-col tablet → 4-col mobile
- Desktop: margin 2rem, gutter 1.5rem
- Mobile: margin 1rem, gutter 1rem

## User Decisions (Recorded)
- Light + dark toggle on EVERY page, mobile variants for each
- Pages: Home, Work, Health, Ask AI, Contact — all redesigned
- /ask = fully functional RAG with Supabase (not static)
- Production-grade effects (brutalist base + three.js + motion)
- Fill content from V2 designs first; subtract at the end

## Files Already Created
- `tasks/plan.md` — full 18-task plan
- `tasks/todo.md` — task checklist
