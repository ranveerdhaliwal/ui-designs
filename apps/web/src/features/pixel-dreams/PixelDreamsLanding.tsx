import { ArtworkViewer } from '@/components/ui/ArtworkViewer';
import { DetailDialog } from '@/components/ui/DemoAction';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import styles from './PixelDreamsLanding.module.css';
const images = [
  {
    src: getAssetUrl('/assets/dither1.png'),
    title: 'ANGEL GARDEN',
    desc: '16-bit RGB Error Diffusion',
  },
  { src: getAssetUrl('/assets/dither2.png'), title: 'THE PILLAR', desc: 'Sierra Adventure Style' },
  {
    src: getAssetUrl('/assets/dither3.png'),
    title: 'CASTLE REFLECTION',
    desc: 'Vaporwave Palette',
  },
  { src: getAssetUrl('/assets/dither4.png'), title: 'MOUNTAIN TREE', desc: 'EGA Palette Mapping' },
];

export function PixelDreamsLanding() {
  const [crt, setCrt] = useState(true);
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <span>PD / DIGITAL COLLECTION</span>
        <button aria-pressed={crt} onClick={() => setCrt(!crt)}>
          CRT texture {crt ? 'on' : 'off'}
        </button>
      </header>
      <section className={styles.intro}>
        <h1>
          PIXEL
          <br />
          <span>DREAMS</span>
        </h1>
        <p>
          Small worlds.
          <br />
          Infinite possibility.
          <br />
          <span>A collection in four palettes.</span>
        </p>
      </section>
      <section className={styles.gallery} data-crt={crt}>
        {images.map((img, i) => (
          <article className={styles.card} key={img.title}>
            <DetailDialog
              title={img.title}
              trigger={
                <>
                  <div className={styles.imageWrapper}>
                    <img src={img.src} alt={img.title} />
                    <span>
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  <div className={styles.cardInfo}>
                    <span>0{i + 1}</span>
                    <h2>{img.title}</h2>
                    <p>{img.desc}</p>
                  </div>
                </>
              }
            >
              <ArtworkViewer src={img.src} alt={img.title} pixelated />
              <p>{img.desc}. Explore the details of this pixel-art study.</p>
              <a href={img.src} download={`${img.title.toLowerCase().replaceAll(' ', '-')}.png`}>
                Download artwork ↓
              </a>
            </DetailDialog>
          </article>
        ))}
      </section>
      <footer className={styles.footer}>
        <span>FOUR WORLDS / ONE FRAME AT A TIME</span>
        <span>END OF COLLECTION</span>
      </footer>
    </main>
  );
}
