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

        <section className={styles.hero} style={{ marginTop: '8rem', marginBottom: '4rem', textAlign: 'left', alignItems: 'flex-start' }}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Deep Dive
          </div>
          <h2 className={styles.headline} style={{ fontSize: '3.5rem' }}>
            Built for scale.<br/>Designed for security.
          </h2>
          <p className={styles.subheadline}>
            Eragon integrates directly with your existing data warehouses, providing an intelligence layer that is entirely within your VPC. No data leaves your network.
          </p>
          <div className={styles.featureGrid} style={{ marginTop: '2rem' }}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>SOC2</div>
              <h3>Enterprise Compliance</h3>
              <p>Fully compliant with SOC2 Type II, HIPAA, and GDPR standards out of the box.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>VPC</div>
              <h3>Private Deployment</h3>
              <p>Deploy on AWS, GCP, or Azure within your own virtual private cloud.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating back button to home */}
      <Link to="/" className={styles.backButton}>&larr; Back to Hub</Link>
    </div>
  );
}
