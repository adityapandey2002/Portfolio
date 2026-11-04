'use client';

/**
 * V2 AiTerminal — Vector RAG Terminal section.
 *
 * Matches the design file exactly:
 * - Section header: "07 // CLIENT-SIDE INTELLIGENCE" + "Vector RAG Terminal" + "SYS_ENV: EMBEDDED_AGENT_v1.9"
 * - Terminal component with header bar, terminal body, and quick query controls
 *
 * Brutalist contract: 0px radius, thick borders, hard shadows, uppercase tracking
 */

export function AiTerminal() {
  return (
    <section id="vector-terminal" className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-white block">
              07 // CLIENT-SIDE INTELLIGENCE
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface mt-1">
              Vector RAG Terminal
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black px-3 py-1">
            <span className="w-2 h-2 bg-accent-red dark:bg-accent-red animate-ping inline-block" />
            SYS_ENV: EMBEDDED_AGENT_v1.9
          </div>
        </div>

        {/* Terminal Component */}
        <div className="bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black border-4 border-primary dark:border-white shadow-[8px_8px_0px_#1a1a1a] dark:shadow-[8px_8px_0px_#ffffff] font-mono text-xs sm:text-sm">
          {/* Terminal Header Bar */}
          <div className="bg-surface-container dark:bg-surface-container-low p-3 border-b-2 border-primary dark:border-white flex items-center justify-between font-headline font-bold text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-accent-yellow dark:bg-accent-yellow inline-block border border-primary dark:border-white" />
              <span className="w-3 h-3 bg-accent-yellow dark:bg-accent-yellow inline-block border border-primary dark:border-white" />
              <span className="w-3 h-3 bg-accent-blue dark:bg-accent-blue inline-block border border-primary dark:border-white" />
              <span className="ml-2 font-mono">vector_brain@aditya-pandey:~/bihar-ops</span>
            </div>
            <span className="text-on-surface-variant dark:text-on-surface-variant font-mono">LATENCY: 12ms</span>
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
              <span className="text-primary dark:text-white font-bold">&gt;</span>
              <span className="text-[#33ff33]" id="active-terminal-cursor">
                awaiting input...
              </span>
              <span className="w-2 h-4 bg-[#33ff33] inline-block animate-pulse" />
            </div>
          </div>

          {/* Quick Query Trigger Controls */}
          <div className="bg-[#111111] p-4 border-t-2 border-primary dark:border-white flex flex-wrap gap-2 items-center">
            <span className="text-white text-xs font-mono font-bold mr-2 uppercase">Inject Query:</span>
            <button className="px-3 py-1.5 bg-[#222222] hover:bg-accent-yellow hover:text-black text-white border border-[#444444] transition-colors font-mono text-xs cursor-pointer">
              $ query --topic matru-suraksha
            </button>
            <button className="px-3 py-1.5 bg-[#222222] hover:bg-accent-blue hover:text-white text-white border border-[#444444] transition-colors font-mono text-xs cursor-pointer">
              $ query --metrics --block araria
            </button>
            <button className="px-3 py-1.5 bg-[#222222] hover:bg-accent-red hover:text-white text-white border border-[#444444] transition-colors font-mono text-xs cursor-pointer">
              $ sys --health-stack
            </button>
            <button className="px-3 py-1.5 bg-[#222222] hover:bg-[#ffffff] hover:text-[#000000] text-[#888888] border border-[#444444] transition-colors font-mono text-xs ml-auto cursor-pointer">
              $ clear
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}




