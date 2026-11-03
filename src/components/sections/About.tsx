'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="border-b-4 border-primary dark:border-white bg-surface-container-low dark:bg-surface-l1">
      <Section className="py-12">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-secondary dark:text-vermilion block">
                02 // PROFILE DOSSIER
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-ink-dark mt-1">
                Living at the frontline.
              </h2>
            </div>
            <div className="font-mono text-xs text-on-surface-variant dark:text-ink-dark/70">
              FILE_ID: AP_GAVB_2025_BIO
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Biography Narrative */}
          <div className="lg:col-span-7 bg-surface-container-lowest dark:bg-surface-l2 border-3 border-primary dark:border-white p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] flex flex-col justify-between">
            <div className="space-y-5">
              <div className="inline-block bg-primary dark:bg-primary-yellow text-on-primary dark:text-on-primary px-3 py-1 font-headline text-xs uppercase font-bold tracking-widest">
                Field Engineer Biography
              </div>
              <p className="font-headline text-xl sm:text-2xl font-bold text-on-surface dark:text-ink-dark leading-snug">
                Full-stack AI & public health data engineer stationed in Bihar, bridging physical registers and algorithmic decisions.
              </p>
              <p className="font-body text-sm sm:text-base text-on-surface dark:text-ink-dark leading-relaxed">
                As a <strong>Gandhi Fellow (GAVB) with the Piramal Foundation</strong>, I spend my days in remote sub-centres and district hospitals across Muzaffarpur and Araria. I coordinate directly with frontline ASHA workers, ANMs, Auxiliary Staff, PHC/CHC Medical Officers, and District Magistrates.
              </p>
              <p className="font-body text-sm sm:text-base text-on-surface dark:text-ink-dark leading-relaxed">
                When I am not auditing maternal health registers under ceiling fans in rural PHCs, I am writing Python automation scripts, architecting offline-first IndexedDB Progressive Web Apps, and engineering deterministic SQL validation pipelines to ensure government decision-makers act on truthful, high-fidelity data.
              </p>
              <div className="pt-4 border-t-2 border-primary dark:border-white grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-surface dark:bg-surface-l1 border border-primary dark:border-white">
                  <span className="block font-headline text-xs font-bold uppercase text-on-surface-variant dark:text-ink-dark/70">Current Deployment Base</span>
                  <span className="font-headline text-sm font-bold text-on-surface dark:text-ink-dark">Muzaffarpur & Araria, Bihar</span>
                </div>
                <div className="p-3 bg-surface dark:bg-surface-l1 border border-primary dark:border-white">
                  <span className="block font-headline text-xs font-bold uppercase text-on-surface-variant dark:text-ink-dark/70">Native Hometown</span>
                  <span className="font-headline text-sm font-bold text-on-surface dark:text-ink-dark">Pratapgarh, Uttar Pradesh</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t-2 border-primary dark:border-white">
              {['#PublicHealthData', '#PostgreSQL', '#NextJS', '#OfflineFirst', '#VectorRAG'].map((tag) => (
                <span key={tag} className="font-mono text-xs uppercase px-2 py-1 bg-surface-container dark:bg-surface-l1 border border-primary dark:border-white font-bold text-on-surface dark:text-ink-dark">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Identity Dossier Card */}
          <div className="lg:col-span-5 bg-surface-container dark:bg-surface-l1 border-3 border-primary dark:border-white p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3">
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-on-surface dark:text-ink-dark">IDENTITY DOSSIER // SPEC</span>
                <span className="bg-primary-container dark:bg-primary-yellow text-on-primary-container dark:text-on-primary text-[11px] font-mono font-bold px-2 py-0.5 border border-primary dark:border-white">VERIFIED</span>
              </div>
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="border-b border-primary/40 dark:border-white/40 pb-2">
                  <div className="text-on-surface-variant dark:text-ink-dark/70 text-xs uppercase font-headline">Fellowship Title</div>
                  <div className="font-bold text-primary dark:text-white text-base">GAVB Gandhi Fellow</div>
                </div>
                <div className="border-b border-primary/40 dark:border-white/40 pb-2">
                  <div className="text-on-surface-variant dark:text-ink-dark/70 text-xs uppercase font-headline">Deploying Organization</div>
                  <div className="font-bold text-primary dark:text-white">Piramal Foundation</div>
                </div>
                <div className="border-b border-primary/40 dark:border-white/40 pb-2">
                  <div className="text-on-surface-variant dark:text-ink-dark/70 text-xs uppercase font-headline">Academic Foundation</div>
                  <div className="font-bold text-primary dark:text-white">Master of Computer Applications (MCA)</div>
                  <div className="text-xs text-on-surface-variant dark:text-ink-dark/70 font-sans">Pondicherry University (Central Univ)</div>
                </div>
                <div className="pb-2">
                  <div className="text-on-surface-variant dark:text-ink-dark/70 text-xs uppercase font-headline mb-1">Core Disciplines</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary dark:bg-vermilion inline-block" />
                      <span className="text-on-surface dark:text-ink-dark">Frontline Public Health Informatics & MIS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-tertiary dark:bg-electric-blue inline-block" />
                      <span className="text-on-surface dark:text-ink-dark">Full-Stack Web (React, Next.js, Node, Dexie.js)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary dark:bg-white inline-block" />
                      <span className="text-on-surface dark:text-ink-dark">Offline-First Progressive Web Applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-container dark:bg-primary-yellow inline-block border border-primary dark:border-white" />
                      <span className="text-on-surface dark:text-ink-dark">Applied Vector RAG & Health AI Agents</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-primary dark:border-white space-y-2">
                <span className="font-headline text-xs font-bold uppercase tracking-wider block text-on-surface dark:text-ink-dark">Field Operating Badges</span>
                <div className="flex flex-wrap gap-2">
                  {['PHC Direct Immersion', 'Deterministic QA Pipelines', 'State Portal Diagnostics', 'IndexedDB Local Cache'].map((badge) => (
                    <span key={badge} className="text-[11px] font-mono font-semibold bg-surface-container-lowest dark:bg-surface-l2 px-2 py-1 border border-primary dark:border-white text-on-surface dark:text-ink-dark">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
