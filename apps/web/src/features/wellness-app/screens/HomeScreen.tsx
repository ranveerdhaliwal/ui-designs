import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowRight, Check, Leaf } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { localDate, type WellnessState } from '../wellnessState';
import styles from './HomeScreen.module.css';
export function HomeScreen({
  state,
  onChange,
}: {
  state: WellnessState;
  onChange: Dispatch<SetStateAction<WellnessState>>;
}) {
  const today = localDate();
  const checked = state.checkIns.includes(today);
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span>A LITTLE RESET</span>
        <Leaf size={16} />
      </header>
      <img
        src={getAssetUrl('/assets/wellness1.png')}
        alt="Quiet stones beside still water"
        className={styles.heroImage}
      />
      <div className={styles.content}>
        <p className={styles.date}>
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h1>
          {state.name ? `A moment for you, ${state.name}.` : 'A little kindness. A new beginning.'}
        </h1>
        <p className={styles.subtitle}>
          You don’t have to do it all. Just make a little room for yourself today.
        </p>
        <label className={styles.start}>
          Your beginning
          <input
            type="date"
            value={state.startDate}
            onChange={(e) => {
              if (e.target.value) onChange({ ...state, startDate: e.target.value });
            }}
          />
        </label>
        <button
          className={styles.primaryBtn}
          aria-pressed={checked}
          onClick={() =>
            onChange((prev) => ({
              ...prev,
              checkIns: checked
                ? prev.checkIns.filter((d) => d !== today)
                : [...prev.checkIns, today],
            }))
          }
        >
          {checked ? <Check size={18} /> : <ArrowRight size={18} />}{' '}
          {checked ? 'Today, I showed up.' : 'Take a moment. Check in.'}
        </button>
        <p className={styles.status} role="status">
          {checked
            ? 'A small step, recorded. Tap again to undo.'
            : 'One simple check-in. At your own pace.'}
        </p>
      </div>
    </section>
  );
}
