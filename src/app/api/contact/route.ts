import { NextResponse } from 'next/server';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, reason: 'supabase-not-configured' },
      { status: 503 },
    );
  }

  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid-body' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, reason: 'missing-fields' }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 4000) {
    return NextResponse.json({ ok: false, reason: 'too-long' }, { status: 400 });
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ ok: false, reason: 'bad-email' }, { status: 400 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, reason: 'supabase-not-configured' },
      { status: 503 },
    );
  }

  const { error } = await supabase
    .from('contact_submissions')
    .insert({ name, email, message });

  if (error) {
    console.error('[contact] insert failed:', error.message);
    return NextResponse.json({ ok: false, reason: 'db-error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
