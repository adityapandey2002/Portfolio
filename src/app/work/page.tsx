import { WorkProjectCard } from '@/components/projects/WorkProjectCard';
import { Footer } from '@/components/sections/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
] as const;

export default function WorkPage() {
  return (
    <>
      {/* Page header */}
      <section className="mb-16">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
          <span className="block mb-4 font-mono text-[11px] font-bold uppercase tracking-wider text-primary dark:text-ink-dark">
            09 · SELECTED WORK
          </span>
          <h1 className="font-display font-bold text-[34px] lg:text-[48px] leading-[1.04] text-primary dark:text-ink-dark">
            Built, deployed, shipped
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-primary dark:text-ink-dark font-sans max-w-[560px]">
            A few things I built end-to-end — from field forms to live production apps.
          </p>
        </div>
      </section>

      {/* Projects grid — 12-col desktop → 6-col tablet → 4-col mobile */}
      <section className="mb-20">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
          <div
            className={[
              'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
              'gap-x-4 lg:gap-x-6 gap-y-10',
            ].join(' ')}
          >
            {WORK_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="col-span-4 md:col-span-3 lg:col-span-4"
              >
                <WorkProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* View all link */}
      <section>
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8 mt-10 mb-24">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary dark:text-ink-dark hover:text-accent-yellow dark:hover:text-primary-yellow transition-colors"
          >
            View all <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
