import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ count: 0, live: false });
  }

  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from('presence')
    .select('*', { count: 'exact', head: true })
    .gte('last_seen', new Date(Date.now() - 30_000).toISOString());

  if (error) {
    return NextResponse.json({ count: 0, live: false });
  }

  return NextResponse.json({ count: count ?? 0, live: true });
}
