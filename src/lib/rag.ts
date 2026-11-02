import 'server-only';

import { embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getSupabaseAdmin } from './supabase/server';

export interface KnowledgeChunk {
  content: string;
  source: string;
  similarity?: number;
}

export interface RagChunk {
  content: string;
  embedding: number[];
  source?: string;
}

/* -------------------------------------------------------------------------- */
/* Existing RAG layer (kept for api/chat/route.ts)                            */
/* -------------------------------------------------------------------------- */

function getEmbeddingsProvider() {
  const apiKey = process.env.EMBEDDINGS_API_KEY || process.env.OPENAI_API_KEY || '';
  const baseURL = process.env.EMBEDDINGS_BASE_URL || 'https://api.openai.com/v1';
  return createOpenAI({ apiKey, baseURL });
}

export function isEmbeddingsConfigured() {
  return Boolean(process.env.EMBEDDINGS_API_KEY || process.env.OPENAI_API_KEY);
}

async function embedQuery(query: string): Promise<number[]> {
  const provider = getEmbeddingsProvider();
  const model = process.env.EMBEDDINGS_MODEL || 'text-embedding-3-small';
  const { embedding } = await embed({
    model: provider.textEmbeddingModel(model, { dimensions: 1536 }),
    value: query,
  });
  return embedding;
}

/**
 * Retrieve the most relevant chunks about Aditya for a user question.
 * Uses pgvector similarity search when embeddings are configured,
 * otherwise falls back to full-text/ILIKE keyword search so the chat
 * still works with zero extra setup.
 */
export async function searchKnowledge(query: string, limit = 6): Promise<KnowledgeChunk[]> {
  const supabase = getSupabaseAdmin();

  if (isEmbeddingsConfigured()) {
    try {
      const queryEmbedding = await embedQuery(query);
      const { data, error } = await supabase.rpc('match_knowledge', {
        query_embedding: queryEmbedding,
        match_threshold: 0.35,
        match_count: limit,
      });
      if (!error && data && data.length) {
        return (data as KnowledgeChunk[]).map((d) => ({
          content: d.content,
          source: d.source,
          similarity: d.similarity,
        }));
      }
      if (error) console.error('[rag] vector search failed, falling back:', error.message);
    } catch (err) {
      console.error('[rag] embedding failed, falling back:', err);
    }
  }

  // Keyword fallback
  const { data, error } = await supabase
    .from('knowledge_chunks')
    .select('content, source')
    .ilike('content', `%${query}%`)
    .limit(limit);

  if (error) {
    console.error('[rag] keyword search failed:', error.message);
    return [];
  }
  return (data ?? []) as KnowledgeChunk[];
}

export function buildSystemPrompt(chunks: KnowledgeChunk[]): string {
  const context = chunks.length
    ? chunks
        .map((c, i) => `[${i + 1}] (source: ${c.source})\n${c.content}`)
        .join('\n\n')
    : 'No context available — answer generally if you can, but be clear you are not sure.';

  return `You are "Ask Aditya", an AI assistant that answers questions about Aditya Pandey —
a data analyst, full-stack developer and Gandhi Fellow at Piramal Foundation based in Muzaffarpur, Bihar, India.

Rules:
- Be warm, direct, and a little witty. Use short paragraphs and bullet lists.
- ALWAYS ground your answers in the context below. If the context does not contain the answer,
  say you don't know rather than inventing facts.
- If asked how to contact him, give his email (adityapandey.adu@gmail.com) and phone (+91 8601862114).
- If asked about hiring, mention he is immediately available and open to data analyst roles,
  full-stack opportunities, and public health data collaborations.
- Keep answers under ~180 words unless asked for detail.

=== KNOWLEDGE BASE (highest authority) ===
${context}`;
}

/* -------------------------------------------------------------------------- */
/* Task 11: RAG core — works entirely in memory, no Supabase required         */
/* -------------------------------------------------------------------------- */

/**
 * Split text into overlapping chunks of roughly `chunkSize` characters.
 * Default: ~500 chars per chunk with a 50 char overlap (10% of chunk size).
 * Tries to break at sentence/whitespace boundaries so words aren't cut mid-way.
 */
export function chunkText(text: string, chunkSize = 500): string[] {
  const overlap = Math.max(0, Math.floor(chunkSize * 0.1));
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(text.length, start + chunkSize);
    if (end < text.length) {
      const lastBreak = Math.max(
        text.lastIndexOf('. ', end - 1),
        text.lastIndexOf('.\n', end - 1),
        text.lastIndexOf('\n', end - 1),
        text.lastIndexOf(' ', end - 1),
      );
      if (lastBreak > start) end = lastBreak + 1;
    }
    const chunk = text.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    if (end === text.length) break;
    start = Math.max(start + 1, end - overlap);
  }
  return chunks;
}

