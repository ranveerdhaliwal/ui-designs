import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AgeGate } from './AgeGate';
import { ScrollRevealText } from './ScrollRevealText';
import styles from './FlyingPapersLanding.module.css';
import { Link } from '@tanstack/react-router';

export function FlyingPapersLanding() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const ghostY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const ghostScale = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [1, 1.1, 1, 1.2]);
  
  // Smoothly transition background color across 4 sections
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ['#63618E', '#C74B46', '#9C7927', '#55637D']
  );

  useEffect(() => {
    if (!isAgeVerified) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAgeVerified]);

  return (
    <motion.div className={styles.container} style={{ backgroundColor }}>
      {!isAgeVerified && <AgeGate onAccept={() => setIsAgeVerified(true)} />}

      <header className={styles.header}>
        <div className={styles.navBlock}>
          <span>MENU</span>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>FLYING PAPERS</Link>
          <span>BAG</span>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1rem', fontWeight: 'bold' }}>
            I'M FLY!
          </div>
          
          <div className={styles.giantTextContainer}>
            <ScrollRevealText text="Let me show" className={styles.giantText || ''} delay={0.1} />
            <ScrollRevealText text="you where" className={styles.giantText || ''} delay={0.2} />
            <ScrollRevealText text="we can go" className={styles.giantText || ''} delay={0.3} />
          </div>

          <motion.div 
            className={styles.ghostCenter}
            style={{ y: ghostY }}
            initial={{ scale: 0 }}
            animate={{ scale: isAgeVerified ? 1 : 0 }}
            transition={{ type: 'spring', damping: 15, delay: 0.5 }}
          >
             <div className={styles.eye}></div>
             <div className={styles.eye}></div>
          </motion.div>
        </section>

        {/* Red Section */}
        <section className={styles.hero}>
           <div className={styles.giantTextContainer}>
              <ScrollRevealText text="LET'S" className={styles.giantText || ''} />
              <ScrollRevealText text="EXPLORE" className={styles.giantText || ''} />
              <ScrollRevealText text="YOUR" className={styles.giantText || ''} />
              <ScrollRevealText text="OPTIONS" className={styles.giantText || ''} />
           </div>

           <div className={styles.productsRow}>
             {['ROLLS', 'GRINDERS', 'CONES', 'TIPS', 'PAPERS'].map((item, i) => (
               <div key={i} className={styles.productCol}>
                 <div className={styles.productCharPlaceholder}></div>
                 <div className={styles.productLabel}>{item}</div>
               </div>
             ))}
           </div>
        </section>

        {/* Mustard Section */}
        <section className={`${styles.hero} ${styles.mustardBg}`}>
           <div className={styles.splitLayout}>
             <div className={styles.leftCol}>
               <div className={styles.giantTextContainer} style={{ textAlign: 'left' }}>
                  <ScrollRevealText text="HOW ABOUT" className={styles.giantText || ''} delay={0.1} />
                  <ScrollRevealText text="A GOOD NIGHT" className={styles.giantText || ''} delay={0.2} />
                  <ScrollRevealText text="WHILE" className={styles.giantText || ''} delay={0.3} />
                  <ScrollRevealText text="SLEEPING?" className={styles.giantText || ''} delay={0.4} />
               </div>
               {/* Sleeping Ghost Placeholder */}
               <motion.div style={{ scale: ghostScale }} className={styles.sleepingGhost}></motion.div>
             </div>
             
             <div className={styles.rightCol}>
               <div className={styles.shopPanel}>
                 <div className={styles.shopGrid}>
                   <div className={styles.shopItem}>
                     <h4>FILTER TIPS</h4>
                     <div className={styles.shopImg}></div>
                     <a href="#">SHOP</a>
                   </div>
                   <div className={styles.shopItem}>
                     <h4>PAPER ROLLS</h4>
                     <div className={styles.shopImg}></div>
                     <a href="#">SHOP</a>
                   </div>
                 </div>
                 <button className={styles.shopAllBtn}>SHOP ALL</button>
               </div>
             </div>
           </div>
        </section>

        {/* Blue Section */}
        <section className={styles.hero}>
           <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1rem', fontWeight: 'bold', color: '#E6D9A1' }}>
             WHEREVER YOU WANT TO GO
           </div>
           
           <div className={styles.giantTextContainer}>
              <ScrollRevealText text="Flying papers is your" className={styles.giantText || ''} delay={0.1} />
              <ScrollRevealText text="ticket to get there" className={styles.giantText || ''} delay={0.2} />
           </div>
           
           {/* Ghost holding drink placeholder */}
           <motion.div style={{ scale: ghostScale }} className={styles.drinkGhost}></motion.div>
        </section>
      </main>
    </motion.div>
  );
}
