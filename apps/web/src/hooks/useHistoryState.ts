import { useCallback, useReducer, type SetStateAction } from 'react';
export interface History<T> {
  past: T[];
  present: T;
  future: T[];
  group: string | undefined;
  time: number;
}
type Action<T> =
  | { type: 'set'; value: SetStateAction<T>; group?: string; time: number }
  | { type: 'undo' | 'redo' }
  | { type: 'reset'; value: T };
export function historyReducer<T>(state: History<T>, action: Action<T>): History<T> {
  if (action.type === 'reset')
    return { past: [], present: action.value, future: [], group: undefined, time: 0 };
  if (action.type === 'undo') {
    if (!state.past.length) return state;
    return {
      ...state,
      past: state.past.slice(0, -1),
      present: state.past[state.past.length - 1]!,
      future: [state.present, ...state.future],
      group: undefined,
    };
  }
  if (action.type === 'redo') {
    if (!state.future.length) return state;
    return {
      ...state,
      past: [...state.past, state.present],
      present: state.future[0]!,
      future: state.future.slice(1),
      group: undefined,
    };
  }
  if (action.type === 'set') {
    const next =
      typeof action.value === 'function'
        ? (action.value as (prev: T) => T)(state.present)
        : action.value;
    if (JSON.stringify(next) === JSON.stringify(state.present)) return state;
    const coalesced =
      !!action.group && action.group === state.group && action.time - state.time < 600;
    return {
      past: coalesced ? state.past : [...state.past.slice(-59), state.present],
      present: next,
      future: [],
      group: action.group,
      time: action.time,
    };
  }
  return state;
}
export function useHistoryState<T>(initial: T) {
  const [history, dispatch] = useReducer(historyReducer<T>, {
    past: [],
    present: initial,
    future: [],
    group: undefined,
    time: 0,
  });
  const set = useCallback(
    (value: SetStateAction<T>, group?: string) =>
      dispatch({ type: 'set', value, ...(group ? { group } : {}), time: performance.now() }),
    [],
  );
  const undo = useCallback(() => dispatch({ type: 'undo' }), []);
  const redo = useCallback(() => dispatch({ type: 'redo' }), []);
  const reset = useCallback((value: T) => dispatch({ type: 'reset', value }), []);
  return {
    value: history.present,
    set,
    undo,
    redo,
    reset,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
