import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgeGate.module.css';

export const ScrambleButton: React.FC<{ text: string, onClick?: () => void }> = ({ text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const chars = text.split('');
  
  return (
    <button 
      className={styles.scrambleBtn}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={styles.btnContent}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className={styles.char}
            animate={isHovered ? {
              x: (Math.random() - 0.5) * 50,
              y: (Math.random() - 0.5) * 50,
              rotate: (Math.random() - 0.5) * 90,
              opacity: [1, 0, 1],
            } : {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1
            }}
            transition={{
              duration: 0.4,
              ease: "backOut",
              opacity: { duration: 0.2, repeat: Infinity, repeatType: "mirror" }
            }}
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </button>
  );
};

export const AgeGate: React.FC<{ onAccept: () => void }> = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    setTimeout(onAccept, 800); // Wait for exit animation
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={styles.overlay}
          initial={{ y: 0 }}
          exit={{ y: '-100vh', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.content}>
            <motion.div 
              className={styles.logoContainer}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
               {/* Stand-in for the cloud character */}
               <div className={styles.ghostIcon}>
                 <div className={styles.eyeLeft}></div>
                 <div className={styles.eyeRight}></div>
               </div>
            </motion.div>
            
            <motion.h1 
              className={styles.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              HOW OLD<br/>ARE YOU?
            </motion.h1>

            <motion.div 
              className={styles.actions}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <ScrambleButton text="I'M OVER 18, LET ME IN" onClick={handleAccept} />
              <button className={styles.rejectBtn}>I'M NOT OVER 18 YET</button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
