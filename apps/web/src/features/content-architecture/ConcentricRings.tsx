import React, { useRef } from 'react';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import styles from './ConcentricRings.module.css';

const BASE_TEXT = "THE CONTENT ARCHITECTURE THE CONTENT ARCHITECTURE THE CONTENT ARCHITECTURE THE CONTENT ARCHITECTURE THE CONTENT ARCHITECTURE THE CONTENT ARCHITECTURE ";
const ASCII_CHARS = "!@#$%^&*<>[]{}|+_=-~:;";

export function ConcentricRings() {
  const textPathsRef = useRef<(SVGTextPathElement | null)[]>([]);
  const frameCountRef = useRef(0);
  
  // We want some rings to be more scrambled than others
  const scrambleIntensities = [0.05, 0.1, 0.2, 0.3, 0.5, 0.8, 0.4, 0.1];

  // Scramble animation loop using shared hook
  useAnimationFrame(() => {
    frameCountRef.current++;
    
    // Update text every few frames to control scramble speed
    if (frameCountRef.current % 4 === 0) {
      textPathsRef.current.forEach((path, i) => {
        if (!path) return;
        
        const intensity = scrambleIntensities[i % scrambleIntensities.length] || 0.1;
        const chars = BASE_TEXT.split('');
        
        const scrambled = chars.map(char => {
          if (char === ' ') return ' ';
          if (Math.random() < intensity) {
            return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
          }
          return char;
        }).join('');
        
        path.textContent = scrambled;
      });
    }
  });

  const rings = Array.from({ length: 8 }).map((_, i) => {
    const radius = 50 + (i * 80); // Increasing radius
    const circumference = 2 * Math.PI * radius;
    // Base text is 154 chars long.
    
    return (
      <g key={i} className={`${styles.ring} ${styles[`ring${i}`]}`}>
        <defs>
          <path
            id={`circlePath${i}`}
            d={`
              M 500, ${500 - radius}
              A ${radius},${radius} 0 1,1 499.9, ${500 - radius}
            `}
          />
        </defs>
        <text 
          className={styles.ringText} 
          style={{ 
            fontSize: `${12 + i * 2}px`, 
            letterSpacing: `${4 + i}px`,
            opacity: 0.3 + (i * 0.1)
          }}
        >
          <textPath 
            href={`#circlePath${i}`} 
            startOffset="0%"
            ref={(el) => { textPathsRef.current[i] = el; }}
          >
            {BASE_TEXT}
          </textPath>
        </text>
      </g>
    );
  });

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 1000 1000" className={styles.svg}>
        {rings}
      </svg>
    </div>
  );
}
