'use client';

import Link from 'next/link';
import { Activity, ArrowDownRight, FileTerminal, SendHorizontal } from 'lucide-react';

/**
 * V2 Hero — Bauhaus Neo-Brutalist home page hero.
 *
 * Matches the design file exactly:
 * - Meta Grid (SPEC badge + FIELD TELEMETRY)
 * - Headline Grid (8-col left / 4-col Live Kernel telemetry box)
 * - 4 Brutalist Key Metric Blocks
 *
 * Brutalist contract:
 *   • 0px border-radius everywhere
 *   • Thick solid borders (2-4px)
 *   • Hard offset shadows (4px/4px standard, 6px/6px high emphasis)
 *   • Active state: slam down 4px/4px + shadow collapse
 *   • Uppercase + tracking-wider labels
 *   • Space Grotesk headlines, Inter body, JetBrains Mono labels
 *   • Light + dark mode via Tailwind `dark:` variants
 */

const METRICS = [
  {
    number: '01',
    label: 'IMPACT',
    value: '700+',
    unit: 'ASHA Workers Mentored',
    desc: 'Digitized M-ASHA workflow, field diagnostics, and portal verification sessions across frontline clusters.',
    icon: 'groups',
    iconColor: 'text-primary dark:text-white',
    bg: 'bg-surface-container dark:bg-surface-container-lowest',
  },
  {
    number: '02',
    label: 'CLINICAL',
    value: '185-hr',
    unit: 'Clinical Skills Refresher',
    desc: 'Delivered for 12 facility staff nurses & 4 medical doctors on high-risk protocol management & triage.',
    icon: 'medical_services',
    iconColor: 'text-on-primary-container dark:text-on-primary-container',
    bg: 'bg-primary-container dark:bg-primary-yellow',
  },
  {
    number: '03',
    label: 'PIPELINE',
    value: '118k+',
    unit: 'Validated Data Indicators',
    desc: 'Processed, cleaned, and reconciled across physical registers and state portals via Python pipelines.',
    icon: 'database',
    iconColor: 'text-primary dark:text-white',
    bg: 'bg-surface-container dark:bg-surface-container-lowest',
  },
  {
    number: '04',
    label: 'FIELD OPS',
    value: '100+',
    unit: 'Micro-Mentoring Sessions',
    desc: 'Executed inside Sub-Centres, PHCs & CHCs addressing frontline data-entry bottlenecks.',
    icon: 'location_on',
    iconColor: 'text-primary dark:text-white',
    bg: 'bg-surface-container-lowest dark:bg-surface-container-lowest',
  },
];

const BTN_SHELL =
  'inline-flex items-center justify-center gap-2 rounded-0 border-2 border-primary dark:border-white font-headline font-bold text-sm uppercase tracking-wider px-6 py-3.5 shadow-[5px_5px_0px_#1a1a1a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1a1a1a] transition-all duration-100';

const BTN_VARIANTS = {
  systems:
    'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary',
  vector:
    'bg-surface-container-lowest text-on-surface hover:bg-accent-red hover:text-on-secondary hover:border-accent-red',
  dispatch:
    'bg-surface text-on-surface hover:bg-tertiary hover:text-on-tertiary hover:border-accent-blue',
} as const;

