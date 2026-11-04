'use client';

import Link from 'next/link';

export function SelectedSystems() {
  return (
    <section id="systems" className="border-b-4 border-primary dark:border-white bg-surface-container-low dark:bg-surface-container-low py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block">
              04 // FLAGSHIP ENGINEERING DEPLOYMENTS
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface mt-1">
              Production Systems
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:text-white hover:text-accent-yellow dark:hover:text-accent-yellow border-b-2 border-primary dark:border-white pb-1"
          >
            View All Systems &amp; Architecture on Work Page (/work)
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
