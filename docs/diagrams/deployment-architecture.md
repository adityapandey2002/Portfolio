# Deployment Architecture

```mermaid
flowchart LR
  User[User Browser] --> Vercel[Vercel Edge/Serverless]
  Vercel --> Next[Next.js App]
  Next --> Supabase[(Supabase)]
  Next --> Groq[Groq API]
  Next --> Web3Forms[Web3Forms]
  Next --> IndiaDash[india-dashboard-delta.vercel.app]
```
```<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Now AI_AGENT_CONTEXT.md.<|end|><|start|>start to=write<|channel|>analysis <|constrain|>xml<|message|><rfl:parameter name="path">
C:\Users\ADITYA\Downloads\portfolio\docs\AI_AGENT_CONTEXT.md