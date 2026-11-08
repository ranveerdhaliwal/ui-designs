import { useEffect, useId, useRef, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './Dialog.module.css';
export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string | undefined;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  wide?: boolean;
}
/** The browser owns focus containment and inert background semantics. */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className = '',
  style,
  wide = false,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const change = useRef(onOpenChange);
  change.current = onOpenChange;
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);
  return createPortal(
    <dialog
      ref={ref}
      aria-labelledby={id}
      aria-describedby={description ? `${id}-description` : undefined}
      className={`${styles.dialog} ${wide ? styles.wide : ''} ${className}`}
      style={style}
      onCancel={(e) => {
        e.preventDefault();
        change.current(false);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            change.current(false);
        }
      }}
    >
      <header className={styles.header}>
        <div>
          <h2 id={id}>{title}</h2>
          {description && <p id={`${id}-description`}>{description}</p>}
        </div>
        <button
          type="button"
          aria-label="Close dialog"
          className={styles.close}
          onClick={() => change.current(false)}
        >
          <X size={19} />
        </button>
      </header>
      <div className={styles.body}>{open ? children : null}</div>
    </dialog>,
    document.body,
  );
}
