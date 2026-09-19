import { HealthDashboard } from '@/components/sections/HealthDashboard';
import { Footer } from '@/components/sections/Footer';
import { RouteScrollMode } from '@/components/RouteScrollMode';

export const metadata = {
  title: 'Health Dashboard — Aditya Pandey',
  description:
    'Live vitals from the Gandhi Fellowship — field data pipelines, ASHA capacity building and clinical refreshers in Muzaffarpur, Bihar.',
};

export default function HealthPage() {
  return (
    <>
      <RouteScrollMode />
      <HealthDashboard />
      <Footer />
    </>
  );
}
