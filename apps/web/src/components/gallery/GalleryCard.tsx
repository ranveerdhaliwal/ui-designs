import type { Demo } from '@/data/demos';
import { getAssetUrl } from '@/lib/assetUtils';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import styles from './Gallery.module.css';
export function GalleryCard({ demo, priority = false }: { demo: Demo; priority?: boolean }) {
  return (
    <Link to={demo.path} className={styles.card}>
      <div className={styles.preview}>
        <img
          src={getAssetUrl(demo.preview)}
          alt={`${demo.title} interface preview`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={1440}
          height={1000}
        />
        <span className={styles.open}>
          <ArrowUpRight size={20} />
          <span className="sr-only">Open study</span>
        </span>
      </div>
      <div className={styles.cardHeading}>
        <h3>{demo.title}</h3>
        <span>{demo.medium}</span>
      </div>
      <p>{demo.description}</p>
    </Link>
  );
}
