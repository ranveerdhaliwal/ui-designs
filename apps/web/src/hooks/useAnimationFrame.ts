import { useEffect, useRef, type RefObject } from 'react';
import { startAnimationLoop } from '@/lib/animation';
export function useAnimationFrame(
  callback: (delta: number, elapsed: number) => void,
  active = true,
  element?: RefObject<Element | null>,
) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    if (!active) return;
    const animation = startAnimationLoop((delta, elapsed) => callbackRef.current(delta, elapsed), {
      element: element?.current,
    });
    return () => animation.dispose();
  }, [active, element]);
}
