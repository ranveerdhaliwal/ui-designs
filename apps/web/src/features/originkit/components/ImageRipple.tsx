import { getAssetUrl } from '@/lib/assetUtils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';

export function ImageRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const handleImageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = performance.now();
    setRipples((prev) => [...prev.slice(-8), { id, x, y }]);
    const timer = setTimeout(() => {
      timers.current = timers.current.filter((t) => t !== timer);
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
    timers.current.push(timer);
  };

  return (
    <button
      type="button"
      aria-label="Create an image ripple"
      onClick={handleImageClick}
      style={{
        border: 0,
        padding: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${getAssetUrl('/assets/oasis_bg.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
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
              backdropFilter: 'blur(2px)',
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
