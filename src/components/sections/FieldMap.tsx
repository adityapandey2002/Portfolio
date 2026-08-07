'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const DISTRICTS: { id: string; name: string; points: string; node?: [number, number] }[] = [
  { id: 'west-champaran', name: 'W. Champaran', points: '12,22 58,26 62,72 34,88 14,68' },
  { id: 'east-champaran', name: 'E. Champaran', points: '62,26 128,32 128,88 66,82' },
  { id: 'sitamarhi', name: 'Sitamarhi', points: '132,34 190,40 186,96 132,90' },
  { id: 'madhubani', name: 'Madhubani', points: '196,42 248,48 246,104 192,98' },
  { id: 'vaishali', name: 'Vaishali', points: '90,96 130,96 134,152 94,150' },
  { id: 'muzaffarpur', name: 'Muzaffarpur', points: '136,100 196,102 192,152 138,150', node: [164, 126] },
  { id: 'darbhanga', name: 'Darbhanga', points: '196,104 250,106 248,158 194,156' },
  { id: 'samastipur', name: 'Samastipur', points: '140,155 196,156 194,210 142,208' },
  { id: 'begusarai', name: 'Begusarai', points: '200,160 256,166 252,218 196,212' },
  { id: 'patna', name: 'Patna', points: '88,152 130,154 128,210 84,204', node: [106, 180] },
  { id: 'bhojpur', name: 'Bhojpur', points: '104,210 142,212 136,268 100,264' },
  { id: 'gaya', name: 'Gaya', points: '58,206 102,212 98,270 52,262' },
  { id: 'rohtas', name: 'Rohtas', points: '30,252 58,260 54,296 24,286' },
  { id: 'bhagalpur', name: 'Bhagalpur', points: '260,168 308,174 302,228 256,220' },
  { id: 'purnea', name: 'Purnea', points: '312,178 356,184 352,240 306,232' },
];

const LABELS: [string, number, number][] = [
  ['Patna', 110, 176],
  ['Muzaffarpur', 164, 120],
  ['Darbhanga', 220, 128],
];

export function FieldMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="relative overflow-hidden rounded-lg border border-[var(--line)] bg-bg-2 p-2"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 420 300" className="w-full" role="img" aria-label="Stylised district map of Bihar">
          {DISTRICTS.map((d, i) => {
            const muzaffarpur = d.id === 'muzaffarpur';
            return (
              <motion.polygon
                key={d.id}
                points={d.points}
                fill={muzaffarpur ? 'rgba(179,32,44,0.10)' : 'rgba(32,27,16,0.03)'}
                stroke={muzaffarpur ? 'var(--primary)' : 'var(--line)'}
                strokeWidth={muzaffarpur ? 1.5 : 1}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.03 }}
              />
            );
          })}

          <path d="M60 168 C 120 148, 220 172, 290 150" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" strokeDasharray="4 3" />

          {LABELS.map(([name, x, y]) => (
            <text key={name} x={x} y={y} textAnchor="middle" fontSize="8.5" fontFamily="var(--font-jetbrains), monospace" className="fill-ink-3">
              {name}
            </text>
          ))}

          <g>
            <circle cx={150} cy={150} r="5" fill="var(--accent)" opacity="0.9">
              <animate attributeName="r" values="5;14" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx={150} cy={150} r="3" fill="var(--accent)" />
            <text x={150} y={168} textAnchor="middle" fontSize="7.5" fontFamily="var(--font-jetbrains), monospace" className="fill-accent">
              MOTIPUR VILLAGE
            </text>
          </g>

          <g>
            <circle cx={164} cy={126} r="5" fill="var(--primary)" opacity="0.9">
              <animate attributeName="r" values="5;16" dur="2.2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="2.2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx={164} cy={126} r="3.5" fill="var(--primary)" />
            <text x={164} y={110} textAnchor="middle" fontSize="7.5" fontFamily="var(--font-jetbrains), monospace" className="fill-primary">
              FIELD HQ
            </text>
          </g>

          <g>
            <circle r="3" fill="var(--accent)">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M150 150 C 156 142, 158 132, 164 126" />
            </circle>
            <circle r="1.5" fill="var(--accent)">
              <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.1s" path="M150 150 C 156 142, 158 132, 164 126" />
            </circle>
          </g>

          <text x={420} y={290} textAnchor="end" fontSize="7" fontFamily="var(--font-jetbrains), monospace" className="fill-ink-4">
            STYLISED · NOT TO SCALE
          </text>
        </svg>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">Field footprint · Bihar</span>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--line)] bg-bg-3 px-3 py-1 font-mono text-[10px] text-ink-2">Village → Field HQ</span>
            <span className="rounded-full border border-[var(--line)] bg-bg-3 px-3 py-1 font-mono text-[10px] text-ink-2">ODK → Central → Python → Report</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
