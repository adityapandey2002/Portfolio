'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Globe, type LucideIcon } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { MagnifyDock, useMagnify } from '@/components/ui/MagnifyDock';

const CONTACT_ITEMS = [
  { icon: Github, href: profile.github, label: 'GitHub' },
  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.emails.personal}`, label: 'Email' },
  { icon: Globe, href: profile.liveSite, label: 'Site' },
];

/** One horizontal dock item: icon springs toward the cursor on approach. */
function FooterLink({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { iconScale } = useMagnify(ref);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="icon-link relative z-0 hover:z-10"
      style={{ scale: iconScale }}
      whileHover={{ y: -3 }}
      aria-label={label}
    >
      <Icon size={16} />
    </motion.a>
  );
}

function FooterTop() {
  const ref = useRef<HTMLButtonElement>(null);
  const { iconScale } = useMagnify(ref);

  return (
    <motion.button
      ref={ref}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="icon-link relative z-0 ml-2 hover:z-10"
      style={{ scale: iconScale }}
      whileHover={{ y: -3 }}
      aria-label="Back to top"
    >
      <ArrowUp size={16} />
    </motion.button>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] py-12">
      {/* The dock region spans the whole footer band (negative margins reclaim
          the vertical padding) so the icons start reacting on approach, not
          only once the pointer is already on the row. */}
      <MagnifyDock className="-my-12 mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-6 px-5 py-12 lg:px-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="mt-1.5 text-[12.5px] text-ink-4">
            Built in Bihar · Field Data → Clean Insights → Real Decisions
          </p>
        </div>

        <div className="flex items-center gap-2">
          {CONTACT_ITEMS.map((s) => (
            <FooterLink key={s.label} href={s.href} label={s.label} icon={s.icon} />
          ))}
          <FooterTop />
        </div>

        <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[clamp(80px,18vw,260px)] leading-none text-[var(--ink-3)] opacity-[0.04]">
          {profile.initials}
        </span>
      </MagnifyDock>
    </footer>
  );
}
