import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/sections/Footer';
import { HealthMetrics } from '@/components/sections/HealthMetrics';
import { HealthSystemStrengthening } from '@/components/sections/HealthSystemStrengthening';

export const metadata = {
  title: 'Health Field Impact — Aditya Pandey',
  description:
    'Public health data work in Bihar — ASHA capacity building, 185-hour clinical skills refreshers, NQAS audits and VHSND / Godbharai / PMSMA data pipelines from the Gandhi Fellowship (Piramal Foundation), based in Muzaffarpur.',
};

export default function HealthPage() {
  return (
    <>
      <section className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark">
        <Section className="py-12">
          <div className="mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
              03 · HEALTH FIELD IMPACT
            </span>
            <h1 className="mt-2 font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-ink-dark">
              Health Field Impact
            </h1>
            <p className="mt-4 text-sm text-on-surface-variant dark:text-ink-dark/70 max-w-2xl">
              Gandhi Fellowship · Piramal Foundation. Public health data work across Bihar&apos;s high-burden blocks — frontline worker capacity building (ASHA, ANM, CHO, PHC), 185-hour clinical skills refreshers, NQAS certification support, maternal and child health programs, and VHSND / Godbharai / PMSMA data pipelines — tracked like patient data, from Muzaffarpur.
            </p>
          </div>
        </Section>
      </section>

      <HealthMetrics />
      <HealthSystemStrengthening />
      <Footer />
    </>
  );
}
