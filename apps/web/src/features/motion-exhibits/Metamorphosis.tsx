import { useRef, useState } from 'react';
import { Exhibit, type ExhibitConfig } from './Exhibit';
import { useScene, type SceneProps } from './useScene';
import { ease, seeded } from './sceneMath';
import { particlePoint, projectPoint, sampleType, type Point3 } from './particleGeometry';
const config: ExhibitConfig = {
  id: 'metamorphosis',
  title: 'Metamorphosis',
  number: '031',
  eyebrow: 'A CONTINUOUS CHANGE OF STATE',
  chapters: [
    {
      name: 'Type',
      title: 'Always\nbecoming.',
      text: 'Three thousand points. No fixed identity. Scroll to see what they become next.',
    },
    {
      name: 'Fabric',
      title: 'Almost\ntangible.',
      text: 'Letters loosen into a weightless fabric. Threads of possibility, caught in an invisible current.',
    },
    {
      name: 'Structure',
      title: 'Order,\nreimagined.',
      text: 'The same points find a new architecture. Nothing added. Nothing taken away.',
    },
  ],
  note: 'Type becomes fabric. Fabric becomes architecture. Three thousand points keep their identity through a continuous change of form.',
  next: 'paper-worlds',
  nextTitle: 'Paper Worlds',
};
const COUNT = 3000;
function ParticleScene({ tension, ...props }: SceneProps & { tension: number }) {
  const canvas = useRef<HTMLCanvasElement>(null),
    sources = useRef<Point3[]>([]),
    pointer = useRef({ x: 0, y: 0 });
  useScene(canvas, props, (p, t) => {
    const el = canvas.current,
      ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    if (!sources.current.length) sources.current = sampleType(COUNT);
    const w = el.clientWidth,
      h = el.clientHeight,
      dpr = Math.min(devicePixelRatio || 1, 2);
    if (w <= 0 || h <= 0) return;
    if (el.width !== Math.round(w * dpr) || el.height !== Math.round(h * dpr)) {
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const scale = Math.min(w / 900, h / 640),
      sway = ease(p, 0.15, 0.5);
    const angle =
      sway * (0.28 + Math.sin(t * 0.15) * 0.13) + (props.still ? 0 : pointer.current.x * 0.15);
    const points = sources.current.map((source, i) => {
      const pt = particlePoint(i, COUNT, source, p, t * (tension / 50));
      const displaced: Point3 = [
        pt[0],
        pt[1] + Math.sin(i * 0.2 + t) * sway * (100 - tension) * 0.12,
        pt[2],
      ];
      return { point: projectPoint(displaced, angle), i };
    });
    ctx.translate(w * 0.52, h * 0.5);
    ctx.scale(scale, scale);
    const threads = ease(p, 0.2, 0.45) * (1 - ease(p, 0.6, 0.85));
    if (threads > 0.01) {
      ctx.strokeStyle = `rgba(52,24,39,${threads * 0.15})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (let i = 1; i < COUNT; i++) {
        if (i % Math.ceil(Math.sqrt(COUNT * 1.8)) === 0) continue;
        const a = points[i - 1]!.point,
          b = points[i]!.point;
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
      }
      ctx.stroke();
    }
    const structure = ease(p, 0.6, 0.92);
    if (structure > 0.01) {
      ctx.strokeStyle = `rgba(52,24,39,${structure * 0.2})`;
      ctx.lineWidth = 0.55;
      ctx.beginPath();
      for (let i = 1; i < COUNT; i++) {
        if (i % 70 === 0) continue;
        const a = points[i - 1]!.point,
          b = points[i]!.point;
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        if (i % 14 === 0 && i >= 70) {
          const c = points[i - 70]!.point;
          ctx.moveTo(c[0], c[1]);
          ctx.lineTo(b[0], b[1]);
        }
      }
      ctx.stroke();
    }
    points.sort((a, b) => a.point[2] - b.point[2]);
    for (const {
      point: [x, y, z],
      i,
    } of points) {
      const depth = (z + 300) / 600;
      ctx.fillStyle = i % 13 === 0 ? '#ffe5b5' : `rgba(40,22,36,${0.35 + depth * 0.6})`;
      ctx.beginPath();
      ctx.arc(x, y, (1.05 + depth * 0.75) * (1 + seeded(i) * 0.25), 0, Math.PI * 2);
      ctx.fill();
    }
    el.dataset.frame = `${p.toFixed(3)}:${t.toFixed(3)}:${tension}`;
  });
  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label="Three thousand particles morphing from the word FORM into flowing fabric and a twisting architectural tower"
      data-art="particles"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: (e.clientX - r.left) / r.width - 0.5,
          y: (e.clientY - r.top) / r.height - 0.5,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      An animated particle study. Use the chapter buttons to explore type, fabric and structure.
    </canvas>
  );
}
export function Metamorphosis() {
  const [tension, setTension] = useState(50);
  return (
    <Exhibit
      config={config}
      controls={
        <label>
          FABRIC TENSION <span>{tension}%</span>
          <input
            aria-label="Fabric tension"
            type="range"
            min="10"
            max="90"
            value={tension}
            onChange={(e) => setTension(Number(e.target.value))}
          />
        </label>
      }
    >
      {(props) => <ParticleScene {...props} tension={tension} />}
    </Exhibit>
  );
}
