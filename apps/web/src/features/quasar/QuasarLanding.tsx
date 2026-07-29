import React from 'react';
import { Link } from '@tanstack/react-router';
import { MeshGradient, StaticSurge } from '@/components/ui/Gradients';
import { GlassCard, GlassPill } from '@/components/ui/Glassmorphism';
import styles from './QuasarLanding.module.css';

export function QuasarLanding() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>&larr; Hub</Link>

      <section className={styles.hero}>
        <MeshGradient 
          className={styles.heroBg}
          colors={['#4F46E5', '#EC4899', '#8B5CF6', '#3B82F6', '#F43F5E']}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>QUASAR</h1>
          <p className={styles.subtitle}>
            A luminous collection of extreme gradients, glassmorphism, and static surge effects.
          </p>
          <GlassPill style={{ fontSize: '1.25rem', padding: '1rem 2.5rem' }}>
            Explore Core
          </GlassPill>
        </div>
      </section>

      <section className={styles.glassShowcase}>
        <GlassCard className={styles.card}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Luminous Glass</h3>
            <p className={styles.cardDesc}>Frosted transparency layered over animated mesh fields.</p>
          </div>
        </GlassCard>

        <GlassCard className={styles.card} style={{ border: 'none', background: 'transparent', boxShadow: 'none', overflow: 'hidden' }}>
          <StaticSurge className={styles.surgeCard} />
          <div className={styles.cardContent} style={{ background: 'rgba(0,0,0,0.6)', padding: '2rem', margin: '-2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h3 className={styles.cardTitle}>Static Surge</h3>
            <p className={styles.cardDesc}>High-contrast diagonal bursts mimicking digital interference.</p>
          </div>
        </GlassCard>

        <GlassCard className={styles.card} style={{ background: 'rgba(255,255,255,0.15)' }}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Prismatic</h3>
            <p className={styles.cardDesc}>Heavy light distortion and hyper-vibrant color matching.</p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
