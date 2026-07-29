import React from 'react';
import { motion } from 'framer-motion';

export function PrismGrid() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FF0080, #7928CA)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, rotate: 5, backdropFilter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
