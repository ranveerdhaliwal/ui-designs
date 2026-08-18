import React from 'react';
import styles from './Slider.module.css';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  formatValue?: (val: number) => string;
  onChange: (val: number) => void;
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
  ...props
}) => {
  return (
    <label className={`${styles.sliderContainer} ${className}`}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <output className={styles.value}>
          {formatValue ? formatValue(value) : value}
        </output>
      </div>
      <input
        type="range"
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        {...props}
      />
    </label>
  );
};
