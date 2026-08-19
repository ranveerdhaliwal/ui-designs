import React from 'react';
import styles from './Panel.module.css';

export interface PanelProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
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
