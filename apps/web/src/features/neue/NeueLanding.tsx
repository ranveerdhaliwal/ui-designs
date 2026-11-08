import { ArtworkViewer } from '@/components/ui/ArtworkViewer';
import { DemoAction, DetailDialog } from '@/components/ui/DemoAction';
import { SectionLink } from '@/components/ui/SectionLink';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowUpRight } from 'lucide-react';
import styles from './NeueLanding.module.css';
const projects = [
  {
    name: 'Form / Matter',
    kind: 'Art direction',
    image: '/assets/aeterna_hero.png',
    description:
      'A study in the meeting of old forms and new ideas. Sculptural imagery, quiet typography, and a deliberately restrained palette.',
  },
  {
    name: 'A new atmosphere',
    kind: 'Digital experience',
    image: '/assets/oasis_bg.png',
    description:
      'An imagined landscape becomes an interface. Soft materials and expansive space create a calmer way to navigate.',
  },
  {
    name: 'Objects in motion',
    kind: 'Visual identity',
    image: '/assets/agentic.png',
    description:
      'A system built around tension, balance, and the unexpected. Designed to move seamlessly between physical and digital surfaces.',
  },
];
export function NeueLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <span>
          NEUE
          <br />
          MONTREAL®
        </span>
        <nav>
          <SectionLink target="neue-work">
            Selected work <ArrowUpRight size={14} />
          </SectionLink>
          <SectionLink target="neue-about">
            Studio <ArrowUpRight size={14} />
          </SectionLink>
        </nav>
      </header>
      <main>
        <section className={styles.hero}>
          <p>Independent by design.</p>
          <h1>
            Ideas with
            <br />
            <span>a point of view.</span>
          </h1>
          <div className={styles.heroFoot}>
            <p>
              Strategy, identity, and digital experiences
              <br />
              for people making something different.
            </p>
            <SectionLink target="neue-work">
              Discover our work <ArrowUpRight size={24} />
            </SectionLink>
          </div>
        </section>
        <section id="neue-work" className={styles.work}>
          <div className={styles.sectionLabel}>
            Selected explorations <span>2026</span>
          </div>
          <div className={styles.grid}>
            {projects.map((project) => (
              <article key={project.name}>
                <DetailDialog
                  title={project.name}
                  trigger={
                    <>
                      <div className={styles.projectImage}>
                        <img src={getAssetUrl(project.image)} alt={project.name} loading="lazy" />
                        <span>
                          <ArrowUpRight size={24} />
                        </span>
                      </div>
                      <div className={styles.projectTitle}>
                        <h2>{project.name}</h2>
                        <span>{project.kind}</span>
                      </div>
                    </>
                  }
                >
                  <ArtworkViewer src={getAssetUrl(project.image)} alt={project.name} />
                  <p>{project.description}</p>
                </DetailDialog>
              </article>
            ))}
          </div>
        </section>
        <section id="neue-about" className={styles.about}>
          <p>
            Good design starts
            <br />
            with a better question.
          </p>
          <div>
            <p>
              We look for the unexpected connection. The simple gesture. The idea that holds
              everything together.
            </p>
            <DemoAction title="Start a conversation" className={styles.contact}>
              Let’s make something <ArrowUpRight size={19} />
            </DemoAction>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        NEUE MONTREAL <span>Strategy / Identity / Digital</span>
      </footer>
    </div>
  );
}
