import React from 'react';
import { Link } from '@tanstack/react-router';
import styles from './AlethiaLanding.module.css';

export function AlethiaLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <div className={styles.logo}>Alethia Earth</div>
        <div className={styles.navLinks}>
          <a href="#">Mission</a>
          <a href="#">Technology</a>
          <a href="#">Impact</a>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>Ecological Intelligence</div>
          <h1 className={styles.headline}>
            Mapping the future<br/>of our planet.
          </h1>
          <p className={styles.subheadline}>
            Advanced geospatial modeling and AI to measure, understand, and restore natural ecosystems at global scale.
          </p>
        </section>

        <section className={styles.visualData}>
          <div className={styles.dataCard}>
            <div className={styles.dataMetric}>12B+</div>
            <div className={styles.dataLabel}>Data points analyzed daily</div>
          </div>
          <div className={styles.dataCard}>
            <div className={styles.dataMetric}>99.9%</div>
            <div className={styles.dataLabel}>Resolution accuracy</div>
          </div>
        </section>
      </main>

      <Link to="/" className={styles.backButton}>&larr; Back to Hub</Link>
    </div>
  );
}
