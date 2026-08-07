'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const STEPS = [
  { msg: 'A health worker in Motipur block opens the M-ASHA app on her phone.', step: 'STEP 1 / 5 · FIELD' },
  { msg: 'She fills a form: beneficiary details, immunisation status, vitals. Offline.', step: 'STEP 2 / 5 · COLLECT' },
  { msg: 'On signal, the form syncs to ODK Central. Aditya\'s pipeline picks it up.', step: 'STEP 3 / 5 · SYNC' },
  { msg: 'Python validates, flags issues, summarises. A 4-paragraph report gets generated.', step: 'STEP 4 / 5 · CLEAN' },
  { msg: 'By morning, the district officer has the report. Decisions get made. Real ones.', step: 'STEP 5 / 5 · DECIDE' },
];

const FieldTourContext = createContext<{ open: () => void }>({ open: () => {} });

export function useFieldTour() {
  return useContext(FieldTourContext);
}

export function FieldTourProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openTour = useCallback(() => setOpen(true), []);
  return (
    <FieldTourContext.Provider value={{ open: openTour }}>
      {children}
      <FieldTourOverlay open={open} onClose={() => setOpen(false)} />
    </FieldTourContext.Provider>
  );
}

function FieldTourOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!open) return;
    idxRef.current = 0;
    setIdx(0);
    setVisible(true);
    const int = setInterval(() => {
      idxRef.current += 1;
      if (idxRef.current >= STEPS.length) {
        clearInterval(int);
        return;
      }
      setVisible(false);
      setIdx(idxRef.current);
      setTimeout(() => setVisible(true), 120);
    }, 3600);
    return () => clearInterval(int);
  }, [open]);

  const close = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[220] bg-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button onClick={close} className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-bg-2 text-ink" aria-label="Close tour">
            <X size={16} />
          </button>

          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <svg viewBox="0 0 600 200" className="mb-8 w-[min(680px,92vw)]" style={{ height: 200 }}>
              <defs>
                <filter id="fo-glow">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>
              <circle cx="100" cy="100" r="50" fill="none" stroke="var(--ink-3)" strokeWidth="1" />
              <circle cx="100" cy="100" r="8" fill="var(--primary)" filter="url(#fo-glow)" />
              <circle cx="100" cy="100" r="20" fill="none" stroke="var(--primary)" strokeWidth="2">
                <animate attributeName="r" values="20;80" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <text x="100" y="170" textAnchor="middle" fontFamily="var(--font-jetbrains)" fontSize="10" fill="var(--ink-3)">VILLAGE PHC</text>
              <line x1="150" y1="100" x2="500" y2="100" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="490" y="80" width="20" height="40" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              <text x="500" y="170" textAnchor="middle" fontFamily="var(--font-jetbrains)" fontSize="10" fill="var(--ink-3)">DISTRICT HQ</text>
              <circle cx="150" cy="100" r="4" fill="var(--primary)" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="0.4s" begin="0s" fill="freeze" />
                <animate attributeName="cx" values="150;500" dur="2s" begin="0.4s" fill="freeze" />
              </circle>
            </svg>

            <div
              className="font-serif max-w-[640px] text-[clamp(22px,2.4vw,30px)] italic leading-snug text-ink transition-all duration-400"
              style={{ fontFamily: 'var(--font-lora), serif', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)' }}
            >
              {STEPS[idx]?.msg}
            </div>
            <div className="mt-6 font-mono text-[11.5px] uppercase tracking-widest text-primary">{STEPS[idx]?.step}</div>

            <div className="mx-auto mt-8 h-0.5 max-w-[360px] overflow-hidden rounded bg-[var(--line)]">
              <div className="h-full bg-gradient-to-r from-primary to-cyan transition-all duration-500" style={{ width: `${((idx + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>

          <button onClick={close} className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[var(--line)] px-4 py-2 font-mono text-xs text-ink-3">
            SKIP TOUR
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
