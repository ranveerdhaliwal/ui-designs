import { useState, useEffect, useRef, type RefObject } from 'react';

interface MousePosition {
  /** Absolute pixel X relative to container (or viewport) */
  x: number;
  /** Absolute pixel Y relative to container (or viewport) */
  y: number;
  /** Normalized X: 0 = left edge, 1 = right edge */
  nx: number;
  /** Normalized Y: 0 = top edge, 1 = bottom edge */
  ny: number;
}

/**
 * Tracks mouse position relative to a container element (or the whole viewport).
 * Returns both absolute pixel coords and normalized 0→1 values.
 *
 * @param containerRef - Optional ref to scope tracking to a specific element
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { nx, ny } = useMousePosition(ref);
 * // nx/ny are 0→1 within the div
 * ```
 */
export function useMousePosition(containerRef?: RefObject<HTMLElement | null>): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0.5, ny: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPos({
          x,
          y,
          nx: rect.width ? x / rect.width : 0.5,
          ny: rect.height ? y / rect.height : 0.5,
        });
      } else {
        setPos({
          x: e.clientX,
          y: e.clientY,
          nx: window.innerWidth ? e.clientX / window.innerWidth : 0.5,
          ny: window.innerHeight ? e.clientY / window.innerHeight : 0.5,
        });
      }
    };

    const target = containerRef?.current ?? window;
    target.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => target.removeEventListener('mousemove', handleMouseMove as EventListener);
  }, [containerRef]);

  return pos;
}
