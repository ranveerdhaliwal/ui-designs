import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

function Particles() {
  const ref = useRef<any>(null);
  // Create a sphere of 5000 particles
  const sphere = random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }) as Float32Array;

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#7C3AED" size={0.05} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export function ParticleSphere() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px', background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
