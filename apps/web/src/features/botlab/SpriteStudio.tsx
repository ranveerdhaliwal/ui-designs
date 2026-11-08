import { useState, useRef } from 'react';
import { EditorToolbar } from '@/components/ui/EditorToolbar';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useHistoryState } from '@/hooks/useHistoryState';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';
import { SLOTS, PALETTES, type Bot, type Part } from './botlabData';
import { type CustomParts, type Slot } from './botProject';
import { SpriteCanvas } from './SpriteCanvas';
import styles from './SpriteStudio.module.css';
type Tool = 'pencil' | 'eraser' | 'fill' | 'picker';
export function SpriteStudio({
  activeBot,
  onApplyCustomPart,
  customParts,
  dark,
}: {
  activeBot: Bot;
  onApplyCustomPart: (slot: Slot, part: Part) => void;
  customParts: CustomParts;
  dark: boolean;
}) {
  const [slot, setSlot] = useState<Slot>('head');
  const starter = (key: Slot) =>
    customParts[key]?.grid ?? SLOTS.find(([s]) => s === key)![1][activeBot[key]]!.grid;
  const history = useHistoryState([...starter('head')]);
  const grid = history.value;
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState('a');
  const [mirror, setMirror] = useState(true);
  const [name, setName] = useState('My custom head');
  const [cursor, setCursor] = useState(0);
  const cells = useRef<HTMLDivElement>(null);
  const stroke = useRef<string | null>(null);
  useEditorShortcuts(history);
  const palette = PALETTES[activeBot.palette]!;
  const colors: Record<string, string> = {
    ...palette.colors,
    o: dark ? palette.oDark : palette.colors.o,
    '.': 'transparent',
  };
  const draw = (index: number) => {
    const x = index % 16,
      y = Math.floor(index / 16);
    if (tool === 'picker') {
      setColor(grid[y]![x]!);
      setTool('pencil');
      return;
    }
    history.set((prev) => {
      const rows = prev.map((row) => row.split(''));
      const value = tool === 'eraser' ? '.' : color;
      if (tool === 'fill') {
        const old = rows[y]![x];
        if (old === value) return prev;
        const queue = [[x, y]];
        while (queue.length) {
          const [cx, cy] = queue.pop()!;
          if (cx! < 0 || cx! > 15 || cy! < 0 || cy! > 15 || rows[cy!]![cx!] !== old) continue;
          rows[cy!]![cx!] = value;
          queue.push([cx! - 1, cy!], [cx! + 1, cy!], [cx!, cy! - 1], [cx!, cy! + 1]);
        }
      } else {
        rows[y]![x] = value;
        if (mirror) rows[y]![15 - x] = value;
      }
      return rows.map((row) => row.join(''));
    }, stroke.current ?? undefined);
  };
  return (
    <section className={styles.studio} aria-label="Pixel editor">
      <div className={styles.editor}>
        <div className={styles.top}>
          <div>
            <span>16 × 16 / PIXEL WORKSHOP</span>
            <h2>Make it yours.</h2>
          </div>
          <label>
            Layer
            <select
              value={slot}
              onChange={(e) => {
                const s = e.target.value as Slot;
                setSlot(s);
                history.reset([...starter(s)]);
                setName(`My custom ${s}`);
              }}
            >
              {SLOTS.map(([s]) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <SegmentedControl
          label="Drawing tool"
          value={tool}
          onChange={setTool}
          options={[
            { value: 'pencil', label: 'Pencil' },
            { value: 'eraser', label: 'Eraser' },
            { value: 'fill', label: 'Fill' },
            { value: 'picker', label: 'Pick color' },
          ]}
        />
        <div
          ref={cells}
          className={styles.grid}
          role="group"
          aria-label="Pixel canvas. Arrow keys move, Space paints."
          onPointerUp={() => {
            stroke.current = null;
          }}
          onPointerLeave={() => {
            stroke.current = null;
          }}
        >
          {grid.flatMap((row, y) =>
            [...row].map((c, x) => {
              const i = y * 16 + x;
              return (
                <button
                  key={i}
                  tabIndex={cursor === i ? 0 : -1}
                  aria-label={`Pixel ${x + 1}, ${y + 1}: ${c === '.' ? 'transparent' : c}`}
                  style={{ backgroundColor: colors[c] }}
                  onFocus={() => setCursor(i)}
                  onPointerDown={(e) => {
                    if (e.button !== 0) return;
                    e.preventDefault();
                    stroke.current = `stroke-${performance.now()}`;
                    draw(i);
                    e.currentTarget.focus();
                  }}
                  onPointerEnter={(e) => {
                    if (e.buttons === 1 && stroke.current) draw(i);
                  }}
                  onClick={(e) => {
                    if (e.detail === 0) draw(i);
                  }}
                  onKeyDown={(e) => {
                    const moves: Record<string, number> = {
                      ArrowLeft: -1,
                      ArrowRight: 1,
                      ArrowUp: -16,
                      ArrowDown: 16,
                    };
                    if (e.key in moves) {
                      e.preventDefault();
                      const next = Math.max(0, Math.min(255, i + moves[e.key]!));
                      setCursor(next);
                      (cells.current?.children[next] as HTMLElement)?.focus();
                    }
                  }}
                />
              );
            }),
          )}
        </div>
        <EditorToolbar {...history} reset={() => history.set([...starter(slot)])} />
        <p>Drag to paint. Use arrow keys and Space for precise keyboard editing.</p>
      </div>
      <aside className={styles.inspector}>
        <h3>Live character</h3>
        <div className={styles.preview}>
          <SpriteCanvas
            bot={activeBot}
            scale={10}
            dark={dark}
            customParts={{ ...customParts, [slot]: { name, grid } }}
          />
        </div>
        <div className={styles.swatches} role="group" aria-label="Pixel colors">
          {Object.entries(colors).map(([c, value]) => (
            <button
              key={c}
              aria-label={`Color ${c === '.' ? 'transparent' : c}`}
              aria-pressed={color === c}
              style={{ background: value }}
              onClick={() => setColor(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className={styles.check}>
          <input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} />
          Mirror pencil strokes
        </label>
        <label>
          Part name
          <input value={name} maxLength={64} onChange={(e) => setName(e.target.value)} />
        </label>
        <button
          className={styles.apply}
          disabled={!name.trim()}
          onClick={() => onApplyCustomPart(slot, { name: name.trim(), grid })}
        >
          Apply custom {slot}
        </button>
        <p>Your custom layer is included in saved robots and project exports.</p>
      </aside>
    </section>
  );
}
