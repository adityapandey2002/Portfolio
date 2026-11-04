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
        <Section className="py-12">
          <div className="mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              09 · SELECTED WORK
            </span>
            <h1 className="mt-2 font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface">
              Built, deployed, shipped
            </h1>
            <p className="mt-4 text-sm text-on-surface-variant dark:text-on-surface-variant/70 max-w-[560px]">
              A few things I built end-to-end — from field forms to live production apps.
            </p>
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


