import { useHistoryState } from '@/hooks/useHistoryState';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';
import { EditorToolbar } from '@/components/ui/EditorToolbar';
import { Slider } from '@/components/ui/Slider';
import { ScrambleText } from '@/components/ui/TextEffects';
import { Copy, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import styles from './EffectsLabLanding.module.css';
export function EffectsLabLanding() {
  const history = useHistoryState({ text: 'MAKE SOMETHING MOVE', speed: 24, font: 'mono' });
  const { text, speed, font } = history.value;
  const setText = (text: string) => history.set((p) => ({ ...p, text }), 'text');
  const setSpeed = (speed: number) => history.set((p) => ({ ...p, speed }), 'speed');
  const setFont = (font: string) => history.set((p) => ({ ...p, font }));
  useEditorShortcuts(history);
  const [replay, setReplay] = useState(0);
  const [message, setMessage] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        `<ScrambleText text=${JSON.stringify(text)} speed={${speed}} />`,
      );
      setMessage('Copied component usage.');
    } catch {
      setMessage('Clipboard unavailable. Select and copy the code below.');
    }
  }
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <span>TYPE LABORATORY</span>
        <p>An experiment in controlled disorder.</p>
      </header>
      <section className={styles.preview} data-font={font}>
        <span className={styles.previewLabel}>LIVE SPECIMEN</span>
        <h1>
          <ScrambleText key={replay} text={text || ' '} speed={speed} />
        </h1>
        <div className={styles.baseline} />
        <span className={styles.counter}>
          {text.length} characters / {speed}ms interval
        </span>
      </section>
      <section className={styles.controls}>
        <div>
          <label htmlFor="type-text">Your words</label>
          <input
            id="type-text"
            maxLength={60}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a little possibility…"
          />
          <div className={styles.presets}>
            {['MAKE SOMETHING MOVE', 'HELLO, POSSIBILITY.', 'FORM FOLLOWS FEELING'].map((t) => (
              <button key={t} onClick={() => setText(t)}>
                {t.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Slider
            label="Decode interval"
            min={10}
            max={70}
            value={speed}
            onChange={setSpeed}
            formatValue={(v) => `${v} ms`}
          />
          <div className={styles.fonts} role="group" aria-label="Typeface">
            <button aria-pressed={font === 'mono'} onClick={() => setFont('mono')}>
              Monospace
            </button>
            <button aria-pressed={font === 'sans'} onClick={() => setFont('sans')}>
              Sans serif
            </button>
          </div>
        </div>
        <div className={styles.actions}>
          <EditorToolbar
            undo={history.undo}
            redo={history.redo}
            canUndo={history.canUndo}
            canRedo={history.canRedo}
          />
          <button onClick={() => setReplay((v) => v + 1)}>
            <RotateCcw size={15} /> Replay
          </button>
          <button onClick={copy}>
            <Copy size={15} /> Copy usage
          </button>
        </div>
      </section>
      <footer className={styles.footer}>
        <code>{`<ScrambleText text=${JSON.stringify(text)} speed={${speed}} />`}</code>
        <p role="status">
          {message ||
            'The final text stays readable to assistive technology. Reduced motion is respected.'}
        </p>
      </footer>
    </main>
  );
}
