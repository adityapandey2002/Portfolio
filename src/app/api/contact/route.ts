import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface ContactBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  category?: unknown;
  message?: unknown;
}

/** Coerce a value to a trimmed string, or null when it is not a string. */
function asString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  return value.trim();
}

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    const parsed = await req.json();
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, reason: 'invalid-body' }, { status: 400 });
    }
    body = parsed as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid-body' }, { status: 400 });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone) ?? '';
  const category = asString(body.category) ?? 'General enquiry';
  const message = asString(body.message);

  // Type validation: every required field must be a string.
  if (name === null || email === null || message === null) {
    // Distinguish "missing" from "wrong type" for a clearer client contract.
    const wrongType =
      (body.name !== undefined && typeof body.name !== 'string') ||
      (body.email !== undefined && typeof body.email !== 'string') ||
      (body.message !== undefined && typeof body.message !== 'string');
    return NextResponse.json(
      { ok: false, reason: wrongType ? 'bad-type' : 'missing-fields' },
      { status: 400 },
    );
  }
  if (body.phone !== undefined && body.phone !== null && typeof body.phone !== 'string') {
    return NextResponse.json({ ok: false, reason: 'bad-type' }, { status: 400 });
  }
  if (body.category !== undefined && body.category !== null && typeof body.category !== 'string') {
    return NextResponse.json({ ok: false, reason: 'bad-type' }, { status: 400 });
  }

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
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase
        .from('contact_submissions')
        .insert({ name, email, phone, category, message });

      if (!error) {
        return NextResponse.json({ ok: true, via: 'supabase' });
      }
      console.error('[contact] insert failed:', error.message);
      return NextResponse.json({ ok: false, reason: 'delivery-failed' }, { status: 503 });
    } catch (error) {
      console.error('[contact] supabase client failed:', error);
      return NextResponse.json({ ok: false, reason: 'delivery-failed' }, { status: 503 });
    }
  }

  // Nothing configured.
  return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });
}
