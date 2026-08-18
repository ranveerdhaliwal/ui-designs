import React from 'react';
import { Link } from '@tanstack/react-router';
import { getAssetUrl } from '@/lib/assetUtils';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Browser Designs</h1>
        <p className={styles.subtitle}>A collection of highly-polished web UI designs, categorized by aesthetic.</p>
      </header>
      
      <main className={styles.main}>
        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Big Bold Hero</h2>
          <p className={styles.categoryDesc}>Massive typography, floating navs, and AI-generated 3D landscape backgrounds.</p>
          <div className={styles.grid}>
            <Link to="/big-bold-hero" className={styles.card}>
              <div className={styles.cardImage} style={{backgroundImage: `url(${getAssetUrl('/assets/oasis_bg.png')})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              <h3 className={styles.cardTitle}>Dreamscape Templates</h3>
              <p className={styles.cardDesc}>Oasis, Haven, Harmoniq, and Arive themes.</p>
            </Link>
          </div>
        </section>

        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Interactive & WebGL</h2>
          <p className={styles.categoryDesc}>Heavy physics, 3D rendering, and scroll-linked animations.</p>
          <div className={styles.grid}>
            <Link to="/alethia" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'radial-gradient(circle at top right, #1A301D, #0F1F10)'}}></div>
              <h3 className={styles.cardTitle}>Alethia Earth</h3>
              <p className={styles.cardDesc}>Deep tech geospatial intelligence.</p>
            </Link>
            <Link to="/scroll-world" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)'}}></div>
              <h3 className={styles.cardTitle}>Scroll World</h3>
              <p className={styles.cardDesc}>Cinematic video scrubbing synced perfectly to scroll.</p>
            </Link>
            <Link to="/shopify" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'radial-gradient(circle at center, #333 0%, #000 100%)'}}></div>
              <h3 className={styles.cardTitle}>Shopify Editions</h3>
              <p className={styles.cardDesc}>Winter '26. Animated WebGL & Massive Typography.</p>
            </Link>
            <Link to="/originkit" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(135deg, #7C3AED, #110022)'}}></div>
              <h3 className={styles.cardTitle}>OriginKit Showcase</h3>
              <p className={styles.cardDesc}>A massive gallery of 23 complex animations.</p>
            </Link>
          </div>
        </section>

        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Minimal & Brutalist</h2>
          <p className={styles.categoryDesc}>Stark contrasts, monochrome palettes, and grid-based layouts.</p>
          <div className={styles.grid}>
            <Link to="/eragon" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(to bottom, #222, #050505)'}}></div>
              <h3 className={styles.cardTitle}>Eragon.ai</h3>
              <p className={styles.cardDesc}>AI Operating System (Minimalist Serif).</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/conversion" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(45deg, #111, #333)'}}></div>
              <h3 className={styles.cardTitle}>Conversion</h3>
              <p className={styles.cardDesc}>Agentic marketing layout with textured noise and stepped gradients.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/quasar" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'radial-gradient(circle, #5E35B1, #121212 80%)'}}></div>
              <h3 className={styles.cardTitle}>Quasar Showcase</h3>
              <p className={styles.cardDesc}>Extreme dark-mode gradient showcase and glassmorphism UI.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/aeterna" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(to right, #D7CCC8, #A1887F)'}}></div>
              <h3 className={styles.cardTitle}>Aeterna</h3>
              <p className={styles.cardDesc}>Vintage risograph and halftone texture aesthetic with elegant serif.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/presentations" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(135deg, #ECEFF1, #B0BEC5)'}}></div>
              <h3 className={styles.cardTitle}>Editorial Presentations</h3>
              <p className={styles.cardDesc}>CSS Grid presentation engine (Brand Guide, Aurora, Atlas).</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/effects-lab" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'repeating-linear-gradient(45deg, #111, #111 10px, #222 10px, #222 20px)'}}></div>
              <h3 className={styles.cardTitle}>Micro-Interactions Lab</h3>
              <p className={styles.cardDesc}>Hacker decoder text scramble and other micro-animations.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/responsive-showcase" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(to bottom right, #E3F2FD, #90CAF9)'}}></div>
              <h3 className={styles.cardTitle}>Mobile Responsive UI</h3>
              <p className={styles.cardDesc}>Beautiful mobile-first layout primitives and app onboarding showcase.</p>
            </Link>
          </div>
        </section>

        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Tools & Generators</h2>
          <p className={styles.categoryDesc}>Interactive web apps and visual toys.</p>
          <div className={styles.grid}>
            {/* @ts-ignore */}
            <Link to="/image-studio" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(135deg, #FF4081, #7C4DFF)'}}></div>
              <h3 className={styles.cardTitle}>Image Studio</h3>
              <p className={styles.cardDesc}>Apply Halftone and 8-bit Retro Dithering effects programmatically.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/origins-lab" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'radial-gradient(circle at top left, #00B4DB, #0083B0)'}}></div>
              <h3 className={styles.cardTitle}>Origins Lab</h3>
              <p className={styles.cardDesc}>Advanced OriginKit-inspired WebGL and Canvas visual effects.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/flying-papers" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(to bottom, #FFF9C4, #FFCC80)'}}></div>
              <h3 className={styles.cardTitle}>Flying Papers</h3>
              <p className={styles.cardDesc}>Recreation of the interactive, spring-animated typography and scrolling experience.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/pixel-dreams" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)'}}></div>
              <h3 className={styles.cardTitle}>Pixel Dreams</h3>
              <p className={styles.cardDesc}>A retro 8-bit gallery showcasing Floyd-Steinberg dithered pixel art.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/wellness-app" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)'}}></div>
              <h3 className={styles.cardTitle}>Wellness App</h3>
              <p className={styles.cardDesc}>A mobile-first clean layout design with navigation and rounded UI components.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/content-architecture" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(to right, #434343 0%, black 100%)'}}></div>
              <h3 className={styles.cardTitle}>Content Architecture</h3>
              <p className={styles.cardDesc}>1:1 clone featuring a hypnotic SVG text tunnel and ASCII scrambling.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/kyc" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'radial-gradient(circle at center, #111, #000)'}}></div>
              <h3 className={styles.cardTitle}>KYC Generator</h3>
              <p className={styles.cardDesc}>A robust 3-column brutalist workspace with interactive WebGL rendering.</p>
            </Link>
          </div>
        </section>

        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Corporate SaaS</h2>
          <p className={styles.categoryDesc}>Warm colors, soft shadows, and highly accessible layouts.</p>
          <div className={styles.grid}>
            <Link to="/zapier" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(to right, #ff512f, #dd2476)'}}></div>
              <h3 className={styles.cardTitle}>Zapier</h3>
              <p className={styles.cardDesc}>Warm corporate automation.</p>
            </Link>
            <Link to="/veloscope" className={styles.card}>
              <div className={styles.cardImage} style={{backgroundImage: `url(${getAssetUrl('/assets/veloscope_hero_bg.png')})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              <h3 className={styles.cardTitle}>Veloscope</h3>
              <p className={styles.cardDesc}>Studio Ghibli style high-converting SaaS landing page.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
