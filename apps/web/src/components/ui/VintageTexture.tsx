import React from 'react';
import styles from './VintageTexture.module.css';

export const RisographImage: React.FC<{
  src: string;
  alt?: string;
  className?: string | undefined;
  style?: React.CSSProperties;
}> = ({ src, alt = '', className = '', style }) => {
  return (
    <div className={`${styles.risographContainer} ${className}`} style={style}>
      <img src={src} alt={alt} className={styles.risographImage} />
      <div className={styles.risographNoise} />
    </div>
  );
};

export const TornEdgeContainer: React.FC<{
  className?: string | undefined;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ className = '', style, children }) => {
  return (
    <div className={`${styles.tornEdgeContainer} ${className}`} style={style}>
      {children}
    </div>
  );
};
