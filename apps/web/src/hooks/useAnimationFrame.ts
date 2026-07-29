import { useRef, useEffect, useCallback } from 'react';

/**
 * A hook that manages a requestAnimationFrame loop with automatic cleanup.
 * 
 * @param callback - Called every frame with (deltaTime in seconds, totalElapsed in seconds)
 * @param active - Whether the loop should be running (default: true)
 * 
 * @example
 * ```tsx
 * useAnimationFrame((dt, elapsed) => {
 *   element.style.transform = `rotate(${elapsed * 45}deg)`;
 * });
 * ```
 */
export function useAnimationFrame(
  callback: (deltaTime: number, elapsed: number) => void,
  active: boolean = true
) {
  const rafId = useRef<number>(0);
  const previousTime = useRef<number>(0);
  const startTime = useRef<number>(0);
  const callbackRef = useRef(callback);

  // Always keep the callback ref current to avoid stale closures
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active) return;

    const animate = (time: number) => {
      if (!startTime.current) {
        startTime.current = time;
        previousTime.current = time;
      }

      const deltaTime = (time - previousTime.current) / 1000; // seconds
      const elapsed = (time - startTime.current) / 1000; // seconds
      previousTime.current = time;

      callbackRef.current(deltaTime, elapsed);
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      startTime.current = 0;
      previousTime.current = 0;
    };
  }, [active]);
}
