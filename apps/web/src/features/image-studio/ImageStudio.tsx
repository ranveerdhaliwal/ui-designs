import { Slider } from '@/components/ui/Slider';
import { getAssetUrl } from '@/lib/assetUtils';
import { downloadCanvas } from '@/lib/download';
import { Download, Image as ImageIcon, RotateCcw, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PALETTES } from './DitherEngine';
import { type DotPattern } from './HalftoneEngine';
import styles from './ImageStudio.module.css';
import { EditorToolbar } from '@/components/ui/EditorToolbar';
import { useStoredHistory } from '@/hooks/useStoredHistory';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';
import { processPrint } from './processPrint';
import { initialRecipe, isRecipe, defaults, type PrintRecipe, type Effect } from './printSettings';
const presets = [
  ['#234e52', '#f0e5c9'],
  ['#c7462b', '#f7dfac'],
  ['#31275b', '#d7d4ec'],
  ['#132f2a', '#cbe5af'],
];
export function ImageStudio() {
  const history = useStoredHistory<PrintRecipe>('print-studio-recipe-v1', initialRecipe, isRecipe);
  const { effect, settings, pattern, palette, colors } = history.value;
  const setEffect = (effect: Effect) => history.set((p) => ({ ...p, effect }));
  const setPattern = (pattern: DotPattern) => history.set((p) => ({ ...p, pattern }));
  const setPalette = (palette: string) => history.set((p) => ({ ...p, palette }));
  const setColors = (colors: string[]) => history.set((p) => ({ ...p, colors }));
  const [source, setSource] = useState(getAssetUrl('/assets/david.jpg'));
  const [split, setSplit] = useState(50);
  const [exportSize, setExportSize] = useState(1800);
  const [exporting, setExporting] = useState(false);
  useEditorShortcuts(history);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [original, setOriginal] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [ready, setReady] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const exportJob = useRef<AbortController | null>(null);
  useEffect(() => () => exportJob.current?.abort(), []);
  useEffect(() => {
    setReady(false);
    setError('');
    setImage(null);
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setImage(img);
    };
    img.onerror = () => {
      if (!cancelled) setError('This image could not be opened. Choose a PNG, JPEG, or WebP file.');
    };
    img.src = source;
    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [source]);
  useEffect(() => {
    if (!image || !canvas.current) return;
    setReady(false);
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const result = await processPrint(image, history.value, 900, controller.signal);
        if (controller.signal.aborted || !canvas.current) return;
        const target = canvas.current;
        target.width = result.width;
        target.height = result.height;
        target.getContext('2d')?.drawImage(result, 0, 0);
        setReady(true);
        setError('');
      } catch (error) {
        if (!controller.signal.aborted)
          setError(error instanceof Error ? error.message : 'Processing failed.');
      }
    }, 80);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [image, history.value]);
  useEffect(
    () => () => {
      if (source.startsWith('blob:')) URL.revokeObjectURL(source);
    },
    [source],
  );
  const slider = (
    label: string,
    key: keyof typeof defaults,
    min: number,
    max: number,
    step = 1,
  ) => (
    <Slider
      key={key}
      label={label}
      value={settings[key]}
      min={min}
      max={max}
      step={step}
      onChange={(value) =>
        history.set((p) => ({ ...p, settings: { ...p.settings, [key]: value } }), key)
      }
    />
  );
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>
          <ImageIcon size={18} />
          <h1>Print Studio</h1>
          <span>Digital tools. Analog feeling.</span>
        </div>
        <button
          disabled={!ready || exporting}
          onClick={async () => {
            try {
              if (image) {
                setExporting(true);
                exportJob.current?.abort();
                const controller = new AbortController();
                exportJob.current = controller;
                const output = await processPrint(
                  image,
                  history.value,
                  exportSize,
                  controller.signal,
                );
                await downloadCanvas(output, `print-studio-${effect}.png`);
                setMessage('PNG exported.');
              }
            } catch {
              setError('Export failed. Please try a different image.');
            } finally {
              setExporting(false);
            }
          }}
        >
          <Download size={15} /> {exporting ? 'Exporting…' : 'Export PNG'}
        </button>
      </header>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.tabs} role="group" aria-label="Print process">
            {(['riso', 'halftone', 'dither'] as const).map((e) => (
              <button key={e} aria-pressed={effect === e} onClick={() => setEffect(e)}>
                {e === 'riso' ? 'Risograph' : e === 'dither' ? 'Dither' : 'Halftone'}
              </button>
            ))}
          </div>
          <div className={styles.source}>
            <img src={source} alt="Source image" />
            <button onClick={() => fileInput.current?.click()}>
              <Upload size={14} /> Choose image
            </button>
            <input
              ref={fileInput}
              aria-label="Upload source image"
              type="file"
              className="sr-only"
              tabIndex={-1}
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (
                  !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) ||
                  file.size > 20 * 1024 * 1024
                ) {
                  setError('Choose a PNG, JPEG, or WebP image under 20 MB.');
                  return;
                }
                setSource(URL.createObjectURL(file));
                setMessage('');
              }}
            />
          </div>
          <div className={styles.settings}>
            <EditorToolbar
              undo={history.undo}
              redo={history.redo}
              canUndo={history.canUndo}
              canRedo={history.canRedo}
            />
            <label className={styles.selectLabel}>
              Export longest edge
              <select value={exportSize} onChange={(e) => setExportSize(Number(e.target.value))}>
                <option value={900}>900 px</option>
                <option value={1800}>1800 px</option>
                <option value={2400}>2400 px</option>
              </select>
            </label>
            {effect === 'halftone' && (
              <>
                <label className={styles.selectLabel}>
                  Dot pattern
                  <select
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value as DotPattern)}
                  >
                    <option value="hex">Hexagonal</option>
                    <option value="square">Square</option>
                    <option value="radial">Radial</option>
                  </select>
                </label>
                <div className={styles.presets}>
                  {presets.map((p, i) => (
                    <button
                      key={i}
                      aria-label={`Ink palette ${i + 1}`}
                      aria-pressed={colors.join() === p.join()}
                      onClick={() => setColors(p)}
                    >
                      {p.map((color) => (
                        <span key={color} style={{ background: color }} />
                      ))}
                    </button>
                  ))}
                </div>
                {slider('Dot size', 'dotSize', 3, 30, 0.5)}
                {slider('Sharpness', 'sharpness', 0.1, 3, 0.1)}
                {slider('Screen angle', 'screenAngle', 0, 180)}
                {slider('Brightness', 'brightness', -0.5, 0.5, 0.05)}
                {slider('Contrast', 'contrast', 0.5, 2, 0.05)}
              </>
            )}
            {effect === 'dither' && (
              <>
                <label className={styles.selectLabel}>
                  Color palette
                  <select value={palette} onChange={(e) => setPalette(e.target.value)}>
                    {Object.entries(PALETTES).map(([id, p]) => (
                      <option key={id} value={id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                {slider('Contrast', 'contrast', 0.5, 2, 0.05)}
              </>
            )}
            {effect === 'riso' && (
              <>
                {slider('Horizontal registration', 'offsetX', -20, 20)}
                {slider('Vertical registration', 'offsetY', -20, 20)}
                {slider('Paper grain', 'grain', 0, 0.5, 0.01)}
                <p className={styles.hint}>
                  A slight misalignment brings a little human character to every impression.
                </p>
              </>
            )}
            <button
              className={styles.reset}
              onClick={() => {
                history.set({ ...initialRecipe, effect });
              }}
            >
              <RotateCcw size={13} /> Reset adjustments
            </button>
          </div>
        </aside>
        <section className={styles.workspace}>
          <div className={styles.canvasBar}>
            <span>{effect === 'riso' ? 'RISOGRAPH' : effect.toUpperCase()} / PRINT PREVIEW</span>
            <button aria-pressed={original} onClick={() => setOriginal(!original)}>
              {original ? 'Show processed' : 'Compare original'}
            </button>
          </div>
          <div className={styles.paper}>
            <div className={styles.comparison}>
              <canvas ref={canvas} aria-label="Processed image preview" />
              {original && (
                <>
                  <img
                    src={source}
                    alt="Original image for comparison"
                    style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
                  />
                  <span className={styles.divider} style={{ left: `${split}%` }} />
                  <span className={styles.originalLabel}>ORIGINAL</span>
                </>
              )}
            </div>
          </div>
          {original && (
            <label className={styles.compareSlider}>
              Original / print comparison
              <input
                type="range"
                min="0"
                max="100"
                value={split}
                onChange={(e) => setSplit(Number(e.target.value))}
              />
            </label>
          )}
          <footer className={styles.status}>
            <span role={error ? 'alert' : 'status'}>
              {error ||
                message ||
                (!ready
                  ? 'Preparing your print…'
                  : 'Processed locally. Your image stays on this device.')}
            </span>
            <span>
              {canvas.current?.width ?? 0} × {canvas.current?.height ?? 0}
            </span>
          </footer>
        </section>
      </div>
    </main>
  );
}
