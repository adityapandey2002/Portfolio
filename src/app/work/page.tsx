import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Work — Aditya Pandey',
  description: 'Projects built end-to-end — field data pipelines, ML, and production full-stack apps.',
};

export default function WorkPage() {
  return (
    <>
      <div className="mx-auto max-w-[1500px] px-5 pt-32 lg:px-10">
        <span className="eyebrow">{'/* WORK */'}</span>
        <h1 className="mt-3 font-serif text-[clamp(26px,3.6vw,46px)] leading-[1.05] tracking-tight">
          Things I&apos;ve <span className="text-gradient">shipped</span>
        </h1>
        <p className="section-sub mt-3 max-w-[560px]">
          From an ODK data-quality pipeline in Bihar to a live e-commerce platform — every project below went
          from idea to deployment. Click any card for the case study.
        </p>
      </div>
      <ProjectGrid />
      <Footer />
    </>
  );
}
