import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

import { buildContextPrompt, searchKnowledgeBase } from '@/lib/rag';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface AskBody {
  question?: string;
}

const TOP_K = 5;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

/** Supabase vector columns arrive as strings in the JS client; coerce to number[]. */
function normalizeEmbedding(value: unknown): number[] | null {
  if (Array.isArray(value)) {
    return value.map(Number).filter((n) => Number.isFinite(n));
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(Number).filter((n) => Number.isFinite(n));
      }
    } catch {
      // not a JSON embedding — fall through
    }
  }
  return null;
}

/** Streams a canned grounded answer as SSE so the UI works end-to-end
 *  without a Groq key or a configured knowledge base. */
function fallbackStream(text: string): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      (async () => {
        for (const word of text.split(/\s+/)) {
          controller.enqueue(enc.encode(`data: ${word} \n\n`));
          await new Promise((r) => setTimeout(r, 18));
        }
        controller.enqueue(enc.encode('data: [DONE]\n\n'));
        controller.close();
      })();
    },
  });
}

const CANNED_ANSWER =
  '1. Ask Aditya — RAG Knowledge Base\n\n' +
  'The knowledge base covers Aditya Pandey\'s background, the GAVB Gandhi Fellowship with ' +
  'Piramal Foundation in Bihar (700+ ASHA workers trained on M-ASHA, 185-hour Clinical Skills ' +
  'Refresher, ODK/OHK Central field data), BiharKaSwaad e-commerce (biharkaswaad.in), projects ' +
  'such as the India Development Data Dashboard and VHSND Field Data Quality, skills, education, ' +
  'certifications, and public-health field work.\n\n' +
  '2. Try asking\n\n' +
  'Ask "what did Aditya achieve in the Gandhi Fellowship?" or "what is BiharKaSwaad?" to see a ' +
  'grounded, streamed answer.\n\n' +
  '3. Configure the pipeline\n\n' +
  'Set GROQ_API_KEY in .env, seed the knowledge base with `npm run seed-knowledge-base`, and ' +
  'insert the chunks into Supabase (knowledge_base table). Then /api/ask returns live, grounded ' +
  'answers streamed from Llama-3-70B via Groq.';

export async function POST(req: Request) {
  let body: AskBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid-body' }, { status: 400 });
  }

  const question = body.question?.trim();
  if (!question) {
    return NextResponse.json({ ok: false, reason: 'missing-fields' }, { status: 400 });
  }

  const groqKey = process.env.GROQ_API_KEY;

  // No Groq key or no Supabase knowledge base configured: stream a canned grounded answer
  // so the UI works end-to-end while the pipeline is being set up.
  if (!groqKey || !isSupabaseConfigured()) {
    return new Response(fallbackStream(CANNED_ANSWER), {
      status: 200,
      headers: {
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-cache, no-transform',
        connection: 'keep-alive',
        'x-ai-gateway': 'fallback',
      },
    });
  }

  // Load the knowledge base from Supabase (content + precomputed embeddings).
  let kb: Array<{ content: string; embedding: number[] }> = [];
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from('knowledge_base').select('content, embedding');
    if (error) throw new Error(error.message);
    kb = (data ?? [])
      .map((row) => ({
        content: String(row.content ?? ''),
        embedding: normalizeEmbedding((row as Record<string, unknown>).embedding),
      }))
      .filter(
        (row): row is { content: string; embedding: number[] } =>
          Boolean(row.content) && Boolean(row.embedding),
      );
  } catch (err) {
    console.error('[ask] knowledge base unavailable, answering without context:', err);
    // kb stays empty — the prompt tells the model no context was found.
  }

  // RAG retrieval: embed the question, search the knowledge base, top-K chunks.
  const contextChunks = await searchKnowledgeBase(question, kb, TOP_K);

  // Build the grounded system+user prompt.
  const prompt = buildContextPrompt(question, contextChunks.map((c) => c.content));

  try {
    const groq = createOpenAI({
      apiKey: groqKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
    const model = groq(GROQ_MODEL);

    const result = streamText({
      model,
      system: prompt,
      messages: [{ role: 'user', content: question }],
      temperature: 0.4,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (err) =>
        err instanceof Error ? err.message : String(err),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(`AI model call failed: ${msg}`, {
      status: 502,
      headers: { 'content-type': 'text/plain' },
    });
  }
}
