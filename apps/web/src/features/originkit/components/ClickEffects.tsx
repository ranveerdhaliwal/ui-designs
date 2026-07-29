import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ClickEffects() {
  const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setParticles(prev => [...prev, { id: Date.now(), x, y }]);
    
    // Cleanup
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== Date.now()));
    }, 1000);
  };

  return (
    <div 
      onClick={handleClick}
      style={{ width: '100%', height: '100%', background: '#050505', position: 'relative', overflow: 'hidden', cursor: 'crosshair', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span style={{ color: 'rgba(255,255,255,0.3)' }}>Click Anywhere</span>
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: p.x - 25,
              top: p.y - 25,
              width: '50px',
              height: '50px',
              border: '2px solid #7C3AED',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
