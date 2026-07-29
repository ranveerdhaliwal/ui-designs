import React from 'react';
import { Link } from '@tanstack/react-router';
import styles from './ZapierLanding.module.css';

export function ZapierLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <div className={styles.navLeft}>
          <div className={styles.logo}>_zapier</div>
          <div className={styles.navLinks}>
            <a href="#">Product</a>
            <a href="#">Solutions</a>
            <a href="#">Resources</a>
            <a href="#">Pricing</a>
          </div>
        </div>
        <div className={styles.navActions}>
          <a href="#" className={styles.navLogin}>Contact Sales</a>
          <a href="#" className={styles.navLogin}>Log in</a>
          <button className={styles.btnPrimary}>Sign up free</button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.headline}>
            Automate your<br/>work today.
          </h1>
          <p className={styles.subheadline}>
            Zapier empowers you to automate your work across 5,000+ apps—so you can move forward, faster.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.btnPrimaryLg}>Start free with email</button>
            <button className={styles.btnSecondaryLg}>Start free with Google</button>
          </div>
        </section>

        <section className={styles.integrations}>
          <div className={styles.card}>
            <h3>Connect your apps</h3>
            <p>Sync data between the tools you use every day, automatically.</p>
          </div>
          <div className={styles.card}>
            <h3>Build custom logic</h3>
            <p>Create powerful workflows with branching paths and conditions.</p>
          </div>
        </section>
      </main>

      <Link to="/" className={styles.backButton}>&larr; Back to Hub</Link>
    </div>
  );
}
