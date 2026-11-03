import { WorkProjectCard } from '@/components/projects/WorkProjectCard';
import { Footer } from '@/components/sections/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';

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
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
              09 · SELECTED WORK
            </span>
            <h1 className="mt-2 font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-ink-dark">
              Built, deployed, shipped
            </h1>
            <p className="mt-4 text-sm text-on-surface-variant dark:text-ink-dark/70 max-w-[560px]">
              A few things I built end-to-end — from field forms to live production apps.
            </p>
          </div>
        </Section>
      </section>

      {/* Projects grid */}
      <section className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark">
        <Section className="py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WORK_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="border-2 border-primary dark:border-white bg-surface-container-lowest dark:bg-surface-l2 p-6 shadow-[4px_4px_0_#1a1a1a] dark:shadow-[4px_4px_0_#ffffff]"
              >
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3 mb-4">
                  <span className="bg-primary-container dark:bg-primary-yellow text-on-primary-container dark:text-on-primary px-2.5 py-0.5 font-headline font-bold text-xs uppercase border border-primary dark:border-white">
                    {project.status === 'LIVE' ? 'LIVE' : 'CASE STUDY'}
                  </span>
                  <span className="font-mono text-xs font-bold text-on-surface-variant dark:text-ink-dark/70">
                    {project.number}
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface dark:text-ink-dark uppercase">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant dark:text-ink-dark/70 leading-relaxed">
                  {project.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] font-semibold bg-surface-container dark:bg-surface-l1 px-2 py-0.5 border border-primary dark:border-white text-on-surface dark:text-ink-dark"
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
                    className="inline-flex items-center gap-2 border-2 border-primary dark:border-white bg-surface dark:bg-surface-l1 px-3 py-1.5 font-headline text-[10px] font-bold uppercase tracking-wider text-primary dark:text-white shadow-[2px_2px_0_#1a1a1a] dark:shadow-[2px_2px_0_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                  >
                    GitHub →
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-primary dark:border-white bg-primary-container dark:bg-primary-yellow px-3 py-1.5 font-headline text-[10px] font-bold uppercase tracking-wider text-on-primary-container dark:text-on-primary shadow-[2px_2px_0_#1a1a1a] dark:shadow-[2px_2px_0_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                    >
                      Live Site →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Footer />
    </>
  );
}
