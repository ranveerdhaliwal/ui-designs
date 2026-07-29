import React from 'react';
import styles from './ContentArchitectureLanding.module.css';
import { ConcentricRings } from './ConcentricRings';
import { TypewriterFooter } from './TypewriterFooter';

export function ContentArchitectureLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.pillNav}>
          <div className={styles.navLogo}>&#9638;</div>
          <nav className={styles.navLinks}>
            <a href="#features">FEATURES</a>
            <a href="#repo">THE REPO</a>
            <a href="#showcase">SHOWCASE</a>
            <a href="#pricing">PRICING</a>
            <a href="#faq">FAQ</a>
            <a href="#blog">BLOG</a>
          </nav>
        </div>
      </header>

      <div className={styles.splitLayout}>
        <div className={styles.leftPane}>
          <div className={styles.leftContent}>
            <p className={styles.kicker}>BUILT FOR AGENTIC DEVELOPMENT.</p>
            <h1 className={styles.title}>The Sanity setup<br/>agents don't reinvent.</h1>
            <p className={styles.description}>
              Every run invents a new one, none decided. This Next.js and Sanity kit commits six years of decisions. Your agent builds inside them, and checks its work through MCP and a real Chrome.
            </p>
            <p className={styles.subtext}>FOR ENGINEERS WHO WORK IN NEXT.JS AND SANITY.</p>
            
            <div className={styles.actions}>
              <button className={styles.btnPrimary}>GET</button>
              <button className={styles.btnSecondary}>ACCESS</button>
            </div>
          </div>
          <div className={styles.typewriterWrapper}>
            <TypewriterFooter />
          </div>
        </div>
        
        <div className={styles.rightPane}>
          <div className={styles.ringWrapper}>
             <ConcentricRings />
          </div>
          <div className={styles.learnMore}>
            LEARN MORE<br/>&#8595;
          </div>
        </div>
      </div>
    </div>
  );
}
