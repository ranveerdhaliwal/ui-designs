import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Center } from '@react-three/drei';
// @ts-ignore
import * as THREE from 'three';

export interface KycControls {
  headRotation: number;
  faceShape: number;
  perspective: number;
  lightDirection: number;
  lightElevation: number;
  lightSoftness: number;
  lineSpacing: number;
  inkWeight: number;
  inkVariance: number;
  whiteSpace: number;
}

interface KycCanvasProps {
  controls: KycControls;
  invert: boolean;
}

// A custom shader material that fakes the ink/hatching effect based on lighting
const InkShaderMaterial = {
  uniforms: {
    uLightDir: { value: new THREE.Vector3(1, 1, 1) },
    uLineSpacing: { value: 20.0 },
    uInkWeight: { value: 15.0 },
    uInvert: { value: 0 },
    uResolution: { value: new THREE.Vector2(1080, 1080) }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uLightDir;
    uniform float uLineSpacing;
    uniform float uInkWeight;
    uniform float uInvert;
    uniform vec2 uResolution;
    
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(uLightDir);
      
      // Basic directional lighting
      float diff = max(dot(normal, lightDir), 0.0);
      
      // Screen space hatching
      vec2 screenCoord = gl_FragCoord.xy;
      
      float line1 = mod(screenCoord.x + screenCoord.y, uLineSpacing) < (uInkWeight * (1.0 - diff)) ? 1.0 : 0.0;
      float line2 = mod(screenCoord.x - screenCoord.y, uLineSpacing) < (uInkWeight * (1.0 - diff) - (uLineSpacing * 0.3)) ? 1.0 : 0.0;
      
      float ink = max(line1, line2);
      
      // If diffuse is very high, no ink
      if (diff > 0.8) ink = 0.0;
      // If diffuse is very low, full ink
      if (diff < 0.2) ink = 1.0;
      
      vec3 color = vec3(1.0 - ink);
      
      if (uInvert > 0.5) {
        color = vec3(ink);
      }
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const HeadModel: React.FC<{ controls: KycControls; invert: boolean }> = ({ controls, invert }) => {
  const materialRef = useRef<any>(null);
  
  useFrame(() => {
    if (materialRef.current) {
      // Calculate light direction from elevation and direction degrees
      const elRad = THREE.MathUtils.degToRad(controls.lightElevation);
      const dirRad = THREE.MathUtils.degToRad(controls.lightDirection);
      
      const x = Math.cos(elRad) * Math.sin(dirRad);
      const y = Math.sin(elRad);
      const z = Math.cos(elRad) * Math.cos(dirRad);
      
      materialRef.current.uniforms.uLightDir.value.set(x, y, z);
      materialRef.current.uniforms.uLineSpacing.value = controls.lineSpacing;
      materialRef.current.uniforms.uInkWeight.value = (controls.inkWeight / 50) * controls.lineSpacing;
      materialRef.current.uniforms.uInvert.value = invert ? 1.0 : 0.0;
    }
  });

  const geometry = useMemo(() => {
    // We use an Icosahedron as a stand-in for a complex shape since we don't have a head model.
    return new THREE.IcosahedronGeometry(2, Math.max(1, Math.floor((controls.faceShape + 100) / 10)));
  }, [controls.faceShape]);

  return (
    <group rotation={[0, THREE.MathUtils.degToRad(controls.headRotation), 0]}>
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          args={[InkShaderMaterial]}
        />
      </mesh>
    </group>
  );
};

export const KycCanvas: React.FC<KycCanvasProps> = ({ controls, invert }) => {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      camera={{ position: [0, 0, 5 + (100 - controls.perspective) * 0.05], fov: controls.perspective }}
      style={{ background: invert ? '#000' : '#fff' }}
    >
      <Center>
        <HeadModel controls={controls} invert={invert} />
      </Center>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};
