import { Slider } from '@/components/ui/Slider';
import { useStoredHistory } from '@/hooks/useStoredHistory';
import { describe, it, expect, vi } from 'vitest';
import { act, renderHook, render, screen, fireEvent } from '@testing-library/react';
import { historyReducer, type History } from '@/hooks/useHistoryState';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { isPart, isProject, initialProject } from '@/features/botlab/botProject';
import { constrainView, zoomView, initialView } from '@/features/alethia/atlasData';
import { isRecipe, initialRecipe } from '@/features/image-studio/printSettings';
import { csvItems, isItems, seedItems, selectItems } from '@/features/operations/operationsData';
import { applyRecipe, readRecipe } from '@/features/wet-paint-flow/paintRecipe';
describe('editor history', () => {
  it('coalesces a gesture, restores its start, and discards redo after a new edit', () => {
    let s: History<number> = { past: [], present: 0, future: [], group: undefined, time: 0 };
    s = historyReducer(s, { type: 'set', value: 1, group: 'slider', time: 10 });
    s = historyReducer(s, { type: 'set', value: 2, group: 'slider', time: 20 });
    expect(s.past).toEqual([0]);
    s = historyReducer(s, { type: 'undo' });
    expect(s.present).toBe(0);
    s = historyReducer(s, { type: 'redo' });
    expect(s.present).toBe(2);
    s = historyReducer(s, { type: 'undo' });
    s = historyReducer(s, { type: 'set', value: 3, time: 30 });
    expect(s.future).toEqual([]);
  });
  it('bounds the history retained in memory', () => {
    let s: History<number> = { past: [], present: 0, future: [], group: undefined, time: 0 };
    for (let i = 1; i < 100; i++) s = historyReducer(s, { type: 'set', value: i, time: i });
    expect(s.past).toHaveLength(60);
  });
});
describe('request lifecycle', () => {
  it('ignores a completion after reset and aborts the old signal', async () => {
    const { result } = renderHook(() => useAsyncAction());
    let finish: (value: boolean) => void = () => {};
    const callback = vi.fn((signal: AbortSignal) => {
      expect(signal.aborted).toBe(false);
      return new Promise<boolean>((resolve) => {
        finish = resolve;
      });
    });
    let request: Promise<boolean>;
    act(() => {
      request = result.current.run(callback);
    });
    expect(result.current.status).toBe('loading');
    act(() => result.current.reset());
    expect(callback.mock.calls[0]![0].aborted).toBe(true);
    await act(async () => {
      finish(true);
      await request;
    });
    expect(result.current.status).toBe('idle');
  });
});
describe('portable document validation', () => {
  it('keeps custom pixels while rejecting invalid dimensions and executable object shapes', () => {
    const part = { name: 'Custom', grid: Array(16).fill('.'.repeat(16)) };
    expect(isPart(part)).toBe(true);
    expect(isProject({ ...initialProject, parts: { head: part } })).toBe(true);
    expect(isPart({ ...part, grid: ['x'] })).toBe(false);
    expect(isPart({ ...part, idle: { altRows: { 0: 'bad' } } })).toBe(false);
    expect(isProject({ ...initialProject, parts: { unexpected: part } })).toBe(false);
  });
  it('rejects unsafe print settings', () => {
    expect(isRecipe(initialRecipe)).toBe(true);
    expect(
      isRecipe({ ...initialRecipe, settings: { ...initialRecipe.settings, dotSize: 0 } }),
    ).toBe(false);
    expect(isRecipe({ ...initialRecipe, colors: ['url(bad)', 'white'] })).toBe(false);
  });
  it('rejects corrupt or duplicate workspace records', () => {
    expect(isItems(seedItems)).toBe(true);
    expect(isItems([...seedItems.slice(1), seedItems[1]])).toBe(false);
    expect(isItems(seedItems.map((item, i) => (i ? item : { ...item, hours: Infinity })))).toBe(
      false,
    );
  });
});
describe('atlas geometry', () => {
  it('keeps the center anchored during zoom and clamps all panning to the map', () => {
    const next = zoomView(initialView, 2);
    expect(next).toEqual({ zoom: 2, x: -50, y: -50 });
    expect(zoomView(next, 1)).toEqual(initialView);
    expect(constrainView({ zoom: 2, x: 40, y: -300 })).toEqual({ zoom: 2, x: 0, y: -100 });
  });
});
describe('operations queries', () => {
  it('combines words, owners, and status without mutating the source', () => {
    const results = selectItems(seedItems, 'Northstar invoice', 'Open', 'Maya Chen');
    expect(results.map((i) => i.id)).toEqual(['OPS-1048']);
    expect(seedItems[0]!.status).toBe('Open');
    expect(selectItems(seedItems, 'Northstar', 'Done', 'Everyone')).toEqual([]);
  });
  it('exports filtered records with CSV quote escaping', () => {
    const csv = csvItems([{ ...seedItems[0]!, title: 'Review "quoted", item' }]);
    expect(csv).toContain('"Review ""quoted"", item"');
    expect(csv.split('\r\n')).toHaveLength(2);
  });
});
describe('paint recipe boundary', () => {
  it('validates all values before applying any and emits input changes', () => {
    const root = document.createElement('div');
    root.innerHTML = '<input id="test-range" type="range" min="1" max="10" value="3">';
    const input = root.firstElementChild as HTMLInputElement;
    const listener = vi.fn();
    input.addEventListener('input', listener);
    expect(applyRecipe({ version: 1, values: { 'test-range': '8', missing: '1' } }, root)).toBe(
      false,
    );
    expect(input.value).toBe('3');
    expect(applyRecipe({ version: 1, values: { 'test-range': '8' } }, root)).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(readRecipe(root).values['test-range']).toBe('8');
  });
});

describe('shared control semantics', () => {
  it('associates the displayed label with the range input rather than its output', () => {
    const onChange = vi.fn();
    render(<Slider label="Dot size" min={3} max={30} value={10} onChange={onChange} />);
    const input = screen.getByRole('slider', { name: 'Dot size' });
    expect(screen.getByLabelText('Dot size')).toBe(input);
    fireEvent.change(input, { target: { value: '18' } });
    expect(onChange).toHaveBeenCalledWith(18);
  });
  it('persists a committed edit before returning control and reopens it', () => {
    localStorage.removeItem('history-regression');
    const valid = (value: unknown): value is number => typeof value === 'number';
    const first = renderHook(() => useStoredHistory('history-regression', 0, valid));
    act(() => first.result.current.set(7));
    expect(localStorage.getItem('history-regression')).toBe('7');
    first.unmount();
    const second = renderHook(() => useStoredHistory('history-regression', 0, valid));
    expect(second.result.current.value).toBe(7);
  });
});
