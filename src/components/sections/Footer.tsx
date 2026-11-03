'use client';

import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/lib/data/profile';
import { Section } from '@/components/ui/Section';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container dark:bg-surface-l1 border-t-2 border-primary dark:border-white">
      <Section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b-2 border-primary dark:border-white">
          {/* Column 1: AP logo + description */}
          <div className="space-y-3">
            <div className="w-10 h-10 bg-primary dark:bg-primary-yellow text-on-primary dark:text-on-primary font-headline font-bold flex items-center justify-center text-lg border-2 border-primary dark:border-white">
              {profile.initials}
            </div>
            <p className="font-headline text-xs font-bold uppercase tracking-wider text-on-surface dark:text-ink-dark">Form Follows Function</p>
            <p className="text-xs text-on-surface-variant dark:text-ink-dark/70 max-w-xs font-body leading-relaxed">
              Architecting deterministic clinical systems, autonomous agents, and bio-computational interfaces.
            </p>
          </div>

          {/* Column 2: Telemetry & Coords */}
          <div className="space-y-2">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface dark:text-ink-dark block">Telemetry & Coords</span>
            <div className="font-headline text-xs text-on-surface-variant dark:text-ink-dark/70 space-y-1 font-mono">
              <div>LAT: 26.1209° N / LON: 85.3647° E</div>
              <div>ALT: 55M / TIMEZONE: UTC+5:30</div>
              <div>GRID: BAUHAUS-SYS-09</div>
              <div>STATUS: OPERATIONAL [200 OK]</div>
            </div>
          </div>

          {/* Column 3: Dispatches */}
          <div className="space-y-2">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface dark:text-ink-dark block">Dispatches</span>
            <div className="flex flex-col space-y-2 text-xs font-headline uppercase font-semibold">
              <Link href="/work" className="text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark transition-colors">01 // Systems Index</Link>
              <Link href="/health" className="text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark transition-colors">02 // Clinical Models</Link>
              <Link href="/ask" className="text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark transition-colors">03 // Autonomous Agents</Link>
              <a href="/resume" className="text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark transition-colors">04 // Vitae Dossier</a>
            </div>
          </div>

          {/* Column 4: Interface Vectors */}
          <div className="space-y-2">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface dark:text-ink-dark block">Interface Vectors</span>
            <div className="flex flex-col space-y-2 text-xs font-headline uppercase font-semibold">
              <Link href="/#contact" className="text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark transition-colors">Secure Comms</Link>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark transition-colors">Code Repository</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark transition-colors">Executive Network</a>
              <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark transition-colors">Scholar / Publications</a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-headline text-xs uppercase font-bold tracking-wider text-on-surface dark:text-ink-dark">
            © {new Date().getFullYear()} Aditya Pandey. All Functional Systems Reserved.
          </div>
          <div className="flex items-center gap-6 font-headline text-xs uppercase tracking-wider text-on-surface-variant dark:text-ink-dark/70">
            <span>Brutalist Spec 2.4</span>
            <span className="w-2 h-2 bg-secondary dark:bg-vermilion inline-block" />
            <span>Zero Softness Rule</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center border-2 border-primary dark:border-white bg-primary dark:bg-primary-yellow text-on-primary dark:text-on-primary shadow-[2px_2px_0_#1a1a1a] dark:shadow-[2px_2px_0_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </Section>
    </footer>
  );
}
