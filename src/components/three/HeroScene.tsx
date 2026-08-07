'use client';

import { Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { DataSphere } from './DataSphere';
import type { WebGLRenderer } from 'three';

export default function HeroScene() {
  const onCreated = useCallback(({ gl }: { gl: WebGLRenderer }) => {
    gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      onCreated={onCreated}
    >
      <Suspense fallback={null}>
        <DataSphere />
        <Sparkles count={60} scale={7} size={2} speed={0.3} opacity={0.5} color="#10b981" />
        <Sparkles count={28} scale={9} size={3} speed={0.18} opacity={0.35} color="#06b6d4" />
      </Suspense>
    </Canvas>
  );
}
