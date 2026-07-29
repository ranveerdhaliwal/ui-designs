import React from 'react';
import styles from './ProgressScreen.module.css';

export function ProgressScreen() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerTitle}>YOUR JOURNEY</span>
        <h1 className={styles.title}>Your progress</h1>
        <div className={styles.sparkleIcon}>&#10022;</div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Best Streak</span>
          <div className={styles.statValue}>
            7 <span className={styles.statUnit}>days</span>
          </div>
          <span className={styles.statSubtextRed}>&#128293; Personal best</span>
        </div>
        
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Saved</span>
          <div className={styles.statValue}>$982</div>
          <span className={styles.statSubtextGreen}>&#8593; +12% vs last wk</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Check-in Rate</span>
          <div className={styles.statValue}>75%</div>
          <span className={styles.statSubtext}>6/8 days kept</span>
        </div>
      </div>

      <div className={styles.milestoneFeatured}>
        <div className={styles.milestoneIconLarge}>&#127914;</div>
        <div className={styles.milestoneText}>
          <div className={styles.milestoneHeader}>
            <span className={styles.milestoneTag}>UNLOCKED</span>
            <span className={styles.milestoneDate}>Oct 24</span>
          </div>
          <h3>1 Week Milestone</h3>
          <p>"Your energy levels are starting to stabilize. The morning fog has beautifully lifted."</p>
        </div>
      </div>

      <div className={styles.milestonesSection}>
        <div className={styles.sectionHeader}>
          <h2>Milestones</h2>
          <span className={styles.earnedCount}>3 of 8 earned</span>
        </div>
        
        <div className={styles.milestoneGrid}>
          {['24 Hours', '3 Days', '1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year'].map((m, i) => (
            <div key={i} className={`${styles.milestoneItem} ${i < 3 ? styles.unlocked : styles.locked} ${i === 2 ? styles.active : ''}`}>
              <div className={styles.mIconWrapper}>
                {i < 3 ? '🎉' : '🔒'}
              </div>
              <span className={styles.mLabel}>{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
