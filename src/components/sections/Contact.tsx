'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, CheckCircle2, Loader2 } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { Section } from '@/components/ui/Section';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', message: '' };

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setSent(true);
      setForm(EMPTY);
    } catch {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.emails.personal}?subject=${subject}&body=${body}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="dispatch" className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-l1 dark:bg-surface-l2">
      <Section className="py-12">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-secondary dark:text-vermilion block">
                08 // TRANSMISSION & ENGAGEMENT
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-ink-dark mt-1">
                Initiate Direct Dispatch
              </h2>
            </div>
            <div className="font-mono text-xs text-on-surface-variant dark:text-ink-dark/70 font-bold">
              SECURE CHANNEL // UNENCRYPTED PGP READY
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-surface dark:bg-surface-l1 border-3 border-primary dark:border-white p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff]">
            <div className="border-b-2 border-primary dark:border-white pb-4 mb-6">
              <h3 className="font-headline text-xl font-bold uppercase text-on-surface dark:text-ink-dark">Direct Transmission Form</h3>
              <p className="font-body text-xs text-on-surface-variant dark:text-ink-dark/70 mt-1">
                Reach out for public health data consulting, health-tech engineering partnerships, fellowship collaborations, or full-stack speaking sessions.
              </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-ink-dark block tracking-wider">Your Identity & Title *</label>
                <input
                  value={form.name}
                  onChange={set('name')}
                  className="w-full bg-surface dark:bg-surface-l1 dark:bg-surface-l2 border-b-3 border-primary dark:border-white p-3 text-sm font-body text-on-surface dark:text-ink-dark focus:outline-none focus:bg-primary-container/20 dark:focus:bg-primary-yellow/20 transition-colors"
                  placeholder="e.g. Dr. Ramesh Kumar / Chief Medical Officer"
                  required
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-ink-dark block tracking-wider">Official Email Coordinates *</label>
                  <input
                    value={form.email}
                    onChange={set('email')}
                    type="email"
                    className="w-full bg-surface dark:bg-surface-l1 dark:bg-surface-l2 border-b-3 border-primary dark:border-white p-3 text-sm font-body text-on-surface dark:text-ink-dark focus:outline-none focus:bg-primary-container/20 dark:focus:bg-primary-yellow/20 transition-colors"
                    placeholder="name@organization.gov.in"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-ink-dark block tracking-wider">Phone / WhatsApp Vector</label>
                  <input
                    className="w-full bg-surface dark:bg-surface-l1 dark:bg-surface-l2 border-b-3 border-primary dark:border-white p-3 text-sm font-body text-on-surface dark:text-ink-dark focus:outline-none focus:bg-primary-container/20 dark:focus:bg-primary-yellow/20 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                    type="tel"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-ink-dark block tracking-wider">Vector Category *</label>
                <select className="w-full bg-surface dark:bg-surface-l1 dark:bg-surface-l2 border-b-3 border-primary dark:border-white p-3 text-sm font-body text-on-surface dark:text-ink-dark focus:outline-none focus:bg-primary-container/20 dark:focus:bg-primary-yellow/20 transition-colors">
                  <option>Public Health MIS / Data System Architecture</option>
                  <option>Engineering Fellowship / Organization Role</option>
                  <option>Full-Stack Web / Offline PWA Deployment</option>
                  <option>District Health Analytics & ASHA Workflow Mentoring</option>
                  <option>Other Strategic Inquiry</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-headline text-xs font-bold uppercase text-on-surface dark:text-ink-dark block tracking-wider">Operational Dispatch Payload *</label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  className="w-full bg-surface dark:bg-surface-l1 dark:bg-surface-l2 border-b-3 border-primary dark:border-white p-3 text-sm font-body text-on-surface dark:text-ink-dark focus:outline-none focus:bg-primary-container/20 dark:focus:bg-primary-yellow/20 transition-colors resize-none"
                  placeholder="State requirements, technical constraints, field location, or collaboration scope..."
                  required
                  rows={4}
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary dark:bg-primary-yellow text-on-primary dark:text-on-primary font-headline font-bold text-sm uppercase tracking-widest border-2 border-primary dark:border-white shadow-[5px_5px_0px_#ffcc00] dark:shadow-[5px_5px_0px_#facc15] hover:bg-secondary dark:hover:bg-vermilion hover:text-on-secondary dark:hover:text-white transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#ffcc00] dark:active:shadow-[2px_2px_0px_#facc15] disabled:opacity-60"
                >
                  {sent ? <CheckCircle2 size={16} /> : sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {sent ? 'Message Transmitted' : sending ? 'Transmitting...' : 'Transmit Message to Aditya Pandey'}
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </div>
              {sent && (
                <div className="p-3 bg-primary-container dark:bg-primary-yellow border-2 border-primary dark:border-white font-mono text-xs text-on-primary-container dark:text-on-primary font-bold">
                  [TELEMETRY DISPATCHED]: Message queued to Aditya Pandey. Response latency ~ 4 hours.
                </div>
              )}
            </form>
          </div>

          {/* Operational Coordinates Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-primary dark:bg-primary-yellow text-on-primary dark:text-on-primary border-3 border-primary dark:border-white p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-on-primary dark:border-on-primary pb-3">
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary-container dark:text-on-primary">
                  FIELD OPERATIONAL COORDINATES
                </span>
                <span className="w-2.5 h-2.5 bg-primary-container dark:bg-on-primary rounded-none" />
              </div>
              <div className="space-y-5 font-mono text-xs sm:text-sm">
                <div>
                  <span className="text-surface-container-highest dark:text-on-primary/70 uppercase block text-[11px]">Primary Comms [Email]</span>
                  <a className="text-primary-container dark:text-white font-bold hover:underline break-all text-sm" href={`mailto:${profile.emails.personal}`}>
                    {profile.emails.personal}
                  </a>
                </div>
                <div>
                  <span className="text-surface-container-highest dark:text-on-primary/70 uppercase block text-[11px]">Phone / Direct Wire</span>
                  <a className="text-on-primary dark:text-on-primary font-bold hover:underline text-sm" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                    {profile.phone}
                  </a>
                </div>
                <div>
                  <span className="text-surface-container-highest dark:text-on-primary/70 uppercase block text-[11px]">Stationed Jurisdiction</span>
                  <div className="text-on-primary dark:text-on-primary font-bold">Muzaffarpur & Araria, Bihar, India</div>
                  <div className="text-xs text-surface-container-highest dark:text-on-primary/70 font-sans">Hometown: Pratapgarh, Uttar Pradesh</div>
                </div>
                <div>
                  <span className="text-surface-container-highest dark:text-on-primary/70 uppercase block text-[11px]">Operational Status</span>
                  <div className="inline-flex items-center gap-2 bg-secondary dark:bg-vermilion text-on-secondary dark:text-white px-2.5 py-0.5 mt-1 font-bold">
                    ACTIVE ON FIELD // OPEN FOR STRATEGIC ROLES
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t-2 border-on-primary dark:border-on-primary space-y-3">
                <span className="font-headline text-xs font-bold uppercase tracking-wider block text-surface-container-high dark:text-on-primary/80">External Public Keys & Profiles</span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    className="p-2.5 bg-surface dark:bg-surface-l1 text-on-surface dark:text-ink-dark font-headline font-bold text-xs uppercase border border-primary dark:border-white text-center hover:bg-primary-container dark:hover:bg-primary-yellow hover:text-on-primary-container dark:hover:text-on-primary transition-colors"
                    href={profile.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    GitHub Profile →
                  </a>
                  <a
                    className="p-2.5 bg-surface dark:bg-surface-l1 text-on-surface dark:text-ink-dark font-headline font-bold text-xs uppercase border border-primary dark:border-white text-center hover:bg-primary-container dark:hover:bg-primary-yellow hover:text-on-primary-container dark:hover:text-on-primary transition-colors"
                    href={profile.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Quote / Manifesto Card */}
            <div className="bg-surface dark:bg-surface-l1 border-2 border-primary dark:border-white p-5 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
              <span className="font-mono text-xs font-bold text-secondary dark:text-vermilion uppercase block mb-1">FIELD MANIFESTO</span>
              <p className="font-headline text-sm font-bold text-on-surface dark:text-ink-dark leading-snug">
                &quot;No clinical prediction algorithm matters if the auxiliary nurse midwife cannot save her entry on a 2G network before her battery dies. Build from the dirt upward.&quot;
              </p>
              <div className="mt-2 text-right font-mono text-xs text-on-surface-variant dark:text-ink-dark/70">— Aditya Pandey</div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
