import { DemoAction } from '@/components/ui/DemoAction';
import { SectionLink } from '@/components/ui/SectionLink';
import { ConcentricRings } from './ConcentricRings';
import styles from './ContentArchitectureLanding.module.css';
import { TypewriterFooter } from './TypewriterFooter';

export function ContentArchitectureLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.pillNav}>
          <div className={styles.navLogo}>&#9638;</div>
          <nav className={styles.navLinks}>
            <SectionLink target="architecture-features">FEATURES</SectionLink>
            <SectionLink target="architecture-repo">THE REPO</SectionLink>
            <SectionLink target="architecture-showcase">SHOWCASE</SectionLink>

            <SectionLink target="architecture-faq">FAQ</SectionLink>
          </nav>
        </div>
      </header>

      <div className={styles.splitLayout}>
        <div className={styles.leftPane}>
          <div className={styles.leftContent}>
            <p className={styles.kicker}>BUILT FOR AGENTIC DEVELOPMENT.</p>
            <h1 className={styles.title}>
              Good structure.
              <br />
              Room to create.
            </h1>
            <p className={styles.description}>
              A clear place for every piece. Explore a content system where structure supports
              expression, and the next decision has somewhere to begin.
            </p>
            <p className={styles.subtext}>STRUCTURE FOR CREATIVE WORK.</p>

            <div className={styles.actions}>
              <SectionLink target="architecture-features" className={styles.btnPrimary}>
                EXPLORE
              </SectionLink>
              <DemoAction className={styles.btnSecondary} title="Start with structure">
                GET IN TOUCH
              </DemoAction>
            </div>
          </div>
          <div className={styles.typewriterWrapper}>
            <TypewriterFooter />
          </div>
        </div>

        <div className={styles.rightPane}>
          <div className={styles.ringWrapper}>
            <ConcentricRings />
          </div>
        </div>
      </div>
      <section id="architecture-features" className={styles.features}>
        <h2>A system you can see.</h2>
        <div>
          {['Content models', 'Shared components', 'Clear boundaries'].map((title, i) => (
            <article key={title}>
              <span>
                {
                  [
                    'Define the shape of your information.',
                    'Give repeated patterns a single home.',
                    'Keep each feature focused and independent.',
                  ][i]
                }
              </span>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>
      <section id="architecture-repo" className={styles.repo}>
        <div>
          <h2>Everything in its place.</h2>
          <p>An example structure for a content-driven application.</p>
        </div>
        <pre aria-label="Example project structure">{`src/
  content/       Models & documents
  components/    Reusable interfaces
  features/      Product experiences
  styles/        Shared foundations`}</pre>
      </section>
      <section className={styles.features} aria-label="Architecture boundaries">
        {[
          {
            title: 'Content owns the model',
            text: 'Keep documents, schemas, and validation together. A rendering component should receive a clear, typed value.',
          },
          {
            title: 'Features own the experience',
            text: 'A feature combines content and shared controls around one user task. Keep state near the interactions that change it.',
          },
          {
            title: 'Shared components own behavior',
            text: 'Focus handling, keyboard input, loading, and errors belong in reusable controls. Let the visual layer express the identity.',
          },
        ].map((item) => (
          <details key={item.title}>
            <summary>{item.title}</summary>
            <p>{item.text}</p>
          </details>
        ))}
      </section>
      <section id="architecture-showcase" className={styles.features}>
        <h2>From structure to expression.</h2>
        <p>
          Explore the concentric type above. A simple repeated rule becomes a distinctive visual
          identity.
        </p>
      </section>
      <section id="architecture-faq" className={styles.faq}>
        <h2>A few useful answers.</h2>
        {[
          [
            'Is this a working CMS?',
            'This is a frontend design study. The content and interactions run locally.',
          ],
          [
            'Can I reuse the visual components?',
            'The typography and concentric-ring components are isolated in this feature and can be adapted to another interface.',
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
