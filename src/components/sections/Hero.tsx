'use client';

import Link from 'next/link';
import { ArrowDownRight, FileTerminal, SendHorizontal } from 'lucide-react';

/**
 * V2 Hero — Bauhaus Neo-Brutalist home page hero.
 *
 * Palette follows the supplied light/dark samples exactly:
 *   light — paper surface, ink borders, yellow / red / blue accents
 *   dark  — #121214 page, #161619 alt surface, #3f3f46 outlines,
 *           #facc15 primary, #ff6b5b secondary, #60a5fa tertiary
 *
 * Brutalist contract: 0px radius, thick solid borders, hard offset
 * shadows, uppercase tracking, Space Grotesk / Inter / JetBrains Mono.
 */

const METRICS = [
  {
    number: '01',
    label: 'IMPACT',
    value: '700+',
    unit: 'ASHA Workers Mentored',
    desc: 'Digitized M-ASHA workflow, field diagnostics, and portal verification sessions across frontline clusters.',
    icon: 'groups',
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
    desc: 'Delivered for 12 facility staff nurses & 4 medical doctors on high-risk protocol management & triage.',
    icon: 'medical_services',
    iconColor: 'text-on-primary-container dark:text-black',
    unitColor: 'text-primary dark:text-black',
    valueColor: 'text-on-primary-container dark:text-black',
    descColor: 'text-on-primary-container dark:text-black',
    numberColor: 'text-on-primary-container dark:text-black',
    bg: 'bg-primary-container dark:bg-[#facc15]',
  },
  {
    number: '03',
    label: 'PIPELINE',
    value: '118k+',
    unit: 'Validated Data Indicators',
    desc: 'Processed, cleaned, and reconciled across physical registers and state portals via Python pipelines.',
    icon: 'database',
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
    value: '100+',
    unit: 'Micro-Mentoring Sessions',
    desc: 'Executed inside Sub-Centres, PHCs & CHCs addressing frontline data-entry bottlenecks.',
    icon: 'location_on',
    iconColor: 'text-primary dark:text-[#facc15]',
    unitColor: 'text-primary dark:text-[#facc15]',
    valueColor: 'text-on-surface',
    descColor: 'text-on-surface-variant dark:text-[#a1a1aa]',
    numberColor: 'text-on-surface-variant dark:text-[#a1a1aa]',
    bg: 'bg-surface-container-lowest dark:bg-[#0f0f11]',
  },
];

const BTN_SHELL =
  'inline-flex items-center justify-center gap-2 rounded-0 border-2 border-primary dark:border-[#3f3f46] font-headline font-bold text-sm uppercase tracking-wider px-6 py-3.5 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1a1a1a] dark:active:shadow-[2px_2px_0px_#000000] transition-all duration-100';

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
      <span className="material-symbols-outlined text-sm">{icon}</span>
    </Link>
  );
}

interface MetricBlockProps {
  number: string;
  label: string;
  value: string;
  unit: string;
  desc: string;
  icon: string;
  iconColor: string;
  unitColor: string;
  valueColor: string;
  descColor: string;
  numberColor: string;
  bg: string;
}

