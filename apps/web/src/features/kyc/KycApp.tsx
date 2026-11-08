import { useHistoryState } from '@/hooks/useHistoryState';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';
import { EditorToolbar } from '@/components/ui/EditorToolbar';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { Slider } from '@/components/ui/Slider';
import { downloadCanvas } from '@/lib/download';
import { useRef, useState } from 'react';
import styles from './KycApp.module.css';
import { KycCanvas, KycControls } from './KycCanvas';

const DEFAULT_CONTROLS: KycControls = {
  headRotation: 41,
  faceShape: -13,
  perspective: 55,
  lightDirection: -42,
  lightElevation: 29,
  lightSoftness: 36,
  lineSpacing: 21,
  inkWeight: 18,
  inkVariance: 0,
  whiteSpace: 11,
};
export const KycApp = () => {
  const history = useHistoryState<KycControls>(DEFAULT_CONTROLS);
  const controls = history.value;
  const setControls = history.set;
  useEditorShortcuts(history);
  const stageRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('Drag the sculpture to change your perspective.');
  const [invert, setInvert] = useState(false);

  const updateControl = (key: keyof KycControls, value: number) => {
    setControls((prev) => ({ ...prev, [key]: value }), key);
  };

  const handleDownload = async () => {
    const canvas = stageRef.current?.querySelector('canvas');
    if (!canvas) {
      setMessage('The preview is not ready yet.');
      return;
    }
    try {
      await downloadCanvas(canvas, 'contour-studio.png');
      setMessage(`Exported ${canvas.width} × ${canvas.height} PNG.`);
    } catch {
      setMessage('The image could not be exported. Try again.');
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Contour Studio</h1>
        <span>LIGHT / FORM / IMPRESSION</span>
      </header>
      <div className={styles.workspace}>
        <Panel side="left" className={styles.leftPanel}>
          <div className={styles.intro}>
            <span>MAKE AN IMPRESSION</span>
            <h2>
              One form.
              <br />
              Endless
              <br />
              expression.
            </h2>
            <p>
              Explore how light becomes ink. Shape the sculpture, move the light, and find a mark
              that feels your own.
            </p>
          </div>
          <div className={styles.presets}>
            <span>START WITH A STUDY</span>
            {[
              {
                name: 'Soft graphite',
                values: { lightSoftness: 70, inkWeight: 14, lineSpacing: 14, headRotation: 25 },
              },
              {
                name: 'Deep etching',
                values: { lightSoftness: 12, inkWeight: 30, lineSpacing: 24, headRotation: -28 },
              },
              {
                name: 'Open contour',
                values: { lightSoftness: 45, inkWeight: 12, lineSpacing: 32, headRotation: 0 },
              },
            ].map((p) => (
              <Button
                key={p.name}
                variant="ghost"
                onClick={() => setControls({ ...DEFAULT_CONTROLS, ...p.values })}
              >
                {p.name} ↗
              </Button>
            ))}
          </div>
        </Panel>

        <section className={styles.stage}>
          <div className={styles.canvasWrap} ref={stageRef}>
            <KycCanvas controls={controls} invert={invert} />
          </div>
          <EditorToolbar
            undo={history.undo}
            redo={history.redo}
            canUndo={history.canUndo}
            canRedo={history.canRedo}
          />
          <div className={styles.primaryActions}>
            <Button
              variant="secondary"
              onClick={() => {
                setControls(DEFAULT_CONTROLS);
                setInvert(false);
              }}
            >
              RESET
            </Button>
            <Button variant="secondary" onClick={() => setInvert(!invert)}>
              INVERT {invert ? 'ON' : 'OFF'}
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              DOWNLOAD PNG
            </Button>
          </div>
        </section>

        <Panel side="right" className={styles.rightPanel}>
          <Accordion title="HEAD" defaultOpen>
            <div className={styles.controls}>
              <Slider
                label="ROTATE HEAD"
                min={-65}
                max={65}
                value={controls.headRotation}
                formatValue={(v) => `${v}°`}
                onChange={(v) => updateControl('headRotation', v)}
              />
              <Slider
                label="FACE SHAPE"
                min={-75}
                max={0}
                value={controls.faceShape}
                formatValue={(v) => `${Math.abs(v)}% ANGULAR`}
                onChange={(v) => updateControl('faceShape', v)}
              />
              <Slider
                label="PERSPECTIVE"
                min={10}
                max={125}
                value={controls.perspective}
                formatValue={(v) => `${v}%`}
                onChange={(v) => updateControl('perspective', v)}
              />
            </div>
          </Accordion>

          <Accordion title="LIGHT" defaultOpen>
            <div className={styles.controls}>
              <Slider
                label="LIGHT DIRECTION"
                min={-120}
                max={120}
                value={controls.lightDirection}
                formatValue={(v) => `${v}°`}
                onChange={(v) => updateControl('lightDirection', v)}
              />
              <Slider
                label="LIGHT ELEVATION"
                min={5}
                max={88}
                value={controls.lightElevation}
                formatValue={(v) => `${v}°`}
                onChange={(v) => updateControl('lightElevation', v)}
              />
              <Slider
                label="SOFTNESS"
                min={0}
                max={100}
                value={controls.lightSoftness}
                formatValue={(v) => `${v}%`}
                onChange={(v) => updateControl('lightSoftness', v)}
              />
            </div>
          </Accordion>

          <Accordion title="INK" defaultOpen>
            <div className={styles.controls}>
              <Slider
                label="LINE SPACING"
                min={10}
                max={50}
                value={controls.lineSpacing}
                formatValue={(v) => `${v}PX`}
                onChange={(v) => updateControl('lineSpacing', v)}
              />
              <Slider
                label="INK WEIGHT"
                min={5}
                max={40}
                value={controls.inkWeight}
                formatValue={(v) => `${v}PX`}
                onChange={(v) => updateControl('inkWeight', v)}
              />
              <Slider
                label="INK VARIANCE"
                min={0}
                max={200}
                value={controls.inkVariance}
                formatValue={(v) => `${v}%`}
                onChange={(v) => updateControl('inkVariance', v)}
              />
              <Slider
                label="WHITE SPACE"
                min={5}
                max={55}
                value={controls.whiteSpace}
                formatValue={(v) => `${v}%`}
                onChange={(v) => updateControl('whiteSpace', v)}
              />
            </div>
          </Accordion>
        </Panel>
      </div>

      <footer className={styles.footer}>
        <span role="status">{message}</span>
        <span>CONTOUR / LOCAL STUDIO</span>
      </footer>
    </div>
  );
};
