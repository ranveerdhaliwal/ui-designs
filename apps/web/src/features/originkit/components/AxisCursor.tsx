import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function AxisCursor() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505', cursor: 'none' }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
        Hover to reveal Axis
      </div>

      {isHovering && (
        <>
          <motion.div
            animate={{ y: mouse.y }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '1px',
              backgroundColor: '#7C3AED',
              pointerEvents: 'none',
              boxShadow: '0 0 10px #7C3AED'
            }}
          />
          <motion.div
            animate={{ x: mouse.x }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
            style={{
              position: 'absolute',
              top: 0, bottom: 0, left: 0,
              width: '1px',
              backgroundColor: '#7C3AED',
              pointerEvents: 'none',
              boxShadow: '0 0 10px #7C3AED'
            }}
          />
        </>
      )}
    </div>
  );
}
