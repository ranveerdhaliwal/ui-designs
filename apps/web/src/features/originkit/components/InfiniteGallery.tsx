import { getAssetUrl } from '@/lib/assetUtils';
import { motion } from 'framer-motion';

export function InfiniteGallery() {
  const images = [
    getAssetUrl('/assets/oasis_bg.png'),
    getAssetUrl('/assets/haven_bg.png'),
    getAssetUrl('/assets/lumen_bg.png'),
    getAssetUrl('/assets/oasis_bg.png'),
  ];

  return (
    <div
      style={{ width: '100%', overflow: 'hidden', display: 'flex', gap: '1rem', padding: '1rem 0' }}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
        style={{ display: 'flex', gap: '1rem', width: '200%' }}
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            style={{
              width: '150px',
              height: '200px',
              flexShrink: 0,
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <img
              src={src}
              alt="Gallery"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
