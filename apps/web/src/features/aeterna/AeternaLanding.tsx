import { ArtworkViewer } from '@/components/ui/ArtworkViewer';
import { DetailDialog } from '@/components/ui/DemoAction';
import { SectionLink } from '@/components/ui/SectionLink';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import styles from './AeternaLanding.module.css';
const objects = [
  {
    title: 'An enduring idea',
    type: 'Sculpture',
    image: '/assets/aeterna_hero.png',
    text: 'Classical figures in dialogue with an unexpected modern form. A reflection on the ideas we inherit, and the things we choose to make.',
  },
  {
    title: 'The face of time',
    type: 'Sculpture',
    image: '/assets/david.jpg',
    text: 'An exploration of form, texture, and human expression. Look closely at the relationship between light and the sculpted surface.',
  },
  {
    title: 'A place imagined',
    type: 'Landscape',
    image: '/assets/motionsites/floren_hd_landscape.jpg',
    text: 'A pastoral world assembled from memory and imagination. The landscape becomes a story of the people who might live within it.',
  },
];
export function AeternaLanding() {
  const [filter, setFilter] = useState('All');
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <span className={styles.logo}>ÆTERNA</span>
        <nav>
          <SectionLink target="aeterna-collection">The collection</SectionLink>
          <SectionLink target="aeterna-note">Our perspective</SectionLink>
        </nav>
        <span>Art, across time.</span>
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.copy}>
            <p>A conversation with the past.</p>
            <h1>
              Some things
              <br />
              stay with us.
            </h1>
            <p className={styles.description}>
              Objects, images, and ideas that carry something forward. A collection for the quietly
              curious.
            </p>
            <SectionLink target="aeterna-collection" className={styles.cta}>
              Enter the collection <ArrowRight size={17} />
            </SectionLink>
          </div>
          <figure className={styles.heroImage}>
            <img
              src={getAssetUrl('/assets/aeterna_hero.png')}
              alt="Classical sculptural figures surrounding a giant lightbulb"
            />
            <figcaption>Sculpture, reimagined.</figcaption>
          </figure>
        </section>
        <section id="aeterna-collection" className={styles.collection}>
          <div className={styles.collectionHeader}>
            <h2>A closer look.</h2>
            <div role="group" aria-label="Collection type">
              {['All', 'Sculpture', 'Landscape'].map((type) => (
                <button key={type} onClick={() => setFilter(type)} aria-pressed={filter === type}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.grid}>
            {objects
              .filter((o) => filter === 'All' || o.type === filter)
              .map((o) => (
                <article key={o.title}>
                  <DetailDialog
                    title={o.title}
                    trigger={
                      <>
                        <img src={getAssetUrl(o.image)} alt={o.title} loading="lazy" />
                        <div className={styles.objectTitle}>
                          <h3>{o.title}</h3>
                          <ArrowUpRight size={17} />
                        </div>
                        <p>{o.type}</p>
                      </>
                    }
                  >
                    <ArtworkViewer src={getAssetUrl(o.image)} alt={o.title} />
                    <p>{o.text}</p>
                  </DetailDialog>
                </article>
              ))}
          </div>
        </section>
        <section id="aeterna-note" className={styles.note}>
          <span>OUR PERSPECTIVE</span>
          <p>
            History is a living conversation.
            <br />
            We’re here to keep it going.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        ÆTERNA <span>Art. Culture. Continuity.</span>
      </footer>
    </div>
  );
}
