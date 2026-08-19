import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function WireframeGlobe() {
  const meshRef = useRef<any>(null);

  useFrame((_state: any, delta: any) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#7C3AED" wireframe={true} transparent opacity={0.3} />
    </mesh>
  );
}

export function Globe() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <WireframeGlobe />
      </Canvas>
    </div>
  );
}
