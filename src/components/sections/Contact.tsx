'use client';

import { useRef, useState, type FormEvent } from 'react';
import { profile } from '@/lib/data/profile';
import { Section } from '@/components/ui/Section';

/**
 * V2 Contact — Initiate Direct Dispatch section.
 *
 * Matches the design file exactly:
 * - Section header: "08 // TRANSMISSION & ENGAGEMENT" + "Initiate Direct Dispatch" + "SECURE CHANNEL // UNENCRYPTED PGP READY"
 * - Contact Form (lg:col-span-7): Identity, Email, Phone, Vector Category, Dispatch Payload
 * - Operational Coordinates Card (lg:col-span-5): Email, Phone, Jurisdiction, Status, External Profiles
 * - Quick Quote / Manifesto Card
 *
 * Brutalist contract: 0px radius, thick borders, hard shadows, uppercase tracking
 */

interface FormState {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

interface ContactProps {
  /** Web3Forms access key. Public by design; used from the browser because
   *  Web3Forms rejects server-side submissions on its free plan. */
  web3formsKey?: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  category: 'Public Health MIS / Data System Architecture',
  message: '',
};

export function Contact({ web3formsKey }: ContactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const sending = status === 'sending';
  const sent = status === 'sent';

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email}${form.phone ? ` · ${form.phone}` : ''})\nTopic: ${form.category}`,
    );
    return `mailto:${profile.emails.personal}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      category: form.category,
      message: form.message,
    };

    try {
      // Web3Forms must be called from the browser: its free plan rejects
      // server-side submissions. The access key is public by design.
      if (web3formsKey) {
        const relay = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `Portfolio enquiry · ${form.category}`,
            from_name: 'adityapandey.dev',
            name: form.name,
            email: form.email,
            phone: form.phone || 'not provided',
            category: form.category,
            message: form.message,
            botcheck: '',
          }),
        });
        const relayResult = (await relay.json().catch(() => null)) as { success?: boolean } | null;
        if (relay.ok && relayResult?.success) {
          setStatus('sent');
          setForm(EMPTY);
          return;
        }
        console.error('[contact] web3forms rejected:', relay.status, relayResult);
      }

      // Fallback: the API route stores the message in Supabase when configured.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="dispatch" className="border-b-4 border-primary dark:border-[#3f3f46] bg-surface-container-lowest dark:bg-[#121214]">
      <div className="max-w-7xl mx-auto space-y-12 py-10 px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-[#3f3f46] pb-4">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-secondary block">
              08 // TRANSMISSION & ENGAGEMENT
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface mt-1">
              Initiate Direct Dispatch
            </h2>
          </div>
          <span className="font-mono text-xs text-on-surface-variant dark:text-on-surface-variant font-bold">
            SECURE CHANNEL // UNENCRYPTED PGP READY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-surface dark:bg-[#202024] border-3 border-primary dark:border-[#3f3f46] p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#000000]">
            <div className="border-b-2 border-primary dark:border-[#3f3f46] pb-4 mb-6">
              <h3 className="font-headline text-xl font-bold uppercase text-on-surface dark:text-on-surface">
                Direct Transmission Form
              </h3>
              <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant mt-1">
                Reach out for public health data consulting, health-tech engineering partnerships, fellowship collaborations, or full-stack speaking sessions.
              </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-on-surface block tracking-wider">
                  Your Identity &amp; Title *
                </label>
                <input
                  value={form.name}
                  onChange={set('name')}
                  className="w-full bg-surface-container-lowest dark:bg-[#161619] border-b-3 border-primary dark:border dark:border-[#3f3f46] dark:border-b-3 dark:border-b-[#facc15] p-3 text-sm font-body text-on-surface dark:text-on-surface focus:outline-none focus:bg-primary-container/20 dark:focus:bg-[#27272a] transition-colors"
                  placeholder="e.g. Dr. Ramesh Kumar / Chief Medical Officer"
                  required
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-on-surface block tracking-wider">
                    Official Email Coordinates *
                  </label>
                  <input
                    value={form.email}
                    onChange={set('email')}
                    type="email"
                    className="w-full bg-surface-container-lowest dark:bg-[#161619] border-b-3 border-primary dark:border dark:border-[#3f3f46] dark:border-b-3 dark:border-b-[#facc15] p-3 text-sm font-body text-on-surface dark:text-on-surface focus:outline-none focus:bg-primary-container/20 dark:focus:bg-[#27272a] transition-colors"
                    placeholder="name@organization.gov.in"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-on-surface block tracking-wider">
                    Phone / WhatsApp Vector
                  </label>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    className="w-full bg-surface-container-lowest dark:bg-[#161619] border-b-3 border-primary dark:border dark:border-[#3f3f46] dark:border-b-3 dark:border-b-[#facc15] p-3 text-sm font-body text-on-surface dark:text-on-surface focus:outline-none focus:bg-primary-container/20 dark:focus:bg-[#27272a] transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                    type="tel"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-on-surface block tracking-wider">
                  Vector Category *
                </label>
                <select
                  value={form.category}
                  onChange={set('category')}
                  className="w-full bg-surface-container-lowest dark:bg-[#161619] border-b-3 border-primary dark:border dark:border-[#3f3f46] dark:border-b-3 dark:border-b-[#facc15] p-3 text-sm font-body text-on-surface dark:text-on-surface focus:outline-none focus:bg-primary-container/20 dark:focus:bg-[#27272a] transition-colors"
                >
                  <option>Public Health MIS / Data System Architecture</option>
                  <option>Engineering Fellowship / Organization Role</option>
                  <option>Full-Stack Web / Offline PWA Deployment</option>
                  <option>District Health Analytics & ASHA Workflow Mentoring</option>
                  <option>Other Strategic Inquiry</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-on-surface block tracking-wider">
                  Operational Dispatch Payload *
                </label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  className="w-full bg-surface-container-lowest dark:bg-[#161619] border-b-3 border-primary dark:border dark:border-[#3f3f46] dark:border-b-3 dark:border-b-[#facc15] p-3 text-sm font-body text-on-surface dark:text-on-surface focus:outline-none focus:bg-primary-container/20 dark:focus:bg-[#27272a] transition-colors resize-none"
                  placeholder="State requirements, technical constraints, field location, or collaboration scope..."
                  required
                  rows={4}
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-on-primary font-headline font-bold text-sm uppercase tracking-widest border-2 border-primary shadow-[5px_5px_0px_#ffcc00] dark:bg-[#facc15] dark:text-[#121214] dark:border-[#facc15] dark:shadow-[5px_5px_0px_#000000] hover:bg-secondary hover:text-on-secondary dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#ffcc00] dark:active:shadow-[2px_2px_0px_#000000] disabled:opacity-60"
                >
                  {sent ? (
                    <>
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Message Transmitted
                    </>
                  ) : sending ? (
                    <>
                      <span className="material-symbols-outlined text-[16px]">progress_activity</span>
                      Transmitting…
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      Transmit Message to Aditya Pandey
                    </>
                  )}
                </button>
              </div>
              {sent && (
                <div
                  role="status"
                  className="p-3 bg-primary-container dark:bg-[#facc15] border-2 border-primary dark:border-[#facc15] font-mono text-xs text-on-primary-container dark:text-[#121214] font-bold"
                >
                  [TELEMETRY DISPATCHED]: Message queued to Aditya Pandey. Response latency ~ 4 hours.
                </div>
              )}
              {status === 'error' && (
                <div
                  role="alert"
                  className="p-3 bg-surface-container dark:bg-[#27272a] border-2 border-secondary dark:border-secondary font-mono text-xs text-on-surface dark:text-on-surface font-bold space-y-2"
                >
                  <p>[TRANSMISSION FAILED]: The relay is offline right now. Your message was not sent.</p>
                  <a href={mailtoHref()} className="inline-block underline underline-offset-2 text-secondary dark:text-[#ff6b5b]">
                    Send it directly by email instead &rarr;
                  </a>
                </div>
              )}
            </form>
          </div>

          {/* Operational Coordinates Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-primary dark:bg-[#27272a] text-on-primary dark:text-on-surface border-3 border-primary dark:border-[#3f3f46] p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#000000] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-on-primary dark:border-[#3f3f46] pb-3">
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary-container dark:text-primary">
                  FIELD OPERATIONAL COORDINATES
                </span>
                <span className="w-2.5 h-2.5 bg-primary-container dark:bg-primary rounded-none" />
              </div>
              <div className="space-y-5 font-mono text-xs sm:text-sm">
                <div>
                  <span className="text-surface-container-highest dark:text-[#a1a1aa] uppercase block text-[11px]">
                    Primary Comms [Email]
                  </span>
                  <a className="text-primary-container dark:text-primary font-bold hover:underline break-all text-sm" href={`mailto:${profile.emails.personal}`}>
                    {profile.emails.personal}
                  </a>
                </div>
                <div>
                  <span className="text-surface-container-highest dark:text-[#a1a1aa] uppercase block text-[11px]">
                    Phone / Direct Wire
                  </span>
                  <a className="text-on-primary dark:text-on-surface font-bold hover:underline text-sm" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                    {profile.phone}
                  </a>
                </div>
                <div>
                  <span className="text-surface-container-highest dark:text-[#a1a1aa] uppercase block text-[11px]">
                    Stationed Jurisdiction
                  </span>
                  <div className="text-on-primary dark:text-on-surface font-bold">Muzaffarpur & Araria, Bihar, India</div>
                  <div className="text-xs text-surface-container-highest dark:text-[#a1a1aa] font-sans">Hometown: Pratapgarh, Uttar Pradesh</div>
                </div>
                <div>
                  <span className="text-surface-container-highest dark:text-[#a1a1aa] uppercase block text-[11px]">
                    Operational Status
                  </span>
                  <div className="inline-flex items-center gap-2 bg-secondary text-on-secondary dark:text-[#121214] px-2.5 py-0.5 mt-1 font-bold">
                    ACTIVE ON FIELD // OPEN FOR STRATEGIC ROLES
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t-2 border-on-primary dark:border-[#3f3f46] space-y-3">
                <span className="font-headline text-xs font-bold uppercase tracking-wider block text-surface-container-high dark:text-on-surface">
                  External Public Keys & Profiles
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    className="p-2.5 bg-surface dark:bg-[#202024] text-on-surface font-headline font-bold text-xs uppercase border border-primary dark:border-[#3f3f46] text-center hover:bg-primary-container hover:text-on-primary-container dark:hover:bg-[#facc15] dark:hover:text-[#121214] transition-colors"
                    href={profile.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    GitHub Profile &rarr;
                  </a>
                  <a
                    className="p-2.5 bg-surface dark:bg-[#202024] text-on-surface font-headline font-bold text-xs uppercase border border-primary dark:border-[#3f3f46] text-center hover:bg-primary-container hover:text-on-primary-container dark:hover:bg-[#facc15] dark:hover:text-[#121214] transition-colors"
                    href={profile.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    LinkedIn &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Quote / Manifesto Card */}
            <div className="bg-surface-container dark:bg-[#202024] border-2 border-primary dark:border-[#3f3f46] p-5 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs font-bold text-secondary uppercase block mb-1">
                FIELD MANIFESTO
              </span>
              <p className="font-headline text-sm font-bold text-on-surface dark:text-on-surface leading-snug">
                &ldquo;No clinical prediction algorithm matters if the auxiliary nurse midwife cannot save her entry on a 2G network before her battery dies. Build from the dirt upward.&rdquo;
              </p>
              <div className="mt-2 text-right font-mono text-xs text-on-surface-variant dark:text-on-surface-variant">
                — Aditya Pandey
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




