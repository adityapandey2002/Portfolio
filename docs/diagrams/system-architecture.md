# System Architecture Diagram

```mermaid
flowchart LR
  Browser[Browser / Client] -->|HTTP| Next[Next.js App Router]
  Next --> Pages[Pages: /, /work, /ask, /contact, /health]
  Next --> API[API: /api/ask, /api/contact, /api/healthcare]
  API -->|service role| Supabase[(Supabase Postgres + pgvector)]
  API -->|HTTPS| Groq[Groq LLM API]
  API -->|HTTPS| Web3Forms[Web3Forms]
  API -->|HTTPS| IndiaDash[india-dashboard-delta.vercel.app]
  Browser -.->|anon (defined, unused)| Realtime[Supabase Realtime]
```
```<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Created file successfully: docs/diagrams/system-architecture.md