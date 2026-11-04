'use client';

import Link from 'next/link';
import { Activity, ArrowDownRight, FileTerminal, SendHorizontal } from 'lucide-react';

/**
 * V2 Hero — Bauhaus Neo-Brutalist home page hero.
 *
 * Matches the design file exactly:
 * - Top Marquee Ticker (STATUS // FIELD ACTIVE + scrolling telemetry)
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

const TICKER_ITEMS = [
  '// PIRAMAL FOUNDATION GAVB FELLOW',
  '// MUZAFFARPUR & ARARIA, BIHAR',
  '// 99.8% PIPELINE SYNC RATE',
  '// FRONT-LINE CLINICAL SURVEILLANCE',
  '// DEPLOYING DETERMINISTIC CODE',
  '// 154 SUB-CENTRES INTEGRATED',
];

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
          {number} // {label}
        </span>
        <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
      </div>
      <div className="my-4">
        <div className="font-headline text-5xl font-bold tracking-tight text-on-surface dark:text-on-surface">
          {value}
        </div>
        <div className={`font-headline font-bold text-xs uppercase tracking-wider mt-1 ${iconColor.replace('text', 'text')}`}>
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
      {/* 1 · Top Marquee Ticker */}
      <div className="w-full shrink-0 bg-primary dark:bg-surface-dark border-b-2 border-primary dark:border-white py-2.5 px-4 flex items-center gap-6">
        <div className="flex items-center gap-2 font-headline font-bold text-xs uppercase tracking-widest bg-accent-yellow dark:bg-primary-yellow text-black dark:text-white px-2 py-0.5 border border-primary shrink-0">
          <span className="w-2 h-2 rounded-none bg-accent-red dark:bg-accent-red animate-ping inline-block" />
          STATUS // FIELD ACTIVE
        </div>
        <div className="flex-1 min-w-0" aria-label="Field telemetry ticker">
          <div
            className="font-mono text-xs uppercase tracking-widest flex items-center gap-8 whitespace-nowrap overflow-x-auto no-scrollbar animate-[marquee_22s_linear_infinite] will-change-transform"
            aria-hidden="true"
          >
            {TICKER_ITEMS.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
            {TICKER_ITEMS.map((item, i) => (
              <span key={i + 1000}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 2 · Hero Section */}
      <section className="w-full border-b-4 border-primary dark:border-white py-10 lg:py-16 bg-surface dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Meta Grid */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-xs font-bold uppercase tracking-widest bg-surface-container dark:bg-surface-container-lowest text-on-surface dark:text-on-surface px-3 py-1 border-2 border-primary dark:border-white">
                SPEC: 01 // OVERVIEW
              </span>
              <span className="font-mono text-xs text-on-surface-variant dark:text-on-surface-variant font-semibold">
                COORDINATES: 26.1209° N, 85.3647° E
              </span>
            </div>
            <div className="inline-flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-widest bg-accent-blue dark:bg-accent-blue text-black dark:text-white px-3 py-1 border-2 border-primary dark:border-white">
              <Activity size={14} className="shrink-0" aria-hidden="true" />
              FIELD TELEMETRY: ONLINE
            </div>
          </div>

          {/* Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-block bg-accent-yellow dark:bg-primary-yellow text-black dark:text-white px-4 py-1.5 border-2 border-primary dark:border-white font-headline text-xs md:text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
                Public Health Data Architecture × Full-Stack Systems
              </div>

              {/* Headline */}
              <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface dark:text-on-surface leading-[1.02] uppercase">
                Building data systems that turn <span className="bg-primary dark:bg-surface-dark text-on-primary dark:text-on-primary px-2 inline-block">field work</span> into real decisions.
              </h1>

              {/* Paragraph */}
              <p className="font-body text-base sm:text-lg text-on-surface dark:text-on-surface leading-relaxed max-w-3xl border-l-4 border-accent-red dark:border-accent-red pl-4 py-1">
                I am <strong className="font-bold text-primary dark:text-white">Aditya Pandey</strong> — a full-stack builder & public health data engineer bridging on-the-ground frontline health systems (<em className="not-italic font-semibold">ASHA, ANM, CHO, PHC</em>) with production web platforms, automated validation pipelines, and clinical AI surveillance.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <HeroButton variant="systems" href="#systems" icon={<ArrowDownRight size={18} aria-hidden="true" />}>
                  Explore Selected Systems
                </HeroButton>
                <HeroButton variant="vector" href="#vector-terminal" icon={<FileTerminal size={18} aria-hidden="true" />}>
                  Ask AI Vector Brain
                </HeroButton>
                <HeroButton variant="dispatch" href="#dispatch" icon={<SendHorizontal size={18} aria-hidden="true" />}>
                  Direct Dispatch
                </HeroButton>
              </div>
            </div>

            {/* Live Kernel telemetry box */}
            <div className="lg:col-span-4">
              <div className="relative rounded-0 border-[3px] border-primary dark:border-white bg-surface-container-lowest dark:bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] p-6">
                <div className="absolute -top-3.5 right-4 bg-accent-red dark:bg-accent-red text-white px-2.5 py-0.5 font-headline font-bold text-xs uppercase tracking-widest border border-primary dark:border-white">
                  LIVE KERNEL
                </div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-primary dark:border-white mb-4">
                  <span className="font-headline font-bold text-xs uppercase tracking-widest text-on-surface dark:text-on-surface">
                    Bihar Health Ops
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-red dark:bg-accent-red animate-pulse inline-block" />
                </div>
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center p-2 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">PNC Telemetry Latency:</span>
                    <span className="font-bold text-primary dark:text-white bg-accent-yellow dark:bg-primary-yellow text-black px-1.5 py-0.5">
                      54.2 ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">Active Sub-Centres:</span>
                    <span className="font-bold text-primary dark:text-white">154 Facilities</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">High-Burden Blocks:</span>
                    <span className="font-bold text-accent-red dark:text-accent-red">16 Blocks</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">Field Distance Logged:</span>
                    <span className="font-bold text-accent-blue dark:text-accent-blue">13,627 KM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-surface dark:bg-surface-container-lowest border border-primary dark:border-white">
                    <span className="text-on-surface-variant dark:text-on-surface-variant uppercase">Validation Rule Engines:</span>
                    <span className="font-bold text-primary dark:text-white">Active (ODK/SQL)</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t-2 border-primary dark:border-white flex items-center justify-between text-[11px] font-mono text-on-surface-variant dark:text-on-surface-variant">
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
