import { GraphicsBoundary } from '@/components/ui/GraphicsBoundary';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
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

const vertexShader = `varying vec3 vNormal;varying vec3 vPosition;void main(){vNormal=normalize(normalMatrix*normal);vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragmentShader = `uniform vec3 lightDirection;uniform float spacing;uniform float weight;uniform float softness;uniform float variance;uniform float whiteSpace;uniform float invert;varying vec3 vNormal;varying vec3 vPosition;void main(){float light=dot(normalize(vNormal),normalize(lightDirection))*.5+.5;light=mix(light,smoothstep(.2,.85,light),1.0-softness);float grain=sin(vPosition.x*43.0)*sin(vPosition.y*37.0)*variance;float density=clamp((1.0-light)*weight+grain-whiteSpace,0.0,1.0);float line=step(fract((gl_FragCoord.x+gl_FragCoord.y)/spacing),density);float crossline=step(fract((gl_FragCoord.x-gl_FragCoord.y)/spacing),max(0.0,density-.35));float ink=max(line,crossline);vec3 paper=vec3(.94,.93,.87);vec3 pigment=vec3(.16,.19,.14);gl_FragColor=vec4(mix(paper,pigment,mix(ink,1.0-ink,invert)),1.0);}`;
function Sculpture({ controls, invert }: { controls: KycControls; invert: boolean }) {
  const geometry = useMemo(() => {
    const g = new THREE.SphereGeometry(1.55, 64, 64);
    const positions = g.attributes.position!;
    for (let i = 0; i < positions.count; i++) {
      let x = positions.getX(i),
        z = positions.getZ(i);
      const y = positions.getY(i);
      const jaw = 1 - Math.max(0, -y) * 0.18;
      const angular = controls.faceShape / 100;
      x *= jaw * (1 - angular * 0.15);
      if (z > 0) {
        const nose = Math.exp(-x * x * 18 - (y - 0.05) * (y - 0.05) * 8) * 0.85;
        const eyes =
          (Math.exp(-(x - 0.52) * (x - 0.52) * 22 - (y - 0.35) * (y - 0.35) * 30) +
            Math.exp(-(x + 0.52) * (x + 0.52) * 22 - (y - 0.35) * (y - 0.35) * 30)) *
          0.26;
        const mouth = Math.exp(-x * x * 9 - (y + 0.5) * (y + 0.5) * 80) * 0.15;
        z += nose - eyes - mouth;
      }
      positions.setXYZ(i, x, y * 1.25, z * 0.72);
    }
    g.computeVertexNormals();
    return g;
  }, [controls.faceShape]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const uniforms = useMemo(() => {
    const dir = THREE.MathUtils.degToRad(controls.lightDirection),
      el = THREE.MathUtils.degToRad(controls.lightElevation);
    return {
      lightDirection: {
        value: new THREE.Vector3(
          Math.sin(dir) * Math.cos(el),
          Math.sin(el),
          Math.cos(dir) * Math.cos(el),
        ),
      },
      spacing: { value: controls.lineSpacing },
      weight: { value: controls.inkWeight / 20 },
      softness: { value: controls.lightSoftness / 100 },
      variance: { value: controls.inkVariance / 600 },
      whiteSpace: { value: controls.whiteSpace / 180 },
      invert: { value: invert ? 1 : 0 },
    };
  }, [controls, invert]);
  return (
    <mesh geometry={geometry} rotation={[0, THREE.MathUtils.degToRad(controls.headRotation), 0]}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
export function KycCanvas({ controls, invert }: { controls: KycControls; invert: boolean }) {
  return (
    <GraphicsBoundary>
      <Canvas
        dpr={[1, 2]}
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ position: [0, 0, 7], fov: 35 + controls.perspective * 0.2 }}
        style={{ background: invert ? '#283025' : '#eeeddf' }}
      >
        <Sculpture controls={controls} invert={invert} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </GraphicsBoundary>
  );
}
