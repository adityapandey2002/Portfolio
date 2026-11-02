import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/sections/Footer';
import { RouteScrollMode } from '@/components/RouteScrollMode';
import { EnergyConduit } from '@/components/sections/pillars';
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
      <RouteScrollMode />
      <Section>
        <header className="mb-16 lg:mb-20 shrink-0">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-3 dark:text-ink-3">
            03 · ABOUT
          </span>
          <h1 className="mt-3 font-display text-[clamp(40px,6vw,56px)] font-bold uppercase tracking-tight text-primary dark:text-ink-dark leading-none">
            Health Field Impact
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2 dark:text-ink-2 max-w-2xl">
            Gandhi Fellowship · Piramal Foundation. Public health data work across Bihar&apos;s high-burden blocks — frontline worker capacity building (ASHA, ANM, CHO, PHC), 185-hour clinical skills refreshers, NQAS certification support, maternal and child health programs, and VHSND / Godbharai / PMSMA data pipelines — tracked like patient data, from Muzaffarpur.
          </p>
        </header>

        <HealthMetrics />
        <HealthSystemStrengthening />
      </Section>
      <Footer />
      {/* Moving gradient line at the very bottom edge of the page. */}
      <EnergyConduit />
    </>
  );
}
