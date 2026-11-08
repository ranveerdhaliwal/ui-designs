import { useStoredState } from '@/hooks/useStoredState';
import { downloadBlob } from '@/lib/download';
import { ArrowLeft, ArrowRight, Maximize } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './SlideDeck.module.css';
interface Theme {
  id: string;
  name: string;
  slides: ReactNode[];
}
export function SlideDeck({ themes }: { themes: Theme[] }) {
  const [themeId, setThemeId] = useState(themes[0]?.id ?? '');
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useStoredState<Record<string, string>>(
    'editorial-deck-notes-v1',
    {},
    (v): v is Record<string, string> =>
      !!v &&
      typeof v === 'object' &&
      !Array.isArray(v) &&
      Object.values(v).every((n) => typeof n === 'string' && n.length <= 2000),
  );
  const [notice, setNotice] = useState('');
  const viewport = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const theme = themes.find((t) => t.id === themeId) ?? themes[0];
  const slides = theme?.slides ?? [];
  const current = Math.min(index, Math.max(0, slides.length - 1));
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(Math.min(entry.contentRect.width / 1440, entry.contentRect.height / 810));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest('input,select,textarea,[contenteditable]')
      )
        return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, slides.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slides.length]);
  if (!theme) return <p>No presentation themes available.</p>;
  return (
    <div className={styles.deckContainer} ref={container}>
      <header className={styles.controls}>
        <span className={styles.brand}>Editorial Decks</span>
        <label>
          <span className="sr-only">Presentation theme</span>
          <select
            className={styles.select}
            value={theme.id}
            onChange={(e) => {
              setThemeId(e.target.value);
              setIndex(0);
            }}
          >
            {themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.navigation}>
          <button
            aria-label="Previous slide"
            disabled={current === 0}
            onClick={() => setIndex(current - 1)}
          >
            <ArrowLeft size={17} />
          </button>
          <span aria-live="polite">
            {current + 1} / {slides.length}
          </span>
          <button
            aria-label="Next slide"
            disabled={current === slides.length - 1}
            onClick={() => setIndex(current + 1)}
          >
            <ArrowRight size={17} />
          </button>
          <button
            aria-label="Enter fullscreen"
            onClick={async () => {
              try {
                if (document.fullscreenElement) await document.exitFullscreen();
                else await container.current?.requestFullscreen();
              } catch {
                setNotice('Fullscreen isn’t available in this browser.');
              }
            }}
          >
            <Maximize size={16} />
          </button>
        </div>
      </header>
      <div ref={viewport} className={styles.slideViewport}>
        <div
          className={styles.slideWrapper}
          style={{ transform: `translate(-50%,-50%) scale(${scale})` }}
          key={`${theme.id}-${current}`}
        >
          {slides[current]}
        </div>
      </div>
      {showNotes && (
        <div className={styles.notes}>
          <label>
            Speaker notes / slide {current + 1}
            <textarea
              maxLength={2000}
              value={notes[`${theme.id}-${current}`] ?? ''}
              onChange={(e) => setNotes({ ...notes, [`${theme.id}-${current}`]: e.target.value })}
              placeholder="What would you like to say about this slide?"
            />
          </label>
          <button
            onClick={() =>
              downloadBlob(
                new Blob(
                  [
                    slides
                      .map((_, i) => `SLIDE ${i + 1}\n${notes[`${theme.id}-${i}`] ?? ''}`)
                      .join('\n\n'),
                  ],
                  { type: 'text/plain' },
                ),
                `${theme.id}-speaker-notes.txt`,
              )
            }
          >
            Export notes
          </button>
          <small>Saved on this device. Notes are excluded from fullscreen.</small>
        </div>
      )}
      <footer className={styles.footer}>
        <button aria-expanded={showNotes} onClick={() => setShowNotes(!showNotes)}>
          Speaker notes
        </button>
        <span>{notice || 'Use the arrow keys to move between slides.'}</span>
        <div aria-label="Slide selector">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              aria-pressed={i === current}
              onClick={() => setIndex(i)}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
