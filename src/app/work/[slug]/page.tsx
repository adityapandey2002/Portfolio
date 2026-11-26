import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/sections/Footer';
import { ProjectDetailClient } from '@/components/work/ProjectDetailClient';
import { PORTFOLIO_SYSTEMS } from '@/lib/data/systems';
import { getAdjacentSystems, getSystemBySlug } from '@/lib/workCatalog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PORTFOLIO_SYSTEMS.map((sys) => ({ slug: sys.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sys = getSystemBySlug(slug);
  if (!sys) {
    return { title: 'System Not Found — Aditya Pandey' };
  }
  return {
    title: `${sys.title} — Architecture & Details | Aditya Pandey`,
    description: sys.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const system = getSystemBySlug(slug);
  if (!system) {
    notFound();
  }
  const { prev, next } = getAdjacentSystems(slug);

  return (
    <>
      <ProjectDetailClient system={system} prev={prev} next={next} />
      <Footer />
    </>
  );
}
