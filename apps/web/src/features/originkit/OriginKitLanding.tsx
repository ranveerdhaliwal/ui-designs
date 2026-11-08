import { useState } from 'react';
import styles from './OriginKitLanding.module.css';

import { AxisCursor } from './components/AxisCursor';
import { ClickEffects } from './components/ClickEffects';
import { ComponentCard } from './components/ComponentCard';
import { CoverflowCarousel } from './components/CoverflowCarousel';
import { DirectionHover } from './components/DirectionHover';
import { DotMatrix } from './components/DotMatrix';
import { Globe } from './components/Globe';
import { ImageRipple } from './components/ImageRipple';
import { InfiniteGallery } from './components/InfiniteGallery';
import { KineticGrid } from './components/KineticGrid';
import { LiquidDistortion } from './components/LiquidDistortion';
import { MagneticCarousel } from './components/MagneticCarousel';
import { MeshHover } from './components/MeshHover';
import { ParticleSphere } from './components/ParticleSphere';
import { PixelCard } from './components/PixelCard';
import { PixelDrift } from './components/PixelDrift';
import { PixelUnfold } from './components/PixelUnfold';
import { PrismGrid } from './components/PrismGrid';
import { ReactiveGrid } from './components/ReactiveGrid';
import { Snowfall } from './components/Snowfall';
import { SpinImage } from './components/SpinImage';
import { SpiralImages } from './components/SpiralImages';
import { TextMorph } from './components/TextMorph';
import { UserCursor } from './components/UserCursor';

const experiments = [
  { title: 'Mesh Hover', category: 'Interactive', Component: MeshHover },
  { title: 'Infinite Gallery', category: 'Carousel', Component: InfiniteGallery },
  { title: 'Kinetic Grid', category: 'Layout', Component: KineticGrid },
  { title: 'Text Morph', category: 'Typography', Component: TextMorph },
  { title: 'Spiral Images', category: '3D', Component: SpiralImages },
  { title: 'Particle Sphere', category: 'WebGL', Component: ParticleSphere },
  { title: 'User Cursor', category: 'Interaction', Component: UserCursor },
  { title: 'Pixel Drift', category: 'Framer Motion', Component: PixelDrift },
  { title: 'Globe', category: 'WebGL', Component: Globe },
  { title: 'Coverflow Carousel', category: 'Carousel', Component: CoverflowCarousel },
  { title: 'Spin Image', category: 'Hover', Component: SpinImage },
  { title: 'Magnetic Carousel', category: 'Physics', Component: MagneticCarousel },
  { title: 'Pixel Card', category: 'Reveal', Component: PixelCard },
  { title: 'Direction Hover', category: 'Button', Component: DirectionHover },
  { title: 'Click Effects', category: 'Interaction', Component: ClickEffects },
  { title: 'Dot Matrix', category: 'Hover', Component: DotMatrix },
  { title: 'Snowfall', category: 'Particles', Component: Snowfall },
  { title: 'Reactive Grid', category: 'Layout', Component: ReactiveGrid },
  { title: 'Axis Cursor', category: 'Interaction', Component: AxisCursor },
  { title: 'Prism Grid', category: 'Glassmorphism', Component: PrismGrid },
  { title: 'Liquid Distortion', category: 'SVG Filters', Component: LiquidDistortion },
  { title: 'Pixel Unfold', category: 'Framer Motion', Component: PixelUnfold },
  { title: 'Image Ripple', category: 'Interaction', Component: ImageRipple },
];
export function OriginKitLanding() {
  const [query, setQuery] = useState('');
  const filtered = experiments.filter((item) =>
    `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <p className={styles.kicker}>A COLLECTION IN MOTION</p>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>
              Small interactions.
              <br />
              Lasting impressions.
            </h1>
            <span className={styles.badge}>{experiments.length} experiments</span>
          </div>
          <p className={styles.subtitle}>
            Move, drag, click, and explore. A library of playful possibilities for the interfaces we
            use every day.
          </p>
          <label className={styles.search}>
            <span className="sr-only">Search motion experiments</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find an interaction…"
            />
            <span>{filtered.length} studies</span>
          </label>
        </div>
      </header>
      <section className={styles.main}>
        <div className={styles.grid}>
          {filtered.map(({ title, category, Component }) => (
            <ComponentCard key={title} title={title} tag={category}>
              <Component />
            </ComponentCard>
          ))}
        </div>
        {filtered.length === 0 && <p role="status">No experiments match this search.</p>}
      </section>
    </main>
  );
}
