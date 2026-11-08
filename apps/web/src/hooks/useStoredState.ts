import { useLayoutEffect, useState, type Dispatch, type SetStateAction } from 'react';
/** Storage is an enhancement: blocked, corrupt, or unavailable storage never breaks a demo. */
export function useStoredState<T>(
  key: string,
  initial: T,
  validate: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (validate(parsed)) return parsed;
      }
    } catch {
      /* use the initial state */
    }
    return initial;
  });
  const [persisted, setPersisted] = useState(true);
  useLayoutEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setPersisted(true);
    } catch {
      setPersisted(false);
    }
  }, [key, value]);
  return [value, setValue, persisted];
}
