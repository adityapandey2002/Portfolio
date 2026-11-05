import Link from 'next/link';

import { profile } from '@/lib/data/profile';

const SYSTEM_REGISTRIES = [
  { href: profile.github, label: 'GitHub Registry', external: true },
  { href: profile.linkedin, label: 'LinkedIn Profile', external: true },
  { href: 'https://biharkaswaad.in', label: 'BiharKaSwaad Storefront', external: true },
  { href: 'https://hospital-araria-f5wl.vercel.app/', label: 'Sadar Hospital Portal', external: true },
];

/**
 * Persistent footer from the V2 design:
 * telemetry strip → AP identity → System Registries → Coordinates & Ops.
 */
export function Footer() {
  return (
    <footer className="w-full border-t-2 border-primary bg-surface-low text-on-surface dark:border-outline dark:bg-surface-lowest">
      {/* Telemetry strip */}
      <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b-2 border-primary bg-surface-container px-6 py-3 font-headline text-xs tracking-wider dark:border-b dark:border-outline-variant dark:bg-surface dark:text-on-surface-variant lg:px-12">
        <div className="flex items-center gap-6 font-bold dark:text-white">
          <span>LOG_ID: BIO-TELEMETRY-NODE-09</span>
          <span>GRID: NORTH_BIHAR_PUBLIC_HEALTH</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase">
          <span className="text-accent-red">● LIVE UPTIME: 99.84%</span>
          <span>STACK: FASTAPI / RAG / POSTGRES</span>
        </div>
      </div>

      {/* Identity / registries / coordinates */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4 lg:px-12">
        <div className="space-y-4 md:col-span-2">
          <div className="font-headline text-xl font-bold uppercase tracking-tight text-primary dark:text-primary">
            AP // ADITYA PANDEY
            <span className="ml-2 hidden font-mono text-xs text-primary-yellow dark:inline">[2026.04]</span>
          </div>
          <p className="max-w-md font-body text-sm text-on-surface-variant dark:text-on-surface-variant">
            Architecting resilient full-stack systems, distributed clinical data pipelines, and
            offline-first intelligence architectures across underserved public health frontlines in
            India.
          </p>
          <div className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-accent-yellow">
            FIELD DESK: MUZAFFARPUR &amp; PATNA // HQ IN ARARIA
          </div>
        </div>

        <div>
          <div className="mb-4 border-b-2 border-primary pb-2 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline dark:text-white">
            SYSTEM REGISTRIES
          </div>
          <ul className="space-y-2 font-headline text-xs font-bold uppercase dark:text-on-surface-variant">
            {SYSTEM_REGISTRIES.map((registry) => (
              <li key={registry.label} className="flex items-center gap-2">
                <span className="text-accent-red dark:text-primary-yellow">■</span>
                {registry.external ? (
                  <a
                    className="transition-colors hover:text-accent-blue dark:hover:text-white"
                    href={registry.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {registry.label}
                  </a>
                ) : (
                  <Link
                    className="transition-colors hover:text-accent-blue dark:hover:text-white"
                    href={registry.href}
                  >
                    {registry.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 border-b-2 border-primary pb-2 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline dark:text-white">
            COORDINATES &amp; OPS
          </div>
          <div className="space-y-1 font-headline text-xs uppercase text-on-surface-variant dark:text-on-surface-variant">
            <div>LAT/LONG: 26.1209° N, 85.3647° E</div>
            <div>LOC: BIHAR HEALTH SECTOR INITIATIVE</div>
            <div>SEC: SHA-256 SIGNED LOGS</div>
            <div>DISPATCH: FELLOWSHIP VERIFIED</div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="flex flex-col items-center justify-between gap-2 border-t-2 border-primary bg-primary px-6 py-4 font-headline text-xs tracking-wider text-on-primary dark:border-outline dark:bg-surface-lowest dark:text-on-surface-variant sm:flex-row lg:px-12">
        <span>
          © 2026 ADITYA PANDEY — DATA SYSTEMS &amp; PUBLIC HEALTH FULL-STACK BUILDER. ALL RIGHTS
          RESERVED.
        </span>
        <span className="font-bold uppercase text-accent-yellow dark:text-primary-yellow">
          <span className="dark:hidden">BAUHAUS NEO-BRUTALIST ARCHITECTURE</span>
          <span className="hidden dark:inline">OBSIDIAN BAUHAUS BRUTALISM</span>
        </span>
      </div>
    </footer>
  );
}
