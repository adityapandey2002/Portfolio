import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

import {
  buildGroundedAnswer,
  buildKnowledgeSystemPrompt,
  retrievePortfolioContext,
  type KnowledgeSource,
} from '@/lib/knowledgeBase';
import { searchKnowledgeBase } from '@/lib/rag';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface AskBody {
  question?: string;
  projectSlug?: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

const TOP_K = 4;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

function isPlaceholder(value: string | undefined) {
  return !value || /^(your|change|placeholder|replace|xxx)/i.test(value.trim());
}

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
      // not a JSON embedding
    }
  }
  return null;
}

interface StreamMeta {
  sources: KnowledgeSource[];
  followUps: string[];
  gateway: 'groq' | 'local-rag';
}

function textStreamToSSE(
  textStream: AsyncIterable<string>,
  meta: StreamMeta,
): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of textStream) {
          controller.enqueue(
            enc.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`),
          );
        }
        controller.enqueue(enc.encode(`data: ${JSON.stringify({ meta })}\n\n`));
        controller.enqueue(enc.encode('data: [DONE]\n\n'));
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        controller.enqueue(
          enc.encode(`data: ${JSON.stringify({ error: message })}\n\n`),
        );
      } finally {
        controller.close();
      }
    },
  });
}

function groundedStream(text: string, meta: StreamMeta): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      (async () => {
        const tokens = text.match(/[^\s]+\s*/g) ?? [text];
        for (const token of tokens) {
          controller.enqueue(enc.encode(`data: ${JSON.stringify({ text: token })}\n\n`));
          await new Promise((r) => setTimeout(r, 10));
        }
        controller.enqueue(enc.encode(`data: ${JSON.stringify({ meta })}\n\n`));
        controller.enqueue(enc.encode('data: [DONE]\n\n'));
        controller.close();
      })();
    },
  });
}

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

  const clampedQuestion = question.slice(0, 600);
  const projectSlug =
    typeof body.projectSlug === 'string' && body.projectSlug.trim()
      ? body.projectSlug.trim()
      : undefined;

  // Always retrieve structured project + resume + field records from our local TF-IDF KB.
  const matchedDocs = retrievePortfolioContext(clampedQuestion, projectSlug, TOP_K);
  const grounded = buildGroundedAnswer(clampedQuestion, projectSlug);

  const groqKey = isPlaceholder(process.env.GROQ_API_KEY)
    ? undefined
    : process.env.GROQ_API_KEY;

  if (!groqKey) {
    return new Response(
      groundedStream(grounded.answerText, {
        sources: grounded.sources,
        followUps: grounded.followUps,
        gateway: 'local-rag',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'text/event-stream; charset=utf-8',
          'cache-control': 'no-cache, no-transform',
          connection: 'keep-alive',
          'x-ai-gateway': 'local-rag',
        },
      },
    );
  }

  // Optionally supplement with Supabase vector embeddings if configured.
  let extraChunks: string[] = [];
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.from('knowledge_base').select('content, embedding');
      if (!error && data) {
        const kb = data
          .map((row) => ({
            content: String(row.content ?? ''),
            embedding: normalizeEmbedding((row as Record<string, unknown>).embedding),
          }))
          .filter(
            (row): row is { content: string; embedding: number[] } =>
              Boolean(row.content) && Boolean(row.embedding),
          );
        const found = await searchKnowledgeBase(clampedQuestion, kb, 3);
        extraChunks = found.map((c) => c.content);
      }
    } catch {
      // Fall back cleanly to local portfolio context
    }
  }

  const systemPrompt = buildKnowledgeSystemPrompt(matchedDocs, extraChunks);
  const recentHistory = Array.isArray(body.history)
    ? body.history
        .filter(
          (m) =>
            (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string' &&
            m.content.trim().length > 0,
        )
        .slice(-4)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }))
    : [];

  try {
    const groq = createOpenAI({
      apiKey: groqKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
    const model = groq(GROQ_MODEL);

    const result = streamText({
      model,
      system: systemPrompt,
      messages: [...recentHistory, { role: 'user', content: clampedQuestion }],
      temperature: 0.3,
    });

    return new Response(
      textStreamToSSE(result.textStream, {
        sources: grounded.sources,
        followUps: grounded.followUps,
        gateway: 'groq',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'text/event-stream; charset=utf-8',
          'cache-control': 'no-cache, no-transform',
          connection: 'keep-alive',
          'x-ai-gateway': 'groq',
        },
      },
    );
  } catch {
    // Graceful fallback to grounded local RAG if upstream Groq fails
    return new Response(
      groundedStream(grounded.answerText, {
        sources: grounded.sources,
        followUps: grounded.followUps,
        gateway: 'local-rag',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'text/event-stream; charset=utf-8',
          'cache-control': 'no-cache, no-transform',
          connection: 'keep-alive',
          'x-ai-gateway': 'local-rag',
        },
      },
    );
  }
}
