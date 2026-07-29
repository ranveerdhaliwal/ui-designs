import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ImageRipple() {
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);

  const handleImageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples(prev => [...prev, { id: Date.now(), x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== Date.now()));
    }, 1000);
  };

  return (
    <div 
      onClick={handleImageClick}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: r.x - 50,
              top: r.y - 50,
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.8)',
              backgroundColor: 'rgba(255,255,255,0.2)',
              pointerEvents: 'none',
              backdropFilter: 'blur(2px)'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
