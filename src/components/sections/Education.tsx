'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { Section } from '@/components/ui/Section';

const DEGREES = [
  {
    num: '01',
    period: '2023 – 2025 // POSTGRADUATE',
    accent: 'text-secondary dark:text-vermilion',
    degree: 'Master of Computer Applications (MCA)',
    school: 'Pondicherry University (Central University), Puducherry',
    desc: 'Specialized in Advanced Data Structures, Distributed Database Systems, Cloud Architecture, Network Protocols, and Applied Machine Learning.',
  },
  {
    num: '02',
    period: '2022 – 2023 // POSTGRADUATE',
    accent: 'text-tertiary dark:text-electric-blue',
    degree: 'Master of Arts in Political Science & Government',
    school: 'Prof. Rajendra Singh (Rajju Bhaiya) University, Prayagraj, UP',
    desc: 'Focus on Public Administration, Democratic Institutions, Comparative Public Policy, and State Welfare Apparatuses.',
  },
  {
    num: '03',
    period: '2019 – 2022 // UNDERGRADUATE',
    accent: 'text-primary dark:text-white',
    degree: 'Bachelor of Science (BSc) in Mathematics',
    school: 'Dr. Rammanohar Lohia Avadh University, Ayodhya',
    desc: 'Core coursework in Real Analysis, Linear Algebra, Probability Theory, Discrete Mathematics, and Numerical Methods.',
  },
];

const CERTS = [
  {
    badge: 'IBM CREDENTIAL',
    badgeBg: 'bg-primary text-on-primary',
    level: 'PROFESSIONAL',
    title: 'IBM Data Science Professional Certificate',
    desc: 'Comprehensive verification in Python, SQL data extraction, statistical analysis, predictive modeling, data visualization, and applied ML.',
  },
  {
    badge: 'NPTEL / IIT',
    badgeBg: 'bg-tertiary text-on-tertiary',
    level: 'NATIONAL LEVEL',
    title: 'NPTEL IIT Certifications (Python & R for Data Science)',
    desc: 'Rigorous algorithmic computing, statistical hypothesis testing, experimental design, and data wrangling under IIT faculties.',
  },
  {
    badge: 'MSME GOVT',
    badgeBg: 'bg-primary-container text-on-primary-container border border-primary',
    level: 'GOVT OF INDIA',
    title: 'MSME Python-Based Data Analysis Certification',
    desc: 'Certified hands-on training for automated business intelligence, data pipeline engineering, and dashboard synthesis.',
  },
  {
    badge: 'LEADERSHIP',
    badgeBg: 'bg-secondary text-on-secondary',
    level: 'COMMUNITY',
    title: 'Founder & Head — Sangam Cultural Group',
    desc: 'Founded and directed inter-collegiate cultural initiatives, managed 40+ student volunteers, and coordinated institutional arts festivals.',
  },
];

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark">
      <Section className="py-12">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-white block">
                05 // CREDENTIALS & FOUNDATION
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-ink-dark mt-1">
                Education & Accreditations
              </h2>
            </div>
            <span className="font-mono text-xs text-on-surface-variant dark:text-ink-dark/70">
              RIGOROUS ACADEMIC PEDIGREE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Formal Degrees */}
          <div className="border-3 border-primary dark:border-white bg-surface dark:bg-surface-l1 p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] space-y-6">
            <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3">
              <h3 className="font-headline text-xl font-bold uppercase text-on-surface dark:text-ink-dark">Formal University Degrees</h3>
              <span className="material-symbols-outlined text-primary dark:text-white">school</span>
            </div>
            <div className="space-y-6">
              {DEGREES.map((deg) => (
                <div key={deg.degree} className="border-l-4 border-primary dark:border-white pl-4 py-1 space-y-1">
                  <span className={`font-mono text-xs font-bold ${deg.accent} uppercase`}>{deg.period}</span>
                  <h4 className="font-headline text-lg font-bold text-on-surface dark:text-ink-dark">{deg.degree}</h4>
                  <p className="font-body text-xs sm:text-sm text-on-surface-variant dark:text-ink-dark/70 font-medium">{deg.school}</p>
                  <p className="font-body text-xs text-on-surface dark:text-ink-dark pt-1 leading-relaxed">{deg.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Accreditations & Leadership */}
          <div className="border-3 border-primary dark:border-white bg-surface dark:bg-surface-l1 p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] space-y-6">
            <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3">
              <h3 className="font-headline text-xl font-bold uppercase text-on-surface dark:text-ink-dark">Accreditations & Leadership</h3>
              <span className="material-symbols-outlined text-primary dark:text-white">verified</span>
            </div>
            <div className="space-y-4">
              {CERTS.map((cert) => (
                <div key={cert.title} className="bg-surface dark:bg-surface-l1 p-4 border-2 border-primary dark:border-white">
                  <div className="flex justify-between items-start">
                    <span className={`${cert.badgeBg} px-2 py-0.5 font-headline text-xs font-bold uppercase`}>
                      {cert.badge}
                    </span>
                    <span className="font-mono text-xs text-on-surface-variant dark:text-ink-dark/70">{cert.level}</span>
                  </div>
                  <h4 className="font-headline text-base font-bold text-on-surface dark:text-ink-dark mt-2">{cert.title}</h4>
                  <p className="font-body text-xs text-on-surface-variant dark:text-ink-dark/70 mt-1">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}

