import { Slider } from '@/components/ui/Slider';
import { ChromaticWaves } from '@/components/origins/ChromaticWaves';
import { LiquidDistortion } from '@/components/origins/LiquidDistortion';
import { PrismGrid } from '@/components/origins/PrismGrid';
import { ReactiveLines } from '@/components/origins/ReactiveLines';
import { WaveArcs } from '@/components/origins/WaveArcs';
import { getAssetUrl } from '@/lib/assetUtils';
import React, { useState } from 'react';
import styles from './OriginsLabLanding.module.css';

type ComponentKey =
  'reactive-lines' | 'wave-arcs' | 'liquid-distortion' | 'prism-grid' | 'chromatic-waves';

export function OriginsLabLanding() {
  const [density, setDensity] = useState(40);
  const [intensity, setIntensity] = useState(40);
  const [color, setColor] = useState('#b5cadc');
  const [activeComponent, setActiveComponent] = useState<ComponentKey>('reactive-lines');

  const components: Record<
    ComponentKey,
    { name: string; component: React.ReactNode; description: string }
  > = {
    'reactive-lines': {
      name: 'Reactive Lines',
      description: 'Curved lines that bend toward your cursor in real time.',
      component: <ReactiveLines color={color} lineCount={density} />,
    },
    'wave-arcs': {
      name: 'Wave Arcs',
      description: 'A glowing field of pulsing concentric arcs.',
      component: <WaveArcs color={color} arcCount={Math.round(density / 3)} />,
    },
    'liquid-distortion': {
      name: 'Liquid Distortion',
      description: 'Hover to reveal a fluid, watery displacement effect.',
      component: (
        <LiquidDistortion intensity={intensity} className={styles.componentWrapper || ''}>
          <img
            src={getAssetUrl('/assets/david.jpg')}
            alt="Liquid"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </LiquidDistortion>
      ),
    },
    'prism-grid': {
      name: 'Prism Grid',
      description: 'Refractive grid lines that illuminate under your mouse.',
      component: (
        <PrismGrid
          rows={Math.round(density / 4)}
          cols={Math.round(density / 4)}
          gridColor={color + '44'}
        />
      ),
    },
    'chromatic-waves': {
      name: 'Chromatic Waves',
      description: 'RGB-split sine waves mixing with screen blend modes.',
      component: <ChromaticWaves speed={intensity / 1000} />,
    },
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Field Studies</h1>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Components</h2>
          {(Object.keys(components) as ComponentKey[]).map((key) => (
            <button
              key={key}
              className={`${styles.navBtn} ${activeComponent === key ? styles.active : ''}`}
              aria-pressed={activeComponent === key}
              onClick={() => setActiveComponent(key)}
            >
              {components[key].name}
            </button>
          ))}
          <div className={styles.parameters}>
            {['reactive-lines', 'wave-arcs', 'prism-grid'].includes(activeComponent) ? (
              <>
                <Slider label="Density" min={12} max={80} value={density} onChange={setDensity} />
                <label>
                  Line color
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
              </>
            ) : (
              <Slider
                label={activeComponent === 'chromatic-waves' ? 'Movement speed' : 'Displacement'}
                min={5}
                max={80}
                value={intensity}
                onChange={setIntensity}
              />
            )}
          </div>
        </aside>

        <main className={styles.workspace}>
          <div className={styles.componentWrapper}>{components[activeComponent].component}</div>

          <div className={styles.overlayText}>
            <h2>{components[activeComponent].name}</h2>
            <p>{components[activeComponent].description}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
