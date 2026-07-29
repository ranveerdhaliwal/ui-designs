import React, { useRef, useEffect } from 'react';

export interface ChromaticWavesProps {
  className?: string;
  speed?: number;
}

export const ChromaticWaves: React.FC<ChromaticWavesProps> = ({
  className = '',
  speed = 0.05
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    let time = 0;

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

    let animationId: number;

    const render = () => {
      time += speed;
      ctx.clearRect(0, 0, width, height);

      // We use screen blend mode for additive RGB mixing
      ctx.globalCompositeOperation = 'screen';
      ctx.lineWidth = 4;

      const channels = [
        { color: '#FF0000', offset: 0 },
        { color: '#00FF00', offset: 0.2 },
        { color: '#0000FF', offset: 0.4 },
      ];

      for (let j = 0; j < 5; j++) { // 5 sine waves
        const waveY = (height / 6) * (j + 1);
        
        channels.forEach(channel => {
          ctx.beginPath();
          ctx.strokeStyle = channel.color;
          
          for (let x = 0; x <= width; x += 10) {
            // Complex sine wave using time and x position
            const y = waveY + Math.sin(x * 0.01 + time + channel.offset + j) * 40 * Math.sin(time * 0.5 + j);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });
      }

      ctx.globalCompositeOperation = 'source-over';
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
    />
  );
};
