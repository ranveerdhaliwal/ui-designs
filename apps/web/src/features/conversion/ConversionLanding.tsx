import { SectionLink } from '@/components/ui/SectionLink';
import { Workflow } from '@/components/ui/Workflow';
import { ArrowUpRight, Layers } from 'lucide-react';
import styles from './ConversionLanding.module.css';
export function ConversionLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <span>
          <Layers size={22} /> Conversion
        </span>
        <SectionLink target="conversion-flow">
          Try the workflow <ArrowUpRight size={15} />
        </SectionLink>
      </header>
      <main>
        <section className={styles.hero}>
          <div>
            <p className={styles.kicker}>A more considered kind of marketing.</p>
            <h1>
              Make every
              <br />
              connection
              <br />
              <em>mean something.</em>
            </h1>
            <p className={styles.lead}>
              From the first hello to the next conversation. Build thoughtful customer journeys, one
              useful action at a time.
            </p>
            <SectionLink target="conversion-flow" className={styles.cta}>
              Build a connection <ArrowUpRight size={18} />
            </SectionLink>
          </div>
          <div id="conversion-flow" className={styles.flow}>
            <div className={styles.orbs} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <Workflow dark />
          </div>
        </section>
        <section className={styles.details}>
          <h2>
            Right message.
            <br />
            Right moment.
          </h2>
          <p>
            Start with an event. Add the context. Create an action that feels personal. Explore the
            sample workflow and watch the pieces connect.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        Conversion <span>Thoughtful by design.</span>
      </footer>
    </div>
  );
}