const EMBEDDING_DIMS = 384;

function djb2(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return h;
}

/**
 * Deterministic, dependency-free embedding.
 * Each token is hashed (djb2) into a fixed-size vector; the vector is L2-normalized
 * so cosine similarity is meaningful. Same input always yields the same output —
 * no API keys, no network, works fully offline.
 */
function hashEmbed(text: string, dims = EMBEDDING_DIMS): number[] {
  const v = new Array(dims).fill(0);
  for (const token of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (!token) continue;
    const h = djb2(token);
    v[Math.abs(h) % dims] += h < 0 ? -1 : 1;
  }
  let norm = 0;
  for (let i = 0; i < dims; i++) norm += v[i] * v[i];
  norm = Math.sqrt(norm) || 1;
  return v.map((x) => x / norm);
}

const GROQ_BASE_URL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';

async function groqEmbed(chunks: string[]): Promise<(number[] | null)[]> {
  if (!process.env.GROQ_API_KEY) return [];
  try {
    const model = process.env.GROQ_EMBEDDING_MODEL || 'text-embedding-3-small';
    const res = await fetch(`${GROQ_BASE_URL}/embeddings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, input: chunks }),
    });
    if (!res.ok) return [];
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    return data.map((d: { embedding?: unknown }) => {
      const emb =
        Array.isArray(d.embedding)
          ? d.embedding.map((n) => Number(n)).filter((n) => Number.isFinite(n))
          : null;
      return emb;
    });
  } catch {
    return [];
  }
}

/**
 * Generate embeddings for chunks.
 * Uses Groq's embedding API when `GROQ_API_KEY` is set (and reachable),
 * otherwise falls back to deterministic hash-based embeddings — so the pipeline
 * works offline without any API keys.
 */
export async function embedChunks(chunks: string[]): Promise<number[][]> {
  if (!chunks.length) return [];
  const fromGroq = await groqEmbed(chunks);
  const validGroq = fromGroq.every(
    (e): e is number[] => Array.isArray(e) && e.length === EMBEDDING_DIMS,
  );
  if (validGroq) return fromGroq as number[][];
  return chunks.map((c) => hashEmbed(c));
}

/**
 * Cosine similarity between two vectors.
 * Returns 1 for identical vectors, 0 for orthogonal, -1 for opposite.
 * Vectors of different lengths are compared over their shared prefix.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Find the top-K most relevant knowledge-base chunks for a question.
 * Embeds the question, scores every chunk by cosine similarity, returns top-K.
 */
export async function searchKnowledgeBase(
  question: string,
  knowledgeBase: RagChunk[],
  topK = 5,
): Promise<Array<{ content: string; score: number }>> {
  if (!knowledgeBase.length) return [];
  const [queryEmbedding] = await embedChunks([question]);
  return knowledgeBase
    .filter((chunk): chunk is RagChunk => Boolean(chunk.embedding?.length))
    .map((chunk) => ({
      content: chunk.content,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * Build a prompt that instructs the LLM to answer using only the provided context.
 * Returns a single string combining system instructions + context + question;
 * callers can split it into system/user messages as their client requires.
 */
export function buildContextPrompt(question: string, contextChunks: string[]): string {
  const context = contextChunks.length
    ? contextChunks.map((chunk, i) => `[${i + 1}]\n${chunk}`).join('\n\n')
    : 'No relevant context found in the portfolio knowledge base.';

  return `You are "Ask Aditya", a grounded RAG assistant for Aditya Pandey's portfolio.

Answer using ONLY the provided context from Aditya's portfolio knowledge base — his background,
the GAVB Gandhi Fellowship (Piramal Foundation, Bihar), BiharKaSwaad e-commerce, projects,
skills, education, certifications, and public-health field work. If the answer is not supported
by the context, say you don't have that information — do not hallucinate.

Rules:
- Be warm, direct, and a little witty. Short paragraphs; bullet lists are fine.
- Ground every claim in the context and cite context items by number (e.g. [1]) when helpful.
- If asked how to contact him, give his email (adityapandey.adu@gmail.com) and phone (+91 8601862114).
- If asked about hiring, mention he is immediately available for data analyst, full-stack,
  and public-health data roles.
- Keep answers concise (~150-200 words unless asked for detail).

=== CONTEXT (highest authority) ===
${context}

=== QUESTION ===
${question}`;
}
