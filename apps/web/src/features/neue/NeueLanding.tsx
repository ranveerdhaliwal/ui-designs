import React from 'react';
import { Link } from '@tanstack/react-router';
import styles from './NeueLanding.module.css';

export function NeueLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <div className={styles.logo}>NEUE MONTREAL</div>
        <div className={styles.navRight}>
          <div>ABOUT</div>
          <div>WORK</div>
          <div>STUDIO</div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.headline}>
            WE DESIGN<br/>
            DIGITAL<br/>
            EXPERIENCES.
          </h1>
          <div className={styles.accentBlock}></div>
        </section>

        <section className={styles.grid}>
          <div className={`${styles.box} ${styles.boxRed}`}>
            <h2>01</h2>
            <p>Strategy & Branding</p>
          </div>
          <div className={`${styles.box} ${styles.boxBlue}`}>
            <h2>02</h2>
            <p>Product Design</p>
          </div>
          <div className={`${styles.box} ${styles.boxGreen}`}>
            <h2>03</h2>
            <p>Engineering</p>
          </div>
        </section>
      </main>

      <Link to="/" className={styles.backButton}>&larr; Back to Hub</Link>
    </div>
  );
}
