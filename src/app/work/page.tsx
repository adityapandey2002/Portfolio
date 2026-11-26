import type { Metadata } from 'next';
import { Footer } from '@/components/sections/Footer';
import { WorkShowcaseClient } from '@/components/work/WorkShowcaseClient';

export const metadata: Metadata = {
  title: 'Work & Systems — Aditya Pandey',
  description:
    '7 flagship production systems and 3 specialized engineering builds across public health, clinical voice AI, macro data analytics, and live e-commerce — backed by GitHub documentation and live deployments.',
};

export default function WorkPage() {
  return (
    <>
      <WorkShowcaseClient />
      <Footer />
    </>
  );
}
