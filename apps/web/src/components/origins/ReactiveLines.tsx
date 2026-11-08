import { startAnimationLoop } from '@/lib/animation';
import React, { useEffect, useRef } from 'react';

export interface ReactiveLinesProps {
  color?: string;
  lineCount?: number;
  className?: string;
}

export const ReactiveLines: React.FC<ReactiveLinesProps> = ({
  color = 'rgba(255, 255, 255, 0.2)',
  lineCount = 40,
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
    const targetMouse = { x: width / 2, y: height / 2 };

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
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMouseMove);
    const onMouseLeave = () => {
      targetMouse.x = width / 2;
      targetMouse.y = height / 2;
    };
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      // Ease mouse
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      for (let i = 0; i < lineCount; i++) {
        const xPos = (width / lineCount) * i;

        ctx.beginPath();
        ctx.moveTo(xPos, 0);

        // Control point reacts to mouse
        const dist = Math.abs(xPos - mouse.x);
        const influence = Math.max(0, 300 - dist) / 300; // 300px radius

        const cpX = xPos + (mouse.x - xPos) * influence * 1.5;
        const cpY = mouse.y;

        ctx.quadraticCurveTo(cpX, cpY, xPos, height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let i = 0; i < lineCount; i++) {
        const yPos = (height / lineCount) * i;

        ctx.beginPath();
        ctx.moveTo(0, yPos);

        const dist = Math.abs(yPos - mouse.y);
        const influence = Math.max(0, 300 - dist) / 300;

        const cpX = mouse.x;
        const cpY = yPos + (mouse.y - yPos) * influence * 1.5;

        ctx.quadraticCurveTo(cpX, cpY, width, yPos);
        ctx.stroke();
      }
    };

    const animation = startAnimationLoop(render, { element: canvas });
    invalidate = animation.invalidate;
    window.addEventListener('resize', invalidate);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', invalidate);
      animation.dispose();
    };
  }, [color, lineCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
    />
  );
};
