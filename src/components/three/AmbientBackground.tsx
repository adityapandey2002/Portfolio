'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, IcosahedronGeometry } from 'three';
import { useMemo } from 'react';

function AmbientGeometry() {
  const meshRef = useRef<Mesh>(null);
  const geo = useMemo(() => new IcosahedronGeometry(1.5, 1), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshBasicMaterial color="#facc15" wireframe opacity={0.15} transparent />
    </mesh>
  );
}

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden lg:block" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <AmbientGeometry />
      </Canvas>
    </div>
  );
}
