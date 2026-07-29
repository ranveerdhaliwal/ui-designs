import React, { useRef, useEffect } from 'react';

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
    let mouse = { x: width / 2, y: height / 2 };
    let targetMouse = { x: width / 2, y: height / 2 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
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
    canvas.addEventListener('mouseleave', () => {
      targetMouse.x = width / 2;
      targetMouse.y = height / 2;
    });

    let animationId: number;

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

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
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
