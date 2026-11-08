import { useId, useRef } from 'react';
import { Exhibit, type ExhibitConfig } from './Exhibit';
import { useScene, type SceneProps } from './useScene';
import { ease, mix, seeded } from './sceneMath';
const config: ExhibitConfig = {
  id: 'paper-worlds',
  title: 'Paper Worlds',
  number: '028',
  eyebrow: 'AN EXPEDITION IN LAYERS',
  chapters: [
    {
      name: 'Daybreak',
      title: 'Somewhere,\nfar from here.',
      text: 'A small world, cut from the imagination. Scroll slowly. There is more beyond the horizon.',
    },
    {
      name: 'Passage',
      title: 'Into the\nfolds.',
      text: 'Mountains open like pages. Follow the river through the layers of a place that never was.',
    },
    {
      name: 'Nightfall',
      title: 'The quiet\nafter the sun.',
      text: 'The last light leaves the valley. A thousand little possibilities take its place.',
    },
  ],
  note: 'A landscape made of contours, shadows, and the space between them. Every layer travels at its own pace.',
  next: 'precision',
  nextTitle: 'Precision',
};
const ridges = [
  'M-100 540L80 410 180 450 335 235 480 395 580 290 760 435 950 230 1100 400 1260 290 1500 480V1000H-100Z',
  'M-100 560L100 500 270 330 420 520 580 420 720 490 900 370 1080 540 1250 380 1500 530V1000H-100Z',
  'M-100 630Q100 400 290 570T660 550T1000 550T1500 520V1000H-100Z',
  'M-100 640Q120 510 320 640T700 630T1100 630T1500 590V1000H-100Z',
  'M-100 670Q160 560 400 710T850 690T1200 675L1500 620V1000H-100Z',
  'M-100 770Q100 680 300 760T700 760T1120 715T1500 730V1100H-100Z',
];
function PaperScene(props: SceneProps) {
  const svg = useRef<SVGSVGElement>(null);
  const id = useId();
  useScene(svg, props, (p, t) => {
    if (!svg.current) return;
    const aspect = svg.current.clientHeight / 900 / (svg.current.clientWidth / 1400);
    const night = ease(p, 0.56, 0.96),
      travel = ease(p, 0.08, 0.8);
    svg.current.querySelector('[data-night]')?.setAttribute('opacity', String(night));
    svg.current.querySelector('[data-stars]')?.setAttribute('opacity', String(night));
    svg.current
      .querySelector('[data-sun]')
      ?.setAttribute(
        'transform',
        `translate(${travel * -130},${travel * 250}) translate(1020 285) scale(${aspect} 1) translate(-1020 -285)`,
      );
    svg.current.querySelector('[data-moon]')?.setAttribute('opacity', String(night));
    svg.current
      .querySelector('[data-moon]')
      ?.setAttribute('transform', `translate(1100 280) scale(${aspect} 1) translate(-1100 -280)`);
    svg.current.querySelectorAll<SVGGElement>('[data-layer]').forEach((el, i) => {
      el.setAttribute(
        'transform',
        `translate(${(i % 2 ? 1 : -1) * travel * (i + 1) * 22},${travel * (i - 2) * 24}) translate(700 500) scale(${1 + travel * (i + 1) * 0.026}) translate(-700 -500)`,
      );
      const day = [
        [161, 166, 149],
        [116, 143, 126],
        [78, 124, 106],
        [49, 101, 87],
        [36, 76, 66],
        [25, 58, 52],
      ][i]!;
      el.style.color = `rgb(${day.map((v, j) => Math.round(mix(v, [25 + i * 2, 36 + i * 3, 64 + i * 3][j]!, night))).join(',')})`;
    });
    svg.current
      .querySelector('[data-birds]')
      ?.setAttribute(
        'transform',
        `translate(${Math.sin(t * 0.2) * 20 - travel * 130},${Math.cos(t * 0.3) * 8})`,
      );
    svg.current
      .querySelectorAll<SVGGElement>('[data-leaf]')
      .forEach((el, i) =>
        el.setAttribute(
          'transform',
          `rotate(${Math.sin(t * 0.5 + i) * 1.5 + travel * (i % 2 ? 6 : -6)} ${i % 2 ? 1350 : 40} 850)`,
        ),
      );
  });
  return (
    <svg
      ref={svg}
      viewBox="0 0 1400 900"
      preserveAspectRatio="none"
      role="img"
      aria-label="A layered paper mountain valley with a winding river, moving birds and a sky that turns to stars"
      data-art="paper"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x2="0" y2="1">
          <stop stopColor="#eee8db" />
          <stop offset="1" stopColor="#e8bb88" />
        </linearGradient>
        <linearGradient id={`${id}-night`} x2="0" y2="1">
          <stop stopColor="#eee8db" />
          <stop offset=".45" stopColor="#969ba8" />
          <stop offset="1" stopColor="#172845" />
        </linearGradient>
        <linearGradient id={`${id}-river`} x2="1" y2="1">
          <stop stopColor="#e4d9b4" />
          <stop offset="1" stopColor="#88bdad" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="-8" stdDeviation="10" floodColor="#132c27" floodOpacity=".22" />
        </filter>
      </defs>
      <path fill={`url(#${id}-sky)`} d="M0 0H1400V900H0Z" />
      <path data-night opacity="0" fill={`url(#${id}-night)`} d="M0 0H1400V900H0Z" />
      <g data-stars opacity="0" fill="#fff7de">
        {Array.from({ length: 65 }, (_, i) => (
          <circle
            key={i}
            cx={seeded(i) * 1400}
            cy={220 + seeded(i + 70) * 400}
            r={0.7 + seeded(i + 130) * 1.6}
          />
        ))}
      </g>
      <g data-sun>
        <circle cx="1020" cy="285" r="91" fill="#d5834d" />
        <circle cx="1020" cy="285" r="106" fill="none" stroke="#d5834d" strokeOpacity=".2" />
      </g>
      <g data-moon opacity="0">
        <path d="M1100 240a57 57 0 1 0 65 85 63 63 0 0 1-65-85" fill="#fff0c4" />
      </g>
      <g data-birds fill="none" stroke="#47584b" strokeWidth="2">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${740 + i * 32} ${290 + (i % 3) * 17}q8 -8 16 0q8 -8 16 0`} />
        ))}
      </g>
      {ridges.map((d, i) => (
        <g
          key={d}
          data-layer
          style={{ color: ['#a1a695', '#748f7e', '#4e7c6a', '#316557', '#244c42', '#193a34'][i] }}
          filter={`url(#${id}-shadow)`}
        >
          <path d={d} fill="currentColor" />
          {i === 0 && (
            <g fill="#f0e9d3" opacity=".7">
              <path d="M270 330l65-95 73 91-65-32-27 22-10-17Z" />
              <path d="m888 310 62-80 70 79-58-26-23 20-11-15Z" />
            </g>
          )}
          {i === 3 && (
            <path
              d="M815 575C650 615 1080 650 840 716S400 805 590 930H1020C650 810 1130 770 1040 705S720 625 845 575Z"
              fill={`url(#${id}-river)`}
            />
          )}
          {i === 4 &&
            Array.from({ length: 18 }, (_, j) => (
              <path
                key={j}
                d={`M${j * 90 - 50} ${660 + Math.sin(j) * 35}l-14 40h9l-20 32h20v25h8v-25h20l-20-32h10Z`}
                fill="#264d43"
              />
            ))}
          {i === 5 && (
            <g fill="none" stroke="#b1c6a0" strokeOpacity=".2">
              {Array.from({ length: 9 }, (_, j) => (
                <path
                  key={j}
                  d={`M-50 ${790 + j * 14}Q200 ${710 + j * 14} 440 ${800 + j * 14}T1000 ${800 + j * 14}T1500 ${780 + j * 14}`}
                />
              ))}
            </g>
          )}
        </g>
      ))}
      {[false, true].map((right, i) => (
        <g key={i} data-leaf fill="#143a34" stroke="#143a34" strokeWidth="5">
          <path d={right ? 'M1400 920Q1280 700 1265 470' : 'M0 920Q140 730 120 540'} fill="none" />
          {Array.from({ length: 7 }, (_, j) => (
            <path
              key={j}
              d={
                right
                  ? `M${1300 + j * 12} ${580 + j * 43}q-100 -90 -130 -30q45 70 130 30q70-110 105-85q10 55-105 85`
                  : `M${100 - j * 10} ${600 + j * 40}q-110 -80-120-15q55 60 120 15q60-100 100-80q10 60-100 80`
              }
            />
          ))}
        </g>
      ))}
      <g transform="translate(895 705)" fill="#e8d8af">
        <path d="M-25 0h50l-8 9h-32Z" />
        <path d="M0-40v39h-1V-40m2 4 18 29H1Z" />
      </g>
    </svg>
  );
}
export function PaperWorlds() {
  return <Exhibit config={config}>{(props) => <PaperScene {...props} />}</Exhibit>;
}
