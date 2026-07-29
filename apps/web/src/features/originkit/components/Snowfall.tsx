import React from 'react';
import { motion } from 'framer-motion';

export function Snowfall() {
  const flakes = Array.from({ length: 50 });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      {flakes.map((_, i) => {
        const startX = Math.random() * 100;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            initial={{ y: -20, x: `${startX}%`, opacity: 0 }}
            animate={{ 
              y: '120%', 
              x: `${startX + (Math.random() * 10 - 5)}%`,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration, 
              repeat: Infinity, 
              delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              top: 0,
              width: size,
              height: size,
              backgroundColor: '#FFF',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}
          />
        );
      })}
    </div>
  );
}
