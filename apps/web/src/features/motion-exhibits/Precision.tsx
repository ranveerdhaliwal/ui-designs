import { useId, useRef } from 'react';
import { Exhibit, type ExhibitConfig } from './Exhibit';
import { useScene, type SceneProps } from './useScene';
import { ease, gearPath } from './sceneMath';
const config: ExhibitConfig = {
  id: 'precision',
  title: 'Precision',
  number: '029',
  eyebrow: 'THE ART OF KEEPING TIME',
  chapters: [
    {
      name: 'Assembly',
      title: 'Every second.\nConsidered.',
      text: 'An imaginary timepiece. A study in the beautiful complexity of small things.',
    },
    {
      name: 'Movement',
      title: 'A heart,\nin motion.',
      text: 'The dial lifts. Beneath it, a choreography of wheels, bridges and a restless balance.',
    },
    {
      name: 'Anatomy',
      title: 'Nothing\nby accident.',
      text: 'Each part finds its place in space. Scroll back to bring the movement together again.',
    },
  ],
  note: 'The face tells the time. The movement tells the story. An imagined mechanism, drawn one tooth at a time.',
  next: 'chromatic',
  nextTitle: 'Chromatic',
};
const wheels = [
  { x: 450, y: 425, r: 96, n: 36 },
  { x: 600, y: 440, r: 68, n: 28 },
  { x: 515, y: 560, r: 57, n: 24 },
  { x: 372, y: 550, r: 76, n: 32 },
  { x: 610, y: 565, r: 48, n: 22 },
];
function WatchScene(props: SceneProps) {
  const svg = useRef<SVGSVGElement>(null),
    id = useId();
  useScene(svg, props, (p, t) => {
    if (!svg.current) return;
    const open = ease(p, 0.18, 0.52),
      explode = ease(p, 0.58, 0.96),
      assemble = 1 - ease(p, 0, 0.17);
    const set = (key: string, value: string) =>
      svg.current?.querySelector(`[data-${key}]`)?.setAttribute('transform', value);
    set('dial', `translate(${open * -150} ${open * -175}) scale(${1 - open * 0.12})`);
    svg.current.querySelector('[data-dial]')?.setAttribute('opacity', String(1 - open * 0.88));
    set('bezel', `translate(${explode * 80} ${-explode * 190 - assemble * 40})`);
    set('back', `translate(${-explode * 70} ${explode * 145 + assemble * 60})`);
    set('bridge', `translate(${explode * -130} ${explode * -70})`);
    svg.current.querySelectorAll<SVGGElement>('[data-wheel]').forEach((el, i) => {
      const w = wheels[i]!;
      el.setAttribute(
        'transform',
        `translate(${w.x + explode * (i % 2 ? 155 : -120)} ${w.y + explode * (i - 2) * 65}) rotate(${((t * 14 + p * 150) * (i % 2 ? -1 : 1) * 96) / w.r})`,
      );
    });
    set(
      'balance',
      `translate(${650 + explode * 110} ${325 - explode * 80}) rotate(${Math.sin(t * 6) * 24 + p * 120})`,
    );
    set('seconds', `rotate(${Math.floor(t * 5) * 1.2 + p * 90} 500 440)`);
    svg.current.querySelector('[data-guides]')?.setAttribute('opacity', String(explode * 0.6));
  });
  return (
    <svg
      ref={svg}
      viewBox="0 0 1000 900"
      role="img"
      aria-label="A brushed metal watch with a lifting dial, turning gears and an exploded mechanical movement"
      data-art="watch"
    >
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f0e8d6" />
          <stop offset=".2" stopColor="#8c968e" />
          <stop offset=".4" stopColor="#e6e3cf" />
          <stop offset=".58" stopColor="#646d65" />
          <stop offset=".8" stopColor="#e7e4d1" />
          <stop offset="1" stopColor="#838b80" />
        </linearGradient>
        <linearGradient id={`${id}-gold`}>
          <stop stopColor="#8e693d" />
          <stop offset=".4" stopColor="#e6ca89" />
          <stop offset=".7" stopColor="#ad844c" />
          <stop offset="1" stopColor="#f6dfa3" />
        </linearGradient>
        <radialGradient id={`${id}-dial`}>
          <stop stopColor="#f4eddb" />
          <stop offset="1" stopColor="#cec9b7" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="10" dy="25" stdDeviation="16" floodOpacity=".4" />
        </filter>
        <pattern id={`${id}-lines`} width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 1h4" stroke="#fff" strokeOpacity=".08" />
        </pattern>
      </defs>
      <ellipse cx="520" cy="780" rx="225" ry="30" fill="#051612" opacity=".6" />
      <g data-back filter={`url(#${id}-shadow)`}>
        <path
          d="M365 25H635L620 215H380Z M380 660H620L635 870H365Z"
          fill="#1d3a32"
          stroke="#9aab91"
          strokeWidth="2"
        />
        <path
          d="M380 28V210M620 28V210M380 680V868M620 680V868"
          stroke="#c1bfa0"
          strokeDasharray="4 6"
          opacity=".45"
        />
        <rect x="743" y="400" width="40" height="70" rx="8" fill={`url(#${id}-steel)`} />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${748 + i * 3} 404v62`} stroke="#424f45" />
        ))}
        <circle cx="500" cy="440" r="252" fill={`url(#${id}-steel)`} />
        <circle cx="500" cy="440" r="231" fill="#263a31" stroke="#b7b6a2" strokeWidth="2" />
        <circle cx="500" cy="440" r="217" fill={`url(#${id}-lines)`} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`rotate(${i * 60} 500 440)`}>
            <circle cx="500" cy="238" r="6" fill="#b7c1b3" />
            <path d="M496 238h8" stroke="#24392f" />
          </g>
        ))}
      </g>
      <g data-guides opacity="0" stroke="#d5cba9" strokeDasharray="3 8" fill="none">
        <path d="M500 80V850M250 230l150 500M750 230 600 730" />
        <ellipse cx="500" cy="440" rx="280" ry="280" />
      </g>
      {wheels.map((w, i) => (
        <g key={i} data-wheel transform={`translate(${w.x} ${w.y})`} filter={`url(#${id}-shadow)`}>
          <path
            d={gearPath(w.n, w.r)}
            fill={`url(#${id}-gold)`}
            stroke="#f5dc9c"
            strokeWidth=".7"
          />
          <circle r={w.r * 0.72} fill="#20372d" stroke="#7c633d" strokeWidth="2" />
          {Array.from({ length: 6 }, (_, j) => (
            <path
              key={j}
              d={`M-7 0L-12 ${-w.r * 0.78}H12L7 0Z`}
              transform={`rotate(${j * 60})`}
              fill={`url(#${id}-gold)`}
            />
          ))}
          <circle r={w.r * 0.24} fill={`url(#${id}-gold)`} />
          <circle r="7" fill="#753b45" stroke="#e0b7a0" strokeWidth="3" />
        </g>
      ))}
      <g data-bridge filter={`url(#${id}-shadow)`}>
        <path
          d="M355 290Q420 250 555 290L570 342 480 370 417 453 380 435 400 350 350 335Z"
          fill={`url(#${id}-steel)`}
          stroke="#b0b5a4"
        />
        <path
          d="M355 290Q420 250 555 290L570 342 480 370 417 453 380 435 400 350 350 335Z"
          fill={`url(#${id}-lines)`}
        />
        {[
          [382, 312],
          [532, 315],
          [410, 420],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#53635b" stroke="#ced1bc" />
            <path d={`M${x! - 5} ${y}h10`} stroke="#dee2cf" />
          </g>
        ))}
      </g>
      <g data-balance transform="translate(650 325)">
        <circle r="64" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="9" />
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} r={8 + i * 6} fill="none" stroke="#b5c0b0" strokeWidth=".7" />
        ))}
        <path d="M-64 0H64M0-64V64" stroke="#e1bf76" strokeWidth="5" />
        <circle r="8" fill="#9a4761" />
      </g>
      <g data-dial filter={`url(#${id}-shadow)`}>
        <circle cx="500" cy="440" r="224" fill={`url(#${id}-dial)`} />
        {Array.from({ length: 60 }, (_, i) => (
          <path
            key={i}
            d={`M500 228v${i % 5 === 0 ? 23 : 8}`}
            transform={`rotate(${i * 6} 500 440)`}
            stroke="#34473b"
            strokeWidth={i % 5 === 0 ? 4 : 1}
          />
        ))}
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => (
          <text
            key={n}
            x={500 + 170 * Math.sin((i * Math.PI) / 6)}
            y={448 - 170 * Math.cos((i * Math.PI) / 6)}
            fill="#34473b"
            fontSize="22"
            fontFamily="Georgia"
            textAnchor="middle"
          >
            {n}
          </text>
        ))}
        <text x="500" y="365" fill="#3c5143" fontSize="17" letterSpacing="5" textAnchor="middle">
          PRECISION
        </text>
        <text x="500" y="390" fill="#657363" fontSize="8" letterSpacing="3" textAnchor="middle">
          CALIBRE 029
        </text>
        <circle cx="500" cy="540" r="41" fill="none" stroke="#9ba38e" />
        {Array.from({ length: 20 }, (_, i) => (
          <path key={i} d="M500 503v4" stroke="#62735e" transform={`rotate(${i * 18} 500 540)`} />
        ))}
        <path d="M500 540l16-22" stroke="#5e6a56" strokeWidth="2" />
        <path d="M500 458 485 430 415 345 426 341 510 425Z" fill="#243e33" />
        <path d="M495 452 495 428 613 321 620 329 507 445Z" fill="#243e33" />
        <g data-seconds>
          <path d="M500 475V248" stroke="#a34f31" strokeWidth="2" />
          <circle cx="500" cy="440" r="7" fill="#b57740" />
        </g>
        <text x="500" y="604" fill="#53654f" fontSize="8" letterSpacing="2" textAnchor="middle">
          AN IMAGINED MOVEMENT
        </text>
      </g>
      <g data-bezel>
        <circle
          cx="500"
          cy="440"
          r="243"
          fill="none"
          stroke={`url(#${id}-steel)`}
          strokeWidth="16"
        />
        <circle cx="500" cy="440" r="232" fill="none" stroke="#e9e4ce" strokeOpacity=".6" />
        <path
          d="M290 340A235 235 0 0 1 600 227"
          fill="none"
          stroke="#fffbe7"
          strokeWidth="3"
          opacity=".6"
        />
      </g>
    </svg>
  );
}
export function Precision() {
  return <Exhibit config={config}>{(props) => <WatchScene {...props} />}</Exhibit>;
}
