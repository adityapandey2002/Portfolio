'use client';

import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowRight,
  Database,
  FileTerminal,
  MapPin,
  SendHorizontal,
  Stethoscope,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricItem {
  number: string;
  label: string;
  value: string;
  unit: string;
  desc: string;
  Icon: LucideIcon;
  iconColor: string;
  unitColor: string;
  valueColor: string;
  descColor: string;
  numberColor: string;
  bg: string;
}

const METRICS: MetricItem[] = [
  {
    number: '01',
    label: 'IMPACT',
    value: '700+',
    unit: 'ASHA Workers Mentored',
    desc: 'Hands-on M-ASHA digital rollout, field diagnostics, and portal verification sessions across frontline clusters.',
    Icon: Users,
    iconColor: 'text-primary dark:text-[#facc15]',
    unitColor: 'text-secondary',
    valueColor: 'text-on-surface',
    descColor: 'text-on-surface-variant dark:text-[#a1a1aa]',
    numberColor: 'text-on-surface-variant dark:text-[#a1a1aa]',
    bg: 'bg-surface-container dark:bg-[#202024]',
  },
  {
    number: '02',
    label: 'CLINICAL',
    value: '185-hr',
    unit: 'Clinical Skills Refresher',
    desc: 'Structured 5-week curriculum for 12 staff nurses & 4 medical doctors on high-risk pregnancy protocols.',
    Icon: Stethoscope,
    iconColor: 'text-on-primary-container dark:text-black',
    unitColor: 'text-primary dark:text-black',
    valueColor: 'text-on-primary-container dark:text-black',
    descColor: 'text-on-primary-container dark:text-black',
    numberColor: 'text-on-primary-container dark:text-black',
    bg: 'bg-primary-container dark:bg-[#facc15]',
  },
  {
    number: '03',
    label: 'DATA & AI',
    value: '252k+',
    unit: 'Indicators & Survey Records',
    desc: 'Global & district datasets cleaned and indexed with 97% fewer DB queries and 181-field clinical voice AI.',
    Icon: Database,
    iconColor: 'text-primary dark:text-[#facc15]',
    unitColor: 'text-tertiary',
    valueColor: 'text-on-surface',
    descColor: 'text-on-surface-variant dark:text-[#a1a1aa]',
    numberColor: 'text-on-surface-variant dark:text-[#a1a1aa]',
    bg: 'bg-surface-container dark:bg-[#202024]',
  },
  {
    number: '04',
    label: 'FIELD OPS',
    value: '154',
    unit: 'Sub-Centres Audited',
    desc: 'Physical vs. digital register reconciliation across 16 high-burden Bihar blocks under NQAS standards.',
    Icon: MapPin,
    iconColor: 'text-primary dark:text-[#facc15]',
    unitColor: 'text-primary dark:text-[#facc15]',
    valueColor: 'text-on-surface',
    descColor: 'text-on-surface-variant dark:text-[#a1a1aa]',
    numberColor: 'text-on-surface-variant dark:text-[#a1a1aa]',
    bg: 'bg-surface-container-lowest dark:bg-[#0f0f11]',
  },
];

const SNAPSHOT_ROWS = [
  {
    label: 'Production Builds',
    value: '7 Flagships + 3 Specialized',
    tone: 'bg-primary text-on-primary dark:bg-[#facc15] dark:text-[#121214] px-2 py-0.5',
  },
  {
    label: 'Automated QA Suites',
    value: '327+ Tests Passing',
    tone: 'text-primary dark:text-[#facc15]',
  },
  {
    label: 'Clinical AI & Offline PWA',
    value: '181-Field Scribe · 0% Loss',
    tone: 'text-secondary',
  },
  {
    label: 'Public Health Footprint',
    value: '16 Blocks · 13,627 KM',
    tone: 'text-tertiary',
  },
  {
    label: 'Live Web Deployments',
    value: '5 Public Production Apps',
    tone: 'text-primary dark:text-[#facc15]',
  },
];

const BTN_SHELL =
  'inline-flex items-center justify-center gap-2 rounded-0 border-2 border-primary dark:border-[#3f3f46] font-headline font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-3 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1a1a1a] dark:active:shadow-[2px_2px_0px_#000000] transition-all duration-100';

const BTN_VARIANTS = {
  systems:
    'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary dark:bg-[#facc15] dark:text-[#121214] dark:hover:bg-white dark:hover:text-black',
  vector:
    'bg-surface-container-lowest text-on-surface hover:bg-accent-red hover:text-white hover:border-accent-red dark:bg-[#18181b] dark:text-[#f4f4f5] dark:hover:bg-[#ff6b5b] dark:hover:text-[#121214]',
  dispatch:
    'bg-surface text-on-surface hover:bg-tertiary hover:text-white hover:border-accent-blue dark:bg-[#161619] dark:text-[#f4f4f5] dark:hover:bg-[#60a5fa] dark:hover:text-[#121214]',
} as const;

