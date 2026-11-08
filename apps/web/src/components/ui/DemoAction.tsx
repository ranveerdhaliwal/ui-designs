import { ArrowUpRight, Check } from 'lucide-react';
import { useId, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Dialog } from './Dialog';
import styles from './DemoAction.module.css';
export function DemoAction({
  children,
  title = 'Explore this concept',
  description = 'This is an interactive design study. You can try the form locally; no information is sent or stored.',
  onClick,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> & {
  title?: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const id = useId();
  return (
    <>
      <button
        type="button"
        {...props}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) {
            setDone(false);
            setOpen(true);
          }
        }}
      >
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen} title={title} description={description}>
        <div className={styles.content}>
          {done ? (
            <div className={styles.success} role="status">
              <Check size={20} />
              Preview complete. Nothing was submitted.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <label htmlFor={id}>Email address</label>
              <input
                id={id}
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
              <button type="submit">
                Try the experience <ArrowUpRight size={17} />
              </button>
            </form>
          )}
        </div>
      </Dialog>
    </>
  );
}
export function DetailDialog({
  trigger,
  title,
  children,
}: {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={styles.detailTrigger} onClick={() => setOpen(true)}>
        {trigger}
      </button>
      <Dialog open={open} onOpenChange={setOpen} title={title}>
        <div className={styles.content}>{children}</div>
      </Dialog>
    </>
  );
}
