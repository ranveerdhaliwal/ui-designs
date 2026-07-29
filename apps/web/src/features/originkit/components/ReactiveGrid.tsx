import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ReactiveGrid() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const cols = 6;
  const rows = 6;
  
  return (
    <div 
      style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '4px', width: '200px', height: '200px' }}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {Array.from({ length: cols * rows }).map((_, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        
        const isHovered = hoverIndex === i;
        
        let dist = 100;
        if (hoverIndex !== null) {
          const hX = hoverIndex % cols;
          const hY = Math.floor(hoverIndex / cols);
          dist = Math.abs(hX - x) + Math.abs(hY - y);
        }

        const scale = isHovered ? 1.5 : (dist === 1 ? 1.2 : 1);
        const bg = isHovered ? '#7C3AED' : (dist === 1 ? '#4F23A1' : '#222');

        return (
          <motion.div
            key={i}
            onMouseEnter={() => setHoverIndex(i)}
            animate={{ scale, backgroundColor: bg }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          />
        );
      })}
    </div>
  );
}
