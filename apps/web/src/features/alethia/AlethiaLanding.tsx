import { useRef, useState, type PointerEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Compass,
  Crosshair,
  Download,
  Layers,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useStoredState } from '@/hooks/useStoredState';
import { getAssetUrl } from '@/lib/assetUtils';
import { downloadBlob } from '@/lib/download';
import {
  constrainView,
  initialView,
  isNotes,
  layers,
  months,
  observations,
  zoomView,
  type Layer,
} from './atlasData';
import styles from './AlethiaLanding.module.css';
export function AlethiaLanding() {
  const [layer, setLayer] = useState<Layer>('Landscape');
  const [view, setView] = useState(initialView);
  const [point, setPoint] = useState(0);
  const [month, setMonth] = useState(5);
  const [notes, setNotes, persisted] = useStoredState<Record<string, string>>(
    'alethia-notes-v1',
    {},
    isNotes,
  );
  const [message, setMessage] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const area = observations[point]!;
  const pan = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !viewport.current) return;
    const { panX, panY, x, y } = drag.current;
    const { clientWidth, clientHeight } = viewport.current;
    setView((v) =>
      constrainView({
        ...v,
        x: panX + ((e.clientX - x) / clientWidth) * 100,
        y: panY + ((e.clientY - y) / clientHeight) * 100,
      }),
    );
  };
  const exportStudy = () => {
    downloadBlob(
      new Blob(
        [
          JSON.stringify(
            {
              schema: 'alethia-study-v1',
              dataset: 'Illustrative landscape, not observed geographic measurements',
              layer,
              month: months[month],
              observation: area.id,
              view,
              notes,
            },
            null,
            2,
          ),
        ],
        { type: 'application/json' },
      ),
      'alethia-field-notes.json',
    );
    setMessage('Field notes exported.');
  };
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="#/alethia" className={styles.brand}>
          <Crosshair size={23} />
          alethia<span>earth</span>
        </a>
        <span className={styles.headerCaption}>A FIELD GUIDE TO CONNECTION</span>
        <button onClick={exportStudy}>
          <Download size={15} />
          Export field notes
        </button>
      </header>
      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>FIELD ATLAS / STUDY 001</p>
          <h1>
            Look closer.
            <br />
            <em>Everything connects.</em>
          </h1>
        </div>
        <div className={styles.introAside}>
          <Compass size={30} />
          <p>
            Follow the land, trace the water,
            <br />
            and find the patterns in between.
          </p>
          <span>THREE OBSERVATIONS · FOUR PERSPECTIVES</span>
        </div>
      </section>
      <section className={styles.workspace} aria-label="Interactive field atlas">
        <div className={styles.mapColumn}>
          <div className={styles.mapToolbar}>
            <span>
              <Layers size={14} />
              The valley study
            </span>
            <SegmentedControl
              label="Map layer"
              value={layer}
              onChange={setLayer}
              options={layers.map((value) => ({ value, label: value }))}
            />
          </div>
          <div
            ref={viewport}
            className={styles.viewport}
            tabIndex={0}
            role="group"
            aria-label="Landscape map. Use arrow keys to pan, plus and minus to zoom."
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
              if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                e.preventDefault();
                setView((v) =>
                  constrainView({
                    ...v,
                    x: v.x + (e.key === 'ArrowRight' ? -8 : e.key === 'ArrowLeft' ? 8 : 0),
                    y: v.y + (e.key === 'ArrowDown' ? -8 : e.key === 'ArrowUp' ? 8 : 0),
                  }),
                );
              }
              if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                setView((v) => zoomView(v, v.zoom + 0.25));
              }
              if (e.key === '-') {
                e.preventDefault();
                setView((v) => zoomView(v, v.zoom - 0.25));
              }
            }}
            onPointerDown={(e) => {
              if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = { x: e.clientX, y: e.clientY, panX: view.x, panY: view.y };
            }}
            onPointerMove={pan}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
          >
            <div
              className={styles.mapPlane}
              data-layer={layer}
              style={{ transform: `translate(${view.x}%,${view.y}%) scale(${view.zoom})` }}
            >
              <img
                src={getAssetUrl('/assets/motionsites/floren_hd_landscape.jpg')}
                alt="Illustrated valley with cultivated fields, wooded ridges, and a hilltop village"
                draggable={false}
              />
              <svg
                className={styles.overlay}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {layer === 'Canopy' && (
                  <g
                    fill="#9dcc77"
                    fillOpacity={0.25 + area.canopy[month]! / 250}
                    stroke="#d4ecc1"
                    strokeWidth=".3"
                  >
                    <path d="M4 64Q14 54 31 60T48 66L39 72L23 71Z" />
                    <path d="M64 59Q76 52 96 59L94 67L70 65Z" />
                  </g>
                )}
                {layer === 'Water' && (
                  <g fill="none" stroke="#bbecf4" strokeWidth={0.5 + area.water[month]! / 150}>
                    <path d="M79 57Q65 67 61 78T47 89T20 99" />
                    <path d="M24 62Q39 74 61 78" />
                    <path d="M89 81Q73 84 47 89" />
                  </g>
                )}
                {layer === 'Elevation' && (
                  <g fill="none" stroke="#ece6c4" strokeWidth=".23" opacity=".75">
                    {Array.from({ length: 12 }, (_, i) => (
                      <path
                        key={i}
                        d={`M${2 + i * 2} ${36 + i * 4} Q${20 + i} ${5 + i * 4} ${48 + i} ${35 + i * 3} T${103 + i} ${22 + i * 5}`}
                      />
                    ))}
                  </g>
                )}
              </svg>
              {observations.map((o, i) => (
                <button
                  key={o.id}
                  className={styles.pin}
                  style={{
                    left: `${o.x}%`,
                    top: `${o.y}%`,
                    transform: `translate(-50%,-50%) scale(${1 / view.zoom})`,
                  }}
                  aria-pressed={point === i}
                  aria-label={`Explore ${o.name}`}
                  onClick={() => {
                    setPoint(i);
                    setShowNotes(false);
                  }}
                >
                  <span />
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <div className={styles.mapCaption}>
              <span>ILLUSTRATIVE LANDSCAPE</span>
              <span>
                Move through the view <ArrowUpRight size={12} />
              </span>
            </div>
            <div className={styles.zoom}>
              <button
                aria-label="Zoom in"
                disabled={view.zoom >= 3}
                onClick={() => setView((v) => zoomView(v, v.zoom + 0.25))}
              >
                <Plus size={17} />
              </button>
              <output aria-label="Map zoom">{Math.round(view.zoom * 100)}%</output>
              <button
                aria-label="Zoom out"
                disabled={view.zoom <= 1}
                onClick={() => setView((v) => zoomView(v, v.zoom - 0.25))}
              >
                <Minus size={17} />
              </button>
              <button aria-label="Reset map view" onClick={() => setView(initialView)}>
                <RotateCcw size={14} />
              </button>
            </div>
            <div className={styles.mapScale}>
              <span />
              SCHEMATIC / NOT TO SCALE
            </div>
          </div>
          <div className={styles.seasons}>
            <div>
              <span>SEASONAL RECORD</span>
              <strong>
                {months[month]} <small>2026</small>
              </strong>
            </div>
            <label>
              <span className="sr-only">Observation month</span>
              <input
                type="range"
                min="0"
                max="11"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              />
              <div>
                {['JAN', 'APR', 'JUL', 'OCT', 'DEC'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </label>
            <span className={styles.sample}>
              Sample data
              <br />
              for exploration
            </span>
          </div>
        </div>
        <aside className={styles.inspector}>
          <div className={styles.inspectorTop}>
            <span>OBSERVATION {String(point + 1).padStart(2, '0')}</span>
            <MapPin size={16} />
          </div>
          <p className={styles.kind}>{area.kind}</p>
          <h2>{area.name}</h2>
          <p className={styles.description}>{area.description}</p>
          <div className={styles.metrics}>
            <div>
              <span>Canopy cover</span>
              <strong>
                {area.canopy[month]}
                <small>%</small>
              </strong>
            </div>
            <div>
              <span>Water index</span>
              <strong>
                {area.water[month]}
                <small>/100</small>
              </strong>
            </div>
          </div>
          <div
            className={styles.chart}
            role="group"
            aria-label={`Illustrative canopy cover by month. ${months[month]}: ${area.canopy[month]} percent.`}
          >
            {area.canopy.map((v, i) => (
              <button
                key={i}
                aria-label={`Select ${months[i]}`}
                aria-pressed={i === month}
                onClick={() => setMonth(i)}
              >
                <span style={{ height: `${v}%` }} />
              </button>
            ))}
          </div>
          <div className={styles.chartCaption}>
            <span>CANOPY / JAN–DEC</span>
            <span>ILLUSTRATIVE</span>
          </div>
          <dl className={styles.facts}>
            <div>
              <dt>Study area</dt>
              <dd>{area.area} ha</dd>
            </div>
            <div>
              <dt>Elevation band</dt>
              <dd>{area.elevation} m</dd>
            </div>
          </dl>
          <div className={styles.fieldNote}>
            <button aria-expanded={showNotes} onClick={() => setShowNotes(!showNotes)}>
              {notes[area.id] ? 'Your field note' : 'Add a field note'}
              <ArrowDown size={15} />
            </button>
            {showNotes ? (
              <>
                <label htmlFor="field-note">{area.question}</label>
                <textarea
                  id="field-note"
                  maxLength={600}
                  value={notes[area.id] ?? ''}
                  onChange={(e) => setNotes({ ...notes, [area.id]: e.target.value })}
                  placeholder="What do you notice?"
                />
                <span>
                  <Check size={12} />
                  {persisted ? 'Saved on this device' : 'Saved for this visit only'}
                </span>
              </>
            ) : (
              <p>{notes[area.id] || area.question}</p>
            )}
          </div>
          <div className={styles.observationNav}>
            {observations.map((o, i) => (
              <button
                key={o.id}
                aria-label={`Select observation ${i + 1}`}
                aria-pressed={point === i}
                onClick={() => setPoint(i)}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </aside>
      </section>
      <footer className={styles.footer}>
        <p>
          <span />A landscape is more than the sum of its parts.
        </p>
        <span role="status">
          {message || 'Authored illustration and sample measurements · Local field notes'}
        </span>
      </footer>
    </main>
  );
}
