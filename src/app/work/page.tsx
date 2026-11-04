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


