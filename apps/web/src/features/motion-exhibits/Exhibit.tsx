import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react';
import { chapterAt, chapterStops } from './sceneMath';
import type { SceneProps } from './useScene';
import styles from './Exhibit.module.css';
export interface ExhibitConfig {
  id: string;
  title: string;
  number: string;
  eyebrow: string;
  chapters: readonly { name: string; title: string; text: string }[];
  note: string;
  next: string;
  nextTitle: string;
}
export function Exhibit({
  config,
  children,
  controls,
}: {
  config: ExhibitConfig;
  children: (props: SceneProps) => ReactNode;
  controls?: ReactNode;
}) {
  const story = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const still = !!reduced || paused;
  const [chapter, setChapter] = useState(0);
  const { scrollYProgress } = useScroll({ target: story, offset: ['start start', 'end end'] });
  const visual = useMotionValue(reduced ? chapterStops[0] : 0);
  const width = useTransform(scrollYProgress, (p) => `${p * 100}%`);
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = chapterAt(p);
    setChapter(next);
    // Pause stops ambient motion. Scroll still explores intentional chapter snapshots.
    visual.set(still ? chapterStops[next]! : p);
  });
  useEffect(() => {
    const p = scrollYProgress.get();
    visual.set(still ? chapterStops[chapterAt(p)]! : p);
  }, [still, visual, scrollYProgress]);
  const jump = (i: number) => {
    const el = story.current;
    if (!el) return;
    window.scrollTo({
      top:
        el.getBoundingClientRect().top +
        scrollY +
        (el.offsetHeight - innerHeight) * chapterStops[i]!,
      behavior: 'instant',
    });
  };
  const c = config.chapters[chapter]!;
  return (
    <main className={styles.exhibit} data-exhibit={config.id}>
      <section ref={story} className={styles.story} data-story data-still={still}>
        <div className={styles.stage} data-stage data-chapter={chapter}>
          <header className={styles.masthead}>
            <a href={`#/${config.id}`} className={styles.brand}>
              {config.title}
              <span>®</span>
            </a>
            <span className={styles.edition}>{config.eyebrow}</span>
            <span className={styles.number}>STUDY / {config.number}</span>
          </header>
          <div className={styles.scene} data-scene>
            {children({ progress: visual, still })}
          </div>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              {String(chapter + 1).padStart(2, '0')} / {c.name}
            </p>
            <h1>{c.title}</h1>
            <p className={styles.description}>{c.text}</p>
          </div>
          <div className={styles.annotation} aria-hidden="true">
            <span>SCROLL TO TRANSFORM</span>
            <ArrowDown size={16} />
          </div>
          {controls && <div className={styles.controls}>{controls}</div>}
          <footer className={styles.transport}>
            <nav aria-label={`${config.title} chapters`}>
              {config.chapters.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => jump(i)}
                  aria-current={i === chapter ? 'step' : undefined}
                >
                  <span>0{i + 1}</span>
                  {item.name}
                </button>
              ))}
            </nav>
            <button
              className={styles.pause}
              disabled={!!reduced}
              aria-pressed={still}
              onClick={() => setPaused(!paused)}
            >
              {still ? <Play size={13} /> : <Pause size={13} />}
              <span>{reduced ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion'}</span>
            </button>
          </footer>
          <div className={styles.progress}>
            <motion.div style={{ width }} />
          </div>
        </div>
      </section>
      <section className={styles.afterword}>
        <p>BEHIND THE STUDY / {config.number}</p>
        <h2>{config.note}</h2>
        <div>
          <button onClick={() => jump(0)}>
            Experience again <RotateCcw size={15} />
          </button>
          <a href={`#/${config.next}`}>
            Next: {config.nextTitle} <ArrowUpRight size={16} />
          </a>
        </div>
        <span>MADE OF CODE. MOVED BY YOU.</span>
      </section>
    </main>
  );
}
