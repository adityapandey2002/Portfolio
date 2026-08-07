import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, count: 0 });
  }

  let visitorKey = '';
  let userAgent = '';
  try {
    const body = await req.json();
    visitorKey = String(body.visitor_key || '').slice(0, 64);
    userAgent = String(body.user_agent || '').slice(0, 256);
  } catch {
    // ignore
  }

  if (!visitorKey) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  await supabase.from('presence').upsert(
    { visitor_key: visitorKey, user_agent: userAgent, first_seen: now, last_seen: now },
    { onConflict: 'visitor_key', ignoreDuplicates: true }
  );
  await supabase
    .from('presence')
    .update({ last_seen: now })
    .eq('visitor_key', visitorKey);

  const { count } = await supabase
    .from('presence')
    .select('*', { count: 'exact', head: true })
    .gte('last_seen', new Date(Date.now() - 30_000).toISOString());

  return NextResponse.json({ ok: true, count: count ?? 0 });
}
