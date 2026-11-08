import { Dialog } from '@/components/ui/Dialog';
import { Code2, Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from '../OriginKitLanding.module.css';
const sources = import.meta.glob('./*.tsx', { query: '?raw', import: 'default' });
export function ComponentCard({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const showCode = async () => {
    setOpen(true);
    const key = Object.keys(sources).find(
      (path) =>
        path.replace('./', '').replace('.tsx', '').toLowerCase() ===
        title.replace(/[^a-z]/gi, '').toLowerCase(),
    );
    try {
      setCode(
        key
          ? String(await sources[key]!())
          : 'Source is available in src/features/originkit/components.',
      );
    } catch {
      setCode('Could not load the source. Please reload and try again.');
    }
  };
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { rootMargin: '120px' },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <article ref={ref} className={styles.card}>
      <header className={styles.cardHeader}>
        <h2>{title}</h2>
        <span>{tag}</span>
      </header>
      <div className={styles.preview} key={version}>
        {visible && !paused ? (
          children
        ) : (
          <button className={styles.resume} onClick={() => setPaused(false)}>
            {paused ? 'Resume this experiment' : 'Experiment loads as you approach'}
          </button>
        )}
      </div>
      <footer className={styles.cardFooter}>
        <span>Explore the interaction</span>
        <div>
          <button aria-label={`View ${title} source`} onClick={showCode}>
            <Code2 size={13} />
          </button>
          <button
            aria-label={`${paused ? 'Resume' : 'Pause'} ${title}`}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
          <button
            aria-label={`Replay ${title}`}
            onClick={() => {
              setVersion((v) => v + 1);
              setPaused(false);
            }}
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </footer>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={`${title} / source`}
        description="The implementation used in this demo. Imports and stylesheet dependencies are shown in the source."
        wide
      >
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setMessage('Source copied.');
            } catch {
              setMessage('Select the source below to copy it.');
            }
          }}
        >
          Copy source
        </button>
        <p role="status">{message}</p>
        <pre
          style={{
            maxHeight: '55vh',
            overflow: 'auto',
            padding: 20,
            background: '#f5f6f8',
            fontSize: 11,
            lineHeight: 1.7,
          }}
        >
          <code>{code || 'Loading source…'}</code>
        </pre>
      </Dialog>
    </article>
  );
}
