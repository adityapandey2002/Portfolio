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

/** Treat the shipped `.env` example values as "not configured". */
function isPlaceholder(value: string | undefined) {
  return !value || /^(your|change|placeholder|replace|xxx)/i.test(value.trim());
}

/** Bridge the AI SDK text stream into the SSE shape the client parses. */
function textStreamToSSE(textStream: AsyncIterable<string>): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of textStream) {
          controller.enqueue(
            enc.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`),
          );
        }
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
        for (const token of text.match(/[^\s]+\s*/g) ?? [text]) {
          controller.enqueue(enc.encode(`data: ${JSON.stringify({ text: token })}\n\n`));
          await new Promise((r) => setTimeout(r, 18));
        }
        controller.enqueue(enc.encode('data: [DONE]\n\n'));
        controller.close();
      })();
    },
  });
}

const CANNED_ANSWER =
  '1. Ask Aditya — RAG Knowledge Base\n' +
  'The knowledge base covers Aditya Pandey\'s background, the GAVB Gandhi Fellowship with ' +
  'Piramal Foundation in Bihar (700+ ASHA workers trained on M-ASHA, 185-hour Clinical Skills ' +
  'Refresher, ODK/OHK Central field data), BiharKaSwaad e-commerce (biharkaswaad.in), projects ' +
  'such as the India Development Data Dashboard and VHSND Field Data Quality, skills, education, ' +
  'certifications, and public-health field work.\n\n' +
  '2. Try asking\n' +
  'Ask "what did Aditya achieve in the Gandhi Fellowship?" or "what is BiharKaSwaad?" to see a ' +
  'grounded, streamed answer.\n\n' +
  '3. Configure the pipeline\n' +
  'Set GROQ_API_KEY in .env, seed the knowledge base with `npm run seed-knowledge-base`, and ' +
  'insert the chunks into Supabase (knowledge_base table). Then /api/ask returns live, grounded ' +
  'answers streamed from Llama-3-70B via Groq.';

const MATRU_ANSWER =
  '1. Offline-First Architecture (Dexie.js & IndexedDB)\n' +
  'Matru Suraksha is engineered for zero-bandwidth rural health sub-centres across Bihar. The ' +
  'front-end uses Dexie.js over IndexedDB to keep an immutable local store: ANMs register ' +
  'antenatal checkups, track 8 critical maternal danger signs, and generate patient records ' +
  'entirely without internet.\n\n' +
  '2. Optimistic Sync & Cryptographic Conflict Resolution\n' +
  'When intermittent 2G/3G is detected, sync queues push updates to Fastify backend services. ' +
  'SHA-256 state hashing provides optimistic concurrency control, so records survive simultaneous ' +
  'updates from ANMs and Community Health Officers without data loss.\n\n' +
  '3. Deterministic 15-Day High-Risk Pregnancy Escalation\n' +
  'A flagged pregnancy starts a 15-day clinical clock: Day 1 sends SMS alerts to the ANM and CHO; ' +
  'Day 12 escalates unresolved cases to the Block Health Manager dashboard; Day 15 reports the SLA ' +
  'breach to the District Health Society escalation report.';

const FELLOWSHIP_ANSWER =
  '1. 700+ ASHA Workers Trained\n' +
  'As a GAVB Gandhi Fellow with Piramal Foundation, Aditya trained 700+ ASHA workers on the ' +
  'M-ASHA government application across 100+ hands-on sessions in 16 Bihar blocks, sustaining ' +
  'support until the tools were genuinely adopted.\n\n' +
  '2. Systems Mentoring & Clinical Quality\n' +
  'He supported NQAS quality work across SHC, PHC, and district hospitals, and co-designed a ' +
  '185-hour Clinical Skills Refresher for 12 staff nurses and 4 medical doctors, reinforced by ' +
  'monthly on-site audits.\n\n' +
  '3. Data-to-Decision Pipelines\n' +
  'He built Python/Pandas workflows to clean and validate VHSND, Godbhari, and PMSMA field data ' +
  'collected through ODK Collect and ODK Central, producing MIS reports and block-level review ' +
  'dashboards for district leadership.';

const DATA_ENGINE_ANSWER =
  '1. Ingestion at Scale\n' +
  'The India Development Data Engine normalizes 118,000+ district indicators from NFHS-5, Census, ' +
  'and state MIS sources into a single analytical layer for collectors and health planners.\n\n' +
  '2. Parquet + DuckDB OLAP\n' +
  'Data is stored in Apache Parquet and queried with DuckDB, giving sub-100ms multi-variable ' +
  'aggregations without a heavyweight warehouse.\n\n' +
  '3. Spatial & Semantic Access\n' +
  'The platform combines pgvector embeddings for semantic search with Leaflet GIS choropleth and ' +
  'vector projections, so users can explore spatial inequalities directly.';

const COMMERCE_ANSWER =
  '1. Server-Side Amount Re-Validation\n' +
  'BiharKaSwaad never trusts client-supplied prices. The backend recalculates exact SKU prices, ' +
  'discounts, and courier weight tariffs from relational MySQL tables before creating a Razorpay ' +
  'order.\n\n' +
  '2. HMAC SHA-256 Verification\n' +
  'Payments are confirmed with crypto.createHmac("sha256", secret).update(order_id + "|" + ' +
  'payment_id).digest("hex") and compared before fulfilment, closing client-side tampering paths.\n\n' +
  '3. Webhook Idempotency & Lifecycle\n' +
  'Payment webhooks listen for payment.captured with unique transaction idempotency keys to prevent ' +
  'double-crediting, while orders move through PENDING → PAID → PACKED → DISPATCHED → DELIVERED.';

function fallbackAnswer(question: string): string {
  const q = question.toLowerCase();
  if (/(matru|offline|sync|pregnan|triage)/.test(q)) return MATRU_ANSWER;
  if (/(hmac|razorpay|biharkaswaad|commerce|payment|webhook)/.test(q)) {
    return COMMERCE_ANSWER;
  }
  if (/(fellowship|gandhi|piramal|muzaffarpur|bihar|nqas|asha)/.test(q)) return FELLOWSHIP_ANSWER;
  if (/(duckdb|parquet|data engine|india development|gis|choropleth)/.test(q)) {
    return DATA_ENGINE_ANSWER;
  }
  return CANNED_ANSWER;
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

  const groqKey = isPlaceholder(process.env.GROQ_API_KEY)
    ? undefined
    : process.env.GROQ_API_KEY;

  // No Groq key or no Supabase knowledge base configured: stream a canned grounded answer
  // so the UI works end-to-end while the pipeline is being set up.
  if (!groqKey || !isSupabaseConfigured()) {
    return new Response(fallbackStream(fallbackAnswer(question)), {
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

    return new Response(textStreamToSSE(result.textStream), {
      status: 200,
      headers: {
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-cache, no-transform',
        connection: 'keep-alive',
        'x-ai-gateway': 'groq',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(`AI model call failed: ${msg}`, {
      status: 502,
      headers: { 'content-type': 'text/plain' },
    });
  }
}
