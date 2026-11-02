import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Card } from '@/components/ui/Card';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HealthWorkItem {
  rank: number;
  title: string;
  tag: string;
  body: string;
  accent: 'yellow' | 'red' | 'blue';
}

export const HEALTH_WORK: HealthWorkItem[] = [
  {
    rank: 1,
    title: 'GAVB Gandhi Fellow — Bihar',
    tag: 'GANDHI FELLOWSHIP · PIRAMAL FOUNDATION',
    body:
      'District Resource Fellow, Gandhi Fellowship (Piramal Foundation), based in Muzaffarpur — living in the high-burden blocks and working the frontlines of Bihar\u2019s public health system.',
    accent: 'yellow',
  },
  {
    rank: 2,
    title: 'Frontline Worker Capacity Building',
    tag: 'ASHA · ANM · CHO · PHC',
    body:
      'Training frontline workers across the public health cadre — ASHA, ANM, CHO and PHC staff — on clinical protocols, records and digital tools that keep sub-centres running.',
    accent: 'red',
  },
  {
    rank: 3,
    title: 'M-ASHA Digital Application Training',
    tag: '100+ MICRO-SESSIONS',
    body:
      'Hands-on rollout of the M-ASHA digital application across 100+ micro-sessions at sector meetings, sub-centres and block headquarters — paper to tablet, village by village.',
    accent: 'yellow',
  },
  {
    rank: 4,
    title: 'NQAS Certification Support',
    tag: 'NATIONAL QUALITY ASSURANCE',
    body:
      'Physical vs digital register reconciliation across Sub-Centres and PHCs under the NQAS framework, prepping facilities for certification audits.',
    accent: 'blue',
  },
  {
    rank: 5,
    title: 'Maternal & Child Health Programs',
    tag: 'VHSND · GODBHARAI · PMSMA',
    body:
      'High-Risk Pregnancy tracking, labor room protocols and maternal-child health outreach at Village Health Sanitation and Nutrition Days, Godbharai and PMSMA clinics.',
    accent: 'red',
  },
  {
    rank: 6,
    title: '185-Hour Clinical Skills Refresher',
    tag: '12 NURSES · 4 DOCTORS',
    body:
      'Structured 5-week clinical skills refresher for 12 Staff Nurses and 4 Doctors — obstetric emergencies and labor room protocols at the district hospital.',
    accent: 'red',
  },
  {
    rank: 7,
    title: 'VHSND · Godbharai · PMSMA Data Pipeline',
    tag: 'PYTHON · PANDAS',
    body:
      'Python + Pandas pipelines scrubbing, validating and automating grassroots survey records to eliminate discrepancy windows ahead of Monday district review meetings.',
    accent: 'blue',
  },
  {
    rank: 8,
    title: 'MIS Reports for Block & District Review',
    tag: 'WEEKLY BLOCK SUMMARIES',
    body:
      'Automated MIS outputs verified ahead of block and district review cycles — field data turned into review-ready tables for BMOs and district leadership.',
    accent: 'blue',
  },
] as const;

const ACCENT: Record<string, { border: string; text: string; bg: string; ink: string }> = {
  yellow: {
    border: 'border-accent-yellow dark:border-primary-yellow',
    text: 'text-accent-yellow dark:text-primary-yellow',
    bg: 'bg-accent-yellow dark:bg-primary-yellow',
    ink: 'text-black dark:text-surface-dark',
  },
  red: {
    border: 'border-accent-red dark:border-vermilion',
    text: 'text-accent-red dark:text-vermilion',
    bg: 'bg-accent-red dark:bg-vermilion',
    ink: 'text-black dark:text-surface-dark',
  },
  blue: {
    border: 'border-accent-blue dark:border-electric-blue',
    text: 'text-accent-blue dark:text-electric-blue',
    bg: 'bg-accent-blue dark:bg-electric-blue',
    ink: 'text-black dark:text-surface-dark',
  },
};

export function HealthSystemStrengthening() {
  return (
    <section className="mt-16 lg:mt-20 border-b-2 border-primary dark:border-white pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-6 mb-10">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-blue dark:text-electric-blue block mb-1">
            {'/* System Outcomes */'}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-primary dark:text-ink-dark leading-none">
            Health System Strengthening
          </h2>
        </div>
        <p className="text-base leading-relaxed text-ink-2 dark:text-ink-2 max-w-md">
          Day-to-day fellowship work — support activities woven across Bihar\u2019s public health system, frontline to block.
        </p>
      </div>

      {/* Field note */}
      <div className="relative mb-12 lg:mb-16 bg-primary text-surface border-2 border-primary dark:border-white shadow-[6px_6px_0_#e6b800] dark:shadow-[6px_6px_0_#facc15] p-6 sm:p-8">
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-accent-yellow dark:bg-primary-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-black dark:text-surface-dark border-2 border-accent-yellow dark:border-primary-yellow">
          FIELD NOTE
        </div>
        <div className="flex items-start gap-4">
          <span className="text-primary text-4xl shrink-0" aria-hidden="true">
            \u201C
          </span>
          <div className="space-y-2">
            <blockquote className="font-display text-lg sm:text-xl font-bold tracking-tight text-surface leading-snug">
              &ldquo;I&rsquo;ve stood next to an ASHA worker filling an ODK form on a tablet in 38\u00b0C heat. Every pipeline I build starts with that moment.&rdquo;
            </blockquote>
            <div className="font-mono text-xs uppercase tracking-widest text-black dark:text-surface-dark font-bold">
              — ADITYA PANDEY · DISTRICT RESOURCE FELLOW, MUZAFFARPUR, BIHAR
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {HEALTH_WORK.map((item) => {
          const a = ACCENT[item.accent];
          return (
            <Card
              key={item.rank}
              className={cn(
                a.border,
                'group relative overflow-hidden transition-transform duration-200 hover:-translate-y-1 active:translate-y-0.5',
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-b-[inherit] pb-2">
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${a.text}`}>
                    0{item.rank} {' // '} {item.tag}
                  </span>
                </div>
                <h3 className={`font-display text-lg font-bold uppercase tracking-tight ${item.accent === 'yellow' ? 'text-black dark:text-surface-dark' : 'text-primary dark:text-ink-dark'}`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-3 dark:text-ink-3">{item.body}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
