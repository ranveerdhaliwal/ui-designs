import React from 'react';
import { getAssetUrl } from '@/lib/assetUtils';
import styles from './HomeScreen.module.css';

export function HomeScreen() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn}>&#8592;</button>
        <span className={styles.headerTitle}>YOUR RESET</span>
        <div style={{ width: 24 }}></div> {/* Spacer */}
      </header>

      <div className={styles.heroImageWrapper}>
        <img src={getAssetUrl("/assets/wellness1.png")} alt="Zen stones by water" className={styles.heroImage} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Let's mark your day one.</h1>
        <p className={styles.subtitle}>This is the start of something kind to yourself.</p>

        <div className={styles.dateSelector}>
          <div className={styles.dateHeader}>
            <span>CHOOSE START DATE</span>
            <button className={styles.setTodayBtn}>&#10022; Set to Today</button>
          </div>
          
          <div className={styles.dateOptions}>
            <div className={styles.dateCard}>
              <span className={styles.dayLabel}>YESTERDAY</span>
              <span className={styles.dateLabel}>May 28</span>
            </div>
            <div className={`${styles.dateCard} ${styles.activeDate}`}>
              <span className={styles.dayLabel}>TODAY</span>
              <span className={styles.dateLabel}>May 29</span>
            </div>
            <div className={styles.dateCard}>
              <span className={styles.dayLabel}>TOMORROW</span>
              <span className={styles.dateLabel}>May 30</span>
            </div>
          </div>

          <button className={styles.customDateBtn}>
            <span className={styles.calendarIcon}>&#128197;</span> Pick a custom date...
            <span className={styles.chevron}>&gt;</span>
          </button>
        </div>

        <button className={styles.primaryBtn}>
          I'm starting today &#8594;
        </button>
        <p className={styles.privacyNote}>&#128274; Everything stays private on your device.</p>
      </div>
    </div>
  );
}
