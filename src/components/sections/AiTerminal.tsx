'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

export function AiTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="vector-terminal" className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark">
      <Section className="py-12">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-white block">
                07 // CLIENT-SIDE INTELLIGENCE
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-ink-dark mt-1">
                Vector RAG Terminal
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold bg-primary dark:bg-primary-yellow text-on-primary dark:text-on-primary px-3 py-1">
              <span className="w-2 h-2 bg-secondary dark:bg-vermilion inline-block animate-ping" />
              SYS_ENV: EMBEDDED_AGENT_v1.9
            </div>
          </div>
        </div>

        {/* Terminal Component */}
        <div
          ref={ref}
          className="bg-primary text-[#33ff33] border-4 border-primary dark:border-white shadow-[8px_8px_0px_#1a1a1a] dark:shadow-[8px_8px_0px_#ffffff] font-mono text-xs sm:text-sm"
        >
          {/* Terminal Header Bar */}
          <div className="bg-surface dark:bg-surface-l1 text-on-surface dark:text-ink-dark p-3 border-b-2 border-primary dark:border-white flex items-center justify-between font-headline font-bold text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-secondary dark:bg-vermilion inline-block border border-primary dark:border-white" />
              <span className="w-3 h-3 bg-primary-container dark:bg-primary-yellow inline-block border border-primary dark:border-white" />
              <span className="w-3 h-3 bg-tertiary dark:bg-electric-blue inline-block border border-primary dark:border-white" />
              <span className="ml-2 font-mono">vector_brain@aditya-pandey:~/bihar-ops</span>
            </div>
            <span className="text-on-surface-variant dark:text-ink-dark/70 font-mono">LATENCY: 12ms</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 space-y-4 min-h-[320px] overflow-y-auto" id="terminal-content">
            <div className="text-[#888888]">
              ========================================================================<br />
              ADITYA PANDEY // AUTONOMOUS KNOWLEDGE RETRIEVAL VECTOR AGENT [INITIALIZED]<br />
              DATABASE: 118,492 FRONTLINE HEALTH VECTORS &amp; ENGINEERING REPOSITORIES<br />
              TYPE A QUERY BELOW OR SELECT ONE OF THE RAPID PRE-FLIGHT COMMANDS.<br />
              ========================================================================
            </div>
            <div className="space-y-4" id="terminal-logs">
              <div className="text-[#33ff33]">
                <span className="text-white font-bold">$ sys --status</span><br />
                &gt; STATUS: 200 OK | PIRAMAL GAVB FELLOWSHIP RUNTIME<br />
                &gt; JURISDICTION: Muzaffarpur &amp; Araria, Bihar (16 High-Burden Blocks)<br />
                &gt; DEPLOYED SYSTEMS: Matru Suraksha (PWA), Araria DH Portal, India Data Engine.<br />
                &gt; QUERY READY: Select a vector query below to test automated synthesis.
              </div>
            </div>
            <div className="flex items-center gap-2 text-white pt-2 border-t border-dashed border-[#333333]">
              <span className="text-primary-container font-bold">&gt;</span>
              <span className="text-[#33ff33]" id="active-terminal-cursor">awaiting input...</span>
              <span className="w-2 h-4 bg-[#33ff33] inline-block animate-pulse" />
            </div>
          </div>

          {/* Quick Query Trigger Controls */}
          <div className="bg-[#111111] p-4 border-t-2 border-primary flex flex-wrap gap-2 items-center">
            <span className="text-white text-xs font-mono font-bold mr-2 uppercase">Inject Query:</span>
            <button className="px-3 py-1.5 bg-[#222222] hover:bg-primary-container hover:text-on-primary-container text-white border border-[#444444] transition-colors font-mono text-xs cursor-pointer">
              $ query --topic matru-suraksha
            </button>
            <button className="px-3 py-1.5 bg-[#222222] hover:bg-secondary hover:text-on-secondary text-white border border-[#444444] transition-colors font-mono text-xs cursor-pointer">
              $ query --metrics --block araria
            </button>
            <button className="px-3 py-1.5 bg-[#222222] hover:bg-tertiary hover:text-on-tertiary text-white border border-[#444444] transition-colors font-mono text-xs cursor-pointer">
              $ sys --health-stack
            </button>
            <button className="px-3 py-1.5 bg-[#222222] hover:bg-[#ffffff] hover:text-[#000000] text-[#888888] border border-[#444444] transition-colors font-mono text-xs ml-auto cursor-pointer">
              $ clear
            </button>
          </div>
        </div>

        {/* Link to full AI page */}
        <div className="mt-6 text-center">
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 border-2 border-primary bg-primary px-6 py-3 font-headline text-xs font-bold uppercase tracking-wider text-on-primary shadow-[4px_4px_0_#1a1a1a] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1a1a1a]"
          >
            Try the full AI assistant →
          </Link>
        </div>
      </Section>
    </section>
  );
}

