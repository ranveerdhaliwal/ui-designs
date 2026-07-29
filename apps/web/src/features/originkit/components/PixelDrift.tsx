import React from 'react';
import { motion } from 'framer-motion';

export function PixelDrift() {
  const pixels = Array.from({ length: 400 });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', width: '200px', height: '200px', gap: '1px' }}>
      {pixels.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1, 
            scale: 1.5,
            backgroundColor: '#FFF' 
          }}
          animate={{
            opacity: [0, 0.2, 0],
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            backgroundColor: '#7C3AED',
            width: '100%',
            height: '100%',
          }}
        />
      ))}
    </div>
  );
}
