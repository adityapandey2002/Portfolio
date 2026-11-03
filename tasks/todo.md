# V2 Portfolio Redesign — Task List

## Phase 1: Foundation & Tooling
- [x] Task 1: Scaffold V2 branch & design system (tailwind config, fonts, theme provider, base layout) — DONE
- [x] Task 2: Reusable brutalist UI primitives (Button, Card, Input, Chip, Section) — DONE
- [x] Task 3: Responsive grid system (12-col → 6-col → 4-col) — DONE

## Checkpoint: Foundation
- [ ] `npm run build` succeeds
- [ ] Theme toggle works on all breakpoints
- [ ] UI primitives render correctly in light + dark

## Phase 2: Pages — Home
- [x] Task 4: Home — Hero section — DONE
- [x] Task 5: Home — Pipeline section — DONE
- [x] Task 6: Home — Capabilities section — DONE

## Phase 3: Pages — Work & Health
- [ ] Task 7: Work page — Selected work / projects grid
- [ ] Task 8: Health page — Health field impact

## Phase 4: Pages — Ask AI (RAG, fully functional)
- [x] Task 9: Supabase setup for contact + RAG — DONE
- [x] Task 10: Ask AI page — chat interface — DONE
- [x] Task 11: RAG pipeline — knowledge base + retrieval + Groq — DONE
- [ ] Task 10: Ask AI page — Chat interface (terminal input, quick chips, streaming)
- [ ] Task 11: RAG pipeline — knowledge base + retrieval + Groq

## Phase 5: Pages — Contact & About
- [x] Task 12: Contact page redesign — DONE
- [x] Task 13: About/Experience/Education/BeyondField/AiSection/Contact/Footer/Skills redesign — DONE

## Phase 6: Effects & Polish
- [x] Task 14: Framer Motion + scroll effects — DONE (ScrollChaining, ScrollProgress integrated in layout)
- [x] Task 15: three.js ambient effects — DONE (AmbientBackground in layout)
- [ ] Task 16: Mobile polish & cross-browser QA — pending

## Checkpoint: All Pages Complete
- [ ] All 5 pages render in light + dark + mobile
- [ ] RAG assistant answers grounded questions
- [ ] Contact form submits to Supabase

## Phase 7: Content Review & Subtraction Decision
- [ ] Task 17: Content review — decide what to keep/subtract (user sign-off)

## Phase 8: Deployment
- [ ] Task 18: Build, test, deploy to Vercel (preview → merge to master)
