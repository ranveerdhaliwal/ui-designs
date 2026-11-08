import { startAnimationLoop } from '@/lib/animation';
import React, { useEffect, useRef } from 'react';

export interface WaveArcsProps {
  color?: string;
  arcCount?: number;
  className?: string;
}

export const WaveArcs: React.FC<WaveArcsProps> = ({
  color = '#00F0FF',
  arcCount = 15,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    const mouse = { x: width / 2, y: height / 2 };
    let time = 0;

    let invalidate = () => {};
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width * Math.min(window.devicePixelRatio || 1, 2);
        canvas.height = height * Math.min(window.devicePixelRatio || 1, 2);
        ctx.scale(
          Math.min(window.devicePixelRatio || 1, 2),
          Math.min(window.devicePixelRatio || 1, 2),
        );
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) * 0.8;

      for (let i = 0; i < arcCount; i++) {
        const radius = (maxRadius / arcCount) * (i + 1);
        const offset = Math.sin(time + i * 0.2) * 20; // Pulsing effect

        // Arc responds to mouse distance
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distToMouse / (width / 2));

        const baseAngle = Math.atan2(dy, dx);

        ctx.beginPath();
        ctx.strokeStyle = color;
        // Fade opacity based on index
        ctx.globalAlpha = 1 - (i / arcCount) * 0.5;
        ctx.lineWidth = 2 + influence * 3;

        const r = Math.max(1, radius + offset * influence);
        const arcLength = Math.PI * (0.5 + influence * 0.5); // Arcs get longer near mouse

        ctx.arc(
          cx,
          cy,
          r,
          baseAngle - arcLength / 2 + time * 0.1 * (i % 2 == 0 ? 1 : -1),
          baseAngle + arcLength / 2 + time * 0.1 * (i % 2 == 0 ? 1 : -1),
        );
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const animation = startAnimationLoop(render, { element: canvas });
    invalidate = animation.invalidate;
    window.addEventListener('resize', invalidate);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', invalidate);
      animation.dispose();
    };
  }, [color, arcCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
    />
  );
};
