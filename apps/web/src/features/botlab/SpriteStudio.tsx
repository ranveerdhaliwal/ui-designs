import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Part,
  Bot,
  PALETTES,
  SLOTS,
  BODIES,
  HEADS,
  EYES,
  MOUTHS,
  TOPS,
  paint,
  _,
} from "./botlabData";

type SlotType = "head" | "body" | "eyes" | "mouth" | "top";

type ToolType = "pencil" | "eraser" | "bucket" | "picker";

const SLOT_CHARS = [
  { char: ".", label: "Empty / Transp", desc: "Transparent pixel" },
  { char: "o", label: "Outline (o)", desc: "Outer & inner contour" },
  { char: "a", label: "Primary (a)", desc: "Main body color" },
  { char: "b", label: "Shade (b)", desc: "Darker accent/shadow" },
  { char: "c", label: "Accent (c)", desc: "Pop color details" },
  { char: "d", label: "Panel (d)", desc: "Inner face/belly highlight" },
  { char: "e", label: "Glow (e)", desc: "Eyes, LEDs, antennas" },
];

export function SpriteStudio({
  activeBot,
  onApplyCustomPart,
  onUpdateBot,
  dark,
}: {
  activeBot: Bot;
  onApplyCustomPart: (slot: SlotType, part: Part) => void;
  onUpdateBot: (updater: (prev: Bot) => Bot) => void;
  dark: boolean;
}) {
  const [targetSlot, setTargetSlot] = useState<SlotType>("head");
  const [partName, setPartName] = useState("my-head");
  const [grid, setGrid] = useState<string[]>(() => {
    return [...HEADS[activeBot.head].grid];
  });
  const [selectedChar, setSelectedChar] = useState("a");
  const [tool, setTool] = useState<ToolType>("pencil");
  const [symmetry, setSymmetry] = useState(true);
  const [history, setHistory] = useState<string[][]>([]);
  const [importText, setImportText] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const pal = PALETTES[activeBot.palette] || PALETTES[0];
  const colors: Record<string, string> = {
    ...pal.colors,
    o: dark ? pal.oDark : pal.colors.o,
    ".": "transparent",
  };

  const getStarterParts = useCallback((): Part[] => {
    switch (targetSlot) {
      case "body":
        return BODIES;
      case "head":
        return HEADS;
      case "eyes":
        return EYES;
      case "mouth":
        return MOUTHS;
      case "top":
        return TOPS;
    }
  }, [targetSlot]);

  // Load starter template when slot changes
  const handleSlotChange = (newSlot: SlotType) => {
    setTargetSlot(newSlot);
    setPartName(`custom-${newSlot}`);
    let starter: Part;
    if (newSlot === "body") starter = BODIES[activeBot.body];
    else if (newSlot === "head") starter = HEADS[activeBot.head];
    else if (newSlot === "eyes") starter = EYES[activeBot.eyes];
    else if (newSlot === "mouth") starter = MOUTHS[activeBot.mouth];
    else starter = TOPS[activeBot.top];

    setGrid([...starter.grid]);
    setHistory([]);
  };

  const saveHistory = () => {
    setHistory((prev) => [...prev.slice(-15), [...grid]]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setGrid([...prev]);
  };

  // Set pixel
  const setCell = (x: number, y: number, char: string) => {
    if (x < 0 || x >= 16 || y < 0 || y >= 16) return;
    setGrid((prev) => {
      const next = [...prev];
      const rowArr = [...next[y]];
      rowArr[x] = char;
      if (symmetry) {
        rowArr[15 - x] = char;
      }
      next[y] = rowArr.join("");
      return next;
    });
  };

  // Flood fill
  const floodFill = (startX: number, startY: number, targetChar: string) => {
    const origChar = grid[startY][startX];
    if (origChar === targetChar) return;
    saveHistory();

    const g = grid.map((r) => [...r]);
    const queue: [number, number][] = [[startX, startY]];
    const seen = new Set<string>();

    while (queue.length > 0) {
      const [x, y] = queue.pop()!;
      const key = `${x},${y}`;
      if (seen.has(key)) continue;
      seen.add(key);

      if (x < 0 || x >= 16 || y < 0 || y >= 16) continue;
      if (g[y][x] !== origChar) continue;

      g[y][x] = targetChar;
      if (symmetry) {
        g[y][15 - x] = targetChar;
      }

      queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    setGrid(g.map((r) => r.join("")));
  };

  // Draw grid onto editor canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvas.width / 16;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const ch = grid[y]?.[x] ?? ".";
        const px = x * cellSize;
        const py = y * cellSize;

        // Cell background
        if (ch === ".") {
          ctx.fillStyle = (x + y) % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.2)";
          ctx.fillRect(px, py, cellSize, cellSize);
        } else {
          ctx.fillStyle = colors[ch] ?? "#ff00ff";
          ctx.fillRect(px, py, cellSize, cellSize);
        }

        // Cell border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, cellSize, cellSize);
      }
    }

    // Symmetry guide line
    if (symmetry) {
      ctx.strokeStyle = "rgba(0, 255, 255, 0.35)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(8 * cellSize, 0);
      ctx.lineTo(8 * cellSize, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [grid, colors, symmetry]);

  // Live preview bot paint
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const customPartObj: Part = {
      name: partName,
      grid: grid,
    };

    const customParts = {
      [targetSlot]: customPartObj,
    };

    paint(ctx, activeBot, 8, {}, dark, customParts);
  }, [grid, activeBot, targetSlot, partName, dark]);

  // Handle pointer interactions on editor canvas
  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>, isStart = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * 16);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * 16);

    if (x < 0 || x >= 16 || y < 0 || y >= 16) return;

    if (isStart) {
      saveHistory();
      isDrawing.current = true;
    }

    if (!isDrawing.current && !isStart) return;

    if (tool === "picker") {
      const ch = grid[y]?.[x] ?? ".";
      setSelectedChar(ch);
      setTool("pencil");
      return;
    }

    if (tool === "bucket") {
      floodFill(x, y, selectedChar);
      return;
    }

    const charToPaint = tool === "eraser" ? "." : selectedChar;
    setCell(x, y, charToPaint);
  };

  // Nudge / Shift grid
  const nudge = (dx: number, dy: number) => {
    saveHistory();
    setGrid((prev) => {
      const next: string[] = Array(16).fill(_);
      for (let y = 0; y < 16; y++) {
        const ny = y + dy;
        if (ny < 0 || ny >= 16) continue;
        const rowArr = [..._];
        for (let x = 0; x < 16; x++) {
          const nx = x + dx;
          if (nx < 0 || nx >= 16) continue;
          rowArr[nx] = prev[y][x];
        }
        next[ny] = rowArr.join("");
      }
      return next;
    });
  };

  const handleApply = () => {
    const customPartObj: Part = {
      name: partName.trim() || `custom-${targetSlot}`,
      grid: grid,
    };
    onApplyCustomPart(targetSlot, customPartObj);
  };

  const exportAsciiString = () => {
    return JSON.stringify(grid, null, 2);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (Array.isArray(parsed) && parsed.length === 16) {
        saveHistory();
        setGrid(parsed.map((r) => (typeof r === "string" ? r.padEnd(16, ".").slice(0, 16) : _)));
        setImportText("");
      }
    } catch {
      alert("Invalid format! Expected a JSON array of 16 strings, e.g. [\"....\", ...]");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 bg-paper border border-faint/30 rounded-lg max-w-4xl mx-auto my-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-faint/20">
        <div>
          <h2 className="text-lg font-bold lowercase tracking-wider">sprite maker studio</h2>
          <p className="text-xs text-faint">draw custom 16×16 robot parts with palette slot binding</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-ink text-paper px-3 py-1 text-xs font-semibold rounded hover:opacity-80 transition-opacity"
            onClick={handleApply}
          >
            ✓ apply to mascot
          </button>
          <button
            className="border border-faint/40 px-2 py-1 text-xs rounded hover:opacity-60 transition-opacity"
            onClick={() => setShowExportModal(true)}
          >
            import / export
          </button>
        </div>
      </div>

      {/* Target Slot & Starter Part */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-faint uppercase font-mono w-16">editing:</span>
          <div className="flex gap-1">
            {(["head", "body", "eyes", "mouth", "top"] as SlotType[]).map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotChange(slot)}
                className={`px-2.5 py-1 text-xs rounded uppercase font-mono transition-all ${
                  targetSlot === slot
                    ? "bg-ink text-paper font-bold"
                    : "border border-faint/30 text-faint hover:text-ink"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-faint uppercase font-mono w-20">load base:</span>
          <select
            className="bg-paper border border-faint/40 text-xs px-2 py-1 rounded flex-1 lowercase text-ink"
            onChange={(e) => {
              const starter = getStarterParts().find((p) => p.name === e.target.value);
              if (starter) {
                saveHistory();
                setGrid([...starter.grid]);
                setPartName(starter.name);
              }
            }}
          >
            <option value="">choose template...</option>
            {getStarterParts().map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            className="border border-faint/40 px-2 py-1 text-xs rounded hover:opacity-60 text-faint"
            onClick={() => {
              saveHistory();
              setGrid(Array(16).fill(_));
            }}
          >
            clear
          </button>
        </div>
      </div>

      {/* Main Workspace: Canvas Editor + Palette + Live Preview */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Editor Canvas Area */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative border-2 border-faint/40 rounded p-1 bg-black/40 shadow-inner">
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="cursor-crosshair [image-rendering:pixelated] touch-none block"
              onPointerDown={(e) => handlePointer(e, true)}
              onPointerMove={(e) => handlePointer(e, false)}
              onPointerUp={() => {
                isDrawing.current = false;
              }}
              onPointerLeave={() => {
                isDrawing.current = false;
              }}
            />
          </div>

          {/* Tools & Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              className={`px-2 py-1 text-xs border rounded ${
                tool === "pencil" ? "bg-ink text-paper font-bold" : "border-faint/40 text-faint"
              }`}
              onClick={() => setTool("pencil")}
            >
              ✎ pencil
            </button>
            <button
              className={`px-2 py-1 text-xs border rounded ${
                tool === "eraser" ? "bg-ink text-paper font-bold" : "border-faint/40 text-faint"
              }`}
              onClick={() => setTool("eraser")}
            >
              ⌫ eraser
            </button>
            <button
              className={`px-2 py-1 text-xs border rounded ${
                tool === "bucket" ? "bg-ink text-paper font-bold" : "border-faint/40 text-faint"
              }`}
              onClick={() => setTool("bucket")}
            >
              ⯎ fill
            </button>
            <button
              className={`px-2 py-1 text-xs border rounded ${
                tool === "picker" ? "bg-ink text-paper font-bold" : "border-faint/40 text-faint"
              }`}
              onClick={() => setTool("picker")}
            >
              ⌕ eyedrop
            </button>

            <button
              className={`px-2 py-1 text-xs border rounded ${
                symmetry ? "border-cyan-400 text-cyan-400 font-bold" : "border-faint/40 text-faint"
              }`}
              onClick={() => setSymmetry(!symmetry)}
              title="Mirror left and right"
            >
              ⇋ symmetry {symmetry ? "ON" : "OFF"}
            </button>

            <button
              className="px-2 py-1 text-xs border border-faint/40 rounded text-faint hover:text-ink disabled:opacity-30"
              onClick={undo}
              disabled={history.length === 0}
            >
              ↶ undo
            </button>
          </div>

          {/* Nudge D-Pad */}
          <div className="flex items-center gap-1 text-xs text-faint">
            <span className="mr-1">shift:</span>
            <button className="border border-faint/40 px-1.5 py-0.5 rounded" onClick={() => nudge(0, -1)}>
              ↑
            </button>
            <button className="border border-faint/40 px-1.5 py-0.5 rounded" onClick={() => nudge(0, 1)}>
              ↓
            </button>
            <button className="border border-faint/40 px-1.5 py-0.5 rounded" onClick={() => nudge(-1, 0)}>
              ←
            </button>
            <button className="border border-faint/40 px-1.5 py-0.5 rounded" onClick={() => nudge(1, 0)}>
              →
            </button>
          </div>
        </div>

        {/* Right side: Palette Slot Brushes & Live Robot Preview */}
        <div className="flex-1 flex flex-col gap-5 w-full">
          {/* Palette Slots */}
          <div className="flex flex-col gap-2 bg-paper/60 p-3 rounded border border-faint/20">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">Palette Slot Brushes</span>
              <span className="text-xs text-faint">Theme: {pal.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SLOT_CHARS.map((slot) => {
                const isSelected = selectedChar === slot.char && tool !== "eraser";
                const swatchColor = colors[slot.char];
                return (
                  <button
                    key={slot.char}
                    onClick={() => {
                      setSelectedChar(slot.char);
                      if (tool === "eraser") setTool("pencil");
                    }}
                    className={`flex items-center gap-2 p-1.5 rounded border text-left transition-all ${
                      isSelected
                        ? "border-ink bg-ink/10 shadow-sm"
                        : "border-faint/30 hover:border-faint/60"
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded border border-faint/40 shrink-0"
                      style={{
                        backgroundColor: slot.char === "." ? "transparent" : swatchColor,
                        backgroundImage:
                          slot.char === "."
                            ? "linear-gradient(45deg, #444 25%, transparent 25%), linear-gradient(-45deg, #444 25%, transparent 25%)"
                            : "none",
                        backgroundSize: "6px 6px",
                      }}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold leading-tight">{slot.label}</span>
                      <span className="text-[10px] text-faint truncate">{slot.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Robot Mascot Preview */}
          <div className="flex flex-col gap-2 bg-paper/60 p-3 rounded border border-faint/20 items-center sm:items-start">
            <span className="text-xs font-bold uppercase tracking-wider">Live Mascot Composite</span>
            <div className="flex items-center gap-4">
              <canvas
                ref={previewCanvasRef}
                width={128}
                height={128}
                className="checker [image-rendering:pixelated] border border-faint/40 rounded bg-black/40"
              />
              <div className="flex flex-col gap-2 text-xs text-faint">
                <p className="m-0">
                  Part: <strong className="text-ink">{targetSlot}</strong> ({partName})
                </p>
                <p className="m-0">Edits in the 16×16 grid are immediately composited with the robot body.</p>
                <button
                  className="bg-ink text-paper px-3 py-1 text-xs font-semibold rounded hover:opacity-80 transition-opacity w-fit mt-1"
                  onClick={handleApply}
                >
                  ✓ Apply and Animate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export / Import Modal */}
      {showExportModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowExportModal(false);
          }}
        >
          <div className="bg-paper border border-faint/40 rounded-lg p-6 max-w-lg w-full flex flex-col gap-4 text-ink">
            <div className="flex justify-between items-center">
              <h3 className="font-bold lowercase">sprite ascii grid code</h3>
              <button
                className="border border-faint/40 px-2 py-0.5 text-xs rounded"
                onClick={() => setShowExportModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-faint m-0">
              Copy this 16×16 ASCII grid to save or share your part. You can also paste an existing grid below to
              import it.
            </p>

            <textarea
              className="w-full h-48 bg-black/60 text-green-400 font-mono text-xs p-3 rounded border border-faint/30 outline-none"
              value={importText || exportAsciiString()}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste 16x16 JSON array here..."
            />

            <div className="flex gap-2 justify-end">
              {importText ? (
                <button
                  className="bg-ink text-paper px-3 py-1 text-xs font-semibold rounded"
                  onClick={() => {
                    handleImport();
                    setShowExportModal(false);
                  }}
                >
                  import grid
                </button>
              ) : (
                <button
                  className="bg-ink text-paper px-3 py-1 text-xs font-semibold rounded"
                  onClick={() => {
                    navigator.clipboard.writeText(exportAsciiString());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? "✓ copied!" : "copy ascii to clipboard"}
                </button>
              )}
              <button
                className="border border-faint/40 px-3 py-1 text-xs rounded text-faint"
                onClick={() => setShowExportModal(false)}
              >
                done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
