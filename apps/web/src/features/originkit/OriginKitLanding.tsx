import React from 'react';
import { Link } from '@tanstack/react-router';
import styles from './OriginKitLanding.module.css';

import { ComponentCard } from './components/ComponentCard';
import { MeshHover } from './components/MeshHover';
import { InfiniteGallery } from './components/InfiniteGallery';
import { KineticGrid } from './components/KineticGrid';
import { TextMorph } from './components/TextMorph';
import { SpiralImages } from './components/SpiralImages';
import { ParticleSphere } from './components/ParticleSphere';
import { UserCursor } from './components/UserCursor';
import { PixelDrift } from './components/PixelDrift';
import { Globe } from './components/Globe';
import { CoverflowCarousel } from './components/CoverflowCarousel';
import { SpinImage } from './components/SpinImage';
import { MagneticCarousel } from './components/MagneticCarousel';
import { PixelCard } from './components/PixelCard';
import { DirectionHover } from './components/DirectionHover';
import { ClickEffects } from './components/ClickEffects';
import { DotMatrix } from './components/DotMatrix';
import { Snowfall } from './components/Snowfall';
import { ReactiveGrid } from './components/ReactiveGrid';
import { AxisCursor } from './components/AxisCursor';
import { PrismGrid } from './components/PrismGrid';
import { LiquidDistortion } from './components/LiquidDistortion';
import { PixelUnfold } from './components/PixelUnfold';
import { ImageRipple } from './components/ImageRipple';

export function OriginKitLanding() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.backButton}>&larr; Hub</Link>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>OriginKit</h1>
            <span className={styles.badge}>23 Components</span>
          </div>
          <p className={styles.subtitle}>
            A definitive showcase of modern web animation. Recreating the interactive capabilities of OriginKit using Framer Motion, Three.js, and CSS.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Component cards will go here */}
          
          <ComponentCard title="1. Mesh Hover" tag="Interactive">
            <MeshHover />
          </ComponentCard>
          
          <ComponentCard title="2. Infinite Gallery" tag="Carousel">
            <InfiniteGallery />
          </ComponentCard>

          <ComponentCard title="3. Kinetic Grid" tag="Layout">
            <KineticGrid />
          </ComponentCard>

          <ComponentCard title="4. Text Morph" tag="Typography">
            <TextMorph />
          </ComponentCard>

          <ComponentCard title="5. Spiral Images" tag="3D">
            <SpiralImages />
          </ComponentCard>
          
          <ComponentCard title="6. Particle Sphere" tag="WebGL">
            <ParticleSphere />
          </ComponentCard>

          <ComponentCard title="7. User Cursor" tag="Interaction">
            <UserCursor />
          </ComponentCard>

          <ComponentCard title="8. Pixel Drift" tag="Framer Motion">
            <PixelDrift />
          </ComponentCard>

          <ComponentCard title="9. Globe" tag="WebGL">
            <Globe />
          </ComponentCard>

          <ComponentCard title="10. Coverflow Carousel" tag="Carousel">
            <CoverflowCarousel />
          </ComponentCard>
          
          <ComponentCard title="11. Spin Image" tag="Hover">
            <SpinImage />
          </ComponentCard>

          <ComponentCard title="12. Magnetic Carousel" tag="Physics">
            <MagneticCarousel />
          </ComponentCard>

          <ComponentCard title="13. Pixel Card" tag="Reveal">
            <PixelCard />
          </ComponentCard>

          <ComponentCard title="14. Direction Hover" tag="Button">
            <DirectionHover />
          </ComponentCard>

          <ComponentCard title="15. Click Effects" tag="Interaction">
            <ClickEffects />
          </ComponentCard>

          <ComponentCard title="16. Dot Matrix" tag="Hover">
            <DotMatrix />
          </ComponentCard>

          <ComponentCard title="17. Snowfall" tag="Particles">
            <Snowfall />
          </ComponentCard>

          <ComponentCard title="18. Reactive Grid" tag="Layout">
            <ReactiveGrid />
          </ComponentCard>

          <ComponentCard title="19. Axis Cursor" tag="Interaction">
            <AxisCursor />
          </ComponentCard>

          <ComponentCard title="20. Prism Grid" tag="Glassmorphism">
            <PrismGrid />
          </ComponentCard>

          <ComponentCard title="21. Liquid Distortion" tag="SVG Filters">
            <LiquidDistortion />
          </ComponentCard>

          <ComponentCard title="22. Pixel Unfold" tag="Framer Motion">
            <PixelUnfold />
          </ComponentCard>

          <ComponentCard title="23. Image Ripple" tag="Interaction">
            <ImageRipple />
          </ComponentCard>

        </div>
      </main>
    </div>
  );
}
