import Link from 'next/link';

import { profile } from '@/lib/data/profile';

const LINKS = [
  { href: profile.github, label: 'GitHub', external: true },
  { href: profile.linkedin, label: 'LinkedIn', external: true },
  { href: 'https://biharkaswaad.in', label: 'BiharKaSwaad Storefront', external: true },
  { href: 'https://hospital-araria-f5wl.vercel.app/', label: 'Sadar Hospital Portal', external: true },
  { href: 'https://india-dashboard-delta.vercel.app/', label: 'India Data Engine', external: true },
];

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-primary bg-surface-low text-on-surface dark:border-outline dark:bg-surface-lowest">
      {/* Identity / links / location */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4 lg:px-12">
        <div className="space-y-4 md:col-span-2">
          <div className="font-headline text-xl font-bold uppercase tracking-tight text-primary dark:text-primary">
            Aditya Pandey
          </div>
          <p className="max-w-md font-body text-sm leading-relaxed text-on-surface-variant">
            Building resilient full-stack applications, clean public health data pipelines, and
            offline-first digital tools for underserved communities across India.
          </p>
          <div className="font-headline text-xs font-bold uppercase tracking-wider text-primary dark:text-accent-yellow">
            Based in Muzaffarpur &amp; Araria, Bihar
          </div>
        </div>

        <div>
          <div className="mb-4 border-b-2 border-primary pb-2 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline dark:text-white">
            Live Work &amp; Profiles
          </div>
          <ul className="space-y-2 font-headline text-xs font-bold uppercase dark:text-on-surface-variant">
            {LINKS.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span className="text-accent-red dark:text-primary-yellow" aria-hidden="true">
                  ■
                </span>
                {item.external ? (
                  <a
                    className="transition-colors hover:text-accent-blue dark:hover:text-white"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    className="transition-colors hover:text-accent-blue dark:hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 border-b-2 border-primary pb-2 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline dark:text-white">
            Quick Navigation
          </div>
          <ul className="space-y-2 font-headline text-xs font-bold uppercase text-on-surface-variant">
            <li>
              <Link href="/" className="transition-colors hover:text-primary dark:hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/work" className="transition-colors hover:text-primary dark:hover:text-white">
                Work &amp; Systems
              </Link>
            </li>
            <li>
              <Link href="/health" className="transition-colors hover:text-primary dark:hover:text-white">
                Health &amp; Field Impact
              </Link>
            </li>
            <li>
              <Link href="/ask" className="transition-colors hover:text-primary dark:hover:text-white">
                Ask AI Assistant
              </Link>
            </li>
            <li>
              <Link href="/#dispatch" className="transition-colors hover:text-primary dark:hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="flex flex-col items-center justify-between gap-2 border-t-2 border-primary bg-primary px-6 py-4 font-headline text-xs tracking-wider text-on-primary dark:border-outline dark:bg-surface-lowest dark:text-on-surface-variant sm:flex-row lg:px-12">
        <span>
          © 2026 Aditya Pandey — Data Systems &amp; Public Health Full-Stack Builder.
        </span>
        <a
          href={`mailto:${profile.emails.personal}`}
          className="font-mono text-xs text-accent-yellow hover:underline dark:text-primary-yellow"
        >
          {profile.emails.personal}
        </a>
      </div>
    </footer>
  );
}
