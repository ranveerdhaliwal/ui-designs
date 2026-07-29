import React, { useState, useRef } from 'react';

export interface PrismGridProps {
  rows?: number;
  cols?: number;
  className?: string;
  gridColor?: string;
}

export const PrismGrid: React.FC<PrismGridProps> = ({
  rows = 10,
  cols = 10,
  className = '',
  gridColor = 'rgba(255,255,255,0.05)'
}) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={gridRef}
      className={className}
      onMouseMove={handleMouseMove}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: '100%',
        height: '100%',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div 
          key={i}
          style={{
            borderRight: `1px solid ${gridColor}`,
            borderBottom: `1px solid ${gridColor}`,
            boxSizing: 'border-box'
          }}
        />
      ))}
      
      {/* Prism Hover Spotlight */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
          mixBlendMode: 'screen',
        }}
      />
      {/* Refraction layer */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          backdropFilter: 'hue-rotate(90deg) blur(2px)',
          WebkitMaskImage: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, black, transparent)`
        }}
      />
    </div>
  );
};
