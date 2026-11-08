import { DemoAction } from '@/components/ui/DemoAction';
import { SectionLink } from '@/components/ui/SectionLink';
import { Workflow } from '@/components/ui/Workflow';
import { ArrowUpRight, MoveRight, Zap } from 'lucide-react';
import styles from './ZapierLanding.module.css';
export function ZapierLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <span className={styles.logo}>_zapier</span>
        <nav>
          <SectionLink target="zap-workflow">Build a workflow</SectionLink>
          <SectionLink target="zap-possibilities">Possibilities</SectionLink>
        </nav>
        <DemoAction className={styles.navButton} title="Make room for better work">
          Try it out <ArrowUpRight size={14} />
        </DemoAction>
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.kicker}>Let the busywork do itself.</p>
            <h1>
              Less doing.
              <br />
              More <span>done.</span>
            </h1>
            <p>
              Connect the little things.
              <br />
              Make room for the big ones.
            </p>
            <SectionLink target="zap-workflow" className={styles.cta}>
              Make your first connection <MoveRight size={18} />
            </SectionLink>
            <div className={styles.note}>
              <Zap size={14} /> A hands-on automation playground
            </div>
          </div>
          <div id="zap-workflow" className={styles.visual}>
            <div className={styles.visualLabel}>From an idea to a working flow.</div>
            <Workflow />
          </div>
        </section>
        <section id="zap-possibilities" className={styles.possibilities}>
          <h2>
            Good things happen
            <br />
            when your tools talk.
          </h2>
          <div>
            <article>
              <span>Capture</span>
              <h3>Every idea has a beginning.</h3>
              <p>
                A new enquiry, a form submission, a fresh subscriber. Start with the moment that
                matters.
              </p>
            </article>
            <article>
              <span>Connect</span>
              <h3>Put the pieces together.</h3>
              <p>Give your workflow context, then guide it toward a useful next action.</p>
            </article>
            <article>
              <span>Create</span>
              <h3>Make the next step happen.</h3>
              <p>Turn your everyday process into a repeatable flow you can see and understand.</p>
            </article>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        _zapier <span>An independent interface study.</span>
      </footer>
    </div>
  );
}
