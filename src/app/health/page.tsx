import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Health Field Impact — Aditya Pandey',
  description:
    'Public health data work in Bihar — ASHA capacity building, 185-hour clinical skills refreshers, NQAS audits and VHSND / Godbharai / PMSMA data pipelines from the Gandhi Fellowship (Piramal Foundation), based in Muzaffarpur.',
};

export default function HealthPage() {
  return (
    <>
      <section className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark">
        <Section className="py-10">
          <div className="space-y-8">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-primary dark:border-white p-3 bg-surface-container dark:bg-surface-low shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-accent-red dark:bg-accent-red" />
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary dark:text-on-surface">
                  01 // FELLOWSHIP OPERATIONAL RECORD &amp; CLINICAL VITALS
                </span>
              </div>
              <div className="flex items-center gap-4 font-headline text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-on-surface-variant">
                <span>PROGRAM: GANDHI FELLOWSHIP</span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:inline">PIRAMAL FOUNDATION</span>
                <span className="hidden md:inline">|</span>
                <span className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-2 py-0.5">
                  DEPLOYED: MUZAFFARPUR
                </span>
              </div>
            </div>
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-primary dark:text-on-surface leading-none">
                HEALTH-SYSTEM STRENGTHENING ACROSS BIHAR: EVERY NUMBER TRACKED LIKE PATIENT DATA
              </h1>
              <p className="font-body text-base sm:text-lg text-on-surface-variant dark:text-on-surface-variant max-w-4xl leading-relaxed border-l-4 border-primary dark:border-on-surface pl-4">
                Gandhi Fellowship (Piramal Foundation) · Based in Muzaffarpur, Bihar. Grassroots transformation across 16 high-burden blocks, sub-centres, PHCs, and District Hospitals.
              </p>
            </div>
            {/* Quote Block */}
            <div className="relative bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface p-6 sm:p-8 border-2 border-primary dark:border-white shadow-[6px_6px_0px_#ffcc00] dark:shadow-[6px_6px_0px_#ffcc00]">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black px-3 py-1 font-headline text-xs font-bold uppercase tracking-widest border-2 border-primary dark:border-white">
                PRIMARY LOG 2024-2026
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-accent-yellow dark:text-primary-yellow text-4xl shrink-0">
                  format_quote
                </span>
                <div className="space-y-3">
                  <blockquote className="font-headline text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-on-primary dark:text-on-surface leading-snug">
                    &ldquo;I&rsquo;ve stood next to an ASHA worker filling an ODK form on a tablet in 38&deg;C heat. Every pipeline I build starts with that moment.&rdquo;
                  </blockquote>
                  <div className="font-headline text-xs uppercase tracking-widest text-accent-yellow dark:text-primary-yellow font-bold">
                    — ADITYA PANDEY · DISTRICT RESOURCE FELLOW, MUZAFFARPUR, BIHAR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Health Metrics */}
      <section className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark py-12 px-4 sm:px-8 lg:px-12">
        <Section className="py-12">
          <div className="flex flex-col md:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-6 mb-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary dark:text-white block mb-1">
                Audited Telemetry
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface leading-none">
                Primary Field Metrics Ledger
              </h2>
            </div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-on-surface-variant/70">
              Total Active Blocks: 16 &nbsp;//&nbsp; Population Footprint: 4.8M+
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Metric 1: ASHA */}
            <div className="bg-surface-container-lowest dark:bg-surface-low border-3 border-primary dark:border-white p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#ffffff] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b-2 border-primary dark:border-white pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-yellow dark:text-dark-accent-yellow">
                      METRIC // 01
                    </span>
                    <span className="material-symbols-outlined text-accent-yellow dark:text-dark-accent-yellow">people</span>
                  </div>
                </div>
                <div className="pt-1 lg:pt-0">
                  <div className="font-display font-bold text-5xl lg:text-6xl tracking-tight leading-none text-on-surface dark:text-on-surface">
                    700+
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight text-on-surface dark:text-on-surface">
                    ASHA Workers Mentored
                  </h3>
                  <p className="mt-3 text-sm text-on-surface-variant dark:text-on-surface-variant/70 leading-relaxed">
                    M-ASHA digital application rollout across 100+ micro-sessions at sector meetings, sub-centres and block headquarters — frontline worker capacity building, hands-on.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-primary dark:border-white flex items-center justify-between text-[11px] font-mono uppercase font-bold gap-3">
                  <span>MICRO-SESSIONS: 100+</span>
                  <span className="bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black px-2 py-0.5 border border-accent-yellow dark:border-accent-yellow">
                    COMPLIANCE: 94%
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 2: Clinical */}
            <div className="bg-surface-container-lowest dark:bg-surface-low border-3 border-primary dark:border-white p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#ffffff] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b-2 border-primary dark:border-white pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary dark:text-white">
                      METRIC // 02
                    </span>
                    <span className="material-symbols-outlined text-primary dark:text-white">medical_services</span>
                  </div>
                </div>
                <div className="pt-1 lg:pt-0">
                  <div className="font-display font-bold text-5xl lg:text-6xl tracking-tight leading-none text-on-surface dark:text-on-surface">
                    185-hr
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight text-on-surface dark:text-on-surface">
                    Clinical Skills Refresher
                  </h3>
                  <p className="mt-3 text-sm text-on-surface-variant dark:text-on-surface-variant/70 leading-relaxed">
                    185-hour structured curriculum for 12 Staff Nurses and 4 Doctors — High-Risk Pregnancy management and labor room protocols, district hospital.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-primary dark:border-white flex items-center justify-between text-[11px] font-mono uppercase font-bold gap-3">
                  <span>COHORT: 16 CLINICIANS</span>
                  <span className="bg-accent-red dark:bg-accent-red text-white dark:text-white px-2 py-0.5 border border-accent-red dark:border-accent-red">
                    HRP PROTOCOLS
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 3: Sub-centres */}
            <div className="bg-surface-container-lowest dark:bg-surface-low border-3 border-primary dark:border-white p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#ffffff] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b-2 border-primary dark:border-white pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary dark:text-white">
                      METRIC // 03
                    </span>
                    <span className="material-symbols-outlined text-primary dark:text-white">location_on</span>
                  </div>
                </div>
                <div className="pt-1 lg:pt-0">
                  <div className="font-display font-bold text-5xl lg:text-6xl tracking-tight leading-none text-on-surface dark:text-on-surface">
                    154
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight text-on-surface dark:text-on-surface">
                    Sub-Centres Audited
                  </h3>
                  <p className="mt-3 text-sm text-on-surface-variant dark:text-on-surface-variant/70 leading-relaxed">
                    Physical vs digital register reconciliation across Sub-Centres and PHCs under the National Quality Assurance Standards (NQAS) framework.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-primary dark:border-white flex items-center justify-between text-[11px] font-mono uppercase font-bold gap-3">
                  <span>NQAS FRAMEWORK</span>
                  <span className="bg-accent-blue dark:bg-accent-blue text-white dark:text-white px-2 py-0.5 border border-accent-blue dark:border-accent-blue">
                    REGISTER RECON
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 5: Pipeline Volume */}
            <div className="bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface border-2 border-primary dark:border-white p-6 shadow-[4px_4px_0px_#ffcc00] flex flex-col justify-between md:col-span-2 lg:col-span-2 transition-transform hover:-translate-y-1">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b-2 border-on-primary/30 dark:border-on-surface/30 pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider text-accent-yellow dark:text-dark-accent-yellow">
                    METRIC // 05 (PIPELINE VOLUME)
                  </span>
                  <span className="material-symbols-outlined text-accent-yellow dark:text-dark-accent-yellow text-xl">dataset</span>
                </div>
                <div className="font-headline text-4xl sm:text-5xl font-bold text-on-primary dark:text-on-surface tracking-tight pt-2 flex items-baseline gap-2">
                  118k+ <span className="text-sm uppercase tracking-widest text-accent-yellow dark:text-dark-accent-yellow">Validated Records</span>
                </div>
                <h3 className="font-headline text-base font-bold uppercase tracking-tight text-on-primary dark:text-on-surface">
                  ODK Collect &amp; Central Telemetry Pipeline
                </h3>
                <p className="font-body text-xs text-on-primary/80 dark:text-on-surface-variant leading-relaxed max-w-2xl">
                  Grassroots survey records scrubbed, sanitized, and programmatically validated via automated Python and Pandas pipelines to eliminate discrepancy windows ahead of Monday district review meetings.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-on-primary/30 dark:border-on-surface/30 flex flex-wrap items-center justify-between text-[11px] font-headline uppercase font-bold text-on-primary dark:text-on-surface gap-2">
                <span>AUTOMATION: PYTHON 3.11 / PANDAS</span>
                <span className="bg-accent-red dark:bg-accent-red text-white dark:text-white px-2 py-0.5">ZERO-DATA DISCREPANCY MANDATE</span>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Health System Strengthening */}
      <section className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark py-12 px-4 sm:px-8 lg:px-12">
        <Section className="py-12">
          <div className="flex flex-col md:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-6 mb-10">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary dark:text-white block mb-1">
                  {`/* System Outcomes */`}
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface leading-none">
                Health System Strengthening
              </h2>
            </div>
            <p className="text-base leading-relaxed text-on-surface-variant dark:text-on-surface-variant/70 max-w-md">
              Day-to-day fellowship work — support activities woven across Bihar&apos;s public health system, frontline to block.
            </p>
          </div>

          {/* Field note */}
          <div className="relative mb-12 lg:mb-16 bg-accent-red dark:bg-accent-red text-black dark:text-black border-2 border-primary dark:border-white shadow-[6px_6px_0px_#e63b2e] dark:shadow-[6px_6px_0px_#f97316] p-6 sm:p-8">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-accent-yellow dark:bg-accent-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-black dark:text-black border-2 border-accent-yellow dark:border-accent-yellow">
              FIELD NOTE
            </div>
            <div className="flex items-start gap-4">
              <span className="text-accent-yellow dark:text-dark-accent-yellow text-4xl shrink-0" aria-hidden="true">
                &#x201C;
              </span>
              <div className="space-y-2">
                <blockquote className="font-display text-lg sm:text-xl font-bold tracking-tight text-on-accent-red dark:text-on-accent-red leading-snug">
                  &#x201C;I&rsquo;ve stood next to an ASHA worker filling an ODK form on a tablet in 38&deg;C heat. Every pipeline I build starts with that moment.&#x201D;
                </blockquote>
                <div className="font-mono text-xs uppercase tracking-widest text-black dark:text-black font-bold">
                  — ADITYA PANDEY · DISTRICT RESOURCE FELLOW, MUZAFFARPUR, BIHAR
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                rank: 1,
                title: 'GAVB Gandhi Fellow — Bihar',
                tag: 'GANDHI FELLOWSHIP · PIRAMAL FOUNDATION',
                body: 'District Resource Fellow, Gandhi Fellowship (Piramal Foundation), based in Muzaffarpur — living in the high-burden blocks and working the frontlines of Bihar&apos;s public health system.',
                accent: 'bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black border border-accent-yellow dark:border-accent-yellow',
              },
              {
                rank: 2,
                title: 'Frontline Worker Capacity Building',
                tag: 'ASHA · ANM · CHO · PHC',
                body: 'Training frontline workers across the public health cadre — ASHA, ANM, CHO and PHC staff — on clinical protocols, records and digital tools that keep sub-centres running.',
                accent: 'bg-accent-red dark:bg-accent-red text-black dark:text-black border border-accent-red dark:border-accent-red',
              },
              {
                rank: 3,
                title: 'M-ASHA Digital Application Training',
                tag: '100+ MICRO-SESSIONS',
                body: 'Hands-on rollout of the M-ASHA digital application across 100+ micro-sessions at sector meetings, sub-centres and block headquarters — paper to tablet, village by village.',
                accent: 'bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black border border-accent-yellow dark:border-accent-yellow',
              },
              {
                rank: 4,
                title: 'NQAS Certification Support',
                tag: 'NATIONAL QUALITY ASSURANCE',
                body: 'Physical vs digital register reconciliation across Sub-Centres and PHCs under the NQAS framework, prepping facilities for certification audits.',
                accent: 'bg-accent-blue dark:bg-accent-blue text-white dark:text-white border border-accent-blue dark:border-accent-blue',
              },
              {
                rank: 5,
                title: 'Maternal & Child Health Programs',
                tag: 'VHSND · GODBHARAI · PMSMA',
                body: 'High-Risk Pregnancy tracking, labor room protocols and maternal-child health outreach at Village Health Sanitation and Nutrition Days, Godbharai and PMSMA clinics.',
                accent: 'bg-accent-red dark:bg-accent-red text-black dark:text-black border border-accent-red dark:border-accent-red',
              },
              {
                rank: 6,
                title: '185-Hour Clinical Skills Refresher',
                tag: '12 NURSES · 4 DOCTORS',
                body: 'Structured 5-week clinical skills refresher for 12 Staff Nurses and 4 Doctors — obstetric emergencies and labor room protocols at the district hospital.',
                accent: 'bg-accent-red dark:bg-accent-red text-black dark:text-black border border-accent-red dark:border-accent-red',
              },
              {
                rank: 7,
                title: 'VHSND · Godbharai · PMSMA Data Pipeline',
                tag: 'PYTHON · PANDAS',
                body: 'Python + Pandas pipelines scrubbing, validating and automating grassroots survey records to eliminate discrepancy windows ahead of Monday district review meetings.',
                accent: 'bg-accent-blue dark:bg-accent-blue text-white dark:text-white border border-accent-blue dark:border-accent-blue',
              },
              {
                rank: 8,
                title: 'MIS Reports for Block & District Review',
                tag: 'WEEKLY BLOCK SUMMARIES',
                body: 'Automated MIS outputs verified ahead of block and district review cycles — field data turned into review-ready tables for BMOs and district leadership.',
                accent: 'bg-accent-blue dark:bg-accent-blue text-white dark:text-white border border-accent-blue dark:border-accent-blue',
              },
            ].map((item) => (
              <div
                key={item.rank}
                className="bg-surface-container-lowest dark:bg-surface-low border-3 border-primary dark:border-white p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#ffffff] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b-2 border-primary dark:border-white pb-3">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${item.accent}`}>
                      0{item.rank} &nbsp;//&nbsp; {item.tag}
                    </span>
                  </div>
                  <h3 className={`font-display text-lg font-bold uppercase tracking-tight ${item.accent === 'bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black border border-accent-yellow dark:border-accent-yellow' ? 'text-black dark:text-black' : 'text-primary dark:text-white'}`}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant dark:text-on-surface-variant/70">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Outcomes */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-surface dark:bg-surface-dark border-b-2 border-primary dark:border-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border-b-2 border-primary dark:border-white pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block mb-1">
                {'/* OUTCOMES */'}
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-primary dark:text-on-surface">
                WHAT WE DRIVE TOWARD
              </h2>
            </div>
            <p className="font-body text-xs md:text-sm text-on-surface-variant dark:text-on-surface-variant max-w-md">
              Two outcome strands anchor every intervention in the field.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white p-6 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-2 py-0.5">
                    OUTCOME 01
                  </span>
                  <span className="material-symbols-outlined text-primary dark:text-on-surface text-2xl">diversity_3</span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight text-primary dark:text-on-surface">
                  Community Outcomes
                </h3>
                <p className="font-body text-sm text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Improved health behaviors, service utilization, and citizen experience within communities — making health systems work for the people they serve.
                </p>
              </div>
              <div className="pt-4 border-t border-primary dark:border-white flex items-center justify-between font-headline text-xs uppercase font-bold text-primary dark:text-on-surface">
                <span className="text-accent-red dark:text-accent-red">{'/* OUTCOMES */'}</span>
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 border border-primary dark:border-white text-black dark:text-black">
                  PEOPLE-FIRST
                </span>
              </div>
            </div>
            <div className="bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface border-2 border-primary dark:border-white p-6 shadow-[6px_6px_0px_#ffcc00] dark:shadow-[6px_6px_0px_#ffcc00] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-on-primary/30 dark:border-white pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black px-2 py-0.5">
                    OUTCOME 02
                  </span>
                  <span className="material-symbols-outlined text-accent-yellow dark:text-primary-yellow text-2xl">hub</span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight text-on-primary dark:text-on-surface">
                  System Outcomes
                </h3>
                <p className="font-body text-sm text-on-primary/80 dark:text-on-surface-variant leading-relaxed">
                  Stronger governance, better resource allocation, and resilient public health infrastructure — systems that sustain beyond any single intervention.
                </p>
              </div>
              <div className="pt-4 border-t border-on-primary/30 dark:border-white flex items-center justify-between font-headline text-xs uppercase font-bold text-on-primary dark:text-on-surface">
                <span className="text-accent-yellow dark:text-primary-yellow">{'/* SYSTEMS */'}</span>
                <span className="bg-on-primary dark:bg-on-surface text-primary dark:text-surface px-2 py-0.5 border border-on-primary/30 dark:border-white">
                  RESILIENT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO Building Blocks */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-surface-container dark:bg-surface-low border-b-2 border-primary dark:border-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border-b-2 border-primary dark:border-white pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block mb-1">
                {'/* SYSTEM OUTCOMES */'}
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-primary dark:text-on-surface">
                WHO BUILDING BLOCKS, UNDER FOCUS
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <p className="font-body text-xs md:text-sm text-on-surface-variant dark:text-on-surface-variant max-w-md">
                Day-to-day fellowship work — support activities woven across the 6 WHO building blocks.
              </p>
              <div className="flex items-center gap-2 font-headline text-[10px] uppercase font-bold text-primary dark:text-on-surface">
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 border border-primary dark:border-white text-black dark:text-black">
                  6 PILLARS IN FOCUS
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: '01', title: 'Service Delivery', desc: 'Strengthening frontline service delivery at sub-centres and PHCs through protocol adherence and digital tools.', color: 'bg-accent-yellow dark:bg-primary-yellow' },
              { id: '02', title: 'Health Workforce (HRH)', desc: 'Capacity building for ASHA, ANM, CHO, and PHC staff through 100+ micro-sessions.', color: 'bg-accent-red dark:bg-accent-red' },
              { id: '03', title: 'Health Information Systems', desc: 'ODK Collect, M-ASHA digital app, and automated MIS reporting pipelines.', color: 'bg-accent-blue dark:bg-accent-blue' },
              { id: '04', title: 'Access to Medicines', desc: 'Supply chain monitoring and medicine forecasting to prevent stockouts.', color: 'bg-accent-yellow dark:bg-primary-yellow' },
              { id: '05', title: 'Financing', desc: 'Resource allocation and budget tracking for block-level health programs.', color: 'bg-accent-red dark:bg-accent-red' },
              { id: '06', title: 'Leadership & Governance', desc: 'Block and district review cycles, NQAS certification support, and quality assurance.', color: 'bg-accent-blue dark:bg-accent-blue' },
            ].map((pillar) => (
              <div
                key={pillar.id}
                className="bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] space-y-3 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-2">
                  <span className={`font-headline text-xs font-bold uppercase tracking-wider ${pillar.color} text-black dark:text-black px-2 py-0.5 border border-primary dark:border-white`}>
                    {pillar.id}{' // '}{pillar.title}
                  </span>
                </div>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Mind */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-surface-container-low dark:bg-surface-low border-b-2 border-primary dark:border-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border-b-2 border-primary dark:border-white pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block mb-1">
                INTERNAL DISCIPLINE &amp; EQUANIMITY
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-primary dark:text-on-surface">
                FIELD MIND &amp; SUSTAINED OPERATIONAL DISCIPLINE
              </h2>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-wider bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-3 py-1">
              INNER ARCHITECTURE // HIGH-BURDEN CONTEXT
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-primary dark:border-white p-6 bg-surface dark:bg-surface-container-lowest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider text-accent-red dark:text-accent-red">
                    PRACTICE 01 // COGNITIVE TRAINING
                  </span>
                  <span className="material-symbols-outlined text-primary dark:text-on-surface text-xl">psychology</span>
                </div>
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-primary dark:text-on-surface">
                  Cognitively-Based Compassion Training (CBCT®) &amp; Leadership Workshop
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Formal compassion methodology and emotional resilience training. Developed systemic empathy to engage with frontline workers facing severe burnout, resource scarcity, and structural fatigue.
                </p>
              </div>
              <div className="pt-3 border-t border-primary dark:border-white flex items-center justify-between text-[11px] font-headline uppercase font-bold text-primary dark:text-on-surface">
                <span>LOCATION: HAJIPUR RESIDENTIAL</span>
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 text-black dark:text-black">COMPASSIONATE SYSTEMS</span>
              </div>
            </div>
            <div className="border-2 border-primary dark:border-white p-6 bg-surface dark:bg-surface-container-lowest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider text-accent-blue dark:text-accent-blue">
                    PRACTICE 02 // INTELLECTUAL EQUANIMITY
                  </span>
                  <span className="material-symbols-outlined text-primary dark:text-on-surface text-xl">self_improvement</span>
                </div>
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-primary dark:text-on-surface">
                  10-Day Silent Vipassana Meditation Course at Dhamma Vaishali
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Rigorous ten days of Noble Silence and sensory austerity. Cultivated unbroken focus, non-reactive clarity under extreme pressure, and radical endurance.
                </p>
              </div>
              <div className="pt-3 border-t border-primary dark:border-white flex items-center justify-between text-[11px] font-headline uppercase font-bold text-primary dark:text-on-surface">
                <span>DHAMMA VAISHALI, BIHAR</span>
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 text-black dark:text-black">10-DAY SILENT RETREAT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry Feed */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface border-b-2 border-primary dark:border-white">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-on-primary/30 dark:border-outline pb-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent-yellow dark:bg-primary-yellow animate-pulse" />
              <h2 className="font-headline text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-yellow dark:text-primary-yellow">
                LIVE OPERATIONAL TELEMETRY FEED // FIELD AGENT ADITYA PANDEY
              </h2>
            </div>
            <div className="font-headline text-xs uppercase tracking-widest text-on-primary/70 dark:text-on-surface-variant">
              PULSE FREQUENCY: CONTINUOUS HEARTBEAT
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'FEED_01', title: 'M-ASHA Rollout', desc: 'Daily active health worker data synchronizations across 16 blocks.', status: 'OPERATIONAL' },
              { id: 'FEED_02', title: 'ODK Central Sync', desc: 'PostgreSQL backend collecting structured field assessments nightly.', status: 'OPERATIONAL' },
              { id: 'FEED_03', title: 'MIS Reporting', desc: 'Automated script outputs verified ahead of Monday review cycles.', status: 'OPERATIONAL' },
              { id: 'FEED_04', title: 'Medicine Forecasting', desc: 'Time-series consumption model to predict peripheral stockouts.', status: 'IN PROGRESS' },
            ].map((feed) => (
              <div
                key={feed.id}
                className={`border-2 p-4 space-y-2 ${
                  feed.status === 'IN PROGRESS'
                    ? 'border-accent-yellow dark:border-primary-yellow bg-surface-container-high/10 dark:bg-surface-low'
                    : 'border-on-primary/40 dark:border-outline bg-primary dark:bg-surface-low'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-headline font-bold">
                  <span className="text-on-primary/70 dark:text-on-surface-variant">{feed.id}</span>
                  <span
                    className={
                      feed.status === 'IN PROGRESS'
                        ? 'text-accent-yellow dark:text-primary-yellow font-bold'
                        : 'text-accent-yellow dark:text-primary-yellow font-bold'
                    }
                  >
                    {feed.status}
                  </span>
                </div>
                <div className="font-headline text-sm font-bold uppercase text-on-primary dark:text-on-surface">
                  {feed.title}
                </div>
                <p className="font-body text-[11px] text-on-primary/70 dark:text-on-surface-variant">
                  {feed.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routing banner to work */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-accent-yellow dark:bg-primary-yellow border-b-2 border-primary dark:border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-primary dark:border-white p-6 sm:p-10 bg-surface dark:bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff]">
          <div className="space-y-2 max-w-2xl">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block">
              FULL-STACK BRIDGE // CODE MEETS CLINICAL REALITY
            </span>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-primary dark:text-on-surface leading-tight">
              INTERESTED IN THE UNDERLYING CODE &amp; ARCHITECTURE?
            </h2>
            <p className="font-body text-sm text-on-surface-variant dark:text-on-surface-variant">
              Inspect the deterministic Python pipelines, offline-first architectures, and production code bases engineered to empower public health systems.
            </p>
          </div>
          <Link
            href="/work"
            className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline text-sm font-bold uppercase tracking-widest border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <span>EXPLORE PRODUCTION WORK &amp; SYSTEMS</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}



