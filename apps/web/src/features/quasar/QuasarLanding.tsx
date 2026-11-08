import { useHistoryState } from '@/hooks/useHistoryState';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';
import { EditorToolbar } from '@/components/ui/EditorToolbar';
import { Slider } from '@/components/ui/Slider';
import { ArrowUpRight, Orbit } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import styles from './QuasarLanding.module.css';
const palettes = [
  { name: 'Solar', colors: ['#ff6a26', '#eabe7d', '#481a0f'] },
  { name: 'Iris', colors: ['#7d7bff', '#f2b3cb', '#25205e'] },
  { name: 'Tidal', colors: ['#49bca1', '#bdecd5', '#0b3f4a'] },
];
export function QuasarLanding() {
  const history = useHistoryState({ palette: 0, diffusion: 18 });
  const { palette, diffusion } = history.value;
  const setPalette = (palette: number) => history.set((p) => ({ ...p, palette }));
  const setDiffusion = (diffusion: number) =>
    history.set((p) => ({ ...p, diffusion }), 'diffusion');
  useEditorShortcuts(history);
  const [copied, setCopied] = useState('');
  const [paused, setPaused] = useState(false);
  const colors = palettes[palette]!.colors;
  return (
    <div
      className={styles.container}
      style={
        {
          '--q-one': colors[0],
          '--q-two': colors[1],
          '--q-three': colors[2],
          '--q-blur': `${diffusion}px`,
        } as CSSProperties
      }
    >
      <header className={styles.nav}>
        <span>
          <Orbit size={20} /> QUASAR
        </span>
        <span>A study of light & material</span>
      </header>
      <main className={styles.stage}>
        <div className={styles.orbital} data-paused={paused} aria-hidden="true">
          <div className={styles.orb} />
          {[0, 1, 2, 3, 4].map((n) => (
            <div key={n} className={styles.ring} style={{ '--n': n } as CSSProperties} />
          ))}
        </div>
        <div className={styles.title}>
          <p>COLOR IS A FEELING.</p>
          <h1>
            Find your
            <br />
            <span>frequency.</span>
          </h1>
          <p className={styles.description}>
            An experiment in luminous color,
            <br />
            soft refraction, and shifting perspective.
          </p>
        </div>
        <div className={styles.controls}>
          <EditorToolbar {...history} reset={() => history.set({ palette: 0, diffusion: 18 })} />
          <div className={styles.controlsTitle}>
            <span>Light settings</span>
            <ArrowUpRight size={16} />
          </div>
          <div className={styles.palettes} role="group" aria-label="Color palette">
            {palettes.map((p, i) => (
              <button key={p.name} aria-pressed={i === palette} onClick={() => setPalette(i)}>
                <span style={{ background: p.colors[0] }} />
                {p.name}
              </button>
            ))}
          </div>
          <Slider
            label="Diffusion"
            value={diffusion}
            min={0}
            max={40}
            onChange={setDiffusion}
            formatValue={(v) => `${v}px`}
          />
          <button className={styles.pause} aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? 'Resume movement' : 'Pause movement'}
          </button>
          <button
            className={styles.pause}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  `background: radial-gradient(circle at 30% 30%, ${colors[1]}, ${colors[0]} 45%, ${colors[2]} 80%);\nfilter: blur(${diffusion}px);`,
                );
                setCopied('Color recipe copied.');
              } catch {
                setCopied('Clipboard unavailable.');
              }
            }}
          >
            Copy color recipe
          </button>
          <span role="status">{copied}</span>
        </div>
      </main>
      <footer className={styles.footer}>
        <span>Light, without limits.</span>
        <span>
          {palettes[palette]!.name} / {String(palette + 1).padStart(2, '0')}
        </span>
      </footer>
    </div>
  );
}
