import type { Metadata } from 'next';
import { Footer } from '@/components/sections/Footer';
import { ProjectDetailClient } from '@/components/work/ProjectDetailClient';
import { getAdjacentSystems, getSystemBySlug } from '@/lib/workCatalog';

export const metadata: Metadata = {
  title: 'BiharKaSwaad — E-Commerce Architecture & Case Study | Aditya Pandey',
  description:
    'How biharkaswaad.in was built end-to-end — Razorpay HMAC SHA-256 payment integrity, variant-level MySQL indexing, order lifecycle, and 29/29 Playwright E2E coverage.',
};

export default function BiharKaSwaadCaseStudyPage() {
  const system = getSystemBySlug('biharkaswaad')!;
  const { prev, next } = getAdjacentSystems('biharkaswaad');

  return (
    <>
      <ProjectDetailClient system={system} prev={prev} next={next} />
      <Footer />
    </>
  );
}
