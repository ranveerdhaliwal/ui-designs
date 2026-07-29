import React from 'react';
import styles from './Responsive.module.css';

export const MobileContainer: React.FC<{
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => {
  return (
    <div className={`${styles.mobileContainer} ${className}`} style={style}>
      {children}
    </div>
  );
};

export const BottomNav: React.FC<{
  items: Array<{ label: string; iconSvg: React.ReactNode; active?: boolean }>;
}> = ({ items }) => {
  return (
    <div className={styles.bottomNav}>
      {items.map((item, idx) => (
        <div key={idx} className={`${styles.navItem} ${item.active ? styles.active : ''}`}>
          {item.iconSvg}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
