'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

interface Capability {
  num: string;
  name: string;
  pct: number;
  /** Accent text colour — light mode first, dark mode override. */
  accentText: string;
  /** Accent fill colour — light mode first, dark mode override. */
  accentFill: string;
  skills: string[];
}

/* ------------------------------------------------------------------ */
/* V2 Capabilities — Bauhaus Neo-Brutalist four-lane skill cards.     */
/*                                                                    */
/* Brutalist contract:                                                */
/*   • 0px border-radius everywhere (Card + bar track)                */
/*   • Thick solid 2px border (Card), hard 4px offset shadow          */
/*   • Hover: card slams up 1px, shadow collapses to 2px              */
/*   • Active: slams down 4px/4px, shadow gone                        */
/*   • Uppercase tracking-wider labels; Space Grotesk titles          */
/*   • Dark mode via Tailwind `dark:` variants (html.dark class)      */
/* ------------------------------------------------------------------ */

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    name: 'Data Science',
    pct: 87,
    accentText: 'text-accent-yellow dark:text-primary-yellow', // #ffcc00 / #facc15
    accentFill: 'bg-accent-yellow dark:bg-primary-yellow',
    skills: [
      'Python', 'Pandas', 'NumPy', 'SQL / SQLite', 'Jupyter', 'R', 'Statistics',
      'Dash', 'Plotly', 'Excel', 'Data Analysis',
    ],
  },
  {
    num: '02',
    name: 'Web Developer',
    pct: 78,
    accentText: 'text-accent-red dark:text-accent-red', // #e63b2e
    accentFill: 'bg-accent-red',
    skills: [
      'React', 'Next.js', 'TypeScript', 'Tailwind', 'Node', 'Express', 'MySQL',
      'MongoDB', 'REST / JWT', 'WebSockets', 'Git', 'Docker', 'SEO',
      'Full-Stack (MERN)',
    ],
  },
  {
    num: '03',
    name: 'AI & Automation',
    pct: 74,
    accentText: 'text-accent-blue dark:text-accent-blue', // #0055ff
    accentFill: 'bg-accent-blue',
    skills: [
      'AI Tools', 'LLM / RAG', 'Groq', 'Prompt Engineering', 'Automation Scripts',
      'Playwright E2E', 'Data Pipelines', 'AI / Automation',
    ],
  },
  {
    num: '04',
    name: 'Community & Leadership',
    pct: 88,
    accentText: 'text-primary dark:text-white', // #1a1a1a / #fff (visible on dark surface)
    accentFill: 'bg-primary dark:bg-white',
    skills: [
      'Community Engagement', 'ASHA & Frontline Training', 'Facilitation',
      'NQAS / MIS Reporting', 'Stakeholder Coordination', 'Leadership',
      'Program Delivery', 'Field Leadership',
    ],
  },
] as const;

export function Capabilities() {
  return (
    <section id="capabilities" aria-label="Four capability lanes" className="relative">
      <Section
        className={cn(
          'border-b-4 border-primary dark:border-white',
          'bg-surface dark:bg-surface-dark',
          'pb-8 lg:pb-20',
        )}
      >
        <div className="mb-6 lg:mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink dark:text-ink-dark">
            05 · CAPABILITIES
          </span>
          <h2 className="font-display mt-3 text-[20px] sm:text-[22px] font-bold uppercase tracking-wider leading-[1.12] text-ink dark:text-ink-dark">
            Four lanes, one pipeline
          </h2>
          <p className="mt-3 text-sm font-sans text-ink-2 dark:text-gray-300 leading-relaxed">
            Data science, web development, automation and community — the skills that move a project
            from field to production.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {CAPABILITIES.map((cap) => (
            <Card
              key={cap.num}
              padding="p-4 sm:p-5"
              className={cn(
                'group flex flex-col h-full',
                // Base shadow: hard 4px offset, white in dark so it reads on dark surfaces.
                'shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#ffffff]',
                // Hover: slam up + shadow collapses. Active: slam down + shadow gone.
                'hover:-translate-y-1 hover:shadow-[2px_2px_0_#000000] dark:hover:shadow-[2px_2px_0_#ffffff]',
                'active:translate-[4px_4px] active:shadow-none',
                'transition-all duration-100',
              )}
            >
              <div className="flex flex-col h-full">
                <div className="mb-2">
                  <span
                    className={cn(
                      'font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-current px-2 py-0.5 shrink-0',
                      cap.accentText,
                    )}
                  >
                    {cap.num}
                  </span>
                </div>

                <h3 className="font-display mt-1 mb-2 text-[14px] sm:text-[15px] font-bold uppercase tracking-wider leading-none text-ink dark:text-ink-dark">
                  {cap.name}
                </h3>

                <p className="mt-1 mb-auto font-sans text-xs sm:text-[11px] leading-relaxed text-ink-3 dark:text-gray-400">
                  {cap.skills.join(', ')}
                </p>

                <div className="mt-auto pt-3">
                  <div className="relative w-full h-8 rounded-0 border-2 border-ink-2/40 dark:border-white/30 overflow-hidden">
                    <div
                      className={cn('absolute left-0 top-0 h-full', cap.accentFill)}
                      style={{ width: `${cap.pct}%` }}
                    />
                    <span
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 font-mono text-[9px] sm:text-[10px] font-bold text-ink dark:text-ink-dark"
                      style={{ left: `${cap.pct}%` }}
                    >
                      {cap.pct}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </section>
  );
}
