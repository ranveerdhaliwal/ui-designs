import { DemoAction } from '@/components/ui/DemoAction';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import styles from './BigBoldHeroLanding.module.css';
const themes = [
  {
    id: 'oasis',
    name: 'Oasis.',
    headline: (
      <>
        A calmer way
        <br />
        to create.
      </>
    ),
    description:
      'Space to think. Room to explore. A clearer path from your first idea to your next great thing.',
    label: 'Make room for possibility',
    color: '#233327',
    light: true,
    align: 'left',
    serif: true,
  },
  {
    id: 'haven',
    name: 'Haven',
    headline: (
      <>
        Good ideas
        <br />
        feel at home here.
      </>
    ),
    description:
      'An open canvas for the way your mind works. Gather your inspiration and see what grows.',
    label: 'A place for your next idea',
    color: '#272e3b',
    light: true,
    align: 'center',
    serif: false,
  },
  {
    id: 'harmoniq',
    name: 'Harmoniq',
    headline: (
      <>
        Find a little
        <br />
        more harmony.
      </>
    ),
    description: 'Bring your people, projects, and possibilities into a rhythm that feels right.',
    label: 'Work, in balance',
    color: '#333e34',
    light: true,
    align: 'center',
    serif: true,
  },
  {
    id: 'arive',
    name: 'arive',
    headline: (
      <>
        Every message.
        <br />A new beginning.
      </>
    ),
    description: 'A considered home for the conversations that move your work forward.',
    label: 'Communication, considered',
    color: '#eff4ff',
    light: false,
    align: 'left',
    serif: false,
  },
  {
    id: 'ostra',
    name: 'OSTRA',
    headline: (
      <>
        A wider
        <br />
        point of view.
      </>
    ),
    description: 'Follow your curiosity into an ever-expanding universe of ideas and connections.',
    label: 'Go beyond the familiar',
    color: '#f4e9ed',
    light: false,
    align: 'center',
    serif: false,
  },
  {
    id: 'lumen',
    name: 'Lumen Gate',
    headline: (
      <>
        Let the next
        <br />
        idea find you.
      </>
    ),
    description:
      'A brighter perspective on your daily work. Built for the moments when everything comes together.',
    label: 'A new perspective',
    color: '#f5eee2',
    light: false,
    align: 'left',
    serif: true,
  },
  {
    id: 'vanta',
    name: 'vanta',
    headline: (
      <>
        The future
        <br />
        takes shape here.
      </>
    ),
    description:
      'Tools for thoughtful teams. Turn an ambitious idea into something beautifully useful.',
    label: 'Built for what comes next',
    color: '#1e2a20',
    light: true,
    align: 'center',
    serif: false,
  },
] as const;
export function BigBoldHeroLanding() {
  const [selected, setSelected] = useState(0);
  const [colorNotice, setColorNotice] = useState('');
  const theme = themes[selected]!;
  return (
    <div className={styles.container}>
      <nav className={styles.themeBar} aria-label="Choose a visual identity">
        <span>Dreamscapes</span>
        <div>
          {themes.map((t, i) => (
            <button key={t.id} aria-pressed={selected === i} onClick={() => setSelected(i)}>
              {t.name}
            </button>
          ))}
        </div>
        <span>07 identities</span>
      </nav>
      <section
        key={theme.id}
        className={styles.world}
        data-align={theme.align}
        data-light={theme.light}
        style={
          {
            '--world-ink': theme.color,
            '--world-font': theme.serif ? 'Georgia, serif' : 'Arial, sans-serif',
            backgroundImage: `url(${getAssetUrl(`/assets/${theme.id}_bg.png`)})`,
          } as CSSProperties
        }
      >
        <div className={styles.scrim} />
        <header className={styles.nav}>
          <span className={styles.brand}>{theme.name}</span>
          <span className={styles.navLabel}>{theme.label}</span>
          <DemoAction className={styles.navButton} title={`Welcome to ${theme.name}`}>
            Say hello <ArrowUpRight size={14} />
          </DemoAction>
        </header>
        <main className={styles.hero}>
          <p className={styles.eyebrow}>{theme.label}</p>
          <h1>{theme.headline}</h1>
          <p className={styles.description}>{theme.description}</p>
          <DemoAction className={styles.cta} title={`Explore ${theme.name}`}>
            Step inside <MoveRight size={18} />
          </DemoAction>
        </main>
        <footer className={styles.footer}>
          <span>{theme.name} / A visual identity study</span>
          <button onClick={() => setSelected((selected + 1) % themes.length)}>
            Next world <ArrowUpRight size={15} />
          </button>
        </footer>
      </section>
      <section className={styles.identityNotes} data-serif={theme.serif}>
        <div>
          <span>THE IDENTITY / 0{selected + 1}</span>
          <h2>
            {
              [
                'A little room to breathe.',
                'Bring your ideas home.',
                'Find a shared rhythm.',
                'A thoughtful exchange.',
                'Follow a wider orbit.',
                'Make space for clarity.',
                'From possibility to form.',
              ][selected]
            }
          </h2>
          <p>{theme.description}</p>
        </div>
        <div className={styles.specimens}>
          <span>01 / THE VOICE</span>
          <blockquote>{theme.label}.</blockquote>
          <span>02 / THE PALETTE</span>
          <div>
            {[
              theme.color,
              theme.light ? '#e5e2d6' : '#3b3c4b',
              theme.light ? '#b6c3ad' : '#d6b4a0',
            ].map((c) => (
              <button
                key={c}
                style={{
                  background: c,
                  color: c === theme.color ? (theme.light ? '#fff' : '#222') : theme.color,
                }}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(c);
                    setColorNotice(`${c} copied.`);
                  } catch {
                    setColorNotice(`Color: ${c}`);
                  }
                }}
                aria-label={`Copy color ${c}`}
              >
                {c}
              </button>
            ))}
          </div>
          <small role="status">{colorNotice || 'Select a color to copy its value.'}</small>
        </div>
      </section>
    </div>
  );
}
