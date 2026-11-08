import { useEffect, useRef } from 'react';
export function isTextEntry(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.matches('input,textarea,select') || target.isContentEditable)
  );
}
export function useEditorShortcuts({
  undo,
  redo,
  save,
}: {
  undo: () => void;
  redo: () => void;
  save?: () => void;
}) {
  const actions = useRef({ undo, redo, save });
  actions.current = { undo, redo, save };
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (isTextEntry(e.target) || (!e.metaKey && !e.ctrlKey) || e.altKey) return;
      if (e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) actions.current.redo();
        else actions.current.undo();
      }
      if (e.key.toLowerCase() === 's' && actions.current.save) {
        e.preventDefault();
        actions.current.save();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
}
