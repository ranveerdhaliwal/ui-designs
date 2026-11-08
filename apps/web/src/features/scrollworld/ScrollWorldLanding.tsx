import { SectionLink } from '@/components/ui/SectionLink';
import { getAssetUrl } from '@/lib/assetUtils';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import styles from './ScrollWorldLanding.module.css';
const scenes = [
  {
    id: 'arrival',
    name: 'The quiet arrival',
    title: (
      <>
        Somewhere
        <br />
        outside the ordinary.
      </>
    ),
    text: 'Leave a little room for the unexpected.',
    image: '/assets/oasis_bg.png',
  },
  {
    id: 'passage',
    name: 'An open horizon',
    title: (
      <>
        Let your
        <br />
        perspective wander.
      </>
    ),
    text: 'The best part of a journey is what you didn’t plan.',
    image: '/assets/haven_bg.png',
  },
  {
    id: 'beyond',
    name: 'A different beginning',
    title: (
      <>
        There is always
        <br />
        another way to see.
      </>
    ),
    text: 'Take something of this place with you.',
    image: '/assets/motionsites/floren_hd_landscape.jpg',
  },
];
function Scene({ scene, index }: { scene: (typeof scenes)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);
  return (
    <section id={`world-${scene.id}`} ref={ref} className={styles.scene}>
      <motion.img
        src={getAssetUrl(scene.image)}
        alt="An imagined landscape"
        style={reduced ? {} : { y, scale }}
      />
      <div className={styles.shade} />
      <div className={styles.sceneTop}>
        <span>
          {String(index + 1).padStart(2, '0')} / {scene.name}
        </span>
        <span>ELSEWHERE</span>
      </div>
      <div className={styles.copy}>
        <h1>{scene.title}</h1>
        <p>{scene.text}</p>
        {index < 2 ? (
          <SectionLink target={`world-${scenes[index + 1]!.id}`} className={styles.next}>
            Continue the journey <ArrowDown size={17} />
          </SectionLink>
        ) : (
          <SectionLink target="world-arrival" className={styles.next}>
            Begin again <ArrowUpRight size={17} />
          </SectionLink>
        )}
      </div>
    </section>
  );
}
export function ScrollWorldLanding() {
  const [chapter, setChapter] = useState('arrival');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setChapter(e.target.id.replace('world-', ''));
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );
    document.querySelectorAll('[id^="world-"]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <main className={styles.container}>
      <nav className={styles.chapterNav} aria-label="Journey chapters">
        {scenes.map((s, i) => (
          <SectionLink
            key={s.id}
            target={`world-${s.id}`}
            aria-current={chapter === s.id ? 'location' : undefined}
          >
            <span>0{i + 1}</span>
            {s.name}
          </SectionLink>
        ))}
      </nav>
      {scenes.map((scene, index) => (
        <Scene key={scene.id} scene={scene} index={index} />
      ))}
    </main>
  );
}
