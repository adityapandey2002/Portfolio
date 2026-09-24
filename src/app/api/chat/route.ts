import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { buildSystemPrompt, searchKnowledge } from '@/lib/rag';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

function messageText(m: unknown): string {
  if (typeof m === 'string') return m;
  if (!m || typeof m !== 'object') return '';
  const obj = m as Record<string, unknown>;
  if (typeof obj.content === 'string') return obj.content;
  const parts = Array.isArray(obj.content) ? obj.content : Array.isArray(obj.parts) ? obj.parts : [];
  return parts
    .filter((p) => p && typeof p === 'object' && (p as Record<string, unknown>).type === 'text')
    .map((p) => String((p as Record<string, unknown>).text ?? ''))
    .join(' ');
}

function normalizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== 'object') continue;
    const obj = m as Record<string, unknown>;
    const role = obj.role;
    if (role !== 'system' && role !== 'user' && role !== 'assistant') continue;
    const content = messageText(m).trim();
    if (!content) continue;
    out.push({ role, content });
  }
  return out;
}

export async function POST(req: Request) {
  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return new Response('AI chat is not configured yet — add GROQ_API_KEY.', {
      status: 503,
      headers: { 'content-type': 'text/plain' },
    });
  }

  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = normalizeMessages(body?.messages);
  } catch {
    return new Response('Invalid request body.', { status: 400 });
  }

  if (!messages.length) {
    return new Response('No messages.', { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  const query = lastUser?.content?.slice(0, 400) ?? '';
  let chunks: Awaited<ReturnType<typeof searchKnowledge>> = [];
  try {
    chunks = await searchKnowledge(query);
  } catch (err) {
    console.error('[chat] searchKnowledge failed:', err);
  }

  const modelId = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
  console.log(`[chat] key=${groqKey.slice(0, 8)}… model=${modelId} chunks=${chunks.length} msgs=${messages.length}`);

  try {
    const groq = createOpenAI({
      apiKey: groqKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
    const model = groq(modelId);

    const result = streamText({
      model,
      system: buildSystemPrompt(chunks),
      messages: messages.map(({ role, content }) => ({ role, content })),
      temperature: 0.4,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (err) => {
        console.error('[chat] stream error:', err);
        return err instanceof Error ? err.message : String(err);
      },
    });
  } catch (err) {
    console.error('[chat] model call failed:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(`AI model call failed: ${msg}`, {
      status: 502,
      headers: { 'content-type': 'text/plain' },
    });
  }
}
