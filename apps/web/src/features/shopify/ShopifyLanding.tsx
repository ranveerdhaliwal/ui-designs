import { SectionLink } from '@/components/ui/SectionLink';
import { DemoAction } from '@/components/ui/DemoAction';
import { getAssetUrl } from '@/lib/assetUtils';
import { useEffect, useRef, useState } from 'react';
import styles from './ShopifyLanding.module.css';

// A simple hook to detect if an element is in view
function useInView({ threshold = 0.1, rootMargin = '0px' } = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold, rootMargin },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isInView] as const;
}

export function ShopifyLanding() {
  const [query, setQuery] = useState('');
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [gridRef, gridInView] = useInView({ threshold: 0.1, rootMargin: '-50px' });

  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <div className={styles.navLeft}>
          <div className={styles.logo}>Shopify Editions</div>
          <span className={styles.editionTag}>Winter '26</span>
        </div>
        <div className={styles.navRight}>
          <label className={styles.search}>
            <span className="sr-only">Search editions</span>
            <input
              type="search"
              placeholder="Find an idea…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <DemoAction className={styles.btnPrimary} title="Explore commerce">
            Explore commerce
          </DemoAction>
        </div>
      </header>

      <main className={styles.main}>
        {/* Massive Hero Section */}
        <section hidden={!!query} className={styles.hero} ref={heroRef}>
          <img className={styles.heroArt} src={getAssetUrl('/assets/agentic.png')} alt="" />
          <div
            className={`${styles.heroSvgWrapper} ${heroInView ? styles.animateScaleUp : styles.invisible}`}
          >
            {/* Using SVG techniques to create perfectly scaled, massive typography */}
            <svg viewBox="0 0 1000 300" className={styles.heroSvg}>
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <text
                x="500"
                y="160"
                textAnchor="middle"
                className={styles.svgTitle}
                fill="url(#grad)"
              >
                THE
              </text>
              <text x="500" y="260" textAnchor="middle" className={styles.svgTitle} fill="#FFFFFF">
                RENAISSANCE
              </text>
            </svg>
          </div>

          <p
            className={`${styles.heroSubtext} ${heroInView ? styles.animateFadeUp : styles.invisible}`}
            style={{ animationDelay: '0.4s' }}
          >
            A new perspective on commerce. Explore ideas for a more connected way to sell.
          </p>
          <SectionLink target="commerce-ideas" className={styles.explore}>
            Explore the ideas ↓
          </SectionLink>
        </section>

        {/* Bento Grid */}
        <section id="commerce-ideas" className={styles.gridContainer} ref={gridRef}>
          {query && (
            <p className={styles.searchResult} role="status">
              {['Agentic AI', 'Sidekick', 'Retail']
                .filter((t) => t.toLowerCase().includes(query.toLowerCase()))
                .join(' · ') || 'No matching ideas. Try AI, Sidekick, or Retail.'}
            </p>
          )}
          <div className={styles.bentoGrid}>
            {/* Feature 1: Agentic (uses real generated 3D image) */}
            <div
              hidden={!!query && !'Agentic AI'.toLowerCase().includes(query.toLowerCase())}
              className={`${styles.card} ${styles.cardLarge} ${gridInView ? styles.animateFadeUp : styles.invisible}`}
              style={{ animationDelay: '0.1s' }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3>Agentic AI</h3>
                  <span className={styles.badge}>New</span>
                </div>
                <p>Autonomous systems that do the work for you.</p>
              </div>
              <div className={styles.cardVisual}>
                <img
                  src={getAssetUrl('/assets/agentic.png')}
                  alt="Agentic AI Core"
                  className={styles.cardImage}
                />
              </div>
            </div>

            {/* Feature 2: Sidekick */}
            <div
              hidden={!!query && !'Sidekick'.toLowerCase().includes(query.toLowerCase())}
              className={`${styles.card} ${styles.sidekickCard} ${gridInView ? styles.animateFadeUp : styles.invisible}`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className={styles.cardImageBgWrapper}>
                <img
                  src={getAssetUrl('/assets/sidekick.png')}
                  alt="Sidekick Interface"
                  className={styles.cardImageBg}
                />
              </div>
              <div className={`${styles.cardContent} ${styles.overlayContent}`}>
                <h3>Sidekick</h3>
                <p>Your AI commerce assistant, now deeply integrated.</p>
              </div>
            </div>

            {/* Feature 3: Retail */}
            <div
              hidden={!!query && !'Retail'.toLowerCase().includes(query.toLowerCase())}
              className={`${styles.card} ${gridInView ? styles.animateFadeUp : styles.invisible}`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className={styles.cardImageBgWrapper}>
                <img
                  src={getAssetUrl('/assets/retail.png')}
                  alt="Retail Blocks"
                  className={styles.cardImageBg}
                />
              </div>
              <div className={`${styles.cardContent} ${styles.overlayContent}`}>
                <h3>Retail</h3>
                <p>Bring the digital and physical together.</p>
              </div>
            </div>

            {/* Feature 4: High Contrast Section */}
            <div
              hidden={!!query}
              className={`${styles.card} ${styles.cardFull} ${gridInView ? styles.animateFadeUp : styles.invisible}`}
              style={{ animationDelay: '0.4s' }}
            >
              <div className={styles.lightSection}>
                <h2>An open world of possibilities.</h2>
                <DemoAction className={styles.btnInverted} title="A new perspective on commerce">
                  Explore the concept
                </DemoAction>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
