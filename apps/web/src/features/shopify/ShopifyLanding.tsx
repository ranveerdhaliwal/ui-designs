import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './ShopifyLanding.module.css';

// A simple hook to detect if an element is in view
function useInView(options = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Only animate once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView] as const;
}

export function ShopifyLanding() {
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [gridRef, gridInView] = useInView({ threshold: 0.1, rootMargin: "-50px" });

  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <div className={styles.navLeft}>
          <div className={styles.logo}>Shopify Editions</div>
          <span className={styles.editionTag}>Winter '26</span>
        </div>
        <div className={styles.navRight}>
          <button className={styles.btnSecondary}>Search</button>
          <a href="#" className={styles.btnPrimary}>Start for free</a>
        </div>
      </header>

      <main className={styles.main}>
        {/* Massive Hero Section */}
        <section className={styles.hero} ref={heroRef}>
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
              <text x="500" y="160" textAnchor="middle" className={styles.svgTitle} fill="url(#grad)">
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
            The commerce renaissance is here. Explore 150+ product updates across AI, retail, and more.
          </p>
        </section>

        {/* Bento Grid */}
        <section className={styles.gridContainer} ref={gridRef}>
          <div className={styles.bentoGrid}>
            {/* Feature 1: Agentic (uses real generated 3D image) */}
            <div 
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
                <img src="/assets/agentic.png" alt="Agentic AI Core" className={styles.cardImage} />
              </div>
            </div>

            {/* Feature 2: Sidekick */}
            <div 
              className={`${styles.card} ${gridInView ? styles.animateFadeUp : styles.invisible}`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className={styles.cardImageBgWrapper}>
                <img src="/assets/sidekick.png" alt="Sidekick Interface" className={styles.cardImageBg} />
              </div>
              <div className={`${styles.cardContent} ${styles.overlayContent}`}>
                <h3>Sidekick</h3>
                <p>Your AI commerce assistant, now deeply integrated.</p>
              </div>
            </div>

            {/* Feature 3: Retail */}
            <div 
              className={`${styles.card} ${gridInView ? styles.animateFadeUp : styles.invisible}`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className={styles.cardImageBgWrapper}>
                <img src="/assets/retail.png" alt="Retail Blocks" className={styles.cardImageBg} />
              </div>
              <div className={`${styles.cardContent} ${styles.overlayContent}`}>
                <h3>Retail</h3>
                <p>The best unified commerce platform on the planet.</p>
              </div>
            </div>

            {/* Feature 4: High Contrast Section */}
            <div 
              className={`${styles.card} ${styles.cardFull} ${gridInView ? styles.animateFadeUp : styles.invisible}`}
              style={{ animationDelay: '0.4s' }}
            >
              <div className={styles.lightSection}>
                <h2>150+ Updates. One platform.</h2>
                <button className={styles.btnInverted}>Explore all features</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Link to="/" className={styles.backButton}>&larr; Back to Hub</Link>
    </div>
  );
}
