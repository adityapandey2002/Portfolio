'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

const PreloaderContext = createContext<{ done: boolean }>({ done: false });

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);

  const finish = useCallback(() => {
    setDone(true);
    try {
      sessionStorage.setItem('preloader-skipped', '1');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const skip = sessionStorage.getItem('preloader-skipped');
    if (skip === '1') {
      setDone(true);
      return;
    }
    const t = setTimeout(finish, 2800);
    return () => clearTimeout(t);
  }, [finish]);

  return (
    <PreloaderContext.Provider value={{ done }}>
      {!done && <PreloaderOverlay onSkip={finish} />}
      {children}
    </PreloaderContext.Provider>
  );
}

function PreloaderOverlay({ onSkip }: { onSkip: () => void }) {
  const [skip, setSkip] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[600] flex items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
      onClick={() => {
        setSkip(true);
        onSkip();
      }}
    >
      <div className="relative w-[min(880px,92vw)]">
        <svg viewBox="0 0 900 200" className="w-full" style={{ height: 160 }} preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="pl-glow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <line x1="140" y1="100" x2="340" y2="100" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="560" y1="100" x2="760" y2="100" stroke="var(--line)" strokeWidth="1.5" />
          <line
            x1="140" y1="100" x2="340" y2="100"
            stroke="var(--primary)" strokeWidth="2"
            strokeDasharray="200" strokeDashoffset="200" filter="url(#pl-glow)"
            style={{ animation: skip ? 'none' : 'dash 0.7s ease 0.3s forwards' }}
          />
          <line
            x1="560" y1="100" x2="760" y2="100"
            stroke="var(--primary)" strokeWidth="2"
            strokeDasharray="200" strokeDashoffset="200" filter="url(#pl-glow)"
            style={{ animation: skip ? 'none' : 'dash 0.7s ease 1.4s forwards' }}
          />

          {/* raw dots */}
          <g>
            {[
              [40, 60, 3], [70, 120, 2.5], [100, 80, 3], [60, 160, 2], [90, 40, 2.5], [30, 100, 3], [110, 140, 2], [25, 70, 2.5], [70, 180, 3], [95, 120, 2],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="var(--ink-4)" opacity={skip ? 1 : 0} style={{ animation: skip ? undefined : `dotIn 0.35s ease ${0.12 + i * 0.05}s forwards` }} />
            ))}
          </g>

          {/* center Py node */}
          <g transform="translate(450,100)">
            <circle r="46" fill="none" stroke="var(--line)" strokeWidth="1" />
            <circle
              r="46" fill="none" stroke="var(--primary)" strokeWidth="2"
              strokeDasharray="300" strokeDashoffset="300" filter="url(#pl-glow)"
              style={{ animation: skip ? 'none' : 'dash 0.7s ease 0.55s forwards' }}
            />
            <text y="8" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-outfit)" fontSize="20" fontWeight="600">AP</text>
          </g>

          {/* decision bars */}
          {skip ? null : (
            <g>
              {[0, 0, 0, 0, 0, 0].map((_, i) => (
                <rect
                  key={i}
                  x={800 + i * 15}
                  y={0}
                  width="6" height="0" fill="var(--primary)" opacity="0"
                  style={{ animation: `barUp 0.5s ease ${1.8 + i * 0.08}s forwards` }}
                />
              ))}
            </g>
          )}
        </svg>

        <div className="pointer-events-none text-center" style={{ marginTop: -90 }}>
          {[
            { text: 'Building data systems that turn', d: 0.2 },
            { text: 'field work into', d: 1.1 },
            { text: 'real decisions.', d: 1.9, accent: true },
          ].map((l) => (
            <div
              key={l.text}
              className="font-semibold"
              style={{
                fontSize: 'clamp(24px, 3.6vw, 42px)',
                letterSpacing: '-0.025em',
                opacity: skip ? 1 : 0,
                transform: skip ? 'none' : 'translateY(20px)',
                filter: skip ? 'none' : 'blur(8px)',
                color: l.accent ? 'var(--primary)' : 'var(--ink)',
                animation: skip ? undefined : `titleIn 0.9s cubic-bezier(0.16,1,0.3,1) ${l.d}s forwards`,
              }}
            >
              {l.text}
            </div>
          ))}
        </div>

        <button
          className="absolute bottom-[-70px] right-0 rounded-full border border-[var(--line)] px-4 py-2 font-mono text-xs tracking-wider text-ink-3"
          onClick={() => {
            setSkip(true);
            onSkip();
          }}
        >
          SKIP →
        </button>
      </div>

      <style jsx>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes dotIn {
          to { opacity: 1; }
        }
        @keyframes barUp {
          from { height: 0; opacity: 0; }
          to { height: 70px; opacity: 1; }
        }
        @keyframes titleIn {
          to { opacity: 1; transform: none; filter: blur(0); }
        }
      `}</style>
    </motion.div>
  );
}
