'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { Section } from '@/components/ui/Section';

/**
 * V2 Footer — four-column grid footer matching the design.
 *
 * - Column 1: AP logo + Form Follows Function + description
 * - Column 2: Telemetry & Coords
 * - Column 3: Dispatches (links to Work, Health, Ask AI, Vitae Dossier)
 * - Column 4: Interface Vectors (Secure Comms, Code Repository, Executive Network, Scholar)
 * - Bottom: copyright + Brutalist Spec 2.4 + Zero Softness Rule + back to top
 *
 * Brutalist contract: 0px radius, thick borders, hard shadows, uppercase tracking
 */

const DISPATCHES = [
  { href: '/work', label: '01 // Systems Index' },
  { href: '/health', label: '02 // Clinical Models' },
  { href: '/ask', label: '03 // Autonomous Agents' },
  { href: '/resume', label: '04 // Vitae Dossier' },
];

const INTERFACE_VECTORS = [
  { href: '/#contact', label: 'Secure Comms' },
  { href: profile.github, label: 'Code Repository', external: true },
  { href: profile.linkedin, label: 'Executive Network', external: true },
  { href: 'https://scholar.google.com', label: 'Scholar / Publications', external: true },
];

export function Footer() {
  return (
    <footer className="w-full bg-surface-container dark:bg-surface-container border-t-2 border-primary dark:border-white">
      <Section className="py-12 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b-2 border-primary dark:border-white">
          {/* Column 1: AP logo + description */}
          <div className="space-y-3">
            <div className="w-10 h-10 bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black font-headline font-bold flex items-center justify-center text-lg border-2 border-primary dark:border-white">
              {profile.initials}
            </div>
            <p className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface dark:text-on-surface">
              Form Follows Function
            </p>
            <p className="text-xs text-on-surface-variant dark:text-on-surface-variant max-w-xs font-body leading-relaxed">
              Architecting deterministic clinical systems, autonomous agents, and bio-computational interfaces.
            </p>
          </div>

          {/* Column 2: Telemetry & Coords */}
          <div className="space-y-2">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface dark:text-on-surface block">
              Telemetry & Coords
            </span>
            <div className="font-headline text-xs text-on-surface-variant dark:text-on-surface-variant space-y-1 font-mono">
              <div>LAT: 26.1209° N / LON: 85.3647° E</div>
              <div>ALT: 55M / TIMEZONE: UTC+5:30</div>
              <div>GRID: BAUHAUS-SYS-09</div>
              <div>STATUS: OPERATIONAL [200 OK]</div>
            </div>
          </div>

          {/* Column 3: Dispatches */}
          <div className="space-y-2">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface dark:text-on-surface block">
              Dispatches
            </span>
            <div className="flex flex-col space-y-2 text-xs font-headline uppercase font-semibold">
              {DISPATCHES.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors"
                >
                  {d.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Interface Vectors */}
          <div className="space-y-2">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface dark:text-on-surface block">
              Interface Vectors
            </span>
            <div className="flex flex-col space-y-2 text-xs font-headline uppercase font-semibold">
              {INTERFACE_VECTORS.map((v) => (
                <Link
                  key={v.label}
                  href={v.href}
                  className={`text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors ${v.external ? '' : ''}`}
                  target={v.external ? '_blank' : undefined}
                  rel={v.external ? 'noreferrer' : undefined}
                >
                  {v.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-headline text-xs uppercase font-bold tracking-wider text-on-surface dark:text-on-surface">
            © {new Date().getFullYear()} Aditya Pandey. All Functional Systems Reserved.
          </div>
          <div className="flex items-center gap-6 font-headline text-xs uppercase tracking-wider text-on-surface-variant dark:text-on-surface-variant">
            <span>Brutalist Spec 2.4</span>
            <span className="w-2 h-2 bg-accent-red dark:bg-accent-red inline-block" />
            <span>Zero Softness Rule</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center border-2 border-primary dark:border-white bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </Section>
    </footer>
  );
}



