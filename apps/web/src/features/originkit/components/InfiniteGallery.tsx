import React from 'react';
import { motion } from 'framer-motion';

export function InfiniteGallery() {
  const images = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden', display: 'flex', gap: '1rem', padding: '1rem 0' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        style={{ display: 'flex', gap: '1rem', width: '200%' }}
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} style={{ width: '150px', height: '200px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden' }}>
            <img src={src} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
