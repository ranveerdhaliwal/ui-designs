import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function MeshHover() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
    }
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        background: '#050505',
        overflow: 'hidden'
      }}
    >
      <motion.div
        animate={{
          rotateX: -mouse.y * 0.1,
          rotateY: mouse.x * 0.1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(10, 1fr)',
          gap: '2px',
          padding: '10px'
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 2, backgroundColor: '#FFF' }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '2px'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
