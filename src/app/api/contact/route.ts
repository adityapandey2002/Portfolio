import { NextResponse } from 'next/server';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface ContactBody {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  message?: string;
}

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid-body' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() ?? '';
  const category = body.category?.trim() ?? 'General enquiry';
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, reason: 'missing-fields' }, { status: 400 });
  }
  if (
    name.length > 120 ||
    email.length > 200 ||
    phone.length > 40 ||
    category.length > 120 ||
    message.length > 4000
  ) {
    return NextResponse.json({ ok: false, reason: 'too-long' }, { status: 400 });
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ ok: false, reason: 'bad-email' }, { status: 400 });
  }

  // Web3Forms is submitted from the browser (see Contact.tsx) because its
  // free plan rejects calls made from a server. This route is the fallback:
  // it stores the message in the `contact_submissions` table.
  const supabase = createAdminClient();
  if (supabase) {
    const { error } = await supabase
      .from('contact_submissions')
      .insert({ name, email, phone, category, message });

    if (!error) {
      return NextResponse.json({ ok: true, via: 'supabase' });
    }
    console.error('[contact] insert failed:', error.message);
  }

  // Nothing configured (or every relay failed).
  return NextResponse.json(
    { ok: false, reason: isSupabaseConfigured() ? 'delivery-failed' : 'not-configured' },
    { status: 503 },
  );
}
