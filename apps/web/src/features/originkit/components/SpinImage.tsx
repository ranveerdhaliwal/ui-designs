import { getAssetUrl } from '@/lib/assetUtils';
import { motion } from 'framer-motion';

export function SpinImage() {
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
      <motion.img
        src={getAssetUrl('/assets/oasis_bg.png')}
        alt="Spinning Art"
        whileHover={{ rotate: 180, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          objectFit: 'cover',
          boxShadow: '0 10px 30px rgba(124, 58, 237, 0.4)',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
