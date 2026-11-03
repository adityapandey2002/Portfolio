'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, CheckCircle2, Loader2 } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', message: '' };

interface ContactLink {
  icon: typeof Mail;
  label: string;
  href?: string;
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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

  const links: ContactLink[] = [
    { icon: Mail, label: profile.emails.personal, href: `mailto:${profile.emails.personal}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: profile.location, href: undefined },
    { icon: Github, label: 'github.com/adityapandey2002', href: profile.github },
    { icon: Linkedin, label: 'linkedin.com/in/aditya-pandey-a-fellow', href: profile.linkedin },
    { icon: Globe, label: 'biharkaswaad.in', href: profile.liveSite },
  ];

  return (
    <section id="contact" className="border-b-4 border-primary dark:border-white">
      <Section className="py-8">
        <div className="mb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
            11 · CONTACT
          </span>
          <h2 className="mt-2 font-headline text-2xl sm:text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
            Let&apos;s build something that matters
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant dark:text-ink-dark/70">
            Field data, dashboards, full-stack products, or just a conversation about public health — my inbox is open.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div ref={ref}>
            <div className="space-y-1">
              {links.map((l, i) => {
                const Icon = l.icon;
                return (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    target={l.href?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={l.label}
                    className="flex items-center gap-2 border-2 border-transparent px-2.5 py-1.5 text-sm text-on-surface-variant transition-colors hover:border-primary hover:text-primary dark:text-ink-dark/70 dark:hover:border-white dark:hover:text-white"
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                  >
                    <span className="flex h-7 sm:h-8 w-7 sm:w-8 shrink-0 items-center justify-center border-2 border-primary bg-surface text-primary dark:border-white dark:bg-surface-l1 dark:text-white">
                      <Icon size={13} />
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs">{l.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>
          <motion.div
            className="border-2 border-primary bg-surface p-4 sm:p-5 shadow-[4px_4px_0_#000000] dark:border-white dark:bg-surface-l1 dark:shadow-[4px_4px_0_#ffffff]"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-ink-dark/60">Name</span>
                  <input
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Your name"
                    className="w-full border-2 border-primary bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-accent-yellow focus:shadow-[3px_3px_0_#facc15] dark:border-white dark:bg-surface-l1 dark:text-ink-dark"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-ink-dark/60">Email</span>
                  <input
                    value={form.email}
                    onChange={set('email')}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border-2 border-primary bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-accent-yellow focus:shadow-[3px_3px_0_#facc15] dark:border-white dark:bg-surface-l1 dark:text-ink-dark"
                    required
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-ink-dark/60">Message</span>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  rows={4}
                  placeholder="Tell me about the data problem you're trying to solve…"
                  className="w-full resize-none border-2 border-primary bg-surface px-3 py-2 text-sm text-on-surface outline-none focus:border-accent-yellow focus:shadow-[3px_3px_0_#facc15] dark:border-white dark:bg-surface-l1 dark:text-ink-dark"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 border-2 border-primary bg-primary px-4 sm:px-6 py-2 sm:py-3 font-headline text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-primary shadow-[4px_4px_0_#000000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000000] disabled:opacity-60 dark:border-white dark:bg-primary-yellow dark:text-on-primary dark:shadow-[4px_4px_0_#ffffff] dark:hover:shadow-[2px_2px_0_#ffffff]"
              >
                {sent ? <CheckCircle2 size={14} /> : sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {sent ? 'Message sent' : sending ? 'Sending…' : 'Send message'}
              </button>
              <p className="text-center font-mono text-[10px] text-on-surface-variant dark:text-ink-dark/40">
                Stored in Supabase · broadcast live to visitors · falls back to email
              </p>
            </form>
          </motion.div>
        </div>
      </Section>
    </section>
  );
}
