import React from 'react';
import styles from './BottomNav.module.css';
import { Tab } from '../WellnessApp';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className={styles.bottomNav}>
      <button 
        className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => onTabChange('home')}
      >
        <div className={styles.icon}>&#8962;</div>
        <span>Home</span>
      </button>
      
      <button 
        className={`${styles.navItem} ${activeTab === 'progress' ? styles.active : ''}`}
        onClick={() => onTabChange('progress')}
      >
        <div className={styles.icon}>&#128200;</div>
        <span>Progress</span>
      </button>
      
      <button 
        className={`${styles.navItem} ${activeTab === 'learn' ? styles.active : ''}`}
        onClick={() => onTabChange('learn')}
      >
        <div className={styles.icon}>&#128214;</div>
        <span>Learn</span>
      </button>
      
      <button 
        className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
        onClick={() => onTabChange('profile')}
      >
        <div className={styles.icon}>&#128100;</div>
        <span>Profile</span>
      </button>
    </nav>
  );
}
