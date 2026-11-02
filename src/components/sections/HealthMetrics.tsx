import { Activity, Building2, MapPin, Stethoscope, Users } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Card } from '@/components/ui/Card';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HealthMetric {
  id: string;
  number: string;
  label: string;
  desc: string;
  accent: 'yellow' | 'red' | 'blue';
  icon: React.ElementType;
  meta: [string, string];
  /** Inverted "live kernel" card (Bihar Health Ops telemetry odometer). */
  kernel?: boolean;
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  asha: Users,
  refresher: Stethoscope,
  subcentres: Building2,
  blocks: MapPin,
  distance: Activity,
};

// Accent tokens per metric section. Colored borders / shadows / text so each
// metric reads as its own brutalist block, in both themes.
const ACCENT: Record<string, { border: string; shadow: string; text: string; bg: string; ink: string }> = {
  yellow: {
    border: 'border-accent-yellow dark:border-primary-yellow',
    shadow: 'shadow-[4px_4px_0_#e6b800] dark:shadow-[4px_4px_0_#facc15]',
    text: 'text-accent-yellow dark:text-primary-yellow',
    bg: 'bg-accent-yellow dark:bg-primary-yellow',
    ink: 'text-black dark:text-surface-dark',
  },
  red: {
    border: 'border-accent-red dark:border-vermilion',
    shadow: 'shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#000000]',
    text: 'text-accent-red dark:text-vermilion',
    bg: 'bg-transparent',
    ink: 'text-primary dark:text-ink-dark',
  },
  blue: {
    border: 'border-accent-blue dark:border-electric-blue',
    shadow: 'shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#000000]',
    text: 'text-accent-blue dark:text-electric-blue',
    bg: 'bg-transparent',
    ink: 'text-primary dark:text-ink-dark',
  },
};

export const HEALTH_METRICS: HealthMetric[] = [
  {
    id: 'asha',
    number: '700+',
    label: 'ASHA Workers Mentored',
    desc:
      'M-ASHA digital application rollout across 100+ micro-sessions at sector meetings, sub-centres and block headquarters — frontline worker capacity building, hands-on.',
    accent: 'yellow',
    icon: Users,
    meta: ['MICRO-SESSIONS: 100+', 'COMPLIANCE: 94%'],
  },
  {
    id: 'refresher',
    number: '185-hr',
    label: 'Clinical Skills Refresher',
    desc:
      '185-hour structured curriculum for 12 Staff Nurses and 4 Doctors — High-Risk Pregnancy management and labor room protocols, district hospital.',
    accent: 'red',
    icon: Stethoscope,
    meta: ['COHORT: 16 CLINICIANS', 'HRP PROTOCOLS'],
  },
  {
    id: 'subcentres',
    number: '154',
    label: 'Sub-Centres Audited',
    desc:
      'Physical vs digital register reconciliation across Sub-Centres and PHCs under the National Quality Assurance Standards (NQAS) framework.',
    accent: 'blue',
    icon: Building2,
    meta: ['NQAS FRAMEWORK', 'REGISTER RECON'],
  },
  {
    id: 'blocks',
    number: '16',
    label: 'High-Burden Blocks',
    desc:
      'Muzaffarpur district footprint — grassroots public health work across high-burden blocks, frontline clinics and riverine floodplain terrain.',
    accent: 'yellow',
    icon: MapPin,
    meta: ['BLOCKS: 16', 'MUZAFFARPUR, BIHAR'],
  },
  {
    id: 'distance',
    number: '13,627',
    label: 'km Field Distance',
    desc:
      'Live kernel odometer — travel logged between district HQ, remote sub-centres, riverine floodplains and frontline clinics. Bihar Health Ops telemetry.',
    accent: 'red',
    icon: Activity,
    meta: ['KERNEL: LIVE', 'TELEMETRY ACTIVE'],
    kernel: true,
  },
] as const;

export function HealthMetricCard({
  m,
  rank,
}: {
  m: HealthMetric;
  rank: number;
}) {
  const Icon = ICONS[m.id];
  const a = ACCENT[m.accent];
  const kernel = !!m.kernel;
  const surfaceText = kernel ? a.ink : 'text-primary dark:text-ink-dark';
  const descText = kernel ? 'text-black/80 dark:text-surface-dark/80' : 'text-ink-3 dark:text-ink-3';

  return (
    <Card
      className={cn(
        kernel && 'bg-accent-yellow dark:bg-primary-yellow',
        a.border,
        a.shadow,
        'group relative overflow-hidden transition-transform duration-200 hover:-translate-y-1 active:translate-y-0.5',
      )}
    >
      <div className="space-y-3">
        <div className={`flex items-center justify-between border-b-2 pb-2 w-full ${a.border}`}>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider ${a.text}`}>
              METRIC // {rank}
            </span>
            {kernel && (
              <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border-2 ${a.bg} ${a.ink}`}>
                LIVE KERNEL
              </span>
            )}
          </div>
          <Icon className={`h-5 w-5 ${a.text}`} aria-hidden="true" />
        </div>
        <div className="pt-1 lg:pt-0">
          <div className={`font-display font-bold text-5xl lg:text-6xl tracking-tight leading-none ${surfaceText}`}>
            {m.number}
          </div>
          <h3 className={`mt-2 font-display text-base font-bold uppercase tracking-tight ${surfaceText}`}>
            {m.label}
          </h3>
          <p className={`mt-3 text-sm leading-relaxed ${descText}`}>{m.desc}</p>
        </div>
        <div className="mt-6 pt-4 border-t-2 {a.border} flex items-center justify-between text-[11px] font-mono uppercase font-bold gap-3">
          <span>{m.meta[0]}</span>
          <span className={`${a.bg} ${a.ink} px-2 py-0.5 border border-[inherit]}`}>{m.meta[1]}</span>
        </div>
      </div>
    </Card>
  );
}

export function HealthMetrics() {
  return (
    <section className="mt-16 lg:mt-20 border-b-2 border-primary dark:border-white pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-6 mb-8">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-red dark:text-vermilion block mb-1">
            Audited Telemetry
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-primary dark:text-ink-dark leading-none">
            Primary Field Metrics Ledger
          </h2>
        </div>
        <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink-3 dark:text-ink-3">
          Total Active Blocks: 16 &nbsp;//&nbsp; Population Footprint: 4.8M+
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HEALTH_METRICS.map((m, i) => (
          <HealthMetricCard key={m.id} m={m} rank={i + 1} />
        ))}
      </div>
    </section>
  );
}
