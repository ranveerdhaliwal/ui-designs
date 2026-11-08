import { useRef } from 'react';
import styles from './SegmentedControl.module.css';
export function SegmentedControl<T extends string>({
  label,
  value,
  onChange,
  options,
  className = '',
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly { value: T; label: string }[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`${styles.group} ${className}`}
      role="group"
      aria-label={label}
      onKeyDown={(e) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault();
        const index = options.findIndex((o) => o.value === value);
        const next =
          e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? options.length - 1
              : (index + (e.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length;
        const option = options[next];
        if (option) {
          onChange(option.value);
          ref.current?.querySelectorAll('button')[next]?.focus();
        }
      }}
    >
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
