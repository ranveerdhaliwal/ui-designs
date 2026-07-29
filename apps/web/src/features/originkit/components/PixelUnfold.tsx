import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function PixelUnfold() {
  const [isHovered, setIsHovered] = useState(false);
  const rows = 5;
  const cols = 5;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: '200px', height: '200px', display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, cursor: 'pointer' }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const x = (i % cols) * (100 / (cols - 1));
        const y = Math.floor(i / cols) * (100 / (rows - 1));
        
        return (
          <motion.div
            key={i}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: isHovered ? 0 : 90, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: (x + y) * 0.002 }}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop")',
              backgroundSize: '200px 200px',
              backgroundPosition: `${x}% ${y}%`,
              transformOrigin: 'top center'
            }}
          />
        );
      })}
    </div>
  );
}
