import { Activity, ArrowDownRight, Database, FileTerminal, MapPin, SendHorizontal, Users } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';

/* ------------------------------------------------------------------ */
/* V2 Hero — Bauhaus Neo-Brutalist home page hero.                    */
/*                                                                    */
/* Brutalist contract (non-negotiable, enforced in every variant):    */
/*   • 0px border-radius everywhere                                   */
/*   • Thick solid borders (2px light / white dark)                   */
/*   • Hard offset shadows: 4px/4px standard, 6px/6px high emphasis   */
/*   • Active state: slam down 4px/4px, shadow collapses              */
/*   • Uppercase + tracking-wider labels; Space Grotesk headlines     */
/*   • Dark mode via Tailwind `dark:` variants (html.dark class)      */
/* ------------------------------------------------------------------ */

const TICKER_ITEMS = [
  '// PIRAMAL FOUNDATION GAVB FELLOW',
  '// MUZAFFARPUR & ARARIA, BIHAR',
  '// 99.8% PIPELINE SYNC RATE',
  '// FRONT-LINE CLINICAL SURVEILLANCE',
  '// DEPLOYING DETERMINISTIC CODE',
  '// 154 SUB-CENTRES INTEGRATED',
];

// Shared brutalist button shell: 2px border, zero radius, hard offset
// shadow (black light / white dark). Active state slams the button down
// 4px/4px and collapses the shadow to a shallow 2px/2px offset.
const BTN_SHELL =
  'inline-flex items-center justify-center gap-2 rounded-0 border-2 border-primary dark:border-white font-display font-bold text-sm uppercase tracking-wider px-6 py-3.5 shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#ffffff] active:translate-[4px_4px] active:shadow-[2px_2px_0_#000000] dark:active:shadow-[2px_2px_0_#ffffff] transition-all duration-100 focus-visible:outline-none';

const BTN_VARIANTS = {
  systems:
    'bg-accent-yellow dark:bg-primary-yellow text-black dark:text-white hover:bg-primary dark:hover-surface-dark hover:text-white',
  vector:
    'bg-surface-container-lowest dark:bg-surface-l2 text-black dark:text-white hover:bg-accent-red dark:hover-vermilion hover:text-white',
  dispatch:
    'bg-surface dark:bg-surface-dark text-black dark:text-white hover:bg-accent-blue dark:hover-electric-blue hover:text-white',
} as const;

type HeroButtonVariant = keyof typeof BTN_VARIANTS;

interface HeroButtonProps {
  variant: HeroButtonVariant;
  href: string;
  icon: React.ReactNode;
  side?: 'start' | 'end';
  children: React.ReactNode;
}

function HeroButton({ variant, href, icon, side = 'end', children }: HeroButtonProps) {
  return (
    <Link href={href} className={clsx(BTN_SHELL, BTN_VARIANTS[variant])}>
      {side === 'start' && icon}
      {children}
      {side === 'end' && icon}
    </Link>
  );
}

interface MetricBlockProps {
  number: string;
  label: string;
  value: string;
  unit: string;
  desc: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  bg: string;
}

