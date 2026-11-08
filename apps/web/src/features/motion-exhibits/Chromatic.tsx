import { useId, useRef, useState } from 'react';
import { Exhibit, type ExhibitConfig } from './Exhibit';
import { useScene, type SceneProps } from './useScene';
import { ease, mix } from './sceneMath';
const config: ExhibitConfig = {
  id: 'chromatic',
  title: 'chromatic',
  number: '030',
  eyebrow: 'AN EXPERIMENT WITH LIGHT',
  chapters: [
    {
      name: 'Refraction',
      title: 'Light has\na wild side.',
      text: 'One beam. A different angle. An entire spectrum waiting to get out.',
    },
    {
      name: 'Interference',
      title: 'Beautiful\ninterference.',
      text: 'Waves overlap. New patterns emerge. Move across the prism or change the angle below.',
    },
    {
      name: 'Spectrum',
      title: 'Let it\nall through.',
      text: 'The spectrum opens into a luminous fan. A little chaos, held together by geometry.',
    },
  ],
  note: 'A prism, a beam, an unexpected spectrum. This is an optical daydream, not a physical simulation.',
  next: 'metamorphosis',
  nextTitle: 'Metamorphosis',
};
const spectrum = [
  '#fc635f',
  '#ff934f',
  '#f8d66b',
  '#b2ed8c',
  '#60dfcc',
  '#5ab9f4',
  '#8b9ef8',
  '#c2a1ff',
];
function LightScene({ angle, ...props }: SceneProps & { angle: number }) {
  const svg = useRef<SVGSVGElement>(null),
    pointer = useRef(0),
    id = useId();
  useScene(svg, props, (p, t) => {
    if (!svg.current) return;
    const phase = ease(p, 0.05, 0.95),
      spread = 80 + phase * 420;
    const tilt = angle + (props.still ? 0 : pointer.current * 7),
      y = 500 + tilt * 2;
    svg.current
      .querySelector('[data-input]')
      ?.setAttribute('d', `M-100 ${590 + tilt * 6}L668 ${y}L738 494`);
    svg.current
      .querySelector('[data-prism]')
      ?.setAttribute('transform', `rotate(${tilt * 0.5} 735 465)`);
    svg.current.querySelectorAll<SVGPathElement>('[data-beam]').forEach((el, i) => {
      const k = i % spectrum.length,
        glow = i >= spectrum.length;
      const end = 440 + (k - 3.5) * spread * 0.28 + tilt * 4;
      const wiggle = Math.sin(t * 0.5 + k * 0.5) * ease(p, 0.28, 0.62) * 25;
      const d = `M738 494C${930 + phase * 100} ${mix(494, end, 0.5) + wiggle},1100 ${end - wiggle},1530 ${end}`;
      el.setAttribute('d', d);
      el.setAttribute('stroke-width', String(glow ? 12 + phase * 28 : 1.5 + phase * 3));
      el.setAttribute('opacity', String(glow ? 0.12 : 0.7));
    });
    svg.current.querySelectorAll<SVGPathElement>('[data-wave]').forEach((el, i) => {
      const pts = Array.from({ length: 90 }, (_, j) => {
        const x = 820 + j * 8,
          a = (j / 89) * Math.PI * 5 - t * 0.65 + i * 0.32;
        return `${j ? 'L' : 'M'}${x} ${494 + Math.sin(a) * (18 + i * 3) * Math.sin((j / 89) * Math.PI) + tilt * 2}`;
      }).join(' ');
      el.setAttribute('d', pts);
      el.setAttribute('opacity', String(ease(p, 0.2, 0.5) * (1 - ease(p, 0.66, 0.98)) * 0.5));
    });
    svg.current
      .querySelector('[data-orbit]')
      ?.setAttribute('transform', `rotate(${p * 90} 735 465)`);
  });
  return (
    <svg
      ref={svg}
      viewBox="0 0 1400 900"
      role="img"
      aria-label="A glass prism splitting a white beam into a sweeping rainbow spectrum and interference waves"
      data-art="light"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = (e.clientX - r.left) / r.width - 0.5;
      }}
      onPointerLeave={() => {
        pointer.current = 0;
      }}
    >
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c1d0d6" stopOpacity=".5" />
          <stop offset=".4" stopColor="#51636e" stopOpacity=".12" />
          <stop offset="1" stopColor="#d9eeed" stopOpacity=".4" />
        </linearGradient>
        <linearGradient id={`${id}-edge`}>
          <stop stopColor="#7898a9" />
          <stop offset=".5" stopColor="#effbfa" />
          <stop offset="1" stopColor="#648888" />
        </linearGradient>
        <radialGradient id={`${id}-halo`}>
          <stop stopColor="#9bbfca" stopOpacity=".12" />
          <stop offset="1" stopColor="#101216" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-50%" y="-100%" width="200%" height="300%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <pattern id={`${id}-grid`} width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" fill="none" stroke="#bcc8c4" strokeOpacity=".055" />
        </pattern>
      </defs>
      <path d="M0 0H1400V900H0Z" fill={`url(#${id}-grid)`} />
      <ellipse cx="755" cy="480" rx="500" ry="360" fill={`url(#${id}-halo)`} />
      <g data-orbit stroke="#b9cbd2" fill="none" opacity=".17">
        <circle cx="735" cy="465" r="238" strokeDasharray="2 9" />
        <ellipse cx="735" cy="465" rx="305" ry="265" />
        {[0, 90, 180, 270].map((a) => (
          <path key={a} d="M735 180v16" transform={`rotate(${a} 735 465)`} />
        ))}
      </g>
      <path data-input d="M-100 590L668 500L738 494" stroke="#f4f4e9" strokeWidth="2" fill="none" />
      <g style={{ mixBlendMode: 'screen' }} fill="none">
        {spectrum.map((color, i) => (
          <path key={i} data-beam stroke={color} />
        ))}
        <g filter={`url(#${id}-glow)`}>
          {spectrum.map((color, i) => (
            <path key={i} data-beam stroke={color} />
          ))}
        </g>
        {Array.from({ length: 22 }, (_, i) => (
          <path key={i} data-wave stroke={spectrum[i % 8]} strokeWidth=".85" />
        ))}
      </g>
      <g data-prism>
        <path
          d="M735 255 578 584 880 584Z"
          fill={`url(#${id}-glass)`}
          stroke={`url(#${id}-edge)`}
          strokeWidth="1.5"
        />
        <path
          d="M735 255 795 295 934 617 880 584Z"
          fill="#d1e4eb"
          fillOpacity=".1"
          stroke="#9db7c5"
          strokeOpacity=".5"
        />
        <path
          d="M578 584 645 624 934 617 880 584Z"
          fill="#b3ccd5"
          fillOpacity=".13"
          stroke="#adc8cd"
          strokeOpacity=".4"
        />
        <path
          d="M735 255 725 550 578 584M725 550 880 584"
          fill="none"
          stroke="#e1f7f6"
          strokeOpacity=".25"
        />
        <path d="M735 265 588 580" stroke="#eef8f1" strokeWidth="2" />
        <path d="M746 279 864 572 752 530Z" fill="#c4dcde" opacity=".06" />
      </g>
      <circle cx="738" cy="494" r="4" fill="#fff" />
      <circle cx="738" cy="494" r="13" stroke="#fff" strokeOpacity=".3" fill="none" />
      <g fontFamily="monospace" fontSize="9" fill="#a8b8c0" letterSpacing="2">
        <text x="600" y="707">
          01 / OPTICAL GLASS
        </text>
        <text x="1060" y="760">
          VISIBLE / 380–750 NM
        </text>
      </g>
    </svg>
  );
}
export function Chromatic() {
  const [angle, setAngle] = useState(0);
  return (
    <Exhibit
      config={config}
      controls={
        <label>
          INCIDENCE{' '}
          <span>
            {angle > 0 ? '+' : ''}
            {angle}°
          </span>
          <input
            aria-label="Light incidence angle"
            type="range"
            min="-20"
            max="20"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </label>
      }
    >
      {(props) => <LightScene {...props} angle={angle} />}
    </Exhibit>
  );
}
