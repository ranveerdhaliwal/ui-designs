import { useState } from 'react';
import styles from './ArtworkViewer.module.css';
export function ArtworkViewer({
  src,
  alt,
  pixelated = false,
}: {
  src: string;
  alt: string;
  pixelated?: boolean;
}) {
  const [zoom, setZoom] = useState(1);
  return (
    <figure className={styles.viewer}>
      <div
        className={styles.viewport}
        tabIndex={0}
        aria-label="Artwork viewport. Scroll to explore when enlarged."
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: `${zoom * 100}%`,
            maxWidth: 'none',
            imageRendering: pixelated ? 'pixelated' : 'auto',
          }}
        />
      </div>
      <figcaption>
        <label>
          Detail scale
          <input
            type="range"
            min="1"
            max="3"
            step=".25"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
          <output>{zoom}×</output>
        </label>
        <button onClick={() => setZoom(1)}>Fit image</button>
      </figcaption>
    </figure>
  );
}
