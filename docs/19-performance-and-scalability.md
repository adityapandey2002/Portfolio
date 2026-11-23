# 19 — Performance and Scalability

## What's in place

- **Static generation** for all 6 pages (no SSR per request).
- **Package import optimization** (`optimizePackageImports` for lucide-react, framer-motion, @react-three/drei).
- **Transpilation** of R3F/drei/three via `transpilePackages`.
- **Image formats** avif + webp.
- **Lazy/conditional**: 3D ambient background mounted in layout; heavy scenes on home.
- **Reduced-motion support** mentioned in README (not verified in detail).
- **Constants** for DPR max (1.5), sphere subdivisions (16) to limit GPU load.

## Potential bottlenecks

- Home page loads Three.js + R3F bundle (~large). First Load JS 123 kB for `/`.
- `/work/biharkaswaad` First Load JS 158 kB.
- No code-splitting beyond Next.js defaults; no dynamic imports observed for heavy components.
- `/api/healthcare` makes 8 parallel upstream calls with 8s timeout each — worst case ~8s.
- `/api/ask` loads entire `knowledge_base` table into memory per request (no caching, no pagination).
- No caching layer (Redis) or CDN caching for API routes (all `force-dynamic`).
- Supabase client instantiated per request in some paths.

## Scalability notes

- Serverless functions on Vercel scale horizontally by default.
- Supabase connection limits apply; admin client is singleton in `src/lib/supabase/server.ts` but `src/lib/supabase.ts` creates per call.
- No database pooling config in repo.
- RAG retrieval is O(n) over all chunks per request.

## Recommendations (not applied)

- Add dynamic imports for Three.js scenes.
- Cache knowledge base in memory/edge with TTL.
- Add pagination/limit to KB load.
- Add caching headers where appropriate (healthcare could cache briefly).
- Measure Core Web Vitals (not done in repo).
