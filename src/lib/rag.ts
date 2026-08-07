import 'server-only';

import { embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getSupabaseAdmin } from './supabase/server';

export interface KnowledgeChunk {
  content: string;
  source: string;
  similarity?: number;
}

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