interface HeroButtonProps {
  variant: keyof typeof BTN_VARIANTS;
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function HeroButton({ variant, href, icon, children }: HeroButtonProps) {
  return (
    <Link
      href={href}
      className={`${BTN_SHELL} ${BTN_VARIANTS[variant]}`}
    >
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
  bg: string;
}

function MetricBlock({ number, label, value, unit, desc, icon, iconColor, bg }: MetricBlockProps) {
  return (
    <div
      className={`${bg} border-2 border-primary dark:border-white p-5 flex flex-col justify-between shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#1a1a1a] dark:hover:shadow-[2px_2px_0px_#ffffff] transition-all`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs font-bold text-on-surface-variant dark:text-on-surface-variant uppercase">
          {number} {"/"} {label}
        </span>
        <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
      </div>
      <div className="my-4">
        <div className="font-headline text-5xl font-bold tracking-tight text-on-surface dark:text-on-surface">
          {value}
        </div>
        <div className={`font-headline font-bold text-xs uppercase tracking-wider mt-1 ${iconColor}`}>
          {unit}
        </div>
      </div>
      <p className={`font-body text-xs ${iconColor === 'text-primary dark:text-white' ? 'text-on-surface-variant dark:text-on-surface-variant' : 'text-on-primary-container dark:text-on-primary-container'}`}>
        {desc}
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative w-full flex flex-col">
      {/* 1 · Hero Section */}
      <section className="w-full border-b-4 border-primary dark:border-white py-5 lg:py-10 bg-surface dark:bg-surface-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Meta Grid */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-primary dark:border-white pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-headline text-xs font-bold uppercase tracking-widest bg-surface-container dark:bg-surface-container-lowest text-on-surface dark:text-on-surface px-2.5 py-1 border-2 border-primary dark:border-white">
                SPEC: 01 // OVERVIEW
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant dark:text-on-surface-variant font-semibold">
                COORDINATES: 26.1209° N, 85.3647° E
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase tracking-widest bg-accent-blue dark:bg-accent-blue text-black dark:text-white px-2.5 py-1 border-2 border-primary dark:border-white">
              <Activity size={14} className="shrink-0" aria-hidden="true" />
              FIELD TELEMETRY: ONLINE
            </div>
          </div>

          {/* Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-5">
              {/* Eyebrow badge */}
              <div className="inline-block bg-accent-yellow dark:bg-primary-yellow text-black dark:text-white px-3.5 py-1 border-2 border-primary dark:border-white font-headline text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
                Public Health Data Architecture × Full-Stack Systems
              </div>

              {/* Headline */}
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-on-surface dark:text-on-surface leading-[1.02] uppercase">
                Building data systems that turn <span className="bg-primary text-on-primary px-2 inline-block">field work</span> into real decisions.
              </h1>

              {/* Paragraph */}
              <p className="font-body text-sm sm:text-base text-on-surface dark:text-on-surface leading-relaxed max-w-none text-on-surface dark:text-on-surface border-l-4 border-accent-red dark:border-accent-red pl-3 py-1.5">
                I am <strong className="font-bold text-primary dark:text-white">Aditya Pandey</strong> — a full-stack builder & public health data engineer bridging on-the-ground frontline health systems (<em className="not-italic font-semibold">ASHA, ANM, CHO, PHC</em>) with production web platforms, automated validation pipelines, and clinical AI surveillance.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
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
              <div className="relative rounded-0 border-[3px] border-primary dark:border-white bg-surface-container-lowest dark:bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] p-4">
                <div className="absolute -top-2 right-3 bg-accent-red dark:bg-accent-red text-white px-2 py-0.5 font-headline font-bold text-[10px] uppercase tracking-widest border-2 border-primary dark:border-white">
                  LIVE KERNEL
                </div>
                <div className="flex items-center justify-between pb-2 border-b-2 border-primary dark:border-white mb-3">
                  <span className="font-headline font-bold text-[10px] uppercase tracking-widest text-on-surface dark:text-on-surface">
                    Bihar Health Ops
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-red dark:bg-accent-red animate-pulse inline-block" />
                </div>
                <div className="space-y-2.5 font-mono text-[10px]">
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">PNC Telemetry Latency:</span>
                    <span className="font-bold text-primary dark:text-white bg-accent-yellow dark:bg-primary-yellow text-black px-1 py-0.5">
                      54.2 ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">Active Sub-Centres:</span>
                    <span className="font-bold text-primary dark:text-white">154 Facilities</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">High-Burden Blocks:</span>
                    <span className="font-bold text-primary dark:text-white">16 Blocks</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">Field Distance Logged:</span>
                    <span className="font-bold text-primary dark:text-white">13,627 KM</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">Validation Rule Engines:</span>
                    <span className="font-bold text-primary dark:text-white">Active (ODK/SQL)</span>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t-2 border-primary dark:border-white flex items-center justify-between text-[9px] font-mono text-on-surface-variant dark:text-on-surface-variant">
                  <span className="">UPTIME: 99.8%</span>
                  <span className="">NODE: ARARIA-CHIS-01</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 · 4 Brutalist Key Metric Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            {METRICS.map((metric) => (
              <MetricBlock key={metric.number} {...metric} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}



