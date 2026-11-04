'use client';

import Link from 'next/link';
import { experience } from '@/lib/data/experience';

/**
 * V2 Experience — Field & Systems Experience section.
 *
 * Matches the design file exactly:
 * - Section header: "03 // OPERATIONAL RECORD" + "Field & Systems Experience" + "CHRONOLOGICAL LOGS"
 * - Prominent Brutalist Health Dashboard Banner Card (links to /health)
 * - Experience Cards Grid with period, role, org, bullets, tags
 *
 * Brutalist contract: 0px radius, thick borders, hard shadows, uppercase tracking
 */

export function Experience() {
  return (
    <section id="experience" className="border-b-4 border-primary dark:border-white bg-surface bg-dark-surface-dark py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-white block">
              03 // OPERATIONAL RECORD
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface mt-1">
              Field & Systems Experience
            </h2>
          </div>
          <span className="font-headline text-xs font-bold uppercase tracking-wider bg-surface-container bg-dark-surface-lowest px-3 py-1 border border-primary dark:border-white">
            CHRONOLOGICAL LOGS [2024–2025]
          </span>
        </div>

        {/* Prominent Brutalist Health Dashboard Banner Card */}
        <div className="bg-primary dark:bg-accent-red text-on-primary dark:text-on-accent-red border-3 border-primary dark:border-white p-6 sm:p-8 shadow-[8px_8px_0px_#e63b2e] dark:shadow-[8px_8px_0px_#accent-red] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent-red dark:bg-accent-red text-white dark:text-white px-3 py-1 font-headline font-bold text-xs uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">monitor_heart</span>
              DEDICATED TELEMETRY SUITE
            </div>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-tight text-on-primary dark:text-white">
              View Full Fellowship Field Impact & Vitals Dashboard (/health)
            </h3>
            <p className="font-body text-sm text-surface-container-high dark:text-surface-high leading-relaxed">
              Explore the dedicated health telemetry dashboard: 700+ ASHA workers, 16 administrative blocks, 13,627 KM logged across Bihar, WHO building block alignments, and live ODK pipeline logs.
            </p>
          </div>
          <Link
            href="/health"
            className="inline-flex items-center gap-3 px-6 py-4 bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black font-headline font-bold text-sm uppercase tracking-wider border-2 border-primary dark:border-white shadow-[4px_4px_0px_#ffffff] dark:shadow-[4px_4px_0px_#ffffff] hover:bg-surface dark:hover:bg-surface-container-low hover:text-on-surface transition-all shrink-0"
          >
            Launch /health &rarr;
            <span className="material-symbols-outlined text-lg">open_in_new</span>
          </Link>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experience.map((xp) => (
            <div
              key={xp.role}
              className="bg-surface-container-lowest bg-dark-surface-low border-3 border-primary dark:border-white p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#ffffff] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b-2 border-primary dark:border-white pb-3">
                  <div>
                    <span className={`font-mono text-xs font-bold text-primary dark:text-white uppercase block`}>
                      {xp.period} {"/"} {xp.org}
                    </span>
                    <h4 className="font-headline text-xl font-bold text-on-surface dark:text-on-surface mt-1">{xp.role}</h4>
                    <p className="font-headline text-sm font-semibold text-on-surface-variant dark:text-on-surface-variant">{xp.org}</p>
                  </div>
                  {xp.current && (
                    <span className="bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black text-[11px] font-mono font-bold px-2 py-0.5 border border-primary dark:border-white">
                      CURRENT
                    </span>
                  )}
                </div>
                <ul className="space-y-2 text-xs sm:text-sm font-body text-on-surface dark:text-on-surface list-disc pl-4 leading-relaxed">
                  {xp.bullets.map((b) => (
                    <li key={b} dangerouslySetInnerHTML={{ __html: b }} />
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-primary dark:border-white flex flex-wrap gap-2">
                {xp.tags.map((t) => (
                  <span key={t} className="font-mono text-[11px] bg-surface-container bg-dark-surface-low px-2 py-0.5 border border-primary dark:border-white text-on-surface dark:text-on-surface">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

