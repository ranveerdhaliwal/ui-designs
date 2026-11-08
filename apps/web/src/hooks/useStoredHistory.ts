import { useLayoutEffect, useState } from 'react';
import { useHistoryState } from './useHistoryState';
/** Persist the committed editor value before paint, without a second state mirror. */
export function useStoredHistory<T>(
  key: string,
  initial: T,
  validate: (value: unknown) => value is T,
) {
  const [start] = useState(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? 'null');
      if (validate(parsed)) return parsed;
    } catch {
      /* Storage is optional. */
    }
    return initial;
  });
  const history = useHistoryState(start);
  const [persisted, setPersisted] = useState(true);
  useLayoutEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(history.value));
      setPersisted(true);
    } catch {
      setPersisted(false);
    }
  }, [key, history.value]);
  return { ...history, persisted };
}
