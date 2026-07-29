import React from 'react';
import { Link } from '@tanstack/react-router';
import { AgenticSerif, AgenticSans } from '@/components/ui/Typography';
import { RisographImage, TornEdgeContainer } from '@/components/ui/VintageTexture';
import styles from './AeternaLanding.module.css';

export function AeternaLanding() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <AgenticSerif className={styles.logo}>
            <span className={styles.logoIcon}>II</span> AETERNA
          </AgenticSerif>
        </Link>
        
        <AgenticSans className={styles.navLinks}>
          <span style={{cursor: 'pointer'}}>Home</span>
          <span style={{cursor: 'pointer'}}>About</span>
          <span style={{cursor: 'pointer'}}>Collections</span>
          <span style={{cursor: 'pointer'}}>Journal</span>
          <span style={{cursor: 'pointer'}}>Contact</span>
        </AgenticSans>

        <AgenticSans className={styles.cart}>
          Cart (0)
        </AgenticSans>
      </nav>

      <main className={styles.hero}>
        <div className={styles.textContent}>
          <AgenticSans className={styles.kicker}>
            Timeless Heritage, Modern Perspective
          </AgenticSans>
          
          <AgenticSerif className={styles.title}>
            Where History<br/>Inspires Tomorrow
          </AgenticSerif>
          
          <AgenticSans className={styles.description}>
            Exploring the legacy of art, culture, and civilization — reimagined for the contemporary world.
          </AgenticSans>
          
          <button className={styles.button}>
            Explore Collections <span>&rarr;</span>
          </button>
        </div>

        <div className={styles.imageContent}>
          <TornEdgeContainer className={styles.heroImageWrapper}>
            <RisographImage src="/assets/aeterna_hero.png" alt="Classical figures building a giant lightbulb" />
          </TornEdgeContainer>
        </div>
      </main>
    </div>
  );
}
