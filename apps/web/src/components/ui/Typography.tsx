import React from 'react';
import styles from './Typography.module.css';

export const AgenticSerif: React.FC<{
  className?: string | undefined;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ className = '', style, children }) => {
  return (
    <h1 className={`${styles.agenticSerif} ${className}`} style={style}>
      {children}
    </h1>
  );
};

export const AgenticSans: React.FC<{
  className?: string | undefined;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ className = '', style, children }) => {
  return (
    <p className={`${styles.agenticSans} ${className}`} style={style}>
      {children}
    </p>
  );
};
