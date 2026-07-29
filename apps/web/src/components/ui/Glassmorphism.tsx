import React from 'react';
import styles from './Glassmorphism.module.css';

export const GlassCard: React.FC<{
  className?: string | undefined;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ className = '', style, children }) => {
  return (
    <div className={`${styles.glassCard} ${className}`} style={style}>
      {children}
    </div>
  );
};

export const GlassPill: React.FC<{
  className?: string | undefined;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}> = ({ className = '', style, children, onClick }) => {
  return (
    <button className={`${styles.glassPill} ${className}`} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
