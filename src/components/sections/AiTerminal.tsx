'use client';

import Link from 'next/link';

/**
 * V2 AiTerminal — Vector RAG Terminal section.
 *
 * Matches the supplied light/dark samples exactly:
 * - Section header: "07 // CLIENT-SIDE INTELLIGENCE" + "Vector RAG Terminal"
 * - SYS_ENV badge: yellow (primary) with black text, red ping dot
 * - Terminal stays black in both themes (#1a1a1a light / #0b0b0d dark)
 * - Quick-query buttons deep-link into /ask with the question pre-loaded
 *
 * Brutalist contract: 0px radius, thick borders, hard shadows, uppercase tracking
 */

const QUERIES = [
  {
    label: '$ query --topic matru-suraksha',
    question: 'How does offline sync work in Matru Suraksha?',
    hover: 'hover:bg-primary-container hover:text-on-primary-container',
  },
  {
    label: '$ query --metrics --block araria',
    question: 'What did Aditya achieve in the Gandhi Fellowship across 16 Bihar blocks?',
    hover: 'hover:bg-secondary hover:text-on-secondary',
  },
  {
    label: '$ sys --health-stack',
    question: 'Explain the DuckDB + Parquet pipeline in the India Development Data Engine.',
    hover: 'hover:bg-tertiary hover:text-on-tertiary',
  },
];

export function AiTerminal() {
  return (
    <section
      id="vector-terminal"
      className="border-b-4 border-primary dark:border-[#3f3f46] bg-surface dark:bg-[#161619] py-10 lg:py-16 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-[#3f3f46] pb-4">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-[#facc15] block">
              07 // CLIENT-SIDE INTELLIGENCE
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface mt-1">
              Vector RAG Terminal
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold bg-primary text-on-primary px-3 py-1 dark:bg-[#facc15] dark:text-[#121214] dark:border dark:border-[#facc15]">
            <span className="w-2 h-2 bg-secondary inline-block animate-ping" />
            SYS_ENV: EMBEDDED_AGENT_v1.9
          </div>
        </div>

        {/* Terminal Component — black console in both themes */}
        <div className="bg-[#1a1a1a] dark:bg-[#0b0b0d] text-[#33ff33] border-4 border-primary dark:border-[#3f3f46] shadow-[8px_8px_0px_#1a1a1a] dark:shadow-[8px_8px_0px_#000000] font-mono text-xs sm:text-sm">
          {/* Terminal Header Bar */}
          <div className="bg-surface-container text-on-surface p-3 border-b-2 border-primary dark:border-[#3f3f46] flex items-center justify-between font-headline font-bold text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-secondary inline-block border border-primary dark:border-[#3f3f46]" />
              <span className="w-3 h-3 bg-primary-container inline-block border border-primary dark:border-[#3f3f46]" />
              <span className="w-3 h-3 bg-tertiary inline-block border border-primary dark:border-[#3f3f46]" />
              <span className="ml-2 font-mono">vector_brain@aditya-pandey:~/bihar-ops</span>
            </div>
            <span className="text-on-surface-variant font-mono">LATENCY: 12ms</span>
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
                &gt; STATUS: 200 OK | PIRAMAL GANDHI FELLOWSHIP RUNTIME<br />
                &gt; JURISDICTION: Muzaffarpur &amp; Araria, Bihar (16 High-Burden Blocks)<br />
                &gt; DEPLOYED SYSTEMS: Matru Suraksha (PWA), Araria DH Portal, India Data Engine.<br />
                &gt; QUERY READY: Select a vector query below to test automated synthesis.
              </div>
            </div>
            <div className="flex items-center gap-2 text-white pt-2 border-t border-dashed border-[#333333]">
              <span className="text-primary-container font-bold">&gt;</span>
              <span className="text-[#33ff33]" id="active-terminal-cursor">
                awaiting input...
              </span>
              <span className="w-2 h-4 bg-[#33ff33] inline-block animate-pulse" />
            </div>
          </div>

          {/* Quick Query Trigger Controls */}
          <div className="bg-[#111111] p-4 border-t-2 border-primary dark:border-[#3f3f46] flex flex-wrap gap-2 items-center">
            <span className="text-white text-xs font-mono font-bold mr-2 uppercase">Inject Query:</span>
            {QUERIES.map((item) => (
              <Link
                key={item.label}
                href={`/ask?q=${encodeURIComponent(item.question)}`}
                className={`px-3 py-1.5 bg-[#222222] text-white border border-[#444444] transition-colors font-mono text-xs cursor-pointer ${item.hover}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/ask"
              className="px-3 py-1.5 bg-[#222222] hover:bg-[#ffffff] hover:text-[#000000] text-[#9a9a9a] border border-[#444444] transition-colors font-mono text-xs ml-auto cursor-pointer"
            >
              $ clear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