function MetricBlock({
  number,
  label,
  value,
  unit,
  desc,
  icon,
  iconColor,
  unitColor,
  valueColor,
  descColor,
  numberColor,
  bg,
}: MetricBlockProps) {
  return (
    <div
      className={`${bg} border-2 border-primary dark:border-[#3f3f46] p-5 flex flex-col justify-between shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#1a1a1a] dark:hover:shadow-[2px_2px_0px_#000000] transition-all`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`font-mono text-xs font-bold uppercase ${numberColor}`}>
          {number} {"/"} {label}
        </span>
        <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
      </div>
      <div className="my-4">
        <div className={`font-headline text-5xl font-bold tracking-tight ${valueColor}`}>
          {value}
        </div>
        <div className={`font-headline font-bold text-xs uppercase tracking-wider mt-1 ${unitColor}`}>
          {unit}
        </div>
      </div>
      <p className={`font-body text-xs ${descColor}`}>{desc}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative w-full flex flex-col">
      {/* 1 · Hero Section */}
      <section className="w-full border-b-4 border-primary dark:border-[#3f3f46] py-5 lg:py-10 bg-surface dark:bg-[#161619] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-5">
              {/* Eyebrow badge */}
              <div className="inline-block bg-primary-container text-on-primary-container dark:bg-[#facc15] dark:text-[#121214] px-3.5 py-1 border-2 border-primary dark:border-[#3f3f46] font-headline text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#000000]">
                Public Health Data Architecture × Full-Stack Systems
              </div>

              {/* Headline */}
              <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface leading-[1.02] uppercase">
                Building data systems that turn{' '}
                <span className="bg-primary text-on-primary dark:bg-[#facc15] dark:text-[#121214] px-2 inline-block">
                  field work
                </span>{' '}
                into real decisions.
              </h1>

              {/* Paragraph */}
              <p className="font-body text-base sm:text-lg text-on-surface leading-relaxed max-w-3xl border-l-4 border-secondary dark:border-secondary pl-4 py-1">
                I am <strong className="font-bold text-primary dark:text-[#facc15]">Aditya Pandey</strong> — a full-stack builder & public health data engineer bridging on-the-ground frontline health systems (<em className="not-italic font-semibold">ASHA, ANM, CHO, PHC</em>) with production web platforms, automated validation pipelines, and clinical AI surveillance.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <HeroButton variant="systems" href="#systems" icon={<ArrowDownRight size={16} aria-hidden="true" />}>
                  Explore Selected Systems
                </HeroButton>
                <HeroButton variant="vector" href="#vector-terminal" icon={<FileTerminal size={16} aria-hidden="true" />}>
                  Ask AI Vector Brain
                </HeroButton>
                <HeroButton variant="dispatch" href="#dispatch" icon={<SendHorizontal size={16} aria-hidden="true" />}>
                  Direct Dispatch
                </HeroButton>
              </div>
            </div>

            {/* Live Kernel telemetry box */}
            <div className="lg:col-span-4">
              <div className="relative rounded-0 border-[3px] border-primary dark:border-[#3f3f46] bg-surface-container-lowest dark:bg-[#161619] shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#000000] p-4">
                <div className="absolute -top-2 right-3 bg-accent-red text-black dark:text-[#121214] px-2 py-0.5 font-headline font-bold text-[10px] uppercase tracking-widest border-2 border-primary dark:border-[#3f3f46]">
                  LIVE KERNEL
                </div>
                <div className="flex items-center justify-between pb-2 border-b-2 border-primary dark:border-[#3f3f46] mb-3">
                  <span className="font-headline font-bold text-[10px] uppercase tracking-widest text-on-surface">
                    Bihar Health Ops
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-red animate-pulse inline-block" />
                </div>
                <div className="space-y-2.5 font-mono text-[10px]">
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-[#202024] border border-primary dark:border-[#3f3f46]">
                    <span className="text-on-surface-variant dark:text-[#a1a1aa] uppercase">PNC Telemetry Latency:</span>
                    <span className="font-bold text-on-primary bg-primary dark:bg-[#facc15] dark:text-[#121214] px-1 py-0.5">
                      54.2 ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-[#202024] border border-primary dark:border-[#3f3f46]">
                    <span className="text-on-surface-variant dark:text-[#a1a1aa] uppercase">Active Sub-Centres:</span>
                    <span className="font-bold text-primary dark:text-[#facc15]">154 Facilities</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-[#202024] border border-primary dark:border-[#3f3f46]">
                    <span className="text-on-surface-variant dark:text-[#a1a1aa] uppercase">High-Burden Blocks:</span>
                    <span className="font-bold text-secondary">16 Blocks</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-[#202024] border border-primary dark:border-[#3f3f46]">
                    <span className="text-on-surface-variant dark:text-[#a1a1aa] uppercase">Field Distance Logged:</span>
                    <span className="font-bold text-tertiary">13,627 KM</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-[#202024] border border-primary dark:border-[#3f3f46]">
                    <span className="text-on-surface-variant dark:text-[#a1a1aa] uppercase">Validation Rule Engines:</span>
                    <span className="font-bold text-primary dark:text-[#facc15]">Active (ODK/SQL)</span>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t-2 border-primary dark:border-[#3f3f46] flex items-center justify-between text-[9px] font-mono text-on-surface-variant dark:text-[#a1a1aa]">
                  <span className="">UPTIME: 99.8%</span>
                  <span className="">NODE: ARARIA-CHIS-01</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 · 4 Brutalist Key Metric Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {METRICS.map((metric) => (
              <MetricBlock key={metric.number} {...metric} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
