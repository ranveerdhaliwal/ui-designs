import React from 'react';
import { motion } from 'framer-motion';

export function SpiralImages() {
  const images = Array.from({ length: 8 });
  
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ width: '100px', height: '140px', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {images.map((_, i) => {
          const angle = (i / images.length) * 360;
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: `hsl(${angle}, 70%, 50%)`,
                borderRadius: '8px',
                transform: `rotateY(${angle}deg) translateZ(150px)`,
                opacity: 0.8,
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
