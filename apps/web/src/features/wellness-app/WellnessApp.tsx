import { downloadBlob } from '@/lib/download';
import { useStoredState } from '@/hooks/useStoredState';
import { ArrowUpRight, BarChart3, BookOpen, Home, UserRound } from 'lucide-react';
import { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { LearnScreen } from './screens/LearnScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import styles from './WellnessApp.module.css';
import { initialWellness, isWellnessState } from './wellnessState';
export type Tab = 'home' | 'progress' | 'learn' | 'profile';
const tabs = [
  { id: 'home', label: 'Today', Icon: Home },
  { id: 'progress', label: 'Progress', Icon: BarChart3 },
  { id: 'learn', label: 'Read', Icon: BookOpen },
  { id: 'profile', label: 'You', Icon: UserRound },
] as const;
export function WellnessApp() {
  const [active, setActive] = useState<Tab>('home');
  const [state, setState, persisted] = useStoredState(
    'browser-designs-reset-v1',
    initialWellness,
    isWellnessState,
  );
  return (
    <main className={styles.appWrapper}>
      <div className={styles.intro}>
        <span>A LITTLE RESET</span>
        <h1>
          A small moment.
          <br />
          All your own.
        </h1>
        <p>
          A gentle daily ritual. Choose a beginning, check in with yourself, and make space for a
          little reflection.
        </p>
        <span className={styles.localNote}>
          {persisted
            ? 'Your entries stay in this browser.'
            : 'Storage is unavailable. Entries last for this visit.'}
        </span>
        <ArrowUpRight size={26} />
      </div>
      <div className={styles.deviceFrame}>
        <div className={styles.screenContent} key={active}>
          {active === 'home' && <HomeScreen state={state} onChange={setState} />}{' '}
          {active === 'progress' && <ProgressScreen state={state} />}{' '}
          {active === 'learn' && <LearnScreen />}{' '}
          {active === 'profile' && (
            <section className={styles.profile}>
              <UserRound size={30} />
              <h2>A space for you.</h2>
              <p>Make this little ritual your own.</p>
              <label>
                Your name
                <input
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  maxLength={40}
                  placeholder="What should we call you?"
                  autoComplete="given-name"
                />
              </label>
              <label>
                Your beginning
                <input
                  type="date"
                  value={state.startDate}
                  onChange={(e) => {
                    if (e.target.value) setState({ ...state, startDate: e.target.value });
                  }}
                />
              </label>
              <button
                className={styles.export}
                onClick={() =>
                  downloadBlob(
                    new Blob([JSON.stringify({ schema: 'little-reset-v1', ...state }, null, 2)], {
                      type: 'application/json',
                    }),
                    'my-reset-journal.json',
                  )
                }
              >
                Export my journal
              </button>
              <details>
                <summary>Reset this journal</summary>
                <p>This removes your check-ins from this browser.</p>
                <button onClick={() => setState({ ...initialWellness })}>Clear my check-ins</button>
              </details>
            </section>
          )}
        </div>
        <nav className={styles.bottomNav} aria-label="Wellness app">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              aria-current={active === id ? 'page' : undefined}
              onClick={() => setActive(id)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}
