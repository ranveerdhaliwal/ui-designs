import { DemoAction } from '@/components/ui/DemoAction';
import { SectionLink } from '@/components/ui/SectionLink';
import {
  ArrowRight,
  ArrowUpRight,
  Command,
  FileText,
  Layers,
  Network,
  Search,
  Shield,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import styles from './EragonLanding.module.css';
const answers = [
  {
    title: 'Product strategy',
    text: 'Bring customer feedback, product decisions, and research into one searchable space.',
    items: ['Customer interviews', 'Product roadmap', 'Research archive'],
  },
  {
    title: 'Team knowledge',
    text: 'Keep the context behind a decision close to the people who need it.',
    items: ['Team handbook', 'Engineering notes', 'Meeting summaries'],
  },
  {
    title: 'Connected work',
    text: 'Start with a question. Find the source. Take the next step with the full picture.',
    items: ['Source documents', 'Connected projects', 'Shared decisions'],
  },
];
export function EragonLanding() {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState('');
  const current = answers[active]!;
  const [document, setDocument] = useState<string | null>(null);
  const search = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        search.current?.focus();
        search.current?.scrollIntoView({ block: 'center' });
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <a href="#/eragon" className={styles.logo}>
          <Layers size={23} /> eragon
        </a>
        <nav>
          <SectionLink target="eragon-workspace">Workspace</SectionLink>
          <SectionLink target="eragon-principles">Approach</SectionLink>
        </nav>
        <DemoAction className={styles.smallButton} title="Meet your next workspace">
          Get started <ArrowUpRight size={14} />
        </DemoAction>
      </header>
      <main>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Clarity for the work ahead</p>
          <h1>
            Your company’s knowledge.
            <br />
            <em>Finally, connected.</em>
          </h1>
          <p className={styles.lead}>
            A considered workspace for the questions, context, and decisions that move your team
            forward.
          </p>
          <SectionLink target="eragon-workspace" className={styles.primary}>
            Explore the workspace <ArrowRight size={16} />
          </SectionLink>
        </section>
        <section id="eragon-workspace" className={styles.workspace}>
          <aside>
            <div className={styles.workspaceBrand}>
              <Command size={19} /> Your workspace
            </div>
            {answers.map((a, i) => (
              <button
                key={a.title}
                aria-pressed={active === i}
                onClick={() => {
                  setActive(i);
                  setQuery('');
                }}
              >
                <FileText size={15} />
                {a.title}
              </button>
            ))}
            <p>EXAMPLE WORKSPACE</p>
          </aside>
          <div className={styles.workspaceMain}>
            <div className={styles.workspaceTop}>
              <span>Knowledge / {current.title}</span>
              <span>Personal space</span>
            </div>
            <h2>
              A little context.
              <br />A clearer next step.
            </h2>
            <label className={styles.search}>
              <Search size={17} />
              <input
                ref={search}
                aria-label="Search workspace documents"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a document in this space…"
              />
              <span>⌘ K</span>
            </label>
            <div className={styles.documents}>
              {current.items
                .filter((t) => t.toLowerCase().includes(query.toLowerCase()))
                .map((t) => (
                  <article key={t}>
                    <FileText size={19} />
                    <h3>
                      <button className={styles.documentLink} onClick={() => setDocument(t)}>
                        {t}
                        <ArrowUpRight size={14} />
                      </button>
                    </h3>
                    <p>{current.text}</p>
                  </article>
                ))}
              {!current.items.some((t) => t.toLowerCase().includes(query.toLowerCase())) && (
                <p>No documents match “{query}”.</p>
              )}
            </div>
          </div>
        </section>
        <section id="eragon-principles" className={styles.principles}>
          {[
            [
              Network,
              'Context that connects',
              'A shared foundation for documents, projects, and the decisions between them.',
            ],
            [
              Search,
              'Answers with a source',
              'Keep the original context visible, so every answer can be understood.',
            ],
            [
              Shield,
              'A space of your own',
              'Thoughtful boundaries between personal work and shared team knowledge.',
            ],
          ].map(([Icon, t, d]) => {
            const Glyph = Icon as typeof Network;
            return (
              <article key={t as string}>
                <Glyph size={24} />
                <h3>{t as string}</h3>
                <p>{d as string}</p>
              </article>
            );
          })}
        </section>
      </main>
      <Dialog
        open={document !== null}
        onOpenChange={(open) => {
          if (!open) setDocument(null);
        }}
        title={document ?? 'Document'}
        description={`${current.title} / Example source document`}
      >
        <article className={styles.documentBody}>
          <p className={styles.eyebrow}>WORKING NOTES · OCTOBER 2026</p>
          <h3>What we know</h3>
          <p>{current.text}</p>
          <p>
            {active === 0
              ? 'Interviews with the sample team point to a recurring need: fewer handoffs and clearer ownership. The next iteration focuses on getting from an initial question to a documented decision.'
              : active === 1
                ? 'Every decision should have an owner, the context that informed it, and a date to revisit it. Keep the source material linked from the working note.'
                : 'A useful connection preserves context. Start with the original document, identify the project it informs, and record the decision that follows.'}
          </p>
          <h3>Next steps</h3>
          <ul>
            <li>Review the original context with the project owner.</li>
            <li>Document assumptions separately from confirmed findings.</li>
            <li>Agree on a small next step and a review date.</li>
          </ul>
          <p>Related in this space</p>
          {current.items
            .filter((t) => t !== document)
            .map((t) => (
              <button key={t} onClick={() => setDocument(t)}>
                {t}
                <ArrowRight size={14} />
              </button>
            ))}
          <small>Authored sample content for this interface study.</small>
        </article>
      </Dialog>
      <footer className={styles.footer}>
        eragon <span>Knowledge, with perspective.</span>
      </footer>
    </div>
  );
}
