import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function DirectionHover() {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setOrigin({ x: `${x}px`, y: `${y}px` });
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        whileHover="hover"
        initial="initial"
        style={{
          width: '200px',
          height: '80px',
          background: '#1A1A1A',
          borderRadius: '40px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <motion.div
          variants={{
            initial: { scale: 0, opacity: 0 },
            hover: { scale: 20, opacity: 1 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: 'absolute',
            left: origin.x,
            top: origin.y,
            width: '20px',
            height: '20px',
            background: '#7C3AED',
            borderRadius: '50%',
            transformOrigin: 'center center',
            marginLeft: '-10px',
            marginTop: '-10px'
          }}
        />
        <span style={{ position: 'relative', zIndex: 1, fontWeight: 600, color: '#FFF' }}>Hover Me</span>
      </motion.div>
    </div>
  );
}
