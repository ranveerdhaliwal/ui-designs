import { useEffect, useRef, type RefObject } from 'react';
import type { MotionValue } from 'framer-motion';
import { startAnimationLoop } from '@/lib/animation';
export interface SceneProps {
  progress: MotionValue<number>;
  still: boolean;
}
/** Retains phase across pause/resume; repaints on scroll/resize, sleeps offscreen. */
export function useScene<T extends Element>(
  element: RefObject<T | null>,
  { progress, still }: SceneProps,
  draw: (p: number, seconds: number) => void,
) {
  const renderer = useRef(draw);
  const time = useRef(0);
  useEffect(() => {
    renderer.current = draw;
    renderer.current(progress.get(), time.current);
  });
  useEffect(() => {
    const paint = () => renderer.current(progress.get(), time.current);
    const animation = still
      ? null
      : startAnimationLoop(
          (delta) => {
            time.current += delta;
            paint();
          },
          { element: element.current },
        );
    const invalidate = () => (animation ? animation.invalidate() : paint());
    const unsubscribe = progress.on('change', invalidate);
    const resize = new ResizeObserver(invalidate);
    if (element.current) resize.observe(element.current);
    paint();
    return () => {
      unsubscribe();
      resize.disconnect();
      animation?.dispose();
    };
  }, [element, progress, still]);
}
