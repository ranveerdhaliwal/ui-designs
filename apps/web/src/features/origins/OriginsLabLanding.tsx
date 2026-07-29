import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ReactiveLines } from '@/components/origins/ReactiveLines';
import { WaveArcs } from '@/components/origins/WaveArcs';
import { LiquidDistortion } from '@/components/origins/LiquidDistortion';
import { PrismGrid } from '@/components/origins/PrismGrid';
import { ChromaticWaves } from '@/components/origins/ChromaticWaves';
import styles from './OriginsLabLanding.module.css';

type ComponentKey = 'reactive-lines' | 'wave-arcs' | 'liquid-distortion' | 'prism-grid' | 'chromatic-waves';

export function OriginsLabLanding() {
  const [activeComponent, setActiveComponent] = useState<ComponentKey>('reactive-lines');

  const components: Record<ComponentKey, { name: string, component: React.ReactNode, description: string }> = {
    'reactive-lines': {
      name: 'Reactive Lines',
      description: 'Curved lines that bend toward your cursor in real time.',
      component: <ReactiveLines />
    },
    'wave-arcs': {
      name: 'Wave Arcs',
      description: 'A glowing field of pulsing concentric arcs.',
      component: <WaveArcs />
    },
    'liquid-distortion': {
      name: 'Liquid Distortion',
      description: 'Hover to reveal a fluid, watery displacement effect.',
      component: (
        <LiquidDistortion intensity={40} className={styles.componentWrapper || ''}>
          <img 
            src="/assets/david.jpg" 
            alt="Liquid" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </LiquidDistortion>
      )
    },
    'prism-grid': {
      name: 'Prism Grid',
      description: 'Refractive grid lines that illuminate under your mouse.',
      component: <PrismGrid />
    },
    'chromatic-waves': {
      name: 'Chromatic Waves',
      description: 'RGB-split sine waves mixing with screen blend modes.',
      component: <ChromaticWaves />
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Advanced Origins Effects</h1>
        <Link to="/" className={styles.backBtn}>&larr; Back to Hub</Link>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Components</h2>
          {(Object.keys(components) as ComponentKey[]).map((key) => (
            <button
              key={key}
              className={`${styles.navBtn} ${activeComponent === key ? styles.active : ''}`}
              onClick={() => setActiveComponent(key)}
            >
              {components[key].name}
            </button>
          ))}
        </aside>

        <main className={styles.workspace}>
          <div className={styles.componentWrapper}>
            {components[activeComponent].component}
          </div>
          
          <div className={styles.overlayText}>
            <h1>{components[activeComponent].name}</h1>
            <p>{components[activeComponent].description}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
