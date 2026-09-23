'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Block = {
  id: string;
  name?: string;
  points: string;
  label: [number, number];
  tone?: 'visited' | 'muted';
  color?: string;
  chc?: [number, number][];
  hwc?: [number, number][];
};

/** Stylised district map — layout follows the official block map, not to scale. */
const BLOCKS: Block[] = [
  { id: 'sahebganj', name: 'SAHEBGANJ', points: '24,72 66,66 72,102 60,120 28,114 18,92', label: [46, 97] },
  { id: 'baruraji', name: 'BARURAJI', points: '68,66 122,60 130,86 126,112 74,118 70,98', label: [98, 93] },
  { id: 'minapur', name: 'MINAPUR', points: '134,58 188,54 214,66 216,96 206,118 168,124 138,112 130,84', tone: 'muted', color: 'var(--indigo)', label: [172, 91] },
  { id: 'aurai', name: 'AURAI', points: '230,48 272,44 296,56 296,82 284,100 254,106 236,94 226,70', tone: 'muted', color: 'var(--cyan)', label: [261, 77] },
  { id: 'katra', name: 'KATRA', points: '278,104 306,100 316,118 310,138 286,142 274,128', tone: 'visited', color: 'var(--primary)', label: [295, 110], chc: [[286, 122]], hwc: [[300, 126], [292, 134], [304, 116]] },
  { id: 'ne-arm', points: '318,74 358,76 372,102 368,142 346,158 322,148 312,120 314,96', tone: 'muted', color: 'var(--indigo)', label: [342, 118] },
  { id: 'bochaha', name: 'BOCHAHA', points: '252,114 282,112 306,132 310,160 298,188 270,194 254,178 246,150', tone: 'visited', color: 'var(--accent)', label: [279, 144], chc: [[266, 158], [294, 172]], hwc: [[276, 178], [296, 150], [256, 168]] },
  { id: 'gaighat', name: 'GAIGHAT', points: '318,152 356,158 372,178 368,214 344,228 318,216 310,186', tone: 'muted', color: 'var(--rose)', label: [342, 196] },
  { id: 'bandra', name: 'BANDRA', points: '314,224 350,232 364,252 356,272 324,276 310,254', label: [338, 256] },
  { id: 'kanti', name: 'KANTI', points: '152,128 196,124 216,138 214,164 192,178 162,174 148,154', tone: 'muted', color: 'var(--cyan)', label: [182, 156] },
  { id: 'marwan', name: 'MARWAN', points: '142,174 184,178 198,196 192,222 168,232 146,220 138,196', tone: 'muted', color: 'var(--accent)', label: [168, 208] },
  { id: 'muzaffarpur', name: 'MUZAFFARPUR', points: '192,156 222,150 242,164 246,186 236,206 212,214 190,206 180,184 182,166', tone: 'visited', color: 'var(--primary)', label: [214, 198], chc: [[198, 172], [232, 194]], hwc: [[206, 200], [236, 170], [222, 204]] },
  { id: 'paroo', name: 'PAROO', points: '26,132 72,128 98,144 100,178 90,208 60,216 32,202 20,170', tone: 'muted', color: 'var(--primary)', label: [60, 178] },
  { id: 'saraiya', name: 'SARAIYA', points: '104,206 150,202 176,216 178,244 156,266 122,272 102,252 98,226', tone: 'muted', color: 'var(--accent)', label: [140, 242] },
  { id: 'kurhani', name: 'KURHANI', points: '196,214 240,222 268,238 274,266 254,286 220,290 194,272 188,242', tone: 'visited', color: 'var(--cyan)', label: [232, 278], chc: [[218, 242], [248, 262]], hwc: [[236, 268], [208, 260], [258, 246]] },
  { id: 'dholi', name: 'DHOLI', points: '278,214 302,220 312,242 306,264 288,270 276,252 274,232', tone: 'visited', color: 'var(--rose)', label: [293, 262], chc: [[286, 234]], hwc: [[300, 252], [280, 256]] },
  { id: 'sakra', name: 'SAKRA', points: '248,268 288,274 310,286 304,304 272,308 248,296 240,280', tone: 'visited', color: 'var(--rose)', label: [276, 303], chc: [[264, 284]], hwc: [[292, 292], [254, 296]] },
];

const NEIGHBORS: [string, number, number][] = [
  ['EAST CHAMPARAN', 62, 42],
  ['SHEOHAR', 172, 38],
  ['SITAMARHI', 276, 30],
  ['MADHUBANI', 350, 44],
  ['SAMASTIPUR', 356, 296],
  ['VAISHALI', 176, 314],
  ['SARAN', 44, 314],
];

const HQ: [number, number] = [214, 178];

const ROUTES: string[] = [
  `M${HQ[0]},${HQ[1]} Q 262,120 295,122`,
  `M${HQ[0]},${HQ[1]} Q 252,140 279,154`,
  `M${HQ[0]},${HQ[1]} Q 210,238 232,252`,
  `M${HQ[0]},${HQ[1]} Q 266,214 293,244`,
  `M${HQ[0]},${HQ[1]} Q 240,262 276,288`,
];

