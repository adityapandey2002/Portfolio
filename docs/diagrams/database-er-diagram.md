# Database ER Diagram

## V2 schema (authoritative for current app)

```mermaid
erDiagram
  contact_submissions {
    uuid id PK
    text name
    text email
    text phone
    text category
    text message
    timestamp created_at
    boolean read
  }
  knowledge_base {
    uuid id PK
    text content
    vector embedding
    text source
    jsonb metadata
    timestamp created_at
  }
```

No foreign keys between tables.

## V1 (legacy) tables

```mermaid
erDiagram
  messages {
    uuid id PK
    text name
    text email
    text subject
    text message
    timestamptz created_at
  }
  presence {
    text visitor_key PK
    text user_agent
    timestamptz first_seen
    timestamptz last_seen
  }
  knowledge_chunks {
    bigint id PK
    text content
    text source
    vector embedding
    timestamptz created_at
  }
```
```<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Created file successfully: docs/diagrams/database-er-diagram.md