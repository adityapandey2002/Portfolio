'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { dataSphereFragment, dataSphereVertex, wireFragment, wireVertex } from './shaders';

export function DataSphere() {
  const sphere = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 1.6 },
      uColorA: { value: new THREE.Color('#10b981') },
      uColorB: { value: new THREE.Color('#06b6d4') },
    }),
    [],
  );

  const wireUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#10b981') },
    }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    wireUniforms.uTime.value = t;

    if (sphere.current) {
      sphere.current.rotation.y += delta * 0.12;
      // Cursor-reactive wobble
      const targetX = state.pointer.y * 0.4;
      const targetY = state.pointer.x * 0.6;
      sphere.current.rotation.x = THREE.MathUtils.lerp(sphere.current.rotation.x, targetX, 0.05);
      sphere.current.rotation.z = THREE.MathUtils.lerp(sphere.current.rotation.z, -state.pointer.x * 0.15, 0.05);
      sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, targetY, 0.05);
      sphere.current.position.y = THREE.MathUtils.lerp(sphere.current.position.y, -targetX, 0.05);
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.06;
      wire.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group>
      <mesh ref={sphere}>
        <icosahedronGeometry args={[1, 24]} />
        <shaderMaterial
          args={[{ uniforms, vertexShader: dataSphereVertex, fragmentShader: dataSphereFragment, transparent: true, depthWrite: false }]}
        />
      </mesh>
      <mesh ref={wire} scale={1.12}>
        <icosahedronGeometry args={[1, 3]} />
        <shaderMaterial args={[{ uniforms: wireUniforms, vertexShader: wireVertex, fragmentShader: wireFragment, transparent: true, wireframe: true, depthWrite: false }]} />
      </mesh>
    </group>
  );
}
