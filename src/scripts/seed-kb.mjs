/**
 * Seeds the RAG knowledge base.
 *
 * Reads knowledge-base/*.md, chunks it, embeds each chunk via your
 * embeddings endpoint, and upserts into knowledge_chunks (pgvector).
 *
 * Usage:
 *   node --env-file=.env src/scripts/seed-kb.mjs
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 * EMBEDDINGS_API_KEY (or OPENAI_API_KEY), EMBEDDINGS_BASE_URL, EMBEDDINGS_MODEL.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const KB_DIR = join(__dirname, '..', '..', 'knowledge-base');

function chunkText(text, maxLen = 800, overlap = 120) {
  const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const chunks = [];
  let buf = '';
  for (const block of blocks) {
    if ((buf + '\n\n' + block).length > maxLen && buf) {
      chunks.push(buf);
      buf = buf.slice(-overlap) + '\n\n' + block;
    } else {
      buf = buf ? buf + '\n\n' + block : block;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const embedKey = process.env.EMBEDDINGS_API_KEY || process.env.OPENAI_API_KEY;

  if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');

  const files = (await readdir(KB_DIR)).filter((f) => f.endsWith('.md'));
  const chunks = [];
  for (const file of files) {
    const text = await readFile(join(KB_DIR, file), 'utf8');
    for (const chunk of chunkText(text)) {
      chunks.push({ content: chunk, source: file.replace(/\.md$/, '') });
    }
  }
  console.log(`Loaded ${files.length} file(s) → ${chunks.length} chunks`);

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Reset the table so re-seeding stays idempotent.
  const { error: delErr } = await supabase.from('knowledge_chunks').delete().neq('id', 0);
  if (delErr) console.warn('cleanup warning:', delErr.message);

  let embeddings = null;
  if (embedKey) {
    const provider = createOpenAI({
      apiKey: embedKey,
      baseURL: process.env.EMBEDDINGS_BASE_URL || 'https://api.openai.com/v1',
    });
    const model = process.env.EMBEDDINGS_MODEL || 'text-embedding-3-small';

    console.log(`Embedding with ${model} @ ${process.env.EMBEDDINGS_BASE_URL || 'openai'} ...`);
    const res = await embedMany({
      model: provider.textEmbeddingModel(model),
      values: chunks.map((c) => c.content),
    });
    embeddings = res.embeddings;
  } else {
    console.warn('⚠ No EMBEDDINGS_API_KEY — inserting chunks with NULL embeddings (keyword search only).');
    console.warn('  Set EMBEDDINGS_* and re-run `npm run db:seed` later to upgrade to semantic search.');
  }

  const rows = chunks.map((c, i) => ({ content: c.content, source: c.source, embedding: embeddings ? embeddings[i] : null }));
  const { error } = await supabase.from('knowledge_chunks').insert(rows);
  if (error) throw new Error(`Insert failed: ${error.message}`);

  console.log(`✅ Seeded ${rows.length} chunks into knowledge_chunks`);
}

main().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
