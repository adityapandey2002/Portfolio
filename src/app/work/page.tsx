import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Work — Aditya Pandey',
  description:
    'Selected work — full-stack apps, data dashboards, and ML models built end-to-end and shipped to production.',
};

type WorkProjectStatus = 'LIVE' | 'Case study';

interface WorkProject {
  id: string;
  number: string;
  title: string;
  desc: string;
  status: WorkProjectStatus;
  tech: string[];
  caseStudy: string;
  live?: string;
}

const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'india-dashboard',
    number: '01',
    title: 'India Development Data Dashboard',
    desc:
      'Full-stack analytics dashboard for India\'s development indicators — 118k+ data points, 35 sources, 114 indicators, RAG Q&A.',
    status: 'LIVE',
    tech: ['Next.js', 'Drizzle ORM', 'Supabase', 'D3', 'RAG / LLM'],
    caseStudy: 'https://github.com/adityapandey2002/',
    live: 'https://india-dashboard-delta.vercel.app/',
  },
  {
    id: 'biharkaswaad',
    number: '02',
    title: 'BiharKaSwaad — E-Commerce',
    desc:
      'Production e-commerce for authentic Bihari food — catalog to courier, live at biharkaswaad.in.',
    status: 'LIVE',
    tech: ['React', 'Node', 'Express', 'MySQL', 'Razorpay'],
    caseStudy: 'https://github.com/adityapandey2002/',
    live: 'https://biharkaswaad.in/',
  },
  {
    id: 'spacex',
    number: '03',
    title: 'SpaceX Launch Success Prediction',
    desc:
      'IBM Capstone. 100+ Falcon 9 launches via REST API + scraping, classification models, interactive Dash/Plotly dashboard.',
    status: 'Case study',
    tech: ['Python', 'SQLite', 'Dash', 'ML'],
    caseStudy: 'https://github.com/adityapandey2002/',
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark">
        <Section className="py-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline font-bold text-xs uppercase px-2.5 py-1 tracking-widest border border-primary dark:border-white shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff]">
                {'/* 01 // PRODUCTION CODEBASES & SYSTEMS ARCHITECTURE */'}
              </span>
              <span className="font-headline text-xs font-bold tracking-wider text-on-surface-variant dark:text-on-surface-variant uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-red dark:bg-accent-red animate-ping" />
                ORDERED TECHNICAL LEDGER // LIVE PRODUCTION RUNTIMES
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl text-primary dark:text-on-surface tracking-tight uppercase leading-[0.95] max-w-5xl">
                ENGINEERED FOR{' '}
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 border-2 border-primary dark:border-white inline-block">
                  HIGH-INTEGRITY COMMERCE
                </span>{' '}
                &amp; DETERMINISTIC FRONTLINE SCALE
              </h1>
              <p className="font-body text-base md:text-xl text-on-surface-variant dark:text-on-surface-variant max-w-4xl font-normal leading-relaxed">
                Production transactional e-commerce engines, civic district hospital queues, zero-connectivity clinical maternal triage PWAs, and sub-district macro data spatial platforms built for extreme reliability.
              </p>
            </div>
            {/* 4-Up Bento Stat Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="bg-surface-bright dark:bg-surface-low p-5 border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant pb-2 border-b border-primary dark:border-white">
                  FLAGSHIP LEDGER // ORDERED
                </div>
                <div className="py-4">
                  <div className="font-headline font-bold text-4xl lg:text-5xl text-primary dark:text-on-surface">
                    04+3
                  </div>
                  <div className="font-headline text-xs uppercase font-bold text-accent-red dark:text-accent-red mt-1">
                    4 FLAGSHIPS + 3 SPECIALIZED
                  </div>
                </div>
                <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                  Ranked strictly by operational impact.
                </div>
              </div>
              <div className="bg-accent-yellow dark:bg-primary-yellow p-5 border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between text-on-primary-container dark:text-black">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-black pb-2 border-b border-primary dark:border-white">
                  SECURITY // HMAC SHA-256
                </div>
                <div className="py-4">
                  <div className="font-headline font-bold text-4xl lg:text-5xl text-primary dark:text-black">
                    100%
                  </div>
                  <div className="font-headline text-xs uppercase font-bold text-primary dark:text-black mt-1">
                    TAMPER-PROOF PAYMENTS
                  </div>
                </div>
                <div className="font-body text-xs text-primary dark:text-black font-medium">
                  Server-side amount re-validation pipeline.
                </div>
              </div>
              <div className="bg-surface-bright dark:bg-surface-low p-5 border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant pb-2 border-b border-primary dark:border-white">
                  EDGE RESPONSIVENESS
                </div>
                <div className="py-4">
                  <div className="font-headline font-bold text-4xl lg:text-5xl text-primary dark:text-on-surface">
                    &lt;50ms
                  </div>
                  <div className="font-headline text-xs uppercase font-bold text-accent-blue dark:text-accent-blue mt-1">
                    QUERY LATENCY (DUCKDB)
                  </div>
                </div>
                <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                  118k+ indicators indexed across districts.
                </div>
              </div>
              <div className="bg-surface-bright dark:bg-surface-low p-5 border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant pb-2 border-b border-primary dark:border-white">
                  OFFLINE PROTOCOL
                </div>
                <div className="py-4">
                  <div className="font-headline font-bold text-4xl lg:text-5xl text-primary dark:text-on-surface">
                    0%
                  </div>
                  <div className="font-headline text-xs uppercase font-bold text-accent-red dark:text-accent-red mt-1">
                    DATA LOSS ON 2G/ZERO-CONN
                  </div>
                </div>
                <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                  Dexie.js IndexedDB append-only sync.
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Sticky filter bar */}
      <section className="w-full bg-surface-container dark:bg-surface-container border-b-2 border-primary dark:border-white px-4 sm:px-8 lg:px-12 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-on-surface text-[20px]">filter_alt</span>
            <span className="font-headline text-xs font-bold uppercase tracking-wider text-primary dark:text-on-surface">
              PROJECT INDEX FILTER:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['ALL SYSTEMS (07)', 'FLAGSHIPS #1-4', 'E-COMMERCE (01)', 'CIVIC & CLINICAL (02)', 'MACRO DATA & AI (01)'].map((label, i) => (
              <button
                key={label}
                className={`font-headline text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-primary dark:border-white shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff] transition-transform active:translate-x-0.5 active:translate-y-0.5 ${
                  i === 0
                    ? 'bg-primary dark:bg-on-surface text-on-primary dark:text-surface'
                    : 'bg-surface dark:bg-surface-container text-primary dark:text-on-surface hover:bg-primary-container dark:hover:bg-primary-yellow hover:text-on-primary-container dark:hover:text-on-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WORK_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="border-2 border-primary dark:border-white bg-surface-container-lowest dark:bg-surface-low p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]"
              >
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3 mb-4">
                  <span className="bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black px-2.5 py-0.5 font-headline font-bold text-xs uppercase border border-primary dark:border-white">
                    {project.status}
                  </span>
                  <span className="font-mono text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    {project.number}
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface dark:text-on-surface uppercase">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant dark:text-on-surface-variant/70 leading-relaxed">
                  {project.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] font-semibold bg-surface-container dark:bg-surface-low px-2 py-0.5 border border-primary dark:border-white text-on-surface dark:text-on-surface"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t-2 border-primary dark:border-white flex gap-3">
                  <a
                    href={project.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-primary dark:border-white bg-surface dark:bg-surface-low px-3 py-1.5 font-headline text-[10px] font-bold uppercase tracking-wider text-primary dark:text-white shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                  >
                    GitHub →
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-primary dark:border-white bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black px-3 py-1.5 font-headline text-[10px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                    >
                      Live Site →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matru Suraksha Flagship */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface-bright dark:bg-surface-low px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-accent-red dark:bg-accent-red text-white font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff]">
                FLAGSHIP 03 // CLINICAL TRIAGE PWA
              </span>
              <span className="bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                ACTIVE FIELD PILOT // BIHAR HEALTH OPS
              </span>
              <span className="bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                OFFLINE-FIRST ARCHITECTURE
              </span>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              NODE: PWA-MS-01 // FIELD VERIFIED
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-on-surface tracking-tight uppercase leading-tight">
                MATRU SURAKSHA (मातृ सुरक्षा)
                <span className="block text-xl sm:text-2xl text-on-surface-variant dark:text-on-surface-variant font-normal tracking-normal mt-1">
                  Multi-Tier High-Risk Pregnancy Care &amp; Clinical Triage Engine
                </span>
              </h2>
              <p className="font-body text-base text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                Engineered to eliminate systemic communication delays in agrarian rural clinics. Enables Auxiliary Nurse Midwives (ANMs) to triage maternal danger signs without active cellular reception, calculating instant risk stratifications while synchronizing cryptographically validated records up through district governance desks.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 p-4 bg-surface-container dark:bg-surface-low border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
              <div className="font-headline text-xs font-bold uppercase text-primary dark:text-on-surface border-b border-primary dark:border-white pb-2 flex items-center justify-between">
                <span>CORE QUALITY GATES</span>
                <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-sm">verified</span>
              </div>
              <div className="space-y-2 text-xs font-headline">
                {[
                  { label: 'TEST COVERAGE:', value: '>=80% Changed Lines', color: 'text-primary dark:text-on-surface' },
                  { label: 'A11Y AUDIT:', value: '0 Violations (WCAG AAA)', color: 'text-accent-red dark:text-accent-red' },
                  { label: '3G LCP BENCHMARK:', value: '<=2.18s Verified', color: 'text-accent-blue dark:text-accent-blue' },
                  { label: 'CLIENT FOOTPRINT:', value: '<=170kB gzipped', color: 'text-primary dark:text-on-surface' },
                ].map((g) => (
                  <div key={g.label} className="flex justify-between items-center">
                    <span className="text-on-surface-variant dark:text-on-surface-variant">{g.label}</span>
                    <span className={`font-bold ${g.color}`}>{g.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 6-Tier Escalation Hierarchy */}
          <div className="border-2 border-primary dark:border-white bg-surface dark:bg-surface-container-lowest p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
            <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3 mb-4">
              <span className="font-headline font-bold text-sm uppercase tracking-wider text-primary dark:text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-[18px]">account_tree</span>
                6-Tier Administrative Escalation Hierarchy &amp; SLA Chain
              </span>
              <span className="font-headline text-[11px] font-bold text-on-surface-variant dark:text-on-surface-variant">
                15-DAY AUDIT CLOCK
              </span>
            </div>
            <div className="space-y-2.5">
              {[
                { tier: 'TIER 1', label: 'Field ANM // Health Sub-Centre', desc: 'Offline PWA registration, 8 danger signs check, auto-graded risk score.', bg: 'bg-primary dark:bg-on-surface', text: 'text-on-primary dark:text-surface' },
                { tier: 'TIER 2', label: 'Sector MOIC // Block HQ', desc: 'Real-time sync on 2G, clinical review dashboard, referral authorization.', bg: 'bg-accent-red dark:bg-accent-red', text: 'text-white dark:text-white' },
                { tier: 'TIER 3', label: 'Block Health Manager (BHM)', desc: 'Overdue flag escalation, resource reallocation, field visit scheduling.', bg: 'bg-accent-yellow dark:bg-primary-yellow', text: 'text-black dark:text-black' },
                { tier: 'TIER 4', label: 'District Hospital // Labor Room', desc: 'HRP admission, clinical intervention, 24-hr monitoring protocol.', bg: 'bg-accent-blue dark:bg-accent-blue', text: 'text-white dark:text-white' },
                { tier: 'TIER 5', label: 'District Health Society (DHS)', desc: 'SLA breach reporting, mortality review, systemic gap analysis.', bg: 'bg-primary dark:bg-on-surface', text: 'text-on-primary dark:text-surface' },
                { tier: 'TIER 6', label: 'State Health Mission', desc: 'Policy feedback loop, budget reallocation, program scale-up.', bg: 'bg-surface-container dark:bg-surface-low', text: 'text-primary dark:text-on-surface' },
              ].map((t) => (
                <div key={t.tier} className="p-2.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white flex items-start gap-3">
                  <span className={`font-headline font-bold text-xs ${t.bg} ${t.text} px-2 py-0.5 shrink-0`}>
                    {t.tier}
                  </span>
                  <div>
                    <div className="font-headline text-xs font-bold uppercase text-primary dark:text-on-surface">
                      {t.label}
                    </div>
                    <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                      {t.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Systems */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface-container-low dark:bg-surface-low px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block">
                SECONDARY PRODUCTION ARCHIVES
              </span>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary dark:text-on-surface uppercase">
                SPECIALIZED SYSTEMS &amp; PHYSICAL COMPUTING
              </h2>
            </div>
            <div className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant uppercase">
              DISTRIBUTED REALTIME &amp; HARDWARE EMBEDDED
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Prodigy InfoTech */}
            <div className="bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary dark:border-white pb-2">
                  <span className="bg-surface-container dark:bg-surface-low text-primary dark:text-on-surface font-headline text-[10px] font-bold uppercase px-2 py-0.5 border border-primary dark:border-white">
                    REAL-TIME WEBSOCKETS
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    AUTH LIFECYCLE
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary dark:text-on-surface uppercase leading-tight">
                  Prodigy InfoTech Concurrency Suites
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Full-stack collaboration and messaging suites. Stateless JWT token rotation with Redis blacklist, WebSocket pub/sub live room state synchronization, and scalable CRUD APIs.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-primary dark:border-white">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['MERN Stack', 'Socket.io', 'JWT Auth', 'Docker'].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white text-primary dark:text-on-surface">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/adityapandey2002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-primary dark:text-on-surface hover:underline"
                >
                  Review Codebase Commit Logs
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>
            {/* Card 2: Auroville FabLab */}
            <div className="bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary dark:border-white pb-2">
                  <span className="bg-accent-red dark:bg-accent-red text-white font-headline text-[10px] font-bold uppercase px-2 py-0.5 border border-primary dark:border-white">
                    EMBEDDED HARDWARE
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    MINVAYU PROJECT
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary dark:text-on-surface uppercase leading-tight">
                  Auroville FabLab Hardware Telemetry
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Open-source small-scale wind turbine telemetry and rapid additive manufacturing prototyping. Engineered micro-controller interfaces for RPM/output power monitoring.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-primary dark:border-white">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['Microcontrollers', 'C++ / AVR', 'CAD Modeling', 'Sensor I/O'].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white text-primary dark:text-on-surface">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-on-surface-variant dark:text-on-surface-variant">
                  Auroville Physical Systems Lab
                </span>
              </div>
            </div>
            {/* Card 3: SpaceX */}
            <div className="bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary dark:border-white pb-2">
                  <span className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline text-[10px] font-bold uppercase px-2 py-0.5 border border-primary dark:border-white">
                    DATA SCIENCE CAPSTONE
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    IBM CERTIFIED
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary dark:text-on-surface uppercase leading-tight">
                  Space-X Falcon 9 First-Stage Recovery Model
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Predictive machine learning pipeline estimating booster landing success. Web scraping of SpaceX telemetry, EDA with SQL, interactive Folium spatial maps, classification benchmarking.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-primary dark:border-white">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['Python', 'Scikit-Learn', 'Plotly Dash', 'Folium'].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white text-primary dark:text-on-surface">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/adityapandey2002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-primary dark:text-on-surface hover:underline"
                >
                  View Capstone Notebooks
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Pillars */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface dark:bg-surface-dark px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-on-surface block">
              {'/* 02 // ARCHITECTURAL PILLARS */'}
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary dark:text-on-surface uppercase tracking-tight">
              FOUR DETERMINISTIC GUARANTEES FOR LOW-RESOURCE COMPUTING
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'P1', title: 'Offline-First By Default', desc: 'No patient should be blocked by 2G/EDGE dropouts. Client mutations serialize to IndexedDB first.', bg: 'bg-accent-yellow dark:bg-primary-yellow', text: 'text-black dark:text-black' },
              { id: 'P2', title: 'Cryptographic Audit Logs', desc: 'Financial checkouts and clinical metrics are append-only. SHA-256 validation timestamps.', bg: 'bg-accent-red dark:bg-accent-red', text: 'text-white dark:text-white' },
              { id: 'P3', title: 'Deterministic Budgets', desc: 'Strict sub-2.5s LCP on throttled 3G. Micro-bundles (<170kB gzip).', bg: 'bg-primary dark:bg-on-surface', text: 'text-on-primary dark:text-surface' },
              { id: 'P4', title: 'Field-Hardened Ergonomics', desc: 'High-contrast design for extreme glare in direct Bihar sunlight (44°C).', bg: 'bg-surface-container dark:bg-surface-low', text: 'text-primary dark:text-on-surface' },
            ].map((p) => (
              <div key={p.id} className="p-5 bg-surface-bright dark:bg-surface-low border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] space-y-3">
                <div className={`w-10 h-10 ${p.bg} ${p.text} font-headline font-bold text-base flex items-center justify-center border-2 border-primary dark:border-white`}>
                  {p.id}
                </div>
                <h3 className="font-headline font-bold text-sm uppercase text-primary dark:text-on-surface">
                  {p.title}
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consolidated Systems Matrix */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface-container-high/30 dark:bg-surface-low px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
                TECHNICAL INVENTORY
              </span>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary dark:text-on-surface uppercase">
                CONSOLIDATED SYSTEMS MATRIX
              </h2>
            </div>
            <span className="font-headline text-xs font-bold uppercase text-primary dark:text-on-surface bg-accent-yellow dark:bg-primary-yellow px-2 py-1 border border-primary dark:border-white">
              ORDERED HIERARCHY // AUDIT: APRIL 2026
            </span>
          </div>
          <div className="overflow-x-auto border-2 border-primary dark:border-white bg-surface dark:bg-surface-container-lowest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline text-xs font-bold uppercase tracking-wider">
                  <th className="p-3 border-r border-on-primary/20 dark:border-surface/20">RANK // SYSTEM</th>
                  <th className="p-3 border-r border-on-primary/20 dark:border-surface/20">CORE TECH STACK</th>
                  <th className="p-3 border-r border-on-primary/20 dark:border-surface/20">SYNC &amp; PROTOCOL</th>
                  <th className="p-3 border-r border-on-primary/20 dark:border-surface/20">QUALITY BAR</th>
                  <th className="p-3">DEPLOYMENT STATE</th>
                </tr>
              </thead>
              <tbody className="font-body text-xs divide-y-2 divide-primary dark:divide-on-surface">
                {[
                  { rank: '#1', system: 'BiharKaSwaad E-Commerce', stack: 'React 18, Node.js, Express, MySQL, Hostinger', sync: 'Razorpay HMAC SHA-256 Webhooks + Re-validation', quality: 'Zero-Tamper Payment Validation', qualityColor: 'text-accent-red dark:text-accent-red', deploy: 'Live Production Storefront', deployColor: 'text-accent-blue dark:text-accent-blue' },
                  { rank: '#2', system: 'Sadar Hospital Araria Portal', stack: 'React, TypeScript, Redis, Supabase, Tailwind', sync: 'WebSocket pub/sub dispatch queues', quality: '<100ms Telemetry Tick Speed', qualityColor: 'text-accent-blue dark:text-accent-blue', deploy: 'Civic Gov Production Node', deployColor: 'text-primary dark:text-on-surface' },
                  { rank: '#3', system: 'Matru Suraksha (मातृ सुरक्षा)', stack: 'React 18, Vite, Fastify, Dexie.js, PostgreSQL', sync: 'IndexedDB offline replica + Exponential backoff', quality: '80% Line Coverage // 0 A11y Violations', qualityColor: 'text-accent-red dark:text-accent-red', deploy: 'Active Field Pilot (Bihar)', deployColor: 'text-primary dark:text-on-surface' },
                  { rank: '#4', system: 'India Development Data Engine', stack: 'DuckDB, Python, pgvector, Groq LLM, Leaflet', sync: 'Parquet in-memory OLAP + Vector Embedding', quality: '<48ms Sub-district Query Median', qualityColor: 'text-primary dark:text-on-surface', deploy: 'Live Macro Analytics', deployColor: 'text-primary dark:text-on-surface' },
                  { rank: '#5', system: 'Prodigy InfoTech Suites', stack: 'MongoDB, Express, React, Node.js, Socket.io', sync: 'WebSocket live rooms + JWT rotation', quality: 'High-Concurrency Stress Pass', qualityColor: 'text-on-surface-variant dark:text-on-surface-variant', deploy: 'Enterprise Codebase Archive', deployColor: 'text-on-surface-variant dark:text-on-surface-variant' },
                  { rank: '#6', system: 'Auroville MinVayu Hardware', stack: 'C++, AVR Microcontrollers, CAD, Rapid Prototyping', sync: 'Analog Sensor I/O & RPM Polling', quality: 'Physical Wind Turbine Telemetry', qualityColor: 'text-primary dark:text-on-surface', deploy: 'Research Lab Deployment', deployColor: 'text-on-surface-variant dark:text-on-surface-variant' },
                  { rank: '#7', system: 'Space-X Launch Prediction', stack: 'Python, Scikit-Learn, Plotly Dash, Folium, SQL', sync: 'REST ETL Telemetry Pipeline', quality: '83.3% Cross-Validated Accuracy', qualityColor: 'text-accent-blue dark:text-accent-blue', deploy: 'IBM Capstone Verified', deployColor: 'text-on-surface-variant dark:text-on-surface-variant' },
                ].map((row) => (
                  <tr key={row.rank} className="hover:bg-surface-container dark:hover:bg-surface-low transition-colors">
                    <td className="p-3 font-headline font-bold uppercase border-r-2 border-primary dark:border-white text-primary dark:text-on-surface">
                      {row.rank} {row.system}
                    </td>
                    <td className="p-3 border-r-2 border-primary dark:border-white font-mono text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                      {row.stack}
                    </td>
                    <td className="p-3 border-r-2 border-primary dark:border-white text-on-surface-variant dark:text-on-surface-variant">
                      {row.sync}
                    </td>
                    <td className={`p-3 border-r-2 border-primary dark:border-white font-headline font-bold ${row.qualityColor}`}>
                      {row.quality}
                    </td>
                    <td className={`p-3 font-headline font-bold ${row.deployColor}`}>
                      {row.deploy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="w-full bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface px-4 sm:px-8 lg:px-12 py-12 md:py-16 border-b-2 border-primary dark:border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight">
              Engage Fellowship
            </h2>
            <p className="mt-3 text-sm text-on-primary/80 dark:text-on-surface-variant max-w-xl">
              Building data systems that turn field work into real decisions. Open to collaborations on public health data, civic tech, and AI systems.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0px_#ffffff] dark:shadow-[3px_3px_0px_#1a1a1a] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Get in touch →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}


