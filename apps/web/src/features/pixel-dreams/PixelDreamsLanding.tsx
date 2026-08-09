import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './PixelDreamsLanding.module.css';
import { getAssetUrl } from '@/lib/assetUtils';

const images = [
  { src: getAssetUrl('/assets/dither1.png'), title: 'ANGEL GARDEN', desc: '16-bit RGB Error Diffusion' },
  { src: getAssetUrl('/assets/dither2.png'), title: 'THE PILLAR', desc: 'Sierra Adventure Style' },
  { src: getAssetUrl('/assets/dither3.png'), title: 'CASTLE REFLECTION', desc: 'Vaporwave Palette' },
  { src: getAssetUrl('/assets/dither4.png'), title: 'MOUNTAIN TREE', desc: 'EGA Palette Mapping' },
];

export function PixelDreamsLanding() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" }
    }));
  }, [controls]);

  return (
    <div className={styles.container}>
      <div className={styles.crtOverlay}></div>
      <div className={styles.scanlines}></div>
      
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>PIXEL DREAMS</h1>
          <p className={styles.subtitle}>// RETRO DITHERING GALLERY //</p>
        </header>

        <div className={styles.gallery}>
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              className={styles.card}
              custom={index}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                  <img src={img.src} alt={img.title} className={styles.pixelImage} />
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>&gt; {img.title}</h3>
                  <p className={styles.cardDesc}>[{img.desc}]</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className={styles.footer}>
          <div className={styles.blinkingCursor}>&gt; SYSTEM IDLE_</div>
        </footer>
      </main>
    </div>
  );
}
