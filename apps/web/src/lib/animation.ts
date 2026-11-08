export interface AnimationOptions {
  element?: Element | null | undefined;
  respectReducedMotion?: boolean;
}
/** A single lifecycle for decorative loops, including offscreen and background suspension. */
export function startAnimationLoop(
  draw: (delta: number, elapsed: number) => void,
  { element, respectReducedMotion = true }: AnimationOptions = {},
) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true,
    disposed = false,
    frame = 0,
    last = 0,
    elapsed = 0;
  const running = () =>
    !disposed && visible && !document.hidden && (!respectReducedMotion || !media.matches);
  const tick = (now: number) => {
    frame = 0;
    if (!running()) return;
    const delta = last ? Math.min((now - last) / 1000, 0.064) : 0;
    last = now;
    elapsed += delta;
    draw(delta, elapsed);
    if (running()) frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    if (disposed) return;
    if (running()) frame = requestAnimationFrame(tick);
    else if (visible && !document.hidden) draw(0, elapsed);
  };
  const observer =
    element && typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          visible = entry?.isIntersecting ?? false;
          sync();
        })
      : null;
  if (element) observer?.observe(element);
  document.addEventListener('visibilitychange', sync);
  media.addEventListener('change', sync);
  draw(0, 0);
  sync();
  return {
    invalidate: () => {
      if (!disposed && visible && !document.hidden) draw(0, elapsed);
    },
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      media.removeEventListener('change', sync);
    },
  };
}
