import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './BotlabApp.module.css';
import {
  Bot,
  IDLES,
  INTROS,
  PALETTES,
  PRESETS,
  Part,
  SLOTS,
  composeGrid,
  randomBot,
} from './botlabData';
import { StickerOverlay, primeMotionPermission } from './BotlabSticker';
import { SpriteCanvas } from './SpriteCanvas';
import { EditorToolbar } from '@/components/ui/EditorToolbar';
import { useStoredHistory } from '@/hooks/useStoredHistory';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';
import { useStoredState } from '@/hooks/useStoredState';
import { downloadBlob, downloadCanvas } from '@/lib/download';
import { paint, frameAt, total } from './botlabData';
import {
  initialProject,
  isProject,
  isCollection,
  legacyCollection,
  type BotProject,
  type CustomParts,
} from './botProject';
import { exportGif, exportPng } from './gifEncoder';
import { SpriteStudio } from './SpriteStudio';

export function BotlabApp() {
  const [activeTab, setActiveTab] = useState<'constructor' | 'studio'>('constructor');
  const history = useStoredHistory<BotProject>('botlab-draft-v1', initialProject, isProject);
  const { bot: current, parts: customParts } = history.value;
  const setCurrent = (bot: Bot) => history.set((p) => ({ ...p, bot }));
  const setCustomParts = (value: CustomParts | ((p: CustomParts) => CustomParts)) =>
    history.set((p) => ({ ...p, parts: typeof value === 'function' ? value(p.parts) : value }));
  const loadBot = (bot: Bot) => history.set({ version: 1, bot, parts: {} });
  const [sheet, setSheet] = useState<Bot[]>([]);
  const [saved, setSaved, persisted] = useStoredState(
    'botlab-collection-v3',
    legacyCollection(),
    isCollection,
  );
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [zoom, setZoom] = useState(1);
  const [paused, setPaused] = useState(false);
  const [seek, setSeek] = useState(0);
  const [showSticker, setShowSticker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [storageMessage, setStorageMessage] = useState('');
  const exportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: PointerEvent) => {
      if (!exportRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', key);
    };
  }, [menuOpen]);
  const [sysDark, setSysDark] = useState(false);
  const dark = theme ? theme === 'dark' : sysDark;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSysDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSysDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    setSheet(Array.from({ length: 16 }, randomBot));
  }, []);
  const persist = (next: BotProject[]) => {
    setSaved(next);
    setStorageMessage('Collection updated.');
  };
  const savedIdx = saved.findIndex((p) => JSON.stringify(p) === JSON.stringify(history.value));
  const save = () => {
    if (savedIdx < 0 && saved.length < 100) persist([...saved, history.value]);
  };
  useEditorShortcuts({
    undo: activeTab === 'constructor' ? history.undo : () => {},
    redo: activeTab === 'constructor' ? history.redo : () => {},
    save,
  });
  const importRef = useRef<HTMLInputElement>(null);
  const stickerGrid = useMemo(() => composeGrid(current, {}, customParts), [current, customParts]);
  const stickerColors = useMemo<Record<string, string>>(
    () => ({ ...PALETTES[current.palette].colors }),
    [current.palette],
  );

  const handleApplyCustomPart = (slot: 'body' | 'head' | 'eyes' | 'mouth' | 'top', part: Part) => {
    setCustomParts((prev) => ({ ...prev, [slot]: part }));
    setActiveTab('constructor');
  };

  return (
    <div className={styles.container} data-theme={theme ?? (sysDark ? 'dark' : 'light')}>
      <div className={styles.wrapper}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>botlab</h1>
          <button
            className={styles.themeBtn}
            onClick={() => setTheme(theme === null ? 'light' : theme === 'light' ? 'dark' : null)}
          >
            theme: {theme ?? 'auto'}
          </button>
        </header>

        <p className={styles.tagline}>
          A tiny character. A world of possibilities. Build, animate, and export your own pixel
          companion.
        </p>

        {/* Navigation Tabs */}
        <nav className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'constructor' ? styles.activeTab : ''}`}
            aria-pressed={activeTab === 'constructor'}
            onClick={() => setActiveTab('constructor')}
          >
            ✦ mascot constructor
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'studio' ? styles.activeTab : ''}`}
            aria-pressed={activeTab === 'studio'}
            onClick={() => setActiveTab('studio')}
          >
            ✎ sprite maker studio
          </button>
        </nav>

        {activeTab === 'constructor' && (
          <div className={styles.projectBar}>
            <EditorToolbar {...history} reset={() => history.set(initialProject)} />
            <button className={styles.actionBtn} onClick={() => importRef.current?.click()}>
              Open project
            </button>
            <input
              ref={importRef}
              aria-label="Import BotLab project"
              type="file"
              accept="application/json,.json"
              className="sr-only"
              tabIndex={-1}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if (!file) return;
                try {
                  if (file.size > 100000) throw new Error();
                  const value: unknown = JSON.parse(await file.text());
                  if (!isProject(value)) throw new Error();
                  history.set(value);
                  setStorageMessage('Project opened.');
                } catch {
                  setStorageMessage('Choose a valid BotLab project JSON under 100 KB.');
                }
              }}
            />
          </div>
        )}
        {activeTab === 'studio' ? (
          <SpriteStudio
            activeBot={current}
            onApplyCustomPart={handleApplyCustomPart}
            customParts={customParts}
            dark={dark}
          />
        ) : (
          /* Constructor Main Layout */
          <div className={styles.mainLayout}>
            {/* Left: Canvas viewport + Zoom + Actions */}
            <div className={styles.canvasColumn}>
              <div className={styles.canvasWrapper}>
                <SpriteCanvas
                  bot={current}
                  scale={Math.round(20 * zoom)}
                  intro
                  dark={dark}
                  customParts={customParts}
                  paused={paused}
                  seek={seek}
                />
              </div>

              {/* Zoom Switcher */}
              <div className={styles.zoomRow}>
                {[0.25, 0.5, 1, 1.5].map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoom(z)}
                    className={`${styles.zoomBtn} ${z === zoom ? styles.activeZoom : ''}`}
                  >
                    {z}x
                  </button>
                ))}
              </div>

              <div className={styles.timeline}>
                <button
                  className={styles.actionBtn}
                  aria-pressed={paused}
                  onClick={() => setPaused(!paused)}
                >
                  {paused ? 'Play animation' : 'Pause animation'}
                </button>
                <label>
                  Idle timeline
                  <input
                    type="range"
                    min="0"
                    max={Math.max(1, total(IDLES[current.idle]!.frames) - 1)}
                    value={Math.min(seek, total(IDLES[current.idle]!.frames) - 1)}
                    onChange={(e) => {
                      setPaused(true);
                      setSeek(Number(e.target.value));
                    }}
                  />
                </label>
              </div>
              {/* Action Buttons */}
              <div className={styles.actionRow}>
                <button
                  className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                  onClick={() => {
                    primeMotionPermission();
                    setShowSticker(true);
                  }}
                >
                  hologram sticker
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => {
                    loadBot(randomBot());
                  }}
                >
                  randomize
                </button>
                <button
                  className={styles.actionBtn}
                  disabled={saved.length >= 100 && savedIdx < 0}
                  title={savedIdx >= 0 ? 'remove from saved' : 'save to collection'}
                  onClick={() =>
                    persist(
                      savedIdx >= 0
                        ? saved.filter((_, i) => i !== savedIdx)
                        : [...saved, history.value],
                    )
                  }
                >
                  {savedIdx >= 0 ? '♥ saved' : '♡ save'}
                </button>

                {/* Export Dropdown */}
                <div ref={exportRef} style={{ position: 'relative' }}>
                  <button
                    className={styles.actionBtn}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    export ▾
                  </button>
                  {menuOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '100%',
                        marginTop: '0.25rem',
                        background: dark ? '#1a1d24' : '#ffffff',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        zIndex: 30,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '140px',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        style={{
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          padding: '0.5rem 0.8rem',
                          color: 'inherit',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setMenuOpen(false);
                          exportPng(current, customParts);
                        }}
                      >
                        PNG sprite
                      </button>
                      <button
                        style={{
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          padding: '0.5rem 0.8rem',
                          color: 'inherit',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setMenuOpen(false);
                          exportGif(current, customParts);
                        }}
                      >
                        animated GIF
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => {
                          downloadBlob(
                            new Blob([JSON.stringify(history.value, null, 2)], {
                              type: 'application/json',
                            }),
                            'botlab-project.json',
                          );
                          setMenuOpen(false);
                        }}
                      >
                        Project JSON
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={async () => {
                          try {
                            const strip = document.createElement('canvas');
                            strip.width = 12 * 128;
                            strip.height = 128;
                            const ctx = strip.getContext('2d')!;
                            const tile = document.createElement('canvas');
                            tile.width = tile.height = 128;
                            const tileCtx = tile.getContext('2d')!;
                            const frames = IDLES[current.idle]!.frames;
                            for (let i = 0; i < 12; i++) {
                              paint(
                                tileCtx,
                                current,
                                8,
                                frameAt(frames, (total(frames) * i) / 12),
                                false,
                                customParts,
                              );
                              ctx.drawImage(tile, i * 128, 0);
                            }
                            await downloadCanvas(strip, 'botlab-spritesheet-12-frames.png');
                            setStorageMessage('12-frame sprite sheet exported.');
                          } catch {
                            setStorageMessage('Sprite sheet export failed. Please retry.');
                          }
                          setMenuOpen(false);
                        }}
                      >
                        Sprite sheet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Layered Part Pickers & Palettes */}
            <div className={styles.controlsColumn}>
              {SLOTS.map(([slot, parts]) => {
                const custom = customParts[slot as keyof typeof customParts];
                return (
                  <div key={slot} className={styles.pickerRow}>
                    <span className={styles.pickerLabel}>{slot}</span>
                    <div className={styles.chipsScroll}>
                      {custom && (
                        <button
                          className={`${styles.chipBtn} ${styles.activeChip}`}
                          style={{ color: '#00ffcc' }}
                        >
                          * {custom.name} (custom)
                        </button>
                      )}
                      {parts.map((p, idx) => {
                        const isSelected = current[slot as keyof Bot] === idx && !custom;
                        return (
                          <button
                            key={p.name}
                            aria-pressed={isSelected}
                            className={`${styles.chipBtn} ${isSelected ? styles.activeChip : ''}`}
                            onClick={() => {
                              setCustomParts((prev) => {
                                const copy = { ...prev };
                                delete copy[slot as keyof typeof customParts];
                                return copy;
                              });
                              setCurrent({ ...current, [slot]: idx });
                            }}
                          >
                            {p.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Intro & Idle Animation Pickers */}
              <div className={styles.pickerRow}>
                <span className={styles.pickerLabel}>intro</span>
                <div className={styles.chipsScroll}>
                  {INTROS.map((v, idx) => (
                    <button
                      key={v.name}
                      aria-pressed={current.intro === idx}
                      className={`${styles.chipBtn} ${current.intro === idx ? styles.activeChip : ''}`}
                      onClick={() => setCurrent({ ...current, intro: idx })}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.pickerRow}>
                <span className={styles.pickerLabel}>idle</span>
                <div className={styles.chipsScroll}>
                  {IDLES.map((v, idx) => (
                    <button
                      key={v.name}
                      aria-pressed={current.idle === idx}
                      className={`${styles.chipBtn} ${current.idle === idx ? styles.activeChip : ''}`}
                      onClick={() => setCurrent({ ...current, idle: idx })}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Palette Picker */}
              <div className={styles.pickerRow}>
                <span className={styles.pickerLabel}>palette</span>
                <div className={styles.chipsScroll}>
                  {PALETTES.map((p, idx) => {
                    const isSelected = current.palette === idx;
                    return (
                      <button
                        key={p.name}
                        aria-pressed={isSelected}
                        className={`${styles.chipBtn} ${isSelected ? styles.activeChip : ''}`}
                        onClick={() => setCurrent({ ...current, palette: idx })}
                      >
                        <span className={styles.paletteSwatch} aria-hidden="true">
                          {[p.colors.a, p.colors.b, p.colors.c].map((color, i) => (
                            <i key={i} style={{ background: color }} />
                          ))}
                        </span>
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Presets */}
              <div className={styles.pickerRow} style={{ marginTop: '1rem' }}>
                <span className={styles.pickerLabel}>presets</span>
                <div className={styles.chipsScroll}>
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      className={styles.chipBtn}
                      onClick={() => {
                        loadBot(preset.bot);
                      }}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <p role="status" className={styles.storageMessage}>
          {!persisted
            ? 'Storage unavailable. Export a project to keep your work.'
            : storageMessage ||
              'Draft autosaved on this device · Ctrl/⌘ Z to undo · Ctrl/⌘ S to save'}
        </p>
        {saved.length > 0 && (
          <section className={styles.contactSheetSection} aria-label="Saved robot collection">
            <div className={styles.contactSheetHeader}>
              <h2>
                Saved on this device <span>({saved.length})</span>
              </h2>
            </div>
            <div className={styles.contactSheetGrid}>
              {saved.map((bot, i) => (
                <button
                  type="button"
                  key={i}
                  className={styles.contactCard}
                  aria-label={`Load saved robot ${i + 1}`}
                  onClick={() => {
                    history.set(bot);
                    setActiveTab('constructor');
                  }}
                >
                  <SpriteCanvas bot={bot.bot} customParts={bot.parts} scale={4} dark={dark} />
                </button>
              ))}
            </div>
          </section>
        )}
        {/* Contact Sheet / Gallery */}
        <section className={styles.contactSheetSection}>
          <div className={styles.contactSheetHeader}>
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>contact sheet</h2>
            <button
              className={styles.themeBtn}
              onClick={() => setSheet(Array.from({ length: 16 }, randomBot))}
            >
              reroll sheet
            </button>
          </div>

          <div className={styles.contactSheetGrid}>
            {sheet.map((botItem, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Load robot ${idx + 1}`}
                className={styles.contactCard}
                onClick={() => {
                  loadBot(botItem);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                title="Click to load mascot"
              >
                <SpriteCanvas bot={botItem} scale={4} phase={idx * 200} dark={dark} />
              </button>
            ))}
          </div>
        </section>

        {/* Holographic Sticker Modal */}
        {showSticker && (
          <StickerOverlay
            grid={stickerGrid}
            colors={stickerColors}
            onClose={() => setShowSticker(false)}
          />
        )}
      </div>
    </div>
  );
}
