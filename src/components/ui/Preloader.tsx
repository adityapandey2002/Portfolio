'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * V2 boot screen — the V1 splash, rebuilt in the Bauhaus palette.
 *
 * Same job as the original: cover the first paint with a branded boot
 * sequence while fonts and the theme settle, then reveal the page.
 *
 * - fixed duration (~3.6s) with a live percentage
 * - click anywhere or use the skip button
 * - skipped once per session so in-site navigation stays instant
 * - reduced-motion users go straight to the page
 */

const PreloaderContext = createContext<{ done: boolean }>({ done: true });

export function usePreloader() {
  return useContext(PreloaderContext);
}

const BOOT_MS = 3600;
const CLOSE_MS = 320;
const BLOCKS = 24;

const STEPS = [
  'LOADING DESIGN TOKENS',
  'MOUNTING FIELD TELEMETRY',
  'SYNCING HEALTH PIPELINE',
  'RENDERING INTERFACE',
];

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const [closing, setClosing] = useState(false);

  const finish = useCallback(() => setClosing(true), []);

  // Auto-finish after the boot sequence. Returning visitors skip it, and
  // reduced-motion users never see the animation at all.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('preloader-done') === '1';
    } catch {
      // storage blocked — show the boot screen
    }
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reducedMotion) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setClosing(true), BOOT_MS);
    return () => clearTimeout(t);
  }, []);

  // Fade out, remember the visit, then unmount.
  useEffect(() => {
    if (!closing) return;
    try {
      sessionStorage.setItem('preloader-done', '1');
    } catch {
      // ignore
    }
    const t = setTimeout(() => setDone(true), CLOSE_MS);
    return () => clearTimeout(t);
  }, [closing]);

  // Escape skips too.
  useEffect(() => {
    if (done || closing) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [done, closing, finish]);

  return (
    <PreloaderContext.Provider value={{ done }}>
      {!done && <BootOverlay closing={closing} onSkip={finish} />}
      {children}
    </PreloaderContext.Provider>
  );
}

function BootOverlay({ closing, onSkip }: { closing: boolean; onSkip: () => void }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / BOOT_MS);
      setPct(Math.round(100 * (1 - Math.pow(1 - k, 1.6))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stepIndex = Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length));
  const filled = Math.ceil((pct / 100) * BLOCKS);

  return (
    <div
      aria-busy="true"
      aria-label="Loading portfolio"
      onClick={onSkip}
      className={`fixed inset-0 z-[600] flex select-none flex-col bg-surface text-on-surface transition-opacity duration-300 ${
        closing ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b-2 border-outline px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-outline bg-primary-container font-headline text-[10px] font-bold uppercase text-on-primary-container">
            AP
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-headline text-[11px] font-bold uppercase tracking-tight text-on-surface">
              Aditya Pandey
            </span>
            <span className="mt-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">
              [Systems &amp; Health AI]
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          <span className="h-2 w-2 animate-pulse bg-secondary" aria-hidden="true" />
          <span>BOOT SEQ // {String(pct).padStart(3, '0')}%</span>
        </div>
      </div>

      {/* Boot panel */}
      <div className="flex flex-1 items-center overflow-hidden px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-5 flex items-center gap-3 sm:mb-7">
            <span className="bg-primary px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary-container dark:bg-primary-yellow dark:text-black">
              SYS // 00
            </span>
            <span className="h-[2px] flex-1 bg-outline/25" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-on-surface-variant">
              MUZAFFARPUR · 26.12°N
            </span>
          </div>

          <div className="border-2 border-outline bg-surface-lowest p-5 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#0e0e10] sm:p-8 lg:p-10">
            <span className="inline-block border-2 border-outline bg-primary-container px-2.5 py-1 font-headline text-[9px] font-bold uppercase tracking-widest text-on-primary-container shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#0e0e10] sm:text-[10px]">
              FIELD KERNEL // BOOTING
            </span>

            <h1 className="mt-4 font-headline text-[26px] font-bold uppercase leading-[0.95] tracking-tight text-on-surface sm:mt-5 sm:text-5xl lg:text-6xl">
              Building data systems
              <br />
              that turn{' '}
              <span className="bg-primary-container px-1.5 text-on-primary-container">field work</span>
              <br />
              into real decisions.
            </h1>

            {/* Progress */}
            <div className="mt-6 sm:mt-9">
              <div className="flex items-end justify-between gap-4">
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] sm:text-xs">
                  <span className="text-on-surface-variant">STATUS // </span>
                  <span className="font-bold text-on-surface">{STEPS[stepIndex]}</span>
                  <span
                    className="ml-1 inline-block h-2.5 w-1.5 animate-pulse bg-secondary align-middle"
                    aria-hidden="true"
                  />
                </div>
                <div className="shrink-0 font-headline text-3xl font-bold tabular-nums leading-none text-on-surface sm:text-5xl">
                  {String(pct).padStart(3, '0')}
                  <span className="text-secondary">%</span>
                </div>
              </div>

              <div className="mt-2.5 flex gap-[2px]" aria-hidden="true">
                {Array.from({ length: BLOCKS }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-3.5 flex-1 border border-outline transition-colors duration-100 sm:h-4 ${
                      i < filled
                        ? i >= BLOCKS - 4
                          ? 'bg-secondary'
                          : 'bg-primary-container'
                        : 'bg-surface-container'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-1.5 flex justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-on-surface-variant">
                <span>00 // COLD START</span>
                <span className="hidden sm:inline">DATA PIPELINE · HEALTH SYSTEMS</span>
                <span>100 // READY</span>
              </div>
            </div>
          </div>

          {/* Step log */}
          <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-1.5 font-mono text-[8px] uppercase tracking-[0.14em] sm:mt-6 sm:grid-cols-4 sm:text-[9px]">
            {STEPS.map((step, i) => {
              const state = i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'pending';
              return (
                <li key={step} className="flex items-center gap-1.5">
                  <span
                    className={`inline-block h-1.5 w-1.5 shrink-0 ${
                      state === 'done'
                        ? 'bg-secondary'
                        : state === 'active'
                          ? 'animate-pulse bg-primary-container outline outline-1 outline-outline'
                          : 'bg-outline/25'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={
                      state === 'pending'
                        ? 'text-on-surface-variant/60'
                        : 'font-bold text-on-surface'
                    }
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-t-2 border-outline px-4 py-3 sm:px-8">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-on-surface-variant sm:text-[9px]">
          PORTFOLIO // V2 FIELD LEDGER
        </span>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-on-surface-variant md:block">
          CLICK ANYWHERE OR PRESS ESC
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSkip();
          }}
          className="border-2 border-outline bg-surface px-3 py-1.5 font-headline text-[10px] font-bold uppercase tracking-widest text-on-surface shadow-[3px_3px_0px_#1a1a1a] transition-transform hover:bg-primary-container hover:text-on-primary-container active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:shadow-[3px_3px_0px_#0e0e10]"
        >
          Skip boot →
        </button>
      </div>
    </div>
  );
}
