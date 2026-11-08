import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Orbit, RotateCcw } from 'lucide-react';
import { downloadBlob } from '@/lib/download';
import { OrreryIllustration } from './OrreryIllustration';
import { chapterAt, chapters, interval, themeAt } from './scene';
import styles from './OrreryLanding.module.css';
export function OrreryLanding() {
  const story = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const prefersReduced = useReducedMotion();
  const [still, setStill] = useState(false);
  const staticMode = !!prefersReduced || still;
  const { scrollYProgress } = useScroll({ target: story, offset: ['start start', 'end end'] });
  const visual = useMotionValue(staticMode ? chapters[0].target : 0);
  const [chapter, setChapter] = useState(0);
  const currentChapter = useRef(0);
  const [message, setMessage] = useState('');
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = chapterAt(p);
    visual.set(staticMode ? chapters[next]!.target : p);
    if (next !== currentChapter.current) {
      currentChapter.current = next;
      setChapter(next);
    }
  });
  useEffect(() => {
    const p = scrollYProgress.get();
    const next = chapterAt(p);
    visual.set(staticMode ? chapters[next]!.target : p);
    currentChapter.current = next;
    setChapter(next);
  }, [staticMode, scrollYProgress, visual]);
  const background = useTransform(visual, (p) => themeAt(p).background);
  const color = useTransform(visual, (p) => themeAt(p).color);
  const dim = useTransform(visual, (p) => themeAt(p).muted);
  const progressWidth = useTransform(scrollYProgress, (p) => `${Math.round(p * 100)}%`);
  const artX = useTransform(visual, (p) => interval(p, 0, 0.55) * -12);
  const artRotate = useTransform(visual, (p) => interval(p, 0.15, 0.6) * -5);
  const jump = (index: number, keyboard = false) => {
    const el = story.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (el.offsetHeight - window.innerHeight) * chapters[index]!.target,
      behavior: staticMode || keyboard ? 'instant' : 'smooth',
    });
  };
  const save = () => {
    if (!svg.current) return;
    try {
      const clone = svg.current.cloneNode(true) as SVGSVGElement;
      clone.setAttribute('width', '1000');
      clone.setAttribute('height', '1000');
      clone.removeAttribute('class');
      clone.style.cssText = `background:${themeAt(visual.get()).background};`;
      const data = new XMLSerializer().serializeToString(clone);
      downloadBlob(
        new Blob([data], { type: 'image/svg+xml' }),
        `orrery-${chapters[chapter]!.name.toLowerCase()}.svg`,
      );
      setMessage('Your illustrated plate is saved.');
    } catch {
      setMessage('The plate could not be saved. Please try again.');
    }
  };
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="#/orrery" className={styles.wordmark}>
          <Orbit size={24} />
          orrery<span>®</span>
        </a>
        <span className={styles.headerNote}>A SMALL OBSERVATORY OF IMAGINARY THINGS</span>
        <button onClick={(e) => jump(0, e.detail === 0)}>
          Explore the study <ArrowDown size={14} />
        </button>
      </header>
      <section
        ref={story}
        className={styles.story}
        aria-label="Three chapters of a scroll-driven astronomical study"
        data-static={staticMode}
      >
        <motion.div
          className={styles.stage}
          style={{ backgroundColor: background, color }}
          data-chapter={chapter}
        >
          <div className={styles.folio}>
            <span>NO. 027 — MOTION STUDY</span>
            <span>EST. IN THE IMAGINATION</span>
          </div>
          <div className={styles.composition}>
            <div className={styles.copy}>
              <motion.p className={styles.kicker} style={{ color: dim }}>
                <span /> {chapters[chapter]!.label}
              </motion.p>
              <div className={styles.headlines}>
                {chapters.map((c, i) => (
                  <div key={c.name} aria-hidden={i !== chapter} data-active={i === chapter}>
                    <h1>
                      {c.title[0]}
                      <br />
                      <em>{c.title[1]}</em>
                    </h1>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
              <motion.div className={styles.copyFooter} style={{ color: dim }}>
                <span className={styles.smallOrbit} aria-hidden="true" />
                <span>
                  AN EXERCISE IN CURIOSITY.
                  <br />
                  NOT AN EXPLANATION OF THE UNIVERSE.
                </span>
              </motion.div>
            </div>
            <motion.div
              className={styles.art}
              style={staticMode ? {} : { x: artX, rotate: artRotate }}
            >
              <OrreryIllustration progress={visual} svgRef={svg} />
            </motion.div>
          </div>
          <div className={styles.instrumentCaption}>
            <span>FIG. {String(chapter + 1).padStart(2, '0')}</span>
            <span>
              {
                [
                  'THE ASSEMBLED INSTRUMENT',
                  'ANATOMY OF A SMALL UNIVERSE',
                  'THE PATTERN THAT REMAINS',
                ][chapter]
              }
            </span>
            <span>
              SCROLL TO {chapter === 2 ? 'CONTINUE' : 'EXPLORE'} <ArrowDown size={12} />
            </span>
          </div>
          <footer className={styles.stageFooter}>
            <nav aria-label="Observatory chapters">
              {chapters.map((c, i) => (
                <button
                  key={c.name}
                  aria-current={chapter === i ? 'step' : undefined}
                  onClick={(e) => jump(i, e.detail === 0)}
                >
                  <span>0{i + 1}</span>
                  {c.name}
                </button>
              ))}
            </nav>
            <button
              className={styles.still}
              disabled={!!prefersReduced}
              aria-pressed={staticMode}
              onClick={() => setStill(!still)}
            >
              <span />
              {prefersReduced ? 'Reduced motion' : still ? 'Still mode on' : 'Still mode'}
            </button>
            <button
              className={styles.save}
              onClick={save}
              aria-label="Save plate"
              title="Save this plate as SVG"
            >
              <Download size={15} />
            </button>
            <span className={styles.scrollHint}>YOUR SCROLL SETS THE PACE</span>
          </footer>
          <div className={styles.progress} aria-hidden="true">
            <motion.div style={{ width: progressWidth }} />
          </div>
        </motion.div>
      </section>
      <section className={styles.afterword}>
        <div>
          <span className={styles.eyebrow}>A NOTE FROM THE OBSERVATORY</span>
          <h2>
            Wonder doesn’t need
            <br />
            <em>very much.</em>
          </h2>
          <p>
            A circle. A line. A change in perspective. This entire little universe is drawn in the
            browser, and every movement follows your scroll.
          </p>
          <button className={styles.again} onClick={(e) => jump(0, e.detail === 0)}>
            Take another look <RotateCcw size={16} />
          </button>
        </div>
        <div className={styles.making}>
          <div className={styles.makingTitle}>
            <span>HOW THE PIECES MOVE</span>
            <ArrowUpRight size={18} />
          </div>
          {[
            {
              name: 'Counter-rotation',
              text: 'Nested SVG rings turn at different rates, sharing one scroll timeline.',
            },
            {
              name: 'Exploded geometry',
              text: 'The scales separate in space before the illustration resolves into a new form.',
            },
            {
              name: 'A drawn connection',
              text: 'The final path reveals itself as the instrument gives way to a constellation.',
            },
          ].map((item, i) => (
            <details key={item.name}>
              <summary>
                <span>0{i + 1}</span>
                {item.name}
              </summary>
              <p>{item.text}</p>
            </details>
          ))}
          <div className={styles.specs}>
            <span>100% VECTOR</span>
            <span>NO IMAGE ASSETS</span>
            <span>THREE CHAPTERS</span>
          </div>
        </div>
      </section>
      <footer className={styles.bottom}>
        <span>ORRERY / A BROWSER DESIGNS ORIGINAL</span>
        <p role="status">{message || 'An imagined instrument. An invitation to look closer.'}</p>
      </footer>
    </main>
  );
}
