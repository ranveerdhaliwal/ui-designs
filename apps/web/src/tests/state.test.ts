import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { isWellnessState, isDateKey, localDate } from '@/features/wellness-app/wellnessState';
import { readBots, isBot } from '@/features/botlab/botStorage';
import { PRESETS } from '@/features/botlab/botlabData';
import { useStoredState } from '@/hooks/useStoredState';
afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
describe('persisted data boundaries', () => {
  it('rejects impossible calendar dates and duplicate check-ins', () => {
    expect(isDateKey('2026-02-30')).toBe(false);
    expect(isDateKey('2024-02-29')).toBe(true);
    expect(
      isWellnessState({
        name: 'A',
        startDate: '2026-10-18',
        checkIns: ['2026-10-18', '2026-10-18'],
      }),
    ).toBe(false);
    expect(isWellnessState({ name: 'A', startDate: '2026-10-18', checkIns: ['2026-10-18'] })).toBe(
      true,
    );
  });
  it('uses local calendar days for check-ins', () =>
    expect(localDate(new Date(2026, 0, 2, 23, 30))).toBe('2026-01-02'));
  it('rejects corrupt robot part indices without losing valid saves', () => {
    const valid = PRESETS[0].bot;
    expect(isBot(valid)).toBe(true);
    expect(
      readBots(
        JSON.stringify([
          valid,
          { ...valid, palette: 999 },
          { ...valid, body: -1 },
          { ...valid, head: 1.5 },
        ]),
      ),
    ).toEqual([valid]);
    expect(readBots('{bad')).toEqual([]);
    expect(readBots('{}')).toEqual([]);
  });
  it('recovers malformed saved state and persists subsequent edits', () => {
    localStorage.setItem('state-test', '{bad');
    const { result } = renderHook(() =>
      useStoredState('state-test', 0, (v): v is number => typeof v === 'number'),
    );
    expect(result.current[0]).toBe(0);
    act(() => result.current[1](3));
    expect(JSON.parse(localStorage.getItem('state-test')!)).toBe(3);
  });
  it('keeps edits usable when storage writes fail', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => null,
      clear: () => undefined,
      setItem: () => {
        throw new Error('quota');
      },
    });
    const { result } = renderHook(() =>
      useStoredState('state-test', 0, (v): v is number => typeof v === 'number'),
    );
    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
    expect(result.current[2]).toBe(false);
  });
});
