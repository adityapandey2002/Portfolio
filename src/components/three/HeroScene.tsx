'use client';

import { Suspense, useCallback, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { DataSphere } from './DataSphere';
import type { WebGLRenderer } from 'three';

/**
 * The canvas wrapper is pointer-events:none (so it can never swallow a click
 * aimed at the hero), which means R3F never receives a pointer event — and
 * even if it did, its `offsetX / size.width` maths mixes viewport px with the
 * root-zoomed layout px, so `state.pointer` would land short of ±1.
 *
 * Drive state.pointer straight from the canvas rect instead: clientX/Y and
 * getBoundingClientRect are the same unit on both sides, so this is exact at
 * any zoom level, transform or viewport size.
 */
function PointerRelay() {
  const pointer = useThree((s) => s.pointer);
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      const cx = Math.max(-1, Math.min(1, x));
      const cy = Math.max(-1, Math.min(1, y));
      pointer.set(cx, cy);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointer, gl]);

  return null;
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const onCreated = useCallback(({ gl }: { gl: WebGLRenderer }) => {
    gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      frameloop={active ? 'always' : 'never'}
      onCreated={onCreated}
    >
      <Suspense fallback={null}>
        <PointerRelay />
        <DataSphere />
        <Sparkles count={60} scale={7} size={2} speed={0.3} opacity={0.5} color="#10b981" />
        <Sparkles count={28} scale={9} size={3} speed={0.18} opacity={0.35} color="#06b6d4" />
      </Suspense>
    </Canvas>
  );
}
