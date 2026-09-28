'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, CheckCircle2, Loader2 } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { useToast } from '@/hooks/useToaster';
import { SectionHeading } from './SectionHeading';

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

interface MousePos {
  x: number;
  y: number;
}

const FAR: MousePos = { x: Infinity, y: Infinity };

/** One vertical contact row. The icon and its full name spring-magnify with
 *  cursor proximity (macOS-dock feel) while the row itself never reflows. */
function ContactRow({ mouse, link, index, inView }: {
  mouse: MotionValue<MousePos>;
  link: ContactLink;
  index: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = link.icon;

  // Distance from the cursor to the nearest edge of the row (0 while hovering it).
  const dist = useTransform(mouse, (m) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return 999;
    const dx = Math.max(b.left - m.x, 0, m.x - b.right);
    const dy = Math.max(b.top - m.y, 0, m.y - b.bottom);
    return Math.hypot(dx, dy);
  });
  const iconScale = useSpring(useTransform(dist, [0, 140], [1.55, 1]), { stiffness: 400, damping: 28 });
  const labelScale = useSpring(useTransform(dist, [0, 140], [1.14, 1]), { stiffness: 400, damping: 28 });

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target={link.href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={link.label}
      className="group flex items-center gap-3 rounded-lg px-2 py-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
    >
      <motion.span
        style={{ scale: iconScale }}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-bg-2/70 text-primary"
      >
        <Icon size={14} />
      </motion.span>
      <motion.span style={{ scale: labelScale }} className="origin-left">
        {link.label}
      </motion.span>
    </motion.a>
  );
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const mouse = useMotionValue<MousePos>(FAR);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast('Fill in all fields first.', 'rose');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.status === 503) throw new Error('unconfigured');
      if (!res.ok) throw new Error('failed');
      setSent(true);
      setForm(EMPTY);
      toast('Message stored. Real humans reply fast.', 'primary');
    } catch {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.emails.personal}?subject=${subject}&body=${body}`;
      toast('Supabase not connected — opened your mail client instead.', 'accent');
    } finally {
      setSending(false);
    }
  };

  const links: ContactLink[] = [
    { icon: Mail,     label: profile.emails.personal,                  href: `mailto:${profile.emails.personal}` },
    { icon: Phone,    label: profile.phone,                            href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: MapPin,   label: profile.location,                         href: undefined },
    { icon: Github,   label: 'github.com/adityapandey2002',            href: profile.github },
    { icon: Linkedin, label: 'linkedin.com/in/aditya-pandey-a-fellow',  href: profile.linkedin },
    { icon: Globe,    label: 'biharkaswaad.in',                        href: profile.liveSite },
  ];

  return (
    <section id="contact" className="relative flex h-full w-full items-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left — info + links */}
        <div
          ref={ref}
          onMouseMove={(e) => mouse.set({ x: e.clientX, y: e.clientY })}
          onMouseLeave={() => mouse.set(FAR)}
        >
          <SectionHeading
            eyebrow="/* 11 · CONTACT */"
            className="mb-5"
            title={
              <>
                Let&apos;s build something that <span className="text-gradient">matters</span>
              </>
            }
            sub="Field data, dashboards, full-stack products, or just a conversation about public health — my inbox is open."
          />

          <div className="space-y-1.5">
            {links.map((l, i) => (
              <ContactRow key={l.label} mouse={mouse} link={l} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Right — form */}
        <motion.div
          className="h-fit rounded-2xl border border-[var(--line)] bg-bg-2/60 p-5"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Name</span>
                <input value={form.name} onChange={set('name')} placeholder="Your name" className="input-field" required />
              </label>
              <label className="block">
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Email</span>
                <input value={form.email} onChange={set('email')} type="email" placeholder="you@example.com" className="input-field" required />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Message</span>
              <textarea value={form.message} onChange={set('message')} rows={4} placeholder="Tell me about the data problem you're trying to solve…" className="input-field resize-none" required />
            </label>
            <button type="submit" disabled={sending} className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:opacity-60">
              {sent ? <CheckCircle2 size={16} /> : sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              {sent ? 'Message sent' : sending ? 'Sending…' : 'Send message'}
            </button>
            <p className="text-center font-mono text-[10px] text-ink-4">Stored in Supabase · broadcast live to visitors · falls back to email</p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
