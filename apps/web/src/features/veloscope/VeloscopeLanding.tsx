import { DemoAction } from '@/components/ui/DemoAction';
import { SectionLink } from '@/components/ui/SectionLink';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowUpRight, Globe2, Route, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import styles from './VeloscopeLanding.module.css';
const regions = [
  {
    name: 'Pacific',
    nodes: ['San Francisco', 'Tokyo', 'Singapore'],
    path: 'M80 210 Q240 30 420 130 T720 250',
  },
  {
    name: 'Atlantic',
    nodes: ['New York', 'London', 'Frankfurt'],
    path: 'M80 260 Q260 40 420 180 T720 100',
  },
  {
    name: 'Continental',
    nodes: ['Portland', 'Denver', 'New York'],
    path: 'M80 180 Q230 320 420 180 T720 180',
  },
];
export function VeloscopeLanding() {
  const [region, setRegion] = useState(0);
  const [node, setNode] = useState(0);
  const active = regions[region];
  return (
    <div className={styles.container}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${getAssetUrl('/assets/veloscope_hero_bg.png')})` }}
      >
        <header className={styles.nav}>
          <strong>
            VELOSCOPE<span>®</span>
          </strong>
          <nav>
            <SectionLink target="network">The network</SectionLink>
            <SectionLink target="principles">Our approach</SectionLink>
          </nav>
          <DemoAction className={styles.button} title="Build your next connection">
            Get in touch <ArrowUpRight size={16} />
          </DemoAction>
        </header>
        <div className={styles.heroCopy}>
          <p>CONNECTED BY DESIGN / 001</p>
          <h1>
            A smaller world.
            <br />A wider horizon.
          </h1>
          <div className={styles.heroBottom}>
            <p>
              Infrastructure should open possibilities. An exploration of networks that feel as
              natural as the landscapes they cross.
            </p>
            <SectionLink target="network" className={styles.lightButton}>
              Explore the network <ArrowUpRight size={18} />
            </SectionLink>
          </div>
        </div>
        <span className={styles.caption}>An independent network interface concept</span>
      </section>
      <section id="network" className={styles.network}>
        <div className={styles.sectionTop}>
          <div>
            <p>01 / THE CONNECTIONS</p>
            <h2>Distance is a detail.</h2>
          </div>
          <p>
            Choose a region to trace its connections.
            <br />
            Illustrative routes, ready to explore.
          </p>
        </div>
        <div className={styles.tabs}>
          {regions.map((r, i) => (
            <button key={r.name} aria-pressed={region === i} onClick={() => setRegion(i)}>
              {r.name}
            </button>
          ))}
        </div>
        <div className={styles.map}>
          <svg
            viewBox="0 0 800 360"
            aria-label={`${active.name} illustrative network route`}
            role="img"
          >
            <defs>
              <pattern id="route-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#a4b4a5" />
              </pattern>
            </defs>
            <rect width="800" height="360" fill="url(#route-grid)" />
            <path
              d={active.path}
              fill="none"
              stroke="#31583e"
              strokeWidth="2"
              strokeDasharray="6 5"
            />
            {[80, 420, 720].map((x, i) => (
              <g key={x}>
                <circle
                  cx={x}
                  cy={region === 0 ? [210, 130, 250][i] : region === 1 ? [260, 180, 100][i] : 180}
                  r="9"
                  fill="#31583e"
                />
                <text
                  x={x}
                  y={
                    (region === 0 ? [210, 130, 250][i] : region === 1 ? [260, 180, 100][i] : 180) +
                    32
                  }
                  textAnchor="middle"
                  fill="#26382c"
                  fontSize="14"
                >
                  {active.nodes[i]}
                </text>
              </g>
            ))}
          </svg>
          <div className={styles.mapFooter}>
            <span>REGION / {active.name.toUpperCase()}</span>
            <span>3 NODES · 2 CONNECTIONS</span>
          </div>
        </div>
        <div className={styles.nodeInspector}>
          <div role="group" aria-label="Inspect network node">
            {active.nodes.map((n, i) => (
              <button key={n} aria-pressed={node === i} onClick={() => setNode(i)}>
                {n}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <article>
            <span>
              NODE 0{node + 1} / {active.nodes[node]}
            </span>
            <h3>{['The point of departure.', 'A connected midpoint.', 'A new horizon.'][node]}</h3>
            <p>
              {
                [
                  'Traffic enters the regional route here. Keep the origin visible when tracing a connection.',
                  'This relay joins the two route segments. Inspect both sides to understand the full path.',
                  'The destination completes the route. Every connection should have a clear endpoint.',
                ][node]
              }
            </p>
            <small>Illustrative topology · No live network measurements</small>
          </article>
        </div>
      </section>
      <section id="principles" className={styles.principles}>
        {[
          {
            Icon: Globe2,
            title: 'Think beyond borders',
            text: 'A clear, shared view of how every location connects.',
          },
          {
            Icon: Route,
            title: 'Make the path visible',
            text: 'Replace abstract configuration with routes you can understand.',
          },
          {
            Icon: ShieldCheck,
            title: 'Clarity builds trust',
            text: 'Give each connection a name, a purpose, and a place.',
          },
        ].map(({ Icon, title, text }, i) => (
          <article key={title}>
            <span>0{i + 1}</span>
            <Icon size={26} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <footer
        className={styles.footer}
        style={{ backgroundImage: `url(${getAssetUrl('/assets/veloscope_footer_bg.png')})` }}
      >
        <h2>
          The next horizon
          <br />
          starts with a connection.
        </h2>
        <SectionLink target="network" className={styles.lightButton}>
          Find your route <ArrowUpRight size={18} />
        </SectionLink>
      </footer>
    </div>
  );
}
