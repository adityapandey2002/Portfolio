import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured, supabaseUrl } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface MessageBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, reason: 'supabase-not-configured' },
      { status: 503 },
    );
  }

  let body: MessageBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid-body' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const subject = body.subject?.trim() || 'Portfolio inquiry';

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

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('messages').insert({ name, email, subject, message });

  if (error) {
    console.error('[messages] insert failed:', error.message);
    return NextResponse.json({ ok: false, reason: 'db-error' }, { status: 500 });
  }

  // Broadcast a realtime event so every open visitor sees a live toast.
  try {
    await fetch(`${supabaseUrl()}/realtime/v1/api/broadcast`, {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { topic: 'messages', event: 'new_message', payload: { name: name.slice(0, 60) } },
        ],
      }),
    });
  } catch (err) {
    console.error('[messages] realtime broadcast failed:', err);
  }

  return NextResponse.json({ ok: true });
}