export function DistrictVisitMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="flex h-full w-full min-h-0 flex-col items-stretch justify-center gap-2">
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 400 340"
        className="block h-auto max-h-full w-full max-w-full"
        role="img"
        aria-label="Muzaffarpur district — field visit map"
      >
        {/* neighbours */}
        {NEIGHBORS.map(([name, x, y]) => (
          <text
            key={name}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="7"
            fontFamily="var(--font-mono)"
            letterSpacing="1"
            className="fill-ink-4"
          >
            {name}
          </text>
        ))}

        {/* blocks */}
        {BLOCKS.map((b, i) => (
          <motion.polygon
            key={b.id}
            points={b.points}
            fill={
              b.tone === 'visited'
                ? b.color
                : b.tone === 'muted'
                  ? 'var(--ink-4)'
                  : 'var(--line)'
            }
            fillOpacity={b.tone === 'visited' ? 0.22 : b.tone === 'muted' ? 0.14 : 0.45}
            stroke={b.tone === 'visited' ? b.color : 'var(--line-2)'}
            strokeWidth={b.tone === 'visited' ? 1.4 : 1}
            aria-label={`${b.name || b.id} — ${b.tone === 'visited' ? 'visited block' : b.tone === 'muted' ? 'active region' : 'outside focus'}`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.03, ease: EASE }}
          />
        ))}

        {/* block labels */}
        {BLOCKS.map((b, i) =>
          b.name ? (
            <motion.text
              key={`t-${b.id}`}
              x={b.label[0]}
              y={b.label[1]}
              textAnchor="middle"
              fontSize={b.tone === 'visited' ? '7' : '6.5'}
              fontFamily="var(--font-mono)"
              letterSpacing="0.6"
              fontWeight={b.tone === 'visited' ? 600 : 400}
              className={b.tone === 'visited' ? 'fill-ink' : b.tone === 'muted' ? 'fill-ink-3' : 'fill-ink-4'}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
            >
              {b.name}
            </motion.text>
          ) : null
        )}

        {/* HQ → block visit routes */}
        {ROUTES.map((d, i) => (
          <motion.path
            key={`r-${i}`}
            d={d}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            strokeLinecap="round"
            opacity={0.75}
            aria-label="Visit route"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.75 } : {}}
            transition={{ duration: 1.1, delay: 0.9 + i * 0.14, ease: EASE }}
          />
        ))}

        {/* travelling dots along routes */}
        {inView &&
          ROUTES.map((d, i) => (
            <circle key={`dot-${i}`} r="2.2" fill="var(--accent)">
              <animateMotion dur={`${3.4 + i * 0.4}s`} begin={`${1.6 + i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}

        {/* CHC pins (squares) */}
        {BLOCKS.flatMap((b) =>
          (b.chc || []).map(([x, y], j) => (
            <motion.g
              key={`${b.id}-chc-${j}`}
              aria-label="CHC · visited"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 1.3 + j * 0.05, ease: EASE }}
            >
              <rect x={x - 3.2} y={y - 3.2} width="6.4" height="6.4" rx="1.2" fill="var(--bg-3)" stroke="var(--accent)" strokeWidth="1.4" />
            </motion.g>
          ))
        )}

        {/* HWC pins (dots) */}
        {BLOCKS.flatMap((b) =>
          (b.hwc || []).map(([x, y], j) => (
            <motion.circle
              key={`${b.id}-hwc-${j}`}
              cx={x}
              cy={y}
              r="2.4"
              fill="var(--cyan)"
              aria-label="HWC · visited"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 1.45 + j * 0.05, ease: EASE }}
            />
          ))
        )}

        {/* HQ */}
        <motion.g aria-label="Muzaffarpur — District HQ" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
          <circle cx={HQ[0]} cy={HQ[1]} r="9" fill="var(--primary)" opacity="0.25">
            <animate attributeName="r" values="9;16" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <path
            d={`M${HQ[0]},${HQ[1] - 8} l2.4,5 5.6,.7 -4.1,3.8 1.1,5.5 -5,-2.7 -5,2.7 1.1,-5.5 -4.1,-3.8 5.6,-.7 Z`}
            fill="var(--accent)"
            stroke="var(--bg-3)"
            strokeWidth="1"
          />
        </motion.g>

        {/* legend */}
        <g fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.8">
          <g transform="translate(16,334)">
            <path d="M0,-5 l1.6,3.3 3.6,.5 -2.7,2.5 .7,3.6 -3.2,-1.7 -3.2,1.7 .7,-3.6 -2.7,-2.5 3.6,-.5 Z" fill="var(--accent)" transform="translate(4,1)" />
            <text x="14" y="4" className="fill-ink-3">HQ</text>
          </g>
          <g transform="translate(52,334)">
            <rect x="0" y="-4" width="7" height="7" rx="1.2" fill="var(--bg-3)" stroke="var(--accent)" strokeWidth="1.3" />
            <text x="12" y="4" className="fill-ink-3">CHC</text>
          </g>
          <g transform="translate(98,334)">
            <circle cx="3.5" cy="0" r="2.6" fill="var(--cyan)" />
            <text x="12" y="4" className="fill-ink-3">HWC</text>
          </g>
          <g transform="translate(150,334)">
            <rect x="0" y="-4" width="8" height="7" rx="1" fill="var(--primary)" fillOpacity="0.22" stroke="var(--primary)" strokeWidth="1.2" />
            <text x="13" y="4" className="fill-ink-3">VISITED BLOCK</text>
          </g>
          <text x="388" y="334" textAnchor="end" className="fill-ink-4">STYLISED · NOT TO SCALE</text>
        </g>
      </svg>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">6/6 blocks · 12 CHCs covered</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-4">HQ → field routes</span>
      </div>
    </div>
  );
}
