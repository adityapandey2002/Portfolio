'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, input, textarea, select, [role="button"], .proj, .tilt';

/** Root CSS zoom (html { zoom: .8 } on desktop) scales layout px but clientX/Y
 *  stay in viewport px, so cursor offsets must be divided back out.
 *  `getComputedStyle().zoom` is the fast path; engines that report it as a
 *  keyword fall back to measuring a 100px probe, which yields the same ratio
 *  as its rendered width against its declared width. */
function rootZoom() {
  const z = parseFloat(getComputedStyle(document.documentElement).zoom);
  if (Number.isFinite(z) && z > 0) return z;
  const probe = document.createElement('i');
  probe.style.cssText = 'position:absolute;top:-9999px;left:0;width:100px;height:1px';
  document.body.appendChild(probe);
  const measured = probe.getBoundingClientRect().width / 100;
  probe.remove();
  return Number.isFinite(measured) && measured > 0 ? measured : 1;
}

/* The ring eases toward the pointer, and a per-frame easing factor makes the
   distance it falls behind depend on the frame rate: at the 43fps the 3D hero
   actually runs, 0.18 per frame left the ring a permanent ~50px short while
   the mouse was moving and 358px short on a flick. A time constant keeps the
   trail the same width at any frame rate, and the cap makes a fast flick
   snap back instead of stranding the ring on the other side of the screen. */
const RING_TAU = 0.04; // s — lag ≈ pointer speed × this
const RING_MAX = 24; // layout px — the furthest the ring may sit from the pointer


/**
 * Custom cursor: dot + lerped ring. No SVG filters or per-frame
 * layer repaints, so it stays cheap on all GPUs.
 * Disabled on touch devices via CSS (see globals.css).
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let z = rootZoom();
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx / z;
    let ry = my / z;
    let hover = false;
    let grab = false;
    let hidden = false;
    let raf = 0;
    let lastT = performance.now();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onResize = () => {
      z = rootZoom();
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el || !el.closest) return;
      const t = el.closest(INTERACTIVE);
      hover = Boolean(t);
      grab = Boolean(el.closest('[data-grab]'));
    };

    const onLeaveDoc = () => {
      hidden = true;
    };
    const onEnterDoc = () => {
      hidden = false;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05); // ignore tab-switch jumps
      lastT = now;
      // viewport px → root-zoomed layout px, so the ring lands on the pointer
      const dx = mx / z;
      const dy = my / z;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(${hidden ? 0 : 1})`;
      const k = 1 - Math.exp(-dt / RING_TAU);
      rx += (dx - rx) * k;
      ry += (dy - ry) * k;
      rx = dx - Math.max(-RING_MAX, Math.min(RING_MAX, dx - rx));
      ry = dy - Math.max(-RING_MAX, Math.min(RING_MAX, dy - ry));

      ring.classList.toggle('hover', hover);
      ring.classList.toggle('grab', grab && !hover);
      ring.style.opacity = hidden ? '0' : '0.6';
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    document.body.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeaveDoc);
    document.addEventListener('mouseenter', onEnterDoc);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      document.body.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeaveDoc);
      document.removeEventListener('mouseenter', onEnterDoc);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
