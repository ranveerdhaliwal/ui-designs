import React from 'react';
import { motion } from 'framer-motion';

export function DotMatrix() {
  const dots = Array.from({ length: 400 });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '4px', padding: '20px', width: '200px', height: '200px' }}>
      {dots.map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 3, backgroundColor: '#7C3AED' }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          style={{
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%'
          }}
        />
      ))}
    </div>
  );
}
