import React, { useId } from 'react';
import styles from './Slider.module.css';

export interface SliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'className'
> {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number | undefined;
  formatValue?: ((val: number) => string) | undefined;
  onChange: (val: number) => void;
  className?: string | undefined;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  formatValue,
  onChange,
  className = '',
  id: providedId,
  ...props
}) => {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  return (
    <div className={`${styles.sliderContainer} ${className}`}>
      <div className={styles.header}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <output className={styles.value}>{formatValue ? formatValue(value) : value}</output>
      </div>
      <input
        id={id}
        type="range"
        aria-valuetext={formatValue?.(value)}
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        {...props}
      />
    </div>
  );
};
