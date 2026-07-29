import { useState, useEffect, type RefObject } from 'react';

/**
 * Tracks scroll progress as a 0→1 value.
 * 
 * If a containerRef is provided, tracks progress within that scrollable element.
 * Otherwise, tracks the entire page scroll progress.
 *
 * Uses requestAnimationFrame throttling for smooth performance.
 * 
 * @example
 * ```tsx
 * // Full page scroll progress
 * const progress = useScrollProgress();
 * 
 * // Container-scoped scroll progress
 * const ref = useRef<HTMLDivElement>(null);
 * const progress = useScrollProgress(ref);
 * ```
 */
export function useScrollProgress(containerRef?: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (containerRef?.current) {
        const el = containerRef.current;
        const maxScroll = el.scrollHeight - el.clientHeight;
        setProgress(maxScroll > 0 ? el.scrollTop / maxScroll : 0);
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    const target = containerRef?.current ?? window;
    target.addEventListener('scroll', onScroll, { passive: true });
    
    // Get initial value
    updateProgress();

    return () => target.removeEventListener('scroll', onScroll);
  }, [containerRef]);

  return progress;
}
