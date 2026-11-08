import { Undo2, Redo2, RotateCcw } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './StudioControls.module.css';
export function EditorToolbar({
  undo,
  redo,
  reset,
  canUndo,
  canRedo,
  children,
}: {
  undo: () => void;
  redo: () => void;
  reset?: () => void;
  canUndo: boolean;
  canRedo: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={styles.toolbar} role="group" aria-label="Editor history">
      <button aria-label="Undo" title="Undo (Ctrl/⌘ Z)" disabled={!canUndo} onClick={undo}>
        <Undo2 size={16} />
        <span>Undo</span>
      </button>
      <button aria-label="Redo" title="Redo (Ctrl/⌘ Shift Z)" disabled={!canRedo} onClick={redo}>
        <Redo2 size={16} />
        <span>Redo</span>
      </button>
      {reset && (
        <button aria-label="Reset adjustments" onClick={reset}>
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      )}
      {children}
    </div>
  );
}
