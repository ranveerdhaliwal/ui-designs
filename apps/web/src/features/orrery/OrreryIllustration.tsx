import { useId, type RefObject } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { constellation, constellationPath, sceneAt, stars } from './scene';
import styles from './OrreryLanding.module.css';
const brass = '#937041';
const ink = '#38463f';
function Ring({ radius, teeth = 90 }: { radius: number; teeth?: number }) {
  return (
    <g fill="none" stroke={brass}>
      <circle cx="500" cy="500" r={radius} strokeWidth="1" />
      <circle cx="500" cy="500" r={radius - 13} strokeWidth="0.6" />
      {Array.from({ length: teeth }, (_, i) => (
        <path
          key={i}
          d={`M500 ${500 - radius}v${i % 5 === 0 ? 13 : 6}`}
          transform={`rotate(${(i * 360) / teeth} 500 500)`}
          strokeWidth={i % 5 === 0 ? 1.2 : 0.6}
        />
      ))}
    </g>
  );
}
export function OrreryIllustration({
  progress,
  svgRef,
}: {
  progress: MotionValue<number>;
  svgRef: RefObject<SVGSVGElement | null>;
}) {
  const id = useId().replaceAll(':', '');
  const outer = useTransform(progress, (p) => {
    const s = sceneAt(p);
    return `translate(${s.unfold * -55}px, ${s.unfold * -95}px) rotate(${s.turn * 0.32}deg)`;
  });
  const middle = useTransform(progress, (p) => {
    const s = sceneAt(p);
    return `translate(${s.unfold * 75}px, ${s.unfold * 55}px) rotate(${-s.turn * 0.8}deg)`;
  });
  const inner = useTransform(progress, (p) => {
    const s = sceneAt(p);
    return `translate(${s.unfold * -85}px, ${s.unfold * 125}px) rotate(${s.turn * 1.2}deg)`;
  });
  const orbit = useTransform(progress, (p) => `rotate(${sceneAt(p).turn * 1.6 - 22}deg)`);
  const ringOpacity = useTransform(progress, (p) => sceneAt(p).ringOpacity);
  const aperture = useTransform(progress, (p) => `rotate(${sceneAt(p).turn * 0.7}deg)`);
  const unfold = useTransform(progress, (p) => sceneAt(p).unfold * (1 - sceneAt(p).connect));
  const starOpacity = useTransform(progress, (p) => sceneAt(p).starOpacity);
  const pathLength = useTransform(progress, (p) => sceneAt(p).connect);
  const sun = useTransform(progress, (p) => {
    const s = sceneAt(p);
    return `translate(${s.unfold * 80}px, ${s.unfold * -55}px) rotate(${-s.turn}deg)`;
  });
  const sunScale = useTransform(progress, (p) => 1 - sceneAt(p).connect * 0.64);
  return (
    <svg
      ref={svgRef}
      className={styles.illustration}
      viewBox="0 0 1000 1000"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={`${id}-title`}>An imaginary astronomical instrument</title>
      <desc id={`${id}-desc`}>
        Engraved circular scales, elliptical orbits, and a copper sun separate into layers, then
        resolve into a constellation as the page scrolls.
      </desc>
      <defs>
        <radialGradient id={`${id}-sun`} cx="32%" cy="27%" r="77%">
          <stop offset="0" stopColor="#f3cb88" />
          <stop offset=".42" stopColor="#c77947" />
          <stop offset=".8" stopColor="#945036" />
          <stop offset="1" stopColor="#673f2e" />
        </radialGradient>
        <radialGradient id={`${id}-moon`} cx="30%" cy="25%">
          <stop stopColor="#dcdcc5" />
          <stop offset=".75" stopColor="#78897b" />
          <stop offset="1" stopColor="#46594e" />
        </radialGradient>
        <pattern
          id={`${id}-hatch`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(24)"
        >
          <path d="M0 0V6" stroke="#382b21" strokeWidth=".6" opacity=".18" />
        </pattern>
        <clipPath id={`${id}-sunclip`}>
          <circle cx="500" cy="500" r="83" />
        </clipPath>
      </defs>
      <g stroke={brass} strokeWidth=".5" opacity=".3" fill="none">
        <path d="M500 45V955M45 500H955" />
        <circle cx="500" cy="500" r="435" strokeDasharray="1 12" />
        <path d="M85 95h40m-20-20v40M875 95h40m-20-20v40M85 905h40m-20-20v40M875 905h40m-20-20v40" />
      </g>
      <motion.g opacity={ringOpacity}>
        <motion.g
          data-part="outer"
          style={{ transform: outer, transformOrigin: '500px 500px', transformBox: 'view-box' }}
        >
          <Ring radius={374} teeth={120} />
          <circle cx="500" cy="500" r="351" fill="none" stroke={brass} strokeWidth=".5" />
          {['N', 'E', 'S', 'W'].map((t, i) => (
            <text
              key={t}
              x="500"
              y="108"
              textAnchor="middle"
              fill={brass}
              fontSize="13"
              fontFamily="Georgia,serif"
              transform={`rotate(${i * 90} 500 500)`}
            >
              {t}
            </text>
          ))}
          <path d="M486 100L500 75L514 100Z" fill={brass} />
          <g fill={brass} fontFamily="monospace" fontSize="9" textAnchor="middle">
            {Array.from({ length: 12 }, (_, i) => (
              <text key={i} x="500" y="171" transform={`rotate(${i * 30} 500 500)`}>
                {String(i * 30).padStart(3, '0')}
              </text>
            ))}
          </g>
        </motion.g>
        <motion.g
          data-part="middle"
          style={{ transform: middle, transformOrigin: '500px 500px', transformBox: 'view-box' }}
        >
          <Ring radius={290} teeth={90} />
          <g fill="none" stroke={ink} strokeWidth="1">
            <ellipse cx="500" cy="500" rx="315" ry="130" transform="rotate(-32 500 500)" />
            <ellipse cx="500" cy="500" rx="315" ry="130" transform="rotate(32 500 500)" />
          </g>
          <g fill={ink}>
            {[0, 90, 180, 270].map((a) => (
              <circle key={a} cx="500" cy="214" r="4" transform={`rotate(${a} 500 500)`} />
            ))}
          </g>
        </motion.g>
        <motion.g
          data-part="inner"
          style={{ transform: inner, transformOrigin: '500px 500px', transformBox: 'view-box' }}
        >
          <circle cx="500" cy="500" r="208" fill="none" stroke={brass} strokeWidth="1.6" />
          <circle cx="500" cy="500" r="193" fill="none" stroke={brass} strokeDasharray="2 7" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 45} 500 500)`}>
              <path d="M500 300V355M494 324H506" stroke={brass} strokeWidth="1" />
              <circle cx="500" cy="357" r="3" fill={brass} />
            </g>
          ))}
        </motion.g>
        <motion.g
          data-part="aperture"
          style={{ transform: aperture, transformOrigin: '500px 500px', transformBox: 'view-box' }}
          fill="none"
          stroke={ink}
          strokeWidth=".75"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d="M500 368Q616 364 632 500L561 439Z"
              transform={`rotate(${i * 45} 500 500)`}
            />
          ))}
        </motion.g>
        <motion.g
          data-part="orbit"
          style={{ transform: orbit, transformOrigin: '500px 500px', transformBox: 'view-box' }}
        >
          <ellipse
            cx="500"
            cy="500"
            rx="349"
            ry="188"
            fill="none"
            stroke={brass}
            strokeWidth="1.1"
          />
          <circle cx="849" cy="500" r="25" fill={`url(#${id}-moon)`} />
          <circle cx="849" cy="500" r="32" fill="none" stroke={brass} strokeWidth=".7" />
          <circle cx="151" cy="500" r="7" fill={ink} />
          <path d="M151 476V524M127 500H175" stroke={ink} strokeWidth=".6" />
        </motion.g>
      </motion.g>
      <motion.g
        data-part="sun"
        style={{ transform: sun, transformOrigin: '500px 500px', transformBox: 'view-box' }}
      >
        <motion.g
          style={{ scale: sunScale, transformOrigin: '500px 500px', transformBox: 'view-box' }}
        >
          <circle cx="500" cy="500" r="96" fill="none" stroke={brass} strokeWidth=".65" />
          <circle cx="500" cy="500" r="83" fill={`url(#${id}-sun)`} />
          <circle cx="500" cy="500" r="83" fill={`url(#${id}-hatch)`} />
          <g
            clipPath={`url(#${id}-sunclip)`}
            fill="none"
            stroke="#f8d59d"
            opacity=".28"
            strokeWidth=".65"
          >
            {Array.from({ length: 9 }, (_, i) => (
              <ellipse key={i} cx="500" cy="500" rx={12 + i * 9} ry="83" />
            ))}
            {[-50, -25, 0, 25, 50].map((y) => (
              <ellipse key={y} cx="500" cy={500 + y} rx={Math.sqrt(83 ** 2 - y ** 2)} ry="12" />
            ))}
          </g>
        </motion.g>
      </motion.g>
      <motion.g opacity={unfold} fill={ink} stroke={ink} strokeWidth=".6">
        <path
          d="M160 276H80V248M749 628H912V656M381 828H271V863"
          fill="none"
          strokeDasharray="3 4"
        />
        <g stroke="none" fontFamily="monospace" fontSize="10">
          <text x="80" y="238">
            01 / THE SCALE
          </text>
          <text x="792" y="679">
            02 / THE ORBIT
          </text>
          <text x="190" y="885">
            03 / THE COUNTERWEIGHT
          </text>
        </g>
      </motion.g>
      <motion.g opacity={starOpacity}>
        <g fill="#d4c9a5">
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity={0.25 + (i % 5) * 0.13} />
          ))}
        </g>
        <motion.path
          d={constellationPath}
          fill="none"
          stroke="#d3b777"
          strokeWidth="1.2"
          style={{ pathLength }}
        />
        {constellation.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === 2 ? 8 : 4} fill="#ede5ce" />
            <circle
              cx={x}
              cy={y}
              r={i === 2 ? 19 : 12}
              fill="none"
              stroke="#c1a36b"
              strokeWidth=".6"
            />
            <text x={x + 19} y={y - 16} fill="#c3c9b5" fontSize="10" fontFamily="monospace">
              {['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι'][i]}
            </text>
          </g>
        ))}
      </motion.g>
      <text
        x="500"
        y="968"
        fill={brass}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="9"
        letterSpacing="3"
      >
        PLATE XXVII / AN IMAGINED CELESTIAL MECHANISM
      </text>
    </svg>
  );
}
