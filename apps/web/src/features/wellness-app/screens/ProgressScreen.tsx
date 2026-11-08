import { CalendarDays, Check, Sprout } from 'lucide-react';
import { type WellnessState, localDate } from '../wellnessState';
import styles from './ProgressScreen.module.css';
export function ProgressScreen({ state }: { state: WellnessState }) {
  const count = new Set(state.checkIns).size;
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return d;
  });
  return (
    <section className={styles.container}>
      <span className={styles.eyebrow}>YOUR OWN PACE</span>
      <h1>
        Small steps
        <br />
        add up.
      </h1>
      <div className={styles.total}>
        <Sprout size={28} />
        <strong>{count}</strong>
        <span>{count === 1 ? 'moment' : 'moments'} recorded</span>
      </div>
      <h2>This week</h2>
      <div className={styles.week}>
        {days.map((d) => (
          <div key={localDate(d)}>
            <span>{d.toLocaleDateString(undefined, { weekday: 'narrow' })}</span>
            <div data-checked={state.checkIns.includes(localDate(d))}>
              {state.checkIns.includes(localDate(d)) ? <Check size={16} /> : d.getDate()}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.beginning}>
        <CalendarDays size={18} />
        <div>
          <h3>Your beginning</h3>
          <p>
            {new Date(state.startDate + 'T12:00:00').toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <h2>Along the way</h2>
      <div className={styles.milestones}>
        {[1, 3, 7, 14, 30].map((n) => (
          <div key={n} data-earned={count >= n}>
            <span>{count >= n ? <Check size={16} /> : <Sprout size={16} />}</span>
            <div>
              <h3>
                {n} {n === 1 ? 'moment' : 'moments'} of care
              </h3>
              <p>
                {count >= n
                  ? 'A little milestone, earned.'
                  : `${n - count} more check-ins to get here.`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