function MetricBlock({ number, label, value, unit, desc, Icon, iconColor, bg }: MetricBlockProps) {
  return (
    <div
      className={clsx(
        'rounded-0 border-2 border-primary dark:border-white p-5 flex flex-col justify-between gap-3',
        'shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#ffffff]',
        'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_#000000] dark:hover:shadow-[2px_2px_0_#ffffff]',
        'active:translate-[4px_4px] active:shadow-none transition-all duration-100',
        bg,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {number}
          <span className="mx-0.5">{'//'}</span>
          {label}
        </span>
        <Icon size={18} className={clsx('shrink-0', iconColor)} />
      </div>
      <div className="my-1">
        <div className="font-display text-5xl font-bold tracking-tight text-black dark:text-ink-dark">
          {value}
        </div>
        <div className="font-display font-bold text-xs uppercase tracking-wider mt-1 text-black dark:text-white">
          {unit}
        </div>
      </div>
      <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-auto">{desc}</p>
    </div>
  );
}

const METRICS = [
  {
    number: '01',
    label: 'IMPACT',
    value: '700+',
    unit: 'ASHA Workers Mentored',
    desc: 'Digitized M-ASHA workflow, field diagnostics, and portal verification sessions across frontline clusters.',
    Icon: Users,
    iconColor: 'text-accent-yellow dark:text-primary-yellow',
    bg: 'bg-surface-container dark:bg-surface-l1',
  },
  {
    number: '02',
    label: 'CLINICAL',
    value: '185-hr',
    unit: 'Clinical Skills Refresher',
    desc: 'Delivered for 12 facility staff nurses & 4 medical doctors on high-risk protocol management & triage.',
    Icon: Activity,
    iconColor: 'text-accent-red dark:text-vermilion',
    bg: 'bg-accent-yellow dark:bg-primary-yellow',
  },
  {
    number: '03',
    label: 'PIPELINE',
    value: '118k+',
    unit: 'Validated Data Indicators',
    desc: 'Processed, cleaned, and reconciled across physical registers and state portals via Python pipelines.',
    Icon: Database,
    iconColor: 'text-accent-blue dark:text-electric-blue',
    bg: 'bg-surface-container-lowest dark:bg-surface-l2',
  },
  {
    number: '04',
    label: 'FIELD OPS',
    value: '100+',
    unit: 'Micro-Mentoring Sessions',
    desc: 'Executed inside Sub-Centres, PHCs & CHCs addressing frontline data-entry bottlenecks.',
    Icon: MapPin,
    iconColor: 'text-accent-red dark:text-vermilion',
    bg: 'bg-surface-container-lowest dark:bg-surface-l2',
  },
] as const;

export function Hero() {
  return (
    <section id="hero" style={{ overflowY: 'auto' }} className="relative w-full flex flex-col">
      {/* Root scroll guard: scrolls internally so nothing is clipped inside the fixed snap band. */}
      {/* 1 · Top Marquee Ticker — full width, field status + scrolling telemetry */}
      <div className="w-full shrink-0 bg-primary dark:bg-surface-dark border-b-2 border-primary dark:border-white py-2.5 px-4 flex items-center gap-6">
        <div className="flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest bg-accent-yellow dark:bg-primary-yellow text-black dark:text-white px-2.5 py-0.5 border-2 border-primary dark:border-white shrink-0">
          <span className="w-2 h-2 bg-accent-red dark:bg-vermilion animate-pulse" aria-hidden="true" />
          STATUS // FIELD ACTIVE
        </div>
        <div className="flex-1 min-w-0" aria-label="Field telemetry ticker">
          <div
            className="font-mono text-xs uppercase tracking-widest text-white dark:text-ink-dark flex items-center gap-8 whitespace-nowrap animate-[marquee_22s_linear_infinite] will-change-transform"
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

      {/* 2 · Hero Section — bg-surface, thick bottom border, centred max-width container */}
      <section className="bg-surface dark:bg-surface-dark border-b-4 border-primary dark:border-white py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* Meta Grid */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4 mb-8 lg:mb-10">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs font-bold uppercase tracking-wider bg-surface-container dark:bg-surface-l1 text-black dark:text-ink-dark px-3 py-1 border-2 border-primary dark:border-white">
                SPEC: 01 // OVERVIEW
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                COORDINATES: 26.1209&deg; N, 85.3647&deg; E
              </span>
            </div>
            <div className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider bg-tertiary-container dark:bg-surface-l2 text-black dark:text-ink-dark px-3 py-1 border-2 border-primary dark:border-white">
              <Activity size={14} className="shrink-0" aria-hidden="true" />
              FIELD TELEMETRY: ONLINE
            </div>
          </div>

          {/* Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-block bg-accent-yellow dark:bg-primary-yellow text-black dark:text-white px-4 py-1.5 border-2 border-primary dark:border-white font-display text-xs md:text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#ffffff]">
                Public Health Data Architecture &times; Full-Stack Systems
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-ink-dark leading-[1.02] uppercase">
                Building data systems that turn <span className="bg-primary dark:bg-surface-dark text-white px-2 inline-block">field work</span> into real decisions.
              </h1>

              {/* Paragraph */}
              <p className="font-sans text-base sm:text-lg leading-relaxed max-w-3xl text-black dark:text-ink-dark border-l-4 border-accent-red dark:border-vermilion pl-4 py-1">
                I am <strong className="font-bold">Aditya Pandey</strong> &mdash; a full-stack builder &amp; public health data engineer bridging on-the-ground frontline health systems (<span className="font-semibold">ASHA, ANM, CHO, PHC</span>) with production web platforms, automated validation pipelines, and clinical AI surveillance.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <HeroButton variant="systems" href="#systems" icon={<ArrowDownRight size={18} aria-hidden="true" />} side="end">
                  Explore Systems
                </HeroButton>
                <HeroButton variant="vector" href="#vector-terminal" icon={<FileTerminal size={18} aria-hidden="true" />} side="start">
                  Ask AI Vector Brain
                </HeroButton>
                <HeroButton variant="dispatch" href="#dispatch" icon={<SendHorizontal size={18} aria-hidden="true" />} side="end">
                  Direct Dispatch
                </HeroButton>
              </div>
            </div>

            {/* Live Kernel telemetry box */}
            <div className="lg:col-span-4">
              <div className="relative rounded-0 border-[3px] border-primary dark:border-white bg-surface-container-lowest dark:bg-surface-l2 shadow-[6px_6px_0_#000000] dark:shadow-[6px_6px_0_#ffffff] p-6">
                <div className="absolute -top-3 right-4 bg-accent-red dark:bg-vermilion text-white px-2.5 py-0.5 font-display font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white">
                  LIVE KERNEL
                </div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-primary dark:border-white mb-4">
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-black dark:text-ink-dark">
                    Bihar Health Ops
                  </span>
                  <span className="w-2.5 h-2.5 rounded-none bg-accent-red dark:bg-vermilion animate-pulse" aria-hidden="true" />
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center p-2 rounded-0 bg-surface dark:bg-surface-l1 border border-primary dark:border-white">
                    <span className="uppercase text-gray-500 dark:text-gray-400">PNC Telemetry Latency:</span>
                    <span className="font-bold text-primary dark:text-primary-yellow bg-accent-yellow dark:bg-primary-yellow text-black px-1.5 py-0.5">
                      54.2 ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-0 bg-surface dark:bg-surface-l1 border border-primary dark:border-white">
                    <span className="uppercase text-gray-500 dark:text-gray-400">Active Sub-Centres:</span>
                    <span className="font-bold text-primary dark:text-primary-yellow">154 Facilities</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-0 bg-surface dark:bg-surface-l1 border border-primary dark:border-white">
                    <span className="uppercase text-gray-500 dark:text-gray-400">High-Burden Blocks:</span>
                    <span className="font-bold text-accent-red dark:text-vermilion">16 Blocks</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-0 bg-surface dark:bg-surface-l1 border border-primary dark:border-white">
                    <span className="uppercase text-gray-500 dark:text-gray-400">Field Distance Logged:</span>
                    <span className="font-bold text-accent-blue dark:text-electric-blue">13,627 KM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-0 bg-surface dark:bg-surface-l1 border border-primary dark:border-white">
                    <span className="uppercase text-gray-500 dark:text-gray-400">Validation Rule Engines:</span>
                    <span className="font-bold text-primary dark:text-primary-yellow">Active (ODK/SQL)</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t-2 border-primary dark:border-white flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <span>UPTIME: 99.8%</span>
                  <span>NODE: ARARIA-CHIS-01</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 · 4 Brutalist Key Metric Blocks */}
          <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((metric) => (
              <MetricBlock key={metric.number} {...metric} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
