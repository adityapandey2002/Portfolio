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

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

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

  // 1 · Web3Forms → delivers straight to the owner's inbox.
  //    Only needs WEB3FORMS_ACCESS_KEY, no domain verification.
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3formsKey) {
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Portfolio enquiry · ${category}`,
          from_name: 'adityapandey.dev',
          name,
          email,
          phone: phone || 'not provided',
          category,
          message,
          botcheck: '',
        }),
      });
      const result = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (res.ok && result?.success) {
        return NextResponse.json({ ok: true, via: 'web3forms' });
      }
      console.error('[contact] web3forms rejected:', res.status, result);
    } catch (error) {
      console.error('[contact] web3forms failed:', error);
    }
  }

  // 2 · Supabase → stores the message in the `contact_submissions` table.
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

  // 3 · Nothing configured (or every relay failed).
  return NextResponse.json(
    { ok: false, reason: isSupabaseConfigured() ? 'delivery-failed' : 'not-configured' },
    { status: 503 },
  );
}
