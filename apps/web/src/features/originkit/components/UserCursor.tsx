import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function UserCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div 
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div style={{ padding: '2rem', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '8px' }}>
        Hover inside to see custom cursor
      </div>
      
      {isHovering && (
        <motion.div
          animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid #7C3AED',
            pointerEvents: 'none',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '4px', height: '4px', background: '#7C3AED', borderRadius: '50%' }} />
        </motion.div>
      )}
    </div>
  );
}
