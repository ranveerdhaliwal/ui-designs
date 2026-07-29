import React from 'react';
import { Link } from '@tanstack/react-router';
import styles from './EragonLanding.module.css';

export function EragonLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <div className={styles.logo}>ERAGON</div>
        <div className={styles.navLinks}>
          <a href="#">Platform</a>
          <a href="#">Use Cases</a>
          <a href="#">Company</a>
          <a href="#">Pricing</a>
        </div>
        <div className={styles.navActions}>
          <a href="#" className={styles.navLogin}>Login</a>
          <button className={styles.btnPrimary}>Get Started</button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Eragon AI Operating System Version 1.0 is Live
          </div>
          <h1 className={styles.headline}>
            AI Operating System<br/>For Your Company.
          </h1>
          <p className={styles.subheadline}>
            Eragon is a centralized AI workspace that powers org-wide business intelligence, persistent memory, and intelligent model routing.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.btnPrimaryLg}>Start Building</button>
            <button className={styles.btnSecondaryLg}>Request Demo</button>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✦</div>
              <h3>Persistent Memory</h3>
              <p>Models that remember your enterprise context natively.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✧</div>
              <h3>Model Routing</h3>
              <p>Intelligently dispatch tasks to the optimal LLM.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✺</div>
              <h3>Forward-Deployed</h3>
              <p>Customized solutions engineered for your security constraints.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating back button to home */}
      <Link to="/" className={styles.backButton}>&larr; Back to Hub</Link>
    </div>
  );
}
