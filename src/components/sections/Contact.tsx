'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '@/lib/data/profile';

interface FormState {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  category: 'Public Health Data & Systems',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const sending = status === 'sending';
  const sent = status === 'sent';

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="dispatch"
      className="border-b-4 border-primary bg-surface-container-lowest dark:border-[#3f3f46] dark:bg-[#121214]"
    >
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b-2 border-primary pb-4 dark:border-[#3f3f46] sm:flex-row sm:items-end">
          <div>
            <span className="block font-headline text-xs font-bold uppercase tracking-widest text-secondary">
              08 · Contact
            </span>
            <h2 className="mt-1 font-headline text-3xl font-bold uppercase tracking-tight text-on-surface sm:text-5xl">
              Get in Touch
            </h2>
          </div>
          <span className="font-body text-xs font-medium text-on-surface-variant sm:text-sm">
            Usually replies within a few hours
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Contact Form */}
          <div className="border-[3px] border-primary bg-surface p-6 shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#202024] dark:shadow-[6px_6px_0px_#000000] sm:p-8 lg:col-span-7">
            <div className="mb-6 border-b-2 border-primary pb-4 dark:border-[#3f3f46]">
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Send a Message
              </h3>
              <p className="mt-1 font-body text-sm text-on-surface-variant">
                Have a project in mind, a role to discuss, or want to collaborate on public health
                data and full-stack products? Drop a note below.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block font-headline text-xs font-bold uppercase tracking-wider text-on-surface"
                >
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  value={form.name}
                  onChange={set('name')}
                  className="w-full border-b-[3px] border-primary bg-surface-container-lowest p-3 font-body text-sm text-on-surface transition-colors focus:bg-primary-container/20 focus:outline-none dark:border dark:border-[#3f3f46] dark:border-b-[3px] dark:border-b-[#facc15] dark:bg-[#161619] dark:focus:bg-[#27272a]"
                  placeholder="e.g. Dr. Ramesh Kumar, Chief Medical Officer"
                  required
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block font-headline text-xs font-bold uppercase tracking-wider text-on-surface"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    value={form.email}
                    onChange={set('email')}
                    type="email"
                    className="w-full border-b-[3px] border-primary bg-surface-container-lowest p-3 font-body text-sm text-on-surface transition-colors focus:bg-primary-container/20 focus:outline-none dark:border dark:border-[#3f3f46] dark:border-b-[3px] dark:border-b-[#facc15] dark:bg-[#161619] dark:focus:bg-[#27272a]"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="block font-headline text-xs font-bold uppercase tracking-wider text-on-surface"
                  >
                    Phone or WhatsApp (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    value={form.phone}
                    onChange={set('phone')}
                    className="w-full border-b-[3px] border-primary bg-surface-container-lowest p-3 font-body text-sm text-on-surface transition-colors focus:bg-primary-container/20 focus:outline-none dark:border dark:border-[#3f3f46] dark:border-b-[3px] dark:border-b-[#facc15] dark:bg-[#161619] dark:focus:bg-[#27272a]"
                    placeholder="+91 XXXXX XXXXX"
                    type="tel"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-topic"
                  className="block font-headline text-xs font-bold uppercase tracking-wider text-on-surface"
                >
                  What would you like to discuss? *
                </label>
                <select
                  id="contact-topic"
                  value={form.category}
                  onChange={set('category')}
                  className="w-full border-b-[3px] border-primary bg-surface-container-lowest p-3 font-body text-sm text-on-surface transition-colors focus:bg-primary-container/20 focus:outline-none dark:border dark:border-[#3f3f46] dark:border-b-[3px] dark:border-b-[#facc15] dark:bg-[#161619] dark:focus:bg-[#27272a]"
                >
                  <option>Public Health Data &amp; Systems</option>
                  <option>Job Opportunity or Fellowship Collaboration</option>
                  <option>Full-Stack Web or Offline App Project</option>
                  <option>District Health Analytics &amp; Training</option>
                  <option>Something Else</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block font-headline text-xs font-bold uppercase tracking-wider text-on-surface"
                >
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={set('message')}
                  className="w-full resize-none border-b-[3px] border-primary bg-surface-container-lowest p-3 font-body text-sm text-on-surface transition-colors focus:bg-primary-container/20 focus:outline-none dark:border dark:border-[#3f3f46] dark:border-b-[3px] dark:border-b-[#facc15] dark:bg-[#161619] dark:focus:bg-[#27272a]"
                  placeholder="Share a bit about your project, role, or how I can help..."
                  required
                  rows={4}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2.5 border-2 border-primary bg-primary px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-on-primary shadow-[5px_5px_0px_#ffcc00] transition-all hover:bg-secondary hover:text-on-secondary active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#ffcc00] disabled:opacity-60 dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[5px_5px_0px_#000000] dark:hover:border-white dark:hover:bg-white dark:hover:text-black dark:active:shadow-[2px_2px_0px_#000000] sm:w-auto"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>Message Sent</span>
                    </>
                  ) : sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

              {sent && (
                <div
                  role="status"
                  className="border-2 border-primary bg-primary-container p-3 font-body text-sm font-semibold text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214]"
                >
                  Thanks for reaching out! Your message has been sent and I&apos;ll reply soon.
                </div>
              )}
              {status === 'error' && (
                <div
                  role="alert"
                  className="space-y-2 border-2 border-secondary bg-surface-container p-3.5 font-body text-sm text-on-surface dark:bg-[#27272a]"
                >
                  <p className="font-semibold">
                    The form couldn&apos;t send right now. Please try emailing me directly instead.
                  </p>
                  <a
                    href={mailtoHref()}
                    className="inline-block font-semibold text-secondary underline underline-offset-2 dark:text-[#ff6b5b]"
                  >
                    Open in your email app &rarr;
                  </a>
                </div>
              )}
            </form>
          </div>

          {/* Direct Contact Details Card */}
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-6 border-[3px] border-primary bg-primary p-6 text-on-primary shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#27272a] dark:text-on-surface dark:shadow-[6px_6px_0px_#000000] sm:p-8">
              <div className="flex items-center justify-between border-b-2 border-on-primary/30 pb-3 dark:border-[#3f3f46]">
                <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary-container dark:text-[#facc15]">
                  Direct Contact Details
                </span>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Mail
                    size={16}
                    className="mt-1 shrink-0 text-primary-container dark:text-[#facc15]"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block font-headline text-xs font-bold uppercase tracking-wider text-surface-container-highest dark:text-[#a1a1aa]">
                      Email
                    </span>
                    <a
                      className="break-all font-mono text-sm font-bold text-primary-container hover:underline dark:text-[#facc15]"
                      href={`mailto:${profile.emails.personal}`}
                    >
                      {profile.emails.personal}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    size={16}
                    className="mt-1 shrink-0 text-primary-container dark:text-[#facc15]"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block font-headline text-xs font-bold uppercase tracking-wider text-surface-container-highest dark:text-[#a1a1aa]">
                      Phone
                    </span>
                    <a
                      className="font-mono text-sm font-bold text-on-primary hover:underline dark:text-on-surface"
                      href={`tel:${profile.phone.replace(/\s/g, '')}`}
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    className="mt-1 shrink-0 text-primary-container dark:text-[#facc15]"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block font-headline text-xs font-bold uppercase tracking-wider text-surface-container-highest dark:text-[#a1a1aa]">
                      Location
                    </span>
                    <div className="font-body font-bold text-on-primary dark:text-on-surface">
                      Muzaffarpur &amp; Araria, Bihar, India
                    </div>
                    <div className="font-body text-xs text-surface-container-highest dark:text-[#a1a1aa]">
                      Hometown: Pratapgarh, Uttar Pradesh
                    </div>
                  </div>
                </div>

                <div className="border-t border-on-primary/20 pt-4 dark:border-[#3f3f46]">
                  <span className="block font-headline text-xs font-bold uppercase tracking-wider text-surface-container-highest dark:text-[#a1a1aa]">
                    Availability
                  </span>
                  <p className="mt-1 font-body text-sm font-semibold text-on-primary dark:text-white">
                    Currently working in the field · Open to full-stack, data &amp; public health
                    roles
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-t-2 border-on-primary/30 pt-5 dark:border-[#3f3f46]">
                <span className="block font-headline text-xs font-bold uppercase tracking-wider text-surface-container-high dark:text-on-surface">
                  Find Me Online
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    className="inline-flex items-center justify-center gap-1.5 border border-primary bg-surface p-2.5 text-center font-headline text-xs font-bold uppercase text-on-surface transition-colors hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#202024] dark:hover:bg-[#facc15] dark:hover:text-[#121214]"
                    href={profile.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-1.5 border border-primary bg-surface p-2.5 text-center font-headline text-xs font-bold uppercase text-on-surface transition-colors hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#202024] dark:hover:bg-[#facc15] dark:hover:text-[#121214]"
                    href={profile.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Guiding Principle Card */}
            <div className="border-2 border-primary bg-surface-container p-5 shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#202024] dark:shadow-[4px_4px_0px_#000000]">
              <span className="mb-1 block font-headline text-xs font-bold uppercase tracking-wider text-secondary">
                Guiding Principle
              </span>
              <p className="font-headline text-sm font-bold leading-snug text-on-surface">
                &ldquo;No clinical prediction algorithm matters if the auxiliary nurse midwife
                cannot save her entry on a 2G network before her battery dies. Build from the ground
                up.&rdquo;
              </p>
              <div className="mt-2 text-right font-mono text-xs text-on-surface-variant">
                — Aditya Pandey
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




