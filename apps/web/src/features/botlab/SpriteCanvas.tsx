import { useEffect, useRef } from 'react';
import { startAnimationLoop } from '@/lib/animation';
import { type Bot, type Part, INTROS, IDLES, total, frameAt, paint } from './botlabData';
export function SpriteCanvas({
  bot: b,
  scale,
  intro = false,
  phase = 0,
  dark = false,
  customParts,
  className = '',
  paused = false,
  seek = 0,
}: {
  bot: Bot;
  scale: number;
  intro?: boolean;
  phase?: number;
  dark?: boolean;
  customParts?: {
    body?: Part;
    head?: Part;
    eyes?: Part;
    mouth?: Part;
    top?: Part;
  };
  className?: string;
  paused?: boolean;
  seek?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const introFrames = INTROS[b.intro]?.frames || INTROS[0].frames;
    const idleFrames = IDLES[b.idle]?.frames || IDLES[0].frames;
    const introTotal = intro ? total(introFrames) : 0;
    const idleTotal = total(idleFrames);
    if (paused) {
      paint(ctx, b, scale, frameAt(idleFrames, seek % idleTotal), dark, customParts);
      return;
    }
    let last = '';
    const loop = startAnimationLoop(
      (_delta, elapsed) => {
        const t = elapsed * 1000;
        const anim = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? {}
          : t < introTotal
            ? frameAt(introFrames, t)
            : frameAt(idleFrames, (t - introTotal + phase) % idleTotal);
        const key = JSON.stringify(anim);
        if (key !== last) {
          last = key;
          paint(ctx, b, scale, anim, dark, customParts);
        }
      },
      { element: canvas },
    );
    return loop.dispose;
  }, [b, scale, intro, phase, dark, customParts, paused, seek]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Pixel robot preview"
      width={16 * scale}
      height={16 * scale}
      className={className}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
