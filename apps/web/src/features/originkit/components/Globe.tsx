import { GraphicsBoundary } from '@/components/ui/GraphicsBoundary';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { Mesh } from 'three';

function WireframeGlobe() {
  const reduced = useReducedMotion();
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current && !reduced) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#b8d595" wireframe={true} transparent opacity={0.3} />
    </mesh>
  );
}

export function Globe() {
  const reduced = useReducedMotion();
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px', background: '#000' }}>
      <GraphicsBoundary>
        <Canvas
          dpr={[1, 2]}
          frameloop={reduced ? 'demand' : 'always'}
          camera={{ position: [0, 0, 4] }}
        >
          <WireframeGlobe />
        </Canvas>
      </GraphicsBoundary>
    </div>
  );
}
