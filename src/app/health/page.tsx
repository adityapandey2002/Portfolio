import { HealthDashboard } from '@/components/sections/HealthDashboard';
import { Footer } from '@/components/sections/Footer';
import { PageRail } from '@/components/ui/PageRail';

export const metadata = {
  title: 'Health Dashboard — Aditya Pandey',
  description:
    'Live vitals from the Gandhi Fellowship — field data pipelines, ASHA capacity building and clinical refreshers in Muzaffarpur, Bihar.',
};

const HEALTH_SECTIONS = [
  { id: 'vitals', label: 'Vitals', num: '01' },
  { id: 'monitor', label: 'Monitor', num: '02' },
  { id: 'field-km', label: 'Field KM', num: '03' },
  { id: 'metrics', label: 'Metrics', num: '04' },
  { id: 'diagnostics', label: 'Diagnostics', num: '05' },
];

export default function HealthPage() {
  return (
    <>
      <PageRail sections={HEALTH_SECTIONS} />
      <HealthDashboard />
      <Footer />
    </>
  );
}
