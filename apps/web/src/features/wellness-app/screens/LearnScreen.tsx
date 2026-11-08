import { DetailDialog } from '@/components/ui/DemoAction';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowUpRight, Search } from 'lucide-react';
import { useState } from 'react';
import styles from './LearnScreen.module.css';
const reads = [
  {
    title: 'Make room for a small ritual',
    category: 'Routine',
    text: 'Choose a small moment that belongs to you: opening a window, writing a sentence, or sitting quietly with a cup of tea. Make the ritual easy to return to. It doesn’t need to be impressive to be meaningful.',
  },
  {
    title: 'A page, just for you',
    category: 'Reflection',
    text: 'Start with one sentence about your day. Notice a moment you enjoyed, something that surprised you, or a question you want to come back to. There is no required length and no perfect way to begin.',
  },
  {
    title: 'The art of beginning again',
    category: 'Routine',
    text: 'A routine can have gaps. If a day passes, you can return when you’re ready. Choose one small action that feels possible today and let that be enough.',
  },
];
export function LearnScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const filtered = reads.filter(
    (r) =>
      (category === 'All' || r.category === category) &&
      r.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className={styles.container}>
      <span className={styles.eyebrow}>A LITTLE PERSPECTIVE</span>
      <h1>
        Something
        <br />
        to sit with.
      </h1>
      <label className={styles.search}>
        <Search size={15} />
        <span className="sr-only">Search reflections</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a little inspiration"
        />
      </label>
      <img
        src={getAssetUrl('/assets/wellness2.png')}
        alt="A quiet moment with a book"
        className={styles.image}
      />
      <div className={styles.filters}>
        {['All', 'Routine', 'Reflection'].map((c) => (
          <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>
      <div>
        {filtered.map((read) => (
          <article key={read.title}>
            <DetailDialog
              title={read.title}
              trigger={
                <>
                  <span>{read.category} / 1 min read</span>
                  <h2>
                    {read.title}
                    <ArrowUpRight size={17} />
                  </h2>
                </>
              }
            >
              <p>{read.text}</p>
            </DetailDialog>
          </article>
        ))}
        {filtered.length === 0 && <p role="status">No reflections match. Try another search.</p>}
      </div>
    </section>
  );
}
