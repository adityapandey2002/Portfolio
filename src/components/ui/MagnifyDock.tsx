'use client';

import { createContext, useContext, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';

export interface MousePos {
  x: number;
  y: number;
}

/** Sentinel position: nothing sits at infinity, so every item rests at scale 1. */
const FAR: MousePos = { x: Infinity, y: Infinity };

interface MagnifyState {
  mouse: MotionValue<MousePos>;
  range: number;
}

const MagnifyContext = createContext<MagnifyState | null>(null);

/** Shared cursor-proximity dock. Wrap the region that should react — a vertical
 *  column or a horizontal row of contact icons — and every item inside scales
 *  with `useMagnify`. Leaving the region parks the cursor at infinity. */
export function MagnifyDock({ className, range = 140, children }: {
  className?: string;
  range?: number;
  children: ReactNode;
}) {
  const mouse = useMotionValue<MousePos>(FAR);
  const state = useMemo(() => ({ mouse, range }), [mouse, range]);

  return (
    <MagnifyContext.Provider value={state}>
      <div
        className={className}
        onMouseMove={(e) => mouse.set({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => mouse.set(FAR)}
      >
        {children}
      </div>
    </MagnifyContext.Provider>
  );
}

/** Spring-magnify one item by cursor proximity (macOS-dock feel): the icon
 *  swells to 1.55 and a text label, when present, to 1.14, both resting at 1.
 *  Distance is measured against `getBoundingClientRect()`, which is in the same
 *  space as `clientX/Y`, so it stays exact under `html { zoom }`. */
export function useMagnify<T extends HTMLElement>(ref: RefObject<T | null>) {
  const ctx = useContext(MagnifyContext);
  const own = useMotionValue<MousePos>(FAR);
  const mouse = ctx?.mouse ?? own;
  const range = ctx?.range ?? 140;

  const dist = useTransform(mouse, (m) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return 999;
    const dx = Math.max(b.left - m.x, 0, m.x - b.right);
    const dy = Math.max(b.top - m.y, 0, m.y - b.bottom);
    return Math.hypot(dx, dy);
  });

  const iconScale = useSpring(useTransform(dist, [0, range], [1.55, 1]), { stiffness: 400, damping: 28 });
  const labelScale = useSpring(useTransform(dist, [0, range], [1.14, 1]), { stiffness: 400, damping: 28 });

  return { iconScale, labelScale };
}
