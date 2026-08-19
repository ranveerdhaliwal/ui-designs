import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import styles from "./BotlabApp.module.css";
import {
  Bot,
  Part,
  BODIES,
  HEADS,
  EYES,
  MOUTHS,
  TOPS,
  PALETTES,
  INTROS,
  IDLES,
  PRESETS,
  BOT_KEYS,
  SLOTS,
  randomBot,
  composeGrid,
  paint,
  total,
  frameAt,
} from "./botlabData";
import { exportGif, exportPng } from "./gifEncoder";
import { StickerOverlay, primeMotionPermission } from "./BotlabSticker";
import { SpriteStudio } from "./SpriteStudio";

function SpriteCanvas({
  bot: b,
  scale,
  intro = false,
  phase = 0,
  dark = false,
  customParts,
  className = "",
}: {
  bot: Bot;
  scale: number;
  intro?: boolean;
  phase?: number;
  dark?: boolean;
  customParts?: {
    body?: Part;
    head?: Part;
    eyes?: Part;
    mouth?: Part;
    top?: Part;
  };
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(ctx, b, scale, {}, dark, customParts);
      return;
    }

    const introFrames = INTROS[b.intro]?.frames || INTROS[0].frames;
    const idleFrames = IDLES[b.idle]?.frames || IDLES[0].frames;
    const introTotal = intro ? total(introFrames) : 0;
    const idleTotal = total(idleFrames);
    const start = performance.now();
    let raf = 0;
    let last = "";

    const tick = (now: number) => {
      const t = Math.max(0, now - start);
      const anim =
        t < introTotal
          ? frameAt(introFrames, t)
          : frameAt(idleFrames, (t - introTotal + phase) % idleTotal);
      const key = JSON.stringify(anim);
      if (key !== last) {
        last = key;
        paint(ctx, b, scale, anim, dark, customParts);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [b, scale, intro, phase, dark, customParts]);

  return (
    <canvas
      ref={ref}
      width={16 * scale}
      height={16 * scale}
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export function BotlabApp() {
  const [activeTab, setActiveTab] = useState<"constructor" | "studio">("constructor");
  const [current, setCurrent] = useState<Bot>(PRESETS[0].bot);
  const [sheet, setSheet] = useState<Bot[]>([]);
  const [saved, setSaved] = useState<Bot[]>([]);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showSticker, setShowSticker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customParts, setCustomParts] = useState<{
    body?: Part;
    head?: Part;
    eyes?: Part;
    mouth?: Part;
    top?: Part;
  }>({});

  const [sysDark, setSysDark] = useState(false);
  const dark = theme ? theme === "dark" : sysDark;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSysDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSysDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setSheet(Array.from({ length: 16 }, randomBot));
    try {
      const stored: Partial<Bot>[] = JSON.parse(
        localStorage.getItem("botlab-saved-v2") ?? "[]",
      );
      setSaved(stored.map((s) => ({ ...PRESETS[0].bot, ...s })));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: Bot[]) => {
    setSaved(next);
    localStorage.setItem("botlab-saved-v2", JSON.stringify(next));
  };

  const savedIdx = saved.findIndex((b) =>
    BOT_KEYS.every((k) => b[k] === current[k]),
  );

  const stickerGrid = useMemo(() => composeGrid(current, {}, customParts), [current, customParts]);
  const stickerColors = useMemo<Record<string, string>>(
    () => ({ ...PALETTES[current.palette].colors }),
    [current.palette],
  );

  const handleApplyCustomPart = (slot: "body" | "head" | "eyes" | "mouth" | "top", part: Part) => {
    setCustomParts((prev) => ({ ...prev, [slot]: part }));
    setActiveTab("constructor");
  };

  return (
    <div className={styles.container} data-theme={theme ?? (sysDark ? "dark" : "light")}>
      <div className={styles.wrapper}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleBreadcrumb}>
              <Link to="/">home</Link> /{" "}
            </span>
            botlab
          </h1>
          <button
            className={styles.themeBtn}
            onClick={() =>
              setTheme(
                theme === null ? "light" : theme === "light" ? "dark" : null,
              )
            }
          >
            theme: {theme ?? "auto"}
          </button>
        </header>

        <p className={styles.tagline}>8-bit robot sprite mascot constructor & pixel maker studio</p>

        {/* Navigation Tabs */}
        <nav className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === "constructor" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("constructor")}
          >
            ✦ mascot constructor
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "studio" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("studio")}
          >
            ✎ sprite maker studio
          </button>
        </nav>

        {activeTab === "studio" ? (
          <SpriteStudio
            activeBot={current}
            onApplyCustomPart={handleApplyCustomPart}
            onUpdateBot={setCurrent}
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
                />
              </div>

              {/* Zoom Switcher */}
              <div className={styles.zoomRow}>
                {[0.25, 0.5, 1, 1.5].map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoom(z)}
                    className={`${styles.zoomBtn} ${z === zoom ? styles.activeZoom : ""}`}
                  >
                    {z}x
                  </button>
                ))}
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
                    setCustomParts({});
                    setCurrent(randomBot());
                  }}
                >
                  randomize
                </button>
                <button
                  className={styles.actionBtn}
                  title={savedIdx >= 0 ? "remove from saved" : "save to collection"}
                  onClick={() =>
                    persist(
                      savedIdx >= 0
                        ? saved.filter((_, i) => i !== savedIdx)
                        : [...saved, current],
                    )
                  }
                >
                  {savedIdx >= 0 ? "♥ saved" : "♡ save"}
                </button>

                {/* Export Dropdown */}
                <div style={{ position: "relative" }}>
                  <button
                    className={styles.actionBtn}
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    export ▾
                  </button>
                  {menuOpen && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "100%",
                        marginTop: "0.25rem",
                        background: dark ? "#1a1d24" : "#ffffff",
                        border: "1px solid var(--border-color)",
                        borderRadius: "6px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                        zIndex: 30,
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "140px",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          textAlign: "left",
                          padding: "0.5rem 0.8rem",
                          color: "inherit",
                          fontSize: "0.8rem",
                          cursor: "pointer",
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
                          background: "transparent",
                          border: "none",
                          textAlign: "left",
                          padding: "0.5rem 0.8rem",
                          color: "inherit",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setMenuOpen(false);
                          exportGif(current, customParts);
                        }}
                      >
                        animated GIF
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
                          style={{ color: "#00ffcc" }}
                        >
                          * {custom.name} (custom)
                        </button>
                      )}
                      {parts.map((p, idx) => {
                        const isSelected = current[slot as keyof Bot] === idx && !custom;
                        return (
                          <button
                            key={p.name}
                            className={`${styles.chipBtn} ${isSelected ? styles.activeChip : ""}`}
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
                      className={`${styles.chipBtn} ${current.intro === idx ? styles.activeChip : ""}`}
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
                      className={`${styles.chipBtn} ${current.idle === idx ? styles.activeChip : ""}`}
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
                        className={`${styles.chipBtn} ${isSelected ? styles.activeChip : ""}`}
                        onClick={() => setCurrent({ ...current, palette: idx })}
                      >
                        <span style={{ display: "inline-flex", gap: "1px" }}>
                          {[...p.name].map((char, cIdx) => {
                            const colKeys = [p.colors.a, p.colors.b, p.colors.c, p.colors.d, p.colors.e];
                            const color = colKeys[cIdx % colKeys.length];
                            return (
                              <span key={cIdx} style={{ color }}>
                                {char}
                              </span>
                            );
                          })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Presets */}
              <div className={styles.pickerRow} style={{ marginTop: "1rem" }}>
                <span className={styles.pickerLabel}>presets</span>
                <div className={styles.chipsScroll}>
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      className={styles.chipBtn}
                      onClick={() => {
                        setCustomParts({});
                        setCurrent(preset.bot);
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

        {/* Contact Sheet / Gallery */}
        <section className={styles.contactSheetSection}>
          <div className={styles.contactSheetHeader}>
            <h2 style={{ fontSize: "1.1rem", margin: 0 }}>contact sheet</h2>
            <button
              className={styles.themeBtn}
              onClick={() => setSheet(Array.from({ length: 16 }, randomBot))}
            >
              reroll sheet
            </button>
          </div>

          <div className={styles.contactSheetGrid}>
            {sheet.map((botItem, idx) => (
              <div
                key={idx}
                className={styles.contactCard}
                onClick={() => {
                  setCustomParts({});
                  setCurrent(botItem);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                title="Click to load mascot"
              >
                <SpriteCanvas bot={botItem} scale={4} phase={idx * 200} dark={dark} />
              </div>
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
