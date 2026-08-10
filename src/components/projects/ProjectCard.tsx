'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BookOpen, Github, X } from 'lucide-react';
import type { Project } from '@/lib/data/projects';
import { TiltCard } from '@/components/motion/TiltCard';
import { LiveShot } from './LiveShot';

const GLYPH_COLORS: Record<Project['category'], string> = {
  ml: '#818cf8',
  health: '#34d399',
  fullstack: '#22d3ee',
};

interface LiveInfo {
  up: boolean;
  latencyMs: number | null;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  liveInfo?: LiveInfo | null;
}

export function ProjectCard({ project, index = 0, liveInfo }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  const card = (
    <TiltCard max={8} className="h-full">
      <article
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
          e.currentTarget.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-bg-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_60px_-20px_var(--primary-glow)]"
      >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), var(--primary-glow), transparent 55%)',
              }}
            />

            {/* Cover */}
            <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden" style={{ background: project.cover || 'linear-gradient(135deg, #0f1421, #161c2c)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 40%, rgba(99,102,241,0.35), transparent 60%)' }} />
              {project.live && <LiveShot url={project.live} alt={`${project.title} — live site preview`} />}
              {!project.live && project.glyph && (
                <span
                  className="relative font-mono text-[44px] font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{ color: GLYPH_COLORS[project.category], textShadow: '0 0 24px rgba(255,255,255,0.25)' }}
                >
                  {project.glyph}
                </span>
              )}
              <span
                className="absolute left-3 top-3 rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[10px] font-semibold text-ink backdrop-blur-sm"
                style={{ background: 'color-mix(in srgb, var(--bg-2) 85%, transparent)' }}
              >
                {project.categoryLabel}
              </span>
              {project.status && (
                <span
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold backdrop-blur-sm"
                  style={
                    liveInfo && !liveInfo.up
                      ? { background: 'color-mix(in srgb, #f87171 15%, var(--bg-2) 85%)', color: '#f87171', border: '1px solid color-mix(in srgb, #f87171 40%, transparent)' }
                      : { background: 'color-mix(in srgb, var(--primary) 12%, var(--bg-2) 85%)', color: 'var(--primary)', border: '1px solid color-mix(in srgb, var(--primary) 35%, transparent)' }
                  }
                  title={
                    liveInfo
                      ? `${project.status} — ${liveInfo.up ? 'reachable' : 'unreachable'}${liveInfo.latencyMs !== null ? ` · ${liveInfo.latencyMs}ms` : ''}`
                      : `${project.status} — checking…`
                  }
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: liveInfo && !liveInfo.up ? '#f87171' : 'var(--primary)',
                      animation: liveInfo ? 'pulse 1.8s infinite' : 'none',
                    }}
                  />
                  {liveInfo ? (liveInfo.up ? 'LIVE' : 'OFFLINE') : project.status}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="relative flex flex-1 flex-col p-5">
              <h3 className="glitch text-[17px] font-semibold leading-snug text-ink" data-text={project.title}>
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-2">{project.desc}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-sm border border-[var(--line)] bg-bg px-2 py-1 font-mono text-[10px] text-ink-2">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-dashed border-[var(--line-2)] pt-4">
                {project.path ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-primary transition-colors group-hover:text-ink">
                    Open dashboard <ArrowUpRight size={13} />
                  </span>
                ) : (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-primary transition-colors hover:text-ink"
                    >
                      <BookOpen size={13} /> Case study
                    </button>
                    <span className="ml-auto flex items-center gap-2">
                      {project.live ? (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-3">
                          Open live site <ArrowUpRight size={13} />
                        </span>
                      ) : null}
                      {project.source && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.source!, '_blank', 'noopener,noreferrer');
                          }}
                          className="icon-link"
                          title="View source code"
                          aria-label={`${project.title} source on GitHub`}
                        >
                          <Github size={15} />
                        </button>
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>
          </article>
        </TiltCard>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        {project.path ? (
          <Link
            href={project.path}
            className="block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`${project.title} — open dashboard`}
          >
            {card}
          </Link>
        ) : project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`${project.title} — open live site`}
          >
            {card}
          </a>
        ) : (
          card
        )}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center bg-bg/70 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl overflow-hidden rounded-lg border border-[var(--line)] bg-bg-2 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-4">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">Case study · {project.categoryLabel}</span>
                <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--line)] text-ink-3 hover:text-ink" aria-label="Close">
                  <X size={14} />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
                <h3 className="text-2xl font-semibold text-ink">{project.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{project.caseStudy.intro}</p>
                <ul className="mt-5 space-y-2">
                  {project.caseStudy.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-[13.5px] text-ink-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
                  <span className="font-mono text-[12px] text-primary">{project.caseStudy.stack}</span>
                  {project.caseStudy.note && <span className="font-mono text-[11px] text-ink-3">→ {project.caseStudy.note}</span>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
