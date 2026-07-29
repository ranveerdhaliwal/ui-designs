import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function TextMorph() {
  const words = ['Create.', 'Animate.', 'Innovate.', 'Inspire.'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={words[index]}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '3rem', fontWeight: 800, margin: 0, color: '#FFF' }}
        >
          {words[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}
