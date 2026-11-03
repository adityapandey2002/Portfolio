'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Globe, type LucideIcon } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

const CONTACT_ITEMS = [
  { icon: Github, href: profile.github, label: 'GitHub' },
  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.emails.personal}`, label: 'Email' },
  { icon: Globe, href: profile.liveSite, label: 'Site' },
];

function FooterLink({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center border-2 border-primary bg-surface text-primary shadow-[2px_2px_0_#000000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-surface-l1 dark:text-white dark:shadow-[2px_2px_0_#ffffff]"
    >
      <Icon size={14} />
    </a>
  );
}

export function Footer() {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <footer className="border-t-4 border-primary dark:border-white">
      <Section className="py-6 sm:py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface dark:text-ink-dark">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p className="mt-1.5 text-[10px] text-on-surface-variant dark:text-ink-dark/60">
              Built in Bihar · Field Data → Clean Insights → Real Decisions
            </p>
          </div>
          <div className="flex items-center gap-2">
            {CONTACT_ITEMS.map((s) => (
              <FooterLink key={s.label} href={s.href} label={s.label} icon={s.icon} />
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center border-2 border-primary bg-primary text-on-primary shadow-[2px_2px_0_#000000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-primary-yellow dark:text-on-primary dark:shadow-[2px_2px_0_#ffffff]"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 border-t-2 border-primary pt-3 sm:pt-4 text-center dark:border-white">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark/40">
            AP
          </span>
        </div>
      </Section>
    </footer>
  );
}
