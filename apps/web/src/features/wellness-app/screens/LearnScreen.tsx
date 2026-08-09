import React from 'react';
import { getAssetUrl } from '@/lib/assetUtils';
import styles from './LearnScreen.module.css';

export function LearnScreen() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Learn</h1>
        <button className={styles.bookmarkBtn}>&#128278;</button>
      </header>

      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>&#128269;</span>
        <input type="text" placeholder="Search reads and tips" className={styles.searchInput} />
      </div>

      <div className={styles.featuredCard}>
        <div className={styles.featuredTag}>Featured</div>
        <div className={styles.featuredImageWrapper}>
          <img src={getAssetUrl("/assets/wellness2.png")} alt="Person reading" className={styles.featuredImage} />
        </div>
        <div className={styles.featuredContent}>
          <div className={styles.startHereTag}>&#9679; START HERE</div>
          <h2 className={styles.featuredTitle}>The first two weeks: what to expect</h2>
          <p className={styles.featuredDesc}>Your body and mind are beginning a beautiful recalibration. Here is a gentle map of the early days, with kindness for every step...</p>
          
          <div className={styles.featuredFooter}>
            <span className={styles.readTime}>&#128336; 4 min read</span>
            <span className={styles.readLink}>Read Guide &gt;</span>
          </div>
        </div>
      </div>

      <div className={styles.categories}>
        <button className={`${styles.categoryChip} ${styles.activeChip}`}>All</button>
        <button className={styles.categoryChip}>Cravings</button>
        <button className={styles.categoryChip}>Sleep</button>
        <button className={styles.categoryChip}>Mindset</button>
      </div>

      <div className={styles.listSection}>
        <h3 className={styles.listTitle}>Daily Wisdom</h3>
        
        <div className={styles.listItem}>
          <div className={styles.listItemIcon}>&#127811;</div>
          <div className={styles.listItemContent}>
            <span className={styles.itemTag}>Cravings &middot; 3 min read</span>
            <h4>Ride the wave: the 20-minute rule</h4>
          </div>
        </div>
        
        <div className={styles.listItem}>
          <div className={styles.listItemIcon}>&#127769;</div>
          <div className={styles.listItemContent}>
            <span className={styles.itemTag}>Sleep &middot; 5 min read</span>
            <h4>Setting up a calming evening routine</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
