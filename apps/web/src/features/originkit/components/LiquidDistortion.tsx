import React from 'react';
import { motion } from 'framer-motion';

export function LiquidDistortion() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'url(#liquid)'
        }}
      />
    </div>
  );
}
