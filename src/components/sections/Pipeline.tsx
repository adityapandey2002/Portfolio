import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

/* ------------------------------------------------------------------ */
/* V2 Pipeline — Bauhaus Neo-Brutalist "Collect → Clean → Analyse →
   Decide" four-stage DAG.                                            */
/*                                                                    */
/* Brutalist contract:                                                */
/*   • 0px border-radius everywhere                                   */
/*   • Thick solid borders (2px / 4px accent left border)             */
/*   • Hard offset shadows: 4px/4px standard, collapses on hover      */
/*   • Active state: slam down 4px/4px, shadow collapses to none      */
/*   • Uppercase tracking-wider labels; Space Grotesk headlines       */
/*   • Dark mode via Tailwind `dark:` variants (html.dark class)      */
/* ------------------------------------------------------------------ */

const STAGES = [
  {
    num: '01',
    title: 'COLLECT',
    body: 'ODK Collect forms, APIs, surveys — offline-first, structured.',
    borderLight: 'border-accent-blue',      // #0055ff
    borderDark: 'border-l-electric-blue',   // #3b82f6
    accentText: 'text-accent-blue',
    accentTextDark: 'dark:text-electric-blue',
    dotBg: 'bg-accent-blue',
    dotBgDark: 'dark:bg-electric-blue',
    status: 'ACTIVE',
  },
  {
    num: '02',
    title: 'CLEAN',
    body: 'Python + Pandas validation. Missing, malformed, outlier — fixed.',
    borderLight: 'border-accent-yellow',    // #ffcc00
    borderDark: 'border-l-primary-yellow',  // #facc15
    accentText: 'text-accent-yellow',
    accentTextDark: 'dark:text-primary-yellow',
    dotBg: 'bg-accent-yellow',
    dotBgDark: 'dark:bg-primary-yellow',
    status: 'ACTIVE',
  },
  {
    num: '03',
    title: 'ANALYSE',
    body: 'SQL, Dash, Plotly. The insight survives a room of sceptics.',
    borderLight: 'border-accent-red',       // #e63b2e
    borderDark: 'border-l-vermilion',       // #f97316
    accentText: 'text-accent-red',
    accentTextDark: 'dark:text-vermilion',
    dotBg: 'bg-accent-red',
    dotBgDark: 'dark:bg-vermilion',
    status: 'ACTIVE',
  },
  {
    num: '04',
    title: 'DECIDE',
    body: "MIS reports on decision-makers’ desks — Monday morning.",
    borderLight: 'border-primary',          // #1a1a1a near-black
    borderDark: 'border-l-white',           // #ffffff
    accentText: 'text-primary',
    accentTextDark: 'dark:text-white',
    dotBg: 'bg-primary',
    dotBgDark: 'dark:bg-white',
    status: 'ACTIVE',
  },
] as const;

function Arrow({
  dir,
  className,
}: {
  dir: 'right' | 'down';
  className?: string;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', dir === 'down' ? 'rotate-90' : '', className)}
      aria-hidden="true"
    >
      <path d="M3 12h18M15 6l3 6-3 6" />
    </svg>
  );
}

export function Pipeline() {
  return (
    <section id="pipeline" aria-label="Four-stage data pipeline" className="relative">
      <Section
        className={cn(
          'border-b-4 border-primary dark:border-white',
          'bg-surface dark:bg-surface-dark',
          'pb-12 lg:pb-20',
        )}
      >
        <div className="mb-10 lg:mb-14">
          <span className="eyebrow dark:text-ink-dark">02 · THE PIPELINE</span>
          <h2 className="font-display mt-3 text-[22px] font-bold uppercase tracking-wider leading-[1.12] text-ink dark:text-ink-dark">
            Raw data flows through four stages — never more
          </h2>
          <p className="section-sub mt-4 text-ink-2 dark:text-gray-300">
            Every project I touch follows the same pipeline. It keeps the work honest: collect only
            what matters, clean what’s broken, prove the insight, then act on it.
          </p>
        </div>

        <div
          className={cn(
            'relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8',
          )}
        >
          {/* Vertical connector line for the stacked mobile layout — visible only in the gaps between cards. */}
          <div
            className="absolute inset-y-0 left-[calc(50%-0.5px)] w-[1px] bg-primary dark:bg-white opacity-40 -z-10 md:hidden"
            aria-hidden="true"
          />

          {STAGES.map((stage, i) => (
            <div key={stage.num} className="relative">
              <Card
                className={cn(
                  // Thick 2px base border with a 4px accent left border per stage.
                  `border-l-4 ${stage.borderLight} dark:${stage.borderDark}`,
                  // Hover: slam up + shadow collapse. Active: slam down + shadow gone.
                  'hover:-translate-y-1 hover:shadow-[2px_2px_0_#000000] dark:hover:shadow-[2px_2px_0_#ffffff]',
                  'active:translate-[4px_4px] active:shadow-none transition-all duration-100',
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'font-mono text-[10px] font-bold uppercase tracking-wider border border-current px-2 py-0.5',
                        stage.accentText,
                        stage.accentTextDark,
                      )}
                    >
                      {stage.num}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full shrink-0',
                          stage.dotBg,
                          stage.dotBgDark,
                        )}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-ink-3 dark:text-gray-400">
                        {stage.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex-grow">
                    <h3 className="font-display text-[15px] font-bold uppercase tracking-wider leading-none text-ink dark:text-ink-dark">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-sans text-ink-2 dark:text-gray-300 leading-relaxed">
                      {stage.body}
                    </p>
                  </div>
                </div>

                {/* Connecting arrows (DAG).
                     Desktop (lg): right arrow after stages 1–3.
                     Tablet (md): right arrow after stages 1 & 3, down arrow after stage 2.
                     Mobile: down arrow after stages 1–3. */}
                {i < 3 && (
                  <>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                      <Arrow
                        dir="right"
                        className={cn(stage.accentText, stage.accentTextDark)}
                      />
                    </div>
                    {i % 2 === 0 && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden md:block lg:hidden">
                        <Arrow
                          dir="right"
                          className={cn(stage.accentText, stage.accentTextDark)}
                        />
                      </div>
                    )}
                  </>
                )}
                {i < 3 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 md:hidden w-4 h-4">
                    <Arrow dir="down" className={cn(stage.accentText, stage.accentTextDark)} />
                  </div>
                )}
                {i === 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 hidden md:block">
                    <Arrow dir="down" className={cn(stage.accentText, stage.accentTextDark)} />
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
