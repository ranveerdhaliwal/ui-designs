import React, { useState, useEffect, useRef } from 'react';
import { HalftoneEngine, HalftoneOptions, DotPattern } from './HalftoneEngine';
import { DitherEngine, PALETTES } from './DitherEngine';
import { RisoEngine } from './RisoEngine';
import { drawImageToCanvas } from '@/lib/canvasUtils';
import { getAssetUrl } from '@/lib/assetUtils';
import styles from './ImageStudio.module.css';

const PRESETS = [
  ['#FF3B30', '#00FFFF'], // Red / Cyan
  ['#D32F2F', '#1976D2'], // Deep Red / Blue
  ['#795548', '#FFC107'], // Brown / Gold
  ['#F44336', '#4CAF50'], // Red / Green
  ['#E64A19', '#607D8B'], // Orange / Slate
  ['#FF9800', '#212121'], // Orange / Dark
];

export function ImageStudio() {
  const [activeEffect, setActiveEffect] = useState<'halftone' | 'dither' | 'riso'>('riso');
  const [imageSrc, setImageSrc] = useState(getAssetUrl('/assets/david.jpg'));
  
  // Halftone state
  const [pattern, setPattern] = useState<DotPattern>('hex');
  const [colorBg, setColorBg] = useState('#00FFFF');
  const [colorFg, setColorFg] = useState('#FF3B30');
  const [dotSize, setDotSize] = useState(13.5);
  const [sharpness, setSharpness] = useState(2.2);
  const [screenAngle, setScreenAngle] = useState(69);
  const [brightness, setBrightness] = useState(0.08);
  const [contrast, setContrast] = useState(1.0);

  // Dither state
  const [ditherPalette, setDitherPalette] = useState('retroPC');
  const [ditherContrast, setDitherContrast] = useState(1.0);

  // Riso state
  const [risoOffsetX, setRisoOffsetX] = useState(5);
  const [risoOffsetY, setRisoOffsetY] = useState(5);
  const [risoGrain, setRisoGrain] = useState(0.15);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<HalftoneEngine | null>(null);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new HalftoneEngine();
    }
  }, []);

  useEffect(() => {
    if (!engineRef.current || !canvasRef.current) return;
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = () => {
      // Use shared utility for image scaling and canvas setup
      const { ctx, width: w, height: h } = drawImageToCanvas(canvasRef.current!, img);

      if (activeEffect === 'halftone') {
        const options: HalftoneOptions = {
          dotSize,
          sharpness,
          screenAngle,
          brightness,
          contrast,
          pattern,
          colorBg,
          colorFg
        };
        engineRef.current!.render(canvasRef.current!, img, options);
      } else if (activeEffect === 'dither') {
        DitherEngine.applyFloydSteinberg(ctx, w, h, ditherPalette, ditherContrast);
      } else if (activeEffect === 'riso') {
        RisoEngine.applyRisograph(ctx, w, h, risoOffsetX, risoOffsetY, risoGrain);
      }
    };
  }, [imageSrc, pattern, colorBg, colorFg, dotSize, sharpness, screenAngle, brightness, contrast, activeEffect, ditherPalette, ditherContrast, risoOffsetX, risoOffsetY, risoGrain]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span style={{ fontSize: '1.2rem' }}>&#127912;</span> IMAGE STUDIO
        </div>
        
        <div className={styles.tabs}>
          <button 
            className={activeEffect === 'halftone' ? styles.activeTab : ''}
            onClick={() => setActiveEffect('halftone')}
          >Halftone</button>
          <button 
            className={activeEffect === 'dither' ? styles.activeTab : ''}
            onClick={() => setActiveEffect('dither')}
          >Retro Dither</button>
          <button 
            className={activeEffect === 'riso' ? styles.activeTab : ''}
            onClick={() => setActiveEffect('riso')}
          >Risograph</button>
        </div>

        <div className={styles.section}>
          <div className={styles.imagePreview}>
            <img src={imageSrc} alt="Source" />
          </div>
          <label className={styles.changeImageBtn} style={{ display: 'block', textAlign: 'center' }}>
            &#8682; Change Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {activeEffect === 'halftone' && (
          <>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Dot Pattern</div>
              <div className={styles.buttonGroup}>
                <button className={`${styles.groupBtn} ${pattern === 'square' ? styles.active : ''}`} onClick={() => setPattern('square')}>Square</button>
                <button className={`${styles.groupBtn} ${pattern === 'hex' ? styles.active : ''}`} onClick={() => setPattern('hex')}>Hex</button>
                <button className={`${styles.groupBtn} ${pattern === 'radial' ? styles.active : ''}`} onClick={() => setPattern('radial')}>Radial</button>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Colors</div>
              <div className={styles.colorRow}>
                <input type="color" className={styles.colorPicker} value={colorFg} onChange={e => setColorFg(e.target.value)} />
                <button className={styles.swapBtn} onClick={() => {
                  const temp = colorFg;
                  setColorFg(colorBg);
                  setColorBg(temp);
                }}>&#8651;</button>
                <input type="color" className={styles.colorPicker} value={colorBg} onChange={e => setColorBg(e.target.value)} />
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <div className={styles.sectionTitle} style={{ marginBottom: 0 }}>Choose a color preset</div>
                <div className={styles.presets}>
                  {PRESETS.map((p, i) => (
                    <div key={i} className={styles.presetPair} onClick={() => { setColorFg(p[0]!); setColorBg(p[1]!); }}>
                      <div style={{ backgroundColor: p[0] }}></div>
                      <div style={{ backgroundColor: p[1] }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Dot Size</span>
                  <span className={styles.sliderVal}>{dotSize.toFixed(1)}</span>
                </div>
                <input type="range" className={styles.slider} min="2" max="50" step="0.5" value={dotSize} onChange={e => setDotSize(parseFloat(e.target.value))} />
              </div>

              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Sharpness</span>
                  <span className={styles.sliderVal}>{sharpness.toFixed(1)}</span>
                </div>
                <input type="range" className={styles.slider} min="0.1" max="3" step="0.1" value={sharpness} onChange={e => setSharpness(parseFloat(e.target.value))} />
              </div>

              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Screen Angle</span>
                  <span className={styles.sliderVal}>{screenAngle}&deg;</span>
                </div>
                <input type="range" className={styles.slider} min="0" max="360" step="1" value={screenAngle} onChange={e => setScreenAngle(parseFloat(e.target.value))} />
              </div>
            </div>
            
            <div className={styles.section} style={{ borderBottom: 'none' }}>
              <div className={styles.sectionTitle}>Image Adjustments</div>
              
              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Brightness</span>
                  <span className={styles.sliderVal}>{brightness.toFixed(2)}</span>
                </div>
                <input type="range" className={styles.slider} min="-1" max="1" step="0.01" value={brightness} onChange={e => setBrightness(parseFloat(e.target.value))} />
              </div>

              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span>Contrast</span>
                  <span className={styles.sliderVal}>{contrast.toFixed(2)}</span>
                </div>
                <input type="range" className={styles.slider} min="0" max="3" step="0.05" value={contrast} onChange={e => setContrast(parseFloat(e.target.value))} />
              </div>
            </div>
          </>
        )}

        {activeEffect === 'dither' && (
          <div className={styles.section} style={{ borderBottom: 'none' }}>
            <div className={styles.sectionTitle}>Dithering Controls</div>
            <div className={styles.sliderRow} style={{ marginBottom: '1.5rem' }}>
              <div className={styles.sliderHeader}>
                <span>Color Palette</span>
              </div>
              <select 
                value={ditherPalette} 
                onChange={(e) => setDitherPalette(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '4px', marginTop: '0.5rem', fontFamily: 'monospace' }}
              >
                {Object.entries(PALETTES).map(([key, p]) => (
                  <option key={key} value={key}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Contrast</span>
                <span className={styles.sliderVal}>{ditherContrast.toFixed(2)}</span>
              </div>
              <input type="range" className={styles.slider} min="0.5" max="3" step="0.05" value={ditherContrast} onChange={e => setDitherContrast(parseFloat(e.target.value))} />
            </div>
          </div>
        )}

        {activeEffect === 'riso' && (
          <div className={styles.section} style={{ borderBottom: 'none' }}>
            <div className={styles.sectionTitle}>Riso Misregistration</div>
            
            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Offset X</span>
                <span className={styles.sliderVal}>{risoOffsetX}px</span>
              </div>
              <input type="range" className={styles.slider} min="-20" max="20" step="1" value={risoOffsetX} onChange={e => setRisoOffsetX(parseFloat(e.target.value))} />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Offset Y</span>
                <span className={styles.sliderVal}>{risoOffsetY}px</span>
              </div>
              <input type="range" className={styles.slider} min="-20" max="20" step="1" value={risoOffsetY} onChange={e => setRisoOffsetY(parseFloat(e.target.value))} />
            </div>

            <div className={styles.sectionTitle} style={{ marginTop: '1.5rem' }}>Paper Texture</div>

            <div className={styles.sliderRow}>
              <div className={styles.sliderHeader}>
                <span>Grain Intensity</span>
                <span className={styles.sliderVal}>{risoGrain.toFixed(2)}</span>
              </div>
              <input type="range" className={styles.slider} min="0" max="1" step="0.05" value={risoGrain} onChange={e => setRisoGrain(parseFloat(e.target.value))} />
            </div>
          </div>
        )}
      </div>

      <div className={styles.workspace}>
        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} className={styles.canvas} />
        </div>
      </div>
    </div>
  );
}
