import React from 'react';
import styles from './Accordion.module.css';

export interface AccordionProps {
  title: string;
  defaultOpen?: boolean | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  defaultOpen = true,
  children,
  className = ''
}) => {
  return (
    <details className={`${styles.accordion} ${className}`} open={defaultOpen}>
      <summary className={styles.summary}>
        {title}
        <span className={styles.icon}>▼</span>
      </summary>
      <div className={styles.content}>
        {children}
      </div>
    </details>
  );
};
