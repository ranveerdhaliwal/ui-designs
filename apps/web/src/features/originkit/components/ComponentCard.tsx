import React from 'react';
import styles from '../OriginKitLanding.module.css';

export function ComponentCard({ title, tag, children }: { title: string, tag: string, children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        <span className={styles.tag}>{tag}</span>
      </div>
      <div className={styles.preview}>
        {children}
      </div>
    </div>
  );
}
