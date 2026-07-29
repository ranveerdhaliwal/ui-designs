import React from 'react';
import styles from './Gradients.module.css';

interface MeshProps {
  className?: string | undefined;
  colors?: string[];
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const MeshGradient: React.FC<MeshProps> = ({ 
  className = '', 
  colors = ['#4F46E5', '#EC4899', '#8B5CF6'], 
  style,
  children 
}) => {
  return (
    <div className={`${styles.meshContainer} ${className}`} style={style}>
      {colors.map((color, idx) => (
        <div 
          key={idx} 
          className={styles.meshOrb}
          style={{
            backgroundColor: color,
            width: `${Math.random() * 40 + 60}%`,
            height: `${Math.random() * 40 + 60}%`,
            left: `${Math.random() * 50}%`,
            top: `${Math.random() * 50}%`,
            animationDelay: `${idx * 2}s`
          }}
        />
      ))}
      {children}
    </div>
  );
};

export const GrainyGradient: React.FC<{
  className?: string | undefined;
  gradient?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ className = '', gradient = 'linear-gradient(to right, #f87171, #fbbf24)', style, children }) => {
  return (
    <div className={`${styles.grainyContainer} ${className}`} style={{ background: gradient, ...style }}>
      <div className={styles.grainyNoise} />
      {children}
    </div>
  );
};

export const StaticSurge: React.FC<{ className?: string | undefined, style?: React.CSSProperties, children?: React.ReactNode }> = ({ className = '', style, children }) => {
  return (
    <div className={`${styles.staticSurge} ${className}`} style={style}>
      {children}
    </div>
  );
};
