import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function MagneticCarousel() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      setMouse({ x, y: 0 }); // Only track X for carousel pull
    }
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.div
        animate={{ x: mouse.x * -0.5 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        style={{ display: 'flex', gap: '15px' }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: '100px', 
              height: '140px', 
              background: '#222', 
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }} 
          />
        ))}
      </motion.div>
    </div>
  );
}
