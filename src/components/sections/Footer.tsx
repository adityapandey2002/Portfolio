'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Globe } from 'lucide-react';
import { profile } from '@/lib/data/profile';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] py-12">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-6 px-5 lg:px-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="mt-1.5 text-[12.5px] text-ink-4">
            Built in Bihar · Field Data → Clean Insights → Real Decisions
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: profile.github, label: 'GitHub' },
            { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${profile.emails.personal}`, label: 'Email' },
            { icon: Globe, href: profile.liveSite, label: 'Site' },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
              whileHover={{ y: -3 }}
              aria-label={s.label}
            >
              <s.icon size={16} />
            </motion.a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="icon-link ml-2"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[clamp(80px,18vw,260px)] leading-none text-[var(--ink-3)] opacity-[0.04]">
          {profile.initials}
        </span>
      </div>
    </footer>
  );
}
