import React from 'react';
import { motion } from 'framer-motion';

export function KineticGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '20px', width: '100%' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5, scale: 0.9 }}
          whileHover={{ 
            scale: 1.1, 
            opacity: 1, 
            backgroundColor: '#7C3AED',
            rotate: Math.random() > 0.5 ? 5 : -5
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            height: '60px',
            backgroundColor: '#1E1E1E',
            borderRadius: '8px',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        />
      ))}
    </div>
  );
}
