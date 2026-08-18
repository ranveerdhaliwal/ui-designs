import React from 'react';
import styles from './Panel.module.css';

export interface PanelProps {
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  side = 'left',
  className = '',
  style
}) => {
  return (
    <aside className={`${styles.panel} ${side === 'right' ? styles.right : ''} ${className}`} style={style}>
      {children}
    </aside>
  );
};
