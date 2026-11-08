import { GraphicsBoundary } from '@/components/ui/GraphicsBoundary';
import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import type { Points as ThreePoints } from 'three';

function Particles() {
  const reduced = useReducedMotion();
  const ref = useRef<ThreePoints>(null);
  // Create a sphere of 5000 particles
  const sphere = useMemo(() => {
    const result = new Float32Array(2500 * 3);
    for (let i = 0; i < 2500; i++) {
      const y = 1 - (i / 2499) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = i * Math.PI * (3 - Math.sqrt(5));
      result.set([Math.cos(angle) * radius * 1.5, y * 1.5, Math.sin(angle) * radius * 1.5], i * 3);
    }
    return result;
  }, []);

  useFrame((_state, delta) => {
    if (ref.current && !reduced) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#b8d595"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function ParticleSphere() {
  const reduced = useReducedMotion();
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px', background: '#050505' }}>
      <GraphicsBoundary>
        <Canvas
          dpr={[1, 2]}
          frameloop={reduced ? 'demand' : 'always'}
          camera={{ position: [0, 0, 3] }}
        >
          <Particles />
        </Canvas>
      </GraphicsBoundary>
    </div>
  );
}
