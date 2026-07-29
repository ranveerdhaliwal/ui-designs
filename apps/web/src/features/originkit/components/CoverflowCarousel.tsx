import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function CoverflowCarousel() {
  const [index, setIndex] = useState(0);
  const items = [0, 1, 2, 3, 4];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {items.map((i) => {
          const isActive = i === index;
          const offset = i - index;
          const absOffset = Math.abs(offset);
          
          return (
            <motion.div
              key={i}
              onClick={() => setIndex(i)}
              animate={{
                scale: isActive ? 1.2 : 1 - absOffset * 0.2,
                rotateY: offset * -20,
                z: -absOffset * 100,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                width: '120px',
                height: '160px',
                background: `hsl(${i * 60}, 70%, 50%)`,
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                flexShrink: 0,
                transformStyle: 'preserve-3d'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
