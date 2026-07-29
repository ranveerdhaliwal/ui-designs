import React from 'react';
import { Link } from '@tanstack/react-router';
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
              <div className={styles.cardImage} style={{backgroundImage: 'url(/assets/oasis_bg.png)', backgroundSize: 'cover'}}></div>
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
              <div className={styles.cardImage} style={{background: '#0F1F10'}}></div>
              <h3 className={styles.cardTitle}>Alethia Earth</h3>
              <p className={styles.cardDesc}>Deep tech geospatial intelligence.</p>
            </Link>
            <Link to="/scroll-world" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)'}}></div>
              <h3 className={styles.cardTitle}>Scroll World</h3>
              <p className={styles.cardDesc}>Cinematic video scrubbing synced perfectly to scroll.</p>
            </Link>
            <Link to="/shopify" className={styles.card}>
              <div className={styles.cardImage} style={{background: '#000000'}}></div>
              <h3 className={styles.cardTitle}>Shopify Editions</h3>
              <p className={styles.cardDesc}>Winter '26. Animated WebGL & Massive Typography.</p>
            </Link>
            <Link to="/originkit" className={styles.card}>
              <div className={styles.cardImage} style={{background: 'linear-gradient(135deg, #7C3AED, #000000)'}}></div>
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
              <div className={styles.cardImage} style={{background: '#111'}}></div>
              <h3 className={styles.cardTitle}>Eragon.ai</h3>
              <p className={styles.cardDesc}>AI Operating System (Minimalist Serif).</p>
            </Link>
            <Link to="/big-bold-hero" className={`${styles.card} ${styles.cardWide}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>&#10022;</div>
              <h3>Big Bold Hero</h3>
            </div>
            <p>Ostra, Lumen Gate, and Vanta cinematic themes.</p>
          </Link>
          {/* @ts-ignore */}
          <Link to="/conversion" className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>&#9673;</div>
              <h3>Conversion</h3>
            </div>
            <p>Agentic marketing layout with textured noise and stepped gradients.</p>
          </Link>
          {/* @ts-ignore */}
          <Link to="/quasar" className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>&#10036;</div>
              <h3>Quasar Showcase</h3>
            </div>
            <p>Extreme dark-mode gradient showcase and glassmorphism UI.</p>
          </Link>
          {/* @ts-ignore */}
          <Link to="/aeterna" className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>&#9823;</div>
              <h3>Aeterna</h3>
            </div>
            <p>Vintage risograph and halftone texture aesthetic with elegant serif.</p>
          </Link>
          {/* @ts-ignore */}
          <Link to="/presentations" className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>&#10034;</div>
              <h3>Editorial Presentations</h3>
            </div>
            <p>CSS Grid presentation engine (Brand Guide, Aurora, Atlas).</p>
          </Link>
          {/* @ts-ignore */}
          <Link to="/effects-lab" className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>&#8621;</div>
              <h3>Micro-Interactions Lab</h3>
            </div>
            <p>Hacker decoder text scramble and other micro-animations.</p>
          </Link>
          {/* @ts-ignore */}
          <Link to="/responsive-showcase" className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>&#128241;</div>
              <h3>Mobile Responsive UI</h3>
            </div>
            <p>Beautiful mobile-first layout primitives and app onboarding showcase.</p>
          </Link>
        </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tools & Generators</h2>
          <div className={styles.grid}>
            {/* @ts-ignore */}
            <Link to="/image-studio" className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>&#127912;</div>
                <h3>Image Studio</h3>
              </div>
              <p>Apply Halftone and 8-bit Retro Dithering effects programmatically.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/origins-lab" className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>&#10024;</div>
                <h3>Origins Lab</h3>
              </div>
              <p>Advanced OriginKit-inspired WebGL and Canvas visual effects.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/flying-papers" className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>&#128196;</div>
                <h3>Flying Papers</h3>
              </div>
              <p>Recreation of the interactive, spring-animated typography and scrolling experience.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/pixel-dreams" className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>&#127918;</div>
                <h3>Pixel Dreams</h3>
              </div>
              <p>A retro 8-bit gallery showcasing Floyd-Steinberg dithered pixel art.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/wellness-app" className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>&#127811;</div>
                <h3>Wellness App</h3>
              </div>
              <p>A mobile-first clean layout design with navigation and rounded UI components.</p>
            </Link>
            {/* @ts-ignore */}
            <Link to="/content-architecture" className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>&#9638;</div>
                <h3>Content Architecture</h3>
              </div>
              <p>1:1 clone featuring a hypnotic SVG text tunnel and ASCII scrambling.</p>
            </Link>
          </div>
        </section>

        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Corporate SaaS</h2>
          <p className={styles.categoryDesc}>Warm colors, soft shadows, and highly accessible layouts.</p>
          <div className={styles.grid}>
            <Link to="/zapier" className={styles.card}>
              <div className={styles.cardImage} style={{background: '#F8F4F0', borderBottom: '1px solid #E8E2DA'}}></div>
              <h3 className={styles.cardTitle}>Zapier</h3>
              <p className={styles.cardDesc}>Warm corporate automation.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
