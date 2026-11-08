import { useCallback, useEffect, useRef, useState } from 'react';
export type ActionStatus = 'idle' | 'loading' | 'success' | 'error';
/** Latest request wins; cancellation and unmount never publish stale results. */
export function useAsyncAction(message = 'Something went wrong. Please try again.') {
  const [status, setStatus] = useState<ActionStatus>('idle');
  const [error, setError] = useState('');
  const sequence = useRef(0);
  const controller = useRef<AbortController | null>(null);
  useEffect(
    () => () => {
      sequence.current++;
      controller.current?.abort();
    },
    [],
  );
  const reset = useCallback(() => {
    sequence.current++;
    controller.current?.abort();
    setStatus('idle');
    setError('');
  }, []);
  const fail = useCallback((text: string) => {
    sequence.current++;
    controller.current?.abort();
    setStatus('error');
    setError(text);
  }, []);
  const run = useCallback(
    async (action: (signal: AbortSignal) => Promise<unknown> | unknown) => {
      const id = ++sequence.current;
      controller.current?.abort();
      const current = new AbortController();
      controller.current = current;
      setStatus('loading');
      setError('');
      try {
        const result = await action(current.signal);
        if (id !== sequence.current) return false;
        if (result === false) throw new Error('Declined');
        setStatus('success');
        return true;
      } catch {
        if (id === sequence.current && !current.signal.aborted) {
          setStatus('error');
          setError(message);
        }
        return false;
      }
    },
    [message],
  );
  return { status, error, run, reset, fail };
}
