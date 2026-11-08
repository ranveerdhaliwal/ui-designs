import styles from '@/components/gallery/Gallery.module.css';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import { categories, demos, filterDemos, type Category } from '@/data/demos';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { useState } from 'react';
export function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [intent, setIntent] = useState('All experiences');
  const matchesIntent = (id: string) =>
    intent === 'All experiences' ||
    (intent === 'Make something'
      ? ['botlab', 'image-studio', 'kyc', 'wet-paint-flow', 'effects-lab'].includes(id)
      : intent === 'Get organized'
        ? [
            'operations',
            'eragon',
            'responsive-showcase',
            'wellness-app',
            'zapier',
            'conversion',
          ].includes(id)
        : ![
            'botlab',
            'image-studio',
            'kyc',
            'wet-paint-flow',
            'effects-lab',
            'operations',
            'eragon',
            'responsive-showcase',
            'wellness-app',
            'zapier',
            'conversion',
          ].includes(id));
  const filtered = filterDemos(query, category).filter((d) => matchesIntent(d.id));
  const isFiltered = query.trim() !== '' || category !== 'All' || intent !== 'All experiences';
  return (
    <div className={styles.gallery}>
      <header className={styles.topbar}>
        <a href="#/" className={styles.wordmark}>
          browser<span>designs</span>
          <span className={styles.mark}>↗</span>
        </a>
        <span className={styles.topnote}>An independent interface collection</span>
        <a
          href="#collection"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('collection')?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
            });
          }}
        >
          Explore the collection <ArrowUpRight size={15} />
        </a>
      </header>
      <main className={styles.main}>
        <section className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Interfaces worth exploring</p>
            <h1>
              A little less ordinary.
              <br />
              <span>A lot more possibility.</span>
            </h1>
          </div>
          <p className={styles.introNote}>
            A growing collection of expressive websites, useful tools, and playful interactions.
            <br />
            <span>Open a study. Try something new.</span>
          </p>
        </section>
        {!isFiltered && (
          <section aria-label="Selected studies" className={styles.featured}>
            {demos
              .filter((d) => ['botlab', 'alethia', 'image-studio'].includes(d.id))
              .map((demo) => (
                <GalleryCard key={demo.id} demo={demo} priority />
              ))}
          </section>
        )}
        <section id="collection" className={styles.collection}>
          <div className={styles.collectionHeading}>
            <h2>
              The collection <span>{demos.length}</span>
            </h2>
            <label className={styles.search}>
              <Search size={17} />
              <span className="sr-only">Search designs</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find your next idea"
                type="search"
              />
              {query && (
                <button aria-label="Clear search" onClick={() => setQuery('')}>
                  <X size={15} />
                </button>
              )}
            </label>
          </div>
          <label className={styles.intent}>
            What would you like to do?
            <select value={intent} onChange={(e) => setIntent(e.target.value)}>
              {['All experiences', 'Make something', 'Get organized', 'Explore a world'].map(
                (value) => (
                  <option key={value}>{value}</option>
                ),
              )}
            </select>
          </label>
          <div className={styles.filters} role="group" aria-label="Filter by category">
            {categories.map((item) => (
              <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
                {item}
                <span>
                  {item === 'All' ? demos.length : demos.filter((d) => d.category === item).length}
                </span>
              </button>
            ))}
          </div>
          <p className="sr-only" role="status">
            {filtered.length} designs
          </p>
          <div className={styles.grid}>
            {filtered.map((demo) => (
              <GalleryCard key={demo.id} demo={demo} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className={styles.empty}>
              <h3>No designs found.</h3>
              <p>Try another word or explore the full collection.</p>
              <button
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                  setIntent('All experiences');
                }}
              >
                Show all designs
              </button>
            </div>
          )}
        </section>
      </main>
      <footer className={styles.footer}>
        <span>Browser Designs</span>
        <p>Made to explore. Built to interact.</p>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
            })
          }
        >
          Back to top ↑
        </button>
      </footer>
    </div>
  );
}
