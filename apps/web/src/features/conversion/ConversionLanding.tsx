import React from 'react';
import { Link } from '@tanstack/react-router';
import { GrainyGradient } from '@/components/ui/Gradients';
import { AgenticSerif } from '@/components/ui/Typography';
import styles from './ConversionLanding.module.css';

export function ConversionLanding() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>&larr; Back to Hub</Link>

      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Conversion
        </div>
      </header>

      <section className={styles.hero}>
        <AgenticSerif className={styles.title}>
          The agentic marketing<br/>automation platform.
        </AgenticSerif>

        <div className={styles.orbsContainer}>
          <GrainyGradient className={styles.orb} gradient="linear-gradient(135deg, #FF6B6B, #FCA5A5)" />
          <GrainyGradient className={styles.orb} gradient="linear-gradient(135deg, #3B82F6, #93C5FD)" />
          <GrainyGradient className={styles.orb} gradient="linear-gradient(135deg, #10B981, #A7F3D0)" />
          <GrainyGradient className={styles.orb} gradient="linear-gradient(135deg, #F59E0B, #FDE68A)" />
          <GrainyGradient className={styles.orb} gradient="linear-gradient(135deg, #8B5CF6, #D8B4FE)" />
        </div>
      </section>

      <section className={styles.workflowSection}>
        <GrainyGradient className={styles.workflowCardWrapper} gradient="linear-gradient(to bottom right, #60A5FA, #E0F2FE)">
          <div className={styles.workflowCard}>
            <div className={styles.workflowHeader}>
              <span>Inbound Lead Orchestration</span>
              <span className={styles.workflowBadge}>Active</span>
            </div>
            <div className={styles.workflowStep}>
              <p className={styles.stepTitle}>Form submitted</p>
              <p className={styles.stepDesc}>Source: Demo Request</p>
            </div>
            <div className={styles.workflowStep}>
              <p className={styles.stepTitle}>Enrich from warehouse</p>
              <p className={styles.stepDesc}>Query: Snowflake</p>
            </div>
          </div>
        </GrainyGradient>

        <GrainyGradient className={styles.workflowCardWrapper} gradient="linear-gradient(to bottom right, #F43F5E, #FDE047, #3B82F6)">
          <div className={styles.workflowCard}>
            <div className={styles.workflowHeader}>
              <span>Brand Guidelines</span>
            </div>
            <div className={styles.workflowStep}>
              <p className={styles.stepTitle}>Fonts</p>
              <p className={styles.stepDesc}>Inter - 14px</p>
            </div>
            <div className={styles.workflowStep}>
              <p className={styles.stepTitle}>Primary Color</p>
              <p className={styles.stepDesc}>#FFC400</p>
            </div>
          </div>
        </GrainyGradient>
      </section>

      <div className={styles.steppedFooter}>
        <GrainyGradient className={styles.footerStep} style={{ width: '60%' }} gradient="linear-gradient(to right, #3B82F6, #93C5FD)" />
        <GrainyGradient className={styles.footerStep} style={{ width: '70%' }} gradient="linear-gradient(to right, #10B981, #A7F3D0)" />
        <GrainyGradient className={styles.footerStep} style={{ width: '80%' }} gradient="linear-gradient(to right, #F59E0B, #FDE68A)" />
        <GrainyGradient className={styles.footerStep} style={{ width: '90%' }} gradient="linear-gradient(to right, #F43F5E, #FDA4AF)" />
        <GrainyGradient className={styles.footerStep} style={{ width: '100%' }} gradient="linear-gradient(to right, #8B5CF6, #D8B4FE)" />
      </div>
    </div>
  );
}