interface HeroButtonProps {
  variant: keyof typeof BTN_VARIANTS;
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function HeroButton({ variant, href, icon, children }: HeroButtonProps) {
  return (
    <Link href={href} className={`${BTN_SHELL} ${BTN_VARIANTS[variant]}`}>
      {children}
      {icon}
    </Link>
  );
}

function MetricBlock({
  number,
  label,
  value,
  unit,
  desc,
  Icon,
  iconColor,
  unitColor,
  valueColor,
  descColor,
  numberColor,
  bg,
}: MetricItem) {
  return (
    <div
      className={`${bg} border-2 border-primary dark:border-[#3f3f46] p-5 flex flex-col justify-between shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#1a1a1a] dark:hover:shadow-[2px_2px_0px_#000000] transition-all`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`font-mono text-xs font-bold uppercase tabular-nums ${numberColor}`}>
          {number} · {label}
        </span>
        <Icon size={18} className={iconColor} aria-hidden="true" />
      </div>
      <div className="my-3.5">
        <div className={`font-headline text-4xl lg:text-5xl font-bold tracking-tight tabular-nums ${valueColor}`}>
          {value}
        </div>
        <div className={`font-headline font-bold text-xs uppercase tracking-wider mt-1 ${unitColor}`}>
          {unit}
        </div>
      </div>
      <p className={`font-body text-xs leading-relaxed ${descColor}`}>{desc}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative w-full flex flex-col">
      <section className="w-full border-b-4 border-primary dark:border-[#3f3f46] py-6 lg:py-10 bg-surface dark:bg-[#161619] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 xl:col-span-8 space-y-5">
              <div className="inline-block bg-primary-container text-on-primary-container dark:bg-[#facc15] dark:text-[#121214] px-3.5 py-1 border-2 border-primary dark:border-[#3f3f46] font-headline text-[11px] font-bold uppercase tracking-widest shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#000000]">
                Public Health Data Architecture × Full-Stack Engineering
              </div>

              <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.03] uppercase">
                Building data systems that turn{' '}
                <span className="bg-primary text-on-primary dark:bg-[#facc15] dark:text-[#121214] px-2 inline-block">
                  field work
                </span>{' '}
                into real decisions.
              </h1>

              <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                I am <strong className="font-bold text-on-surface">Aditya Pandey</strong> — a full-stack engineer and public health data practitioner bridging frontline health systems (<span className="font-semibold text-on-surface">ASHA, ANM, CHO, PHC</span>) with production web platforms, automated validation pipelines, and clinical voice AI.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <HeroButton variant="systems" href="#systems" icon={<ArrowDownRight size={15} aria-hidden="true" />}>
                  Explore Live Systems
                </HeroButton>
                <HeroButton variant="vector" href="/ask" icon={<FileTerminal size={15} aria-hidden="true" />}>
                  Ask AI Assistant
                </HeroButton>
                <HeroButton variant="dispatch" href="#dispatch" icon={<SendHorizontal size={15} aria-hidden="true" />}>
                  Get in Touch
                </HeroButton>
              </div>
            </div>

            {/* Recruiter-focused Production & Field Snapshot */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="relative rounded-0 border-[3px] border-primary dark:border-[#3f3f46] bg-surface-container-lowest dark:bg-[#1a1a1f] shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#000000] p-4">
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b-2 border-primary dark:border-[#3f3f46] mb-3">
                  <div className="min-w-0">
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-on-surface block">
                      Recruiter Snapshot
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant block truncate">
                      Verified Engineering &amp; Field Scale
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap bg-primary-container dark:bg-[#facc15] text-on-primary-container dark:text-[#121214] px-2 py-0.5 font-mono font-bold text-[10px] uppercase border border-primary dark:border-[#3f3f46]">
                    2024–2026
                  </span>
                </div>

                <dl className="space-y-2 font-mono text-[11px]">
                  {SNAPSHOT_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center gap-2 px-2.5 py-2 bg-surface dark:bg-[#232329] border border-primary/20 dark:border-[#3f3f46]"
                    >
                      <dt className="text-on-surface-variant dark:text-[#a1a1aa]">
                        {row.label}
                      </dt>
                      <dd className={`font-bold tabular-nums text-right ${row.tone}`}>
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-3 pt-2.5 border-t-2 border-primary dark:border-[#3f3f46] flex items-center justify-between gap-2 text-[11px] font-headline font-bold uppercase tracking-wider">
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-1 text-on-surface hover:text-secondary dark:hover:text-[#facc15] transition-colors"
                  >
                    <span>All 10 Projects</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/health"
                    className="inline-flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span>Health Ledger</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {METRICS.map((metric) => (
              <MetricBlock key={metric.number} {...metric} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
