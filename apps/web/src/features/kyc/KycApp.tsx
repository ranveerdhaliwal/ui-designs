import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './KycApp.module.css';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Accordion } from '@/components/ui/Accordion';
import { Panel } from '@/components/ui/Panel';
import { KycCanvas, KycControls } from './KycCanvas';

export const KycApp = () => {
  const [controls, setControls] = useState<KycControls>({
    headRotation: 41,
    faceShape: -13,
    perspective: 55,
    lightDirection: -42,
    lightElevation: 29,
    lightSoftness: 36,
    lineSpacing: 21,
    inkWeight: 18,
    inkVariance: 0,
    whiteSpace: 11
  });

  const [invert, setInvert] = useState(false);

  const updateControl = (key: keyof KycControls, value: number) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'kyc-portrait.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>ALL</Link>
          <Link to="/kyc" className={`${styles.navLink} ${styles.active}`}>CREATE</Link>
          <span className={styles.navLink} style={{opacity: 0.5, cursor: 'not-allowed'}}>STORY</span>
        </nav>
        <span>PATRON EDITION SUPPLY <strong>—</strong></span>
      </header>

      <div className={styles.workspace}>
        <Panel side="left" className={styles.leftPanel}>
          <div className={styles.auctionCard}>
            <div className={styles.auctionTitle}>
              KYC 1/1 AUCTION <span className={styles.liveBadge}>LIVE</span>
            </div>
            <div className={styles.statRow}>
              <span>TOP BID</span>
              <strong>—</strong>
              <span>CURRENT</span>
            </div>
            <div className={styles.statRow}>
              <span>PATRON SUPPLY</span>
              <strong>—</strong>
              <span>— EDITION</span>
            </div>
            <div className={styles.statRow} style={{marginTop: '1rem'}}>
              <strong>AUCTION ENDED</strong>
              <span style={{color: 'rgba(255,255,255,0.5)'}}>VIEW / BID ↗</span>
            </div>
          </div>

          <div className={styles.saveSection}>
            <div className={styles.saveHeading}>
              <span>PATRON ACCESS</span>
              <a href="#">EDITION 6 ↗</a>
            </div>
            <Button variant="primary" fullWidth>CONNECT WALLET</Button>
            <p className={styles.saveStatus}>
              CONNECT THE WALLET THAT HOLDS THE KYC PATRON EDITION.
            </p>
          </div>
        </Panel>

        <section className={styles.stage}>
          <div className={styles.canvasWrap}>
            <KycCanvas controls={controls} invert={invert} />
          </div>
          <div className={styles.primaryActions}>
            <Button variant="secondary" onClick={() => setControls({...controls, headRotation: 0, lightDirection: 0})}>RESET</Button>
            <Button variant="secondary" onClick={() => setInvert(!invert)}>
              INVERT {invert ? 'ON' : 'OFF'}
            </Button>
            <Button variant="outline" onClick={handleDownload}>DOWNLOAD PNG</Button>
            <Button variant="outline" disabled>360 GIF</Button>
            <Button variant="outline" disabled>SCAN GIF</Button>
          </div>
        </section>

        <Panel side="right" className={styles.rightPanel}>
          <Accordion title="HEAD" defaultOpen>
            <div className={styles.controls}>
              <Slider
                label="ROTATE HEAD"
                min={-65} max={65} value={controls.headRotation}
                formatValue={(v) => `${v}°`}
                onChange={(v) => updateControl('headRotation', v)}
              />
              <Slider
                label="FACE SHAPE"
                min={-75} max={0} value={controls.faceShape}
                formatValue={(v) => `${Math.abs(v)}% ANGULAR`}
                onChange={(v) => updateControl('faceShape', v)}
              />
              <Slider
                label="PERSPECTIVE"
                min={10} max={125} value={controls.perspective}
                formatValue={(v) => `${v}%`}
                onChange={(v) => updateControl('perspective', v)}
              />
            </div>
          </Accordion>

          <Accordion title="LIGHT" defaultOpen>
            <div className={styles.controls}>
              <Slider
                label="LIGHT DIRECTION"
                min={-120} max={120} value={controls.lightDirection}
                formatValue={(v) => `${v}°`}
                onChange={(v) => updateControl('lightDirection', v)}
              />
              <Slider
                label="LIGHT ELEVATION"
                min={5} max={88} value={controls.lightElevation}
                formatValue={(v) => `${v}°`}
                onChange={(v) => updateControl('lightElevation', v)}
              />
              <Slider
                label="SOFTNESS"
                min={0} max={100} value={controls.lightSoftness}
                formatValue={(v) => `${v}%`}
                onChange={(v) => updateControl('lightSoftness', v)}
              />
            </div>
          </Accordion>

          <Accordion title="INK" defaultOpen>
            <div className={styles.controls}>
              <Slider
                label="LINE SPACING"
                min={10} max={50} value={controls.lineSpacing}
                formatValue={(v) => `${v}PX`}
                onChange={(v) => updateControl('lineSpacing', v)}
              />
              <Slider
                label="INK WEIGHT"
                min={5} max={40} value={controls.inkWeight}
                formatValue={(v) => `${v}PX`}
                onChange={(v) => updateControl('inkWeight', v)}
              />
              <Slider
                label="INK VARIANCE"
                min={0} max={200} value={controls.inkVariance}
                formatValue={(v) => `${v}%`}
                onChange={(v) => updateControl('inkVariance', v)}
              />
              <Slider
                label="WHITE SPACE"
                min={5} max={55} value={controls.whiteSpace}
                formatValue={(v) => `${v}%`}
                onChange={(v) => updateControl('whiteSpace', v)}
              />
            </div>
          </Accordion>
        </Panel>
      </div>

      <footer className={styles.footer}>
        <span>GNM HEAD / 170 IDENTITY + 383 EXPRESSION COEFFICIENTS / APACHE 2.0</span>
        <span>1080 × 1080</span>
      </footer>
    </div>
  );
};
