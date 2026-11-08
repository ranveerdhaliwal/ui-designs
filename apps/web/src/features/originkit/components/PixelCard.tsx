import { getAssetUrl } from '@/lib/assetUtils';
import { motion } from 'framer-motion';

export function PixelCard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        whileHover="hover"
        style={{
          width: '200px',
          height: '250px',
          background: '#111',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
          }}
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              variants={{
                hover: { opacity: 0 },
              }}
              transition={{ delay: Math.random() * 0.3, duration: 0.2 }}
              style={{ background: '#7C3AED', width: '100%', height: '100%' }}
            />
          ))}
        </div>
        <img
          src={getAssetUrl('/assets/oasis_bg.png')}
          alt="Revealed"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </div>
  );
}
