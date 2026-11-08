import { useStoredHistory } from '@/hooks/useStoredHistory';
import { EditorToolbar } from '@/components/ui/EditorToolbar';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowLeft, ArrowRight, Check, Plus, X } from 'lucide-react';
import { useState } from 'react';
import styles from './ResponsiveLanding.module.css';
const steps = [
  {
    title: 'Make a little space.',
    text: 'Gather your thoughts. Choose what matters. Let the rest wait.',
    image: 'time_onboarding_1.png',
  },
  {
    title: 'One thing at a time.',
    text: 'A small, clear list. A little less noise. A more focused day.',
    image: 'time_onboarding_2.png',
  },
  {
    title: 'Find your own rhythm.',
    text: 'Every small step counts. Make a plan that feels like yours.',
    image: 'time_onboarding_3.png',
  },
];
interface Task {
  id: string;
  text: string;
  done: boolean;
}
const valid = (value: unknown): value is Task[] =>
  Array.isArray(value) &&
  value.every(
    (t) =>
      t && typeof t.id === 'string' && typeof t.text === 'string' && typeof t.done === 'boolean',
  );
export function ResponsiveLanding() {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState('');
  const history = useStoredHistory<Task[]>('browser-designs-time-v1', [], valid);
  const { persisted } = history;
  const tasks = history.value,
    setTasks = history.set;
  const data = steps[step]!;
  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <span>TIME, WELL SPENT</span>
        <h1>
          Make room
          <br />
          for your day.
        </h1>
        <p>A simple beginning. A thoughtful little planner. Designed to move at your pace.</p>
        <span>THREE STEPS TO A CLEARER START</span>
      </div>
      <section className={styles.phone}>
        <header className={styles.header}>
          <span>Time.</span>
          <button
            onClick={() => {
              setReady(!ready);
              setStep(0);
            }}
          >
            {ready ? 'Start again' : 'Skip introduction'}
          </button>
        </header>
        {ready ? (
          <div className={styles.planner}>
            <p>
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <h2>
              A little less.
              <br />A little better.
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (draft.trim()) {
                  setTasks([
                    ...tasks,
                    { id: crypto.randomUUID(), text: draft.trim(), done: false },
                  ]);
                  setDraft('');
                }
              }}
            >
              <label className="sr-only" htmlFor="new-task">
                Add a priority
              </label>
              <input
                id="new-task"
                maxLength={100}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="One thing for today…"
              />
              <button aria-label="Add priority" disabled={!draft.trim()}>
                <Plus size={18} />
              </button>
            </form>
            <EditorToolbar
              undo={history.undo}
              redo={history.redo}
              canUndo={history.canUndo}
              canRedo={history.canRedo}
            />
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <button
                    aria-label={`Mark ${task.text} ${task.done ? 'incomplete' : 'complete'}`}
                    aria-pressed={task.done}
                    onClick={() =>
                      setTasks(tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)))
                    }
                  >
                    {task.done ? <Check size={16} /> : <span />}
                  </button>
                  <span className={task.done ? styles.done : undefined}>{task.text}</span>
                  <button
                    aria-label={`Remove ${task.text}`}
                    onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
            {tasks.length === 0 && (
              <p className={styles.empty}>An open page. Add your first priority.</p>
            )}
            <p className={styles.saved}>
              {persisted
                ? 'Saved in this browser.'
                : 'Storage unavailable. Your list lasts for this visit.'}
            </p>
          </div>
        ) : (
          <div className={styles.onboarding}>
            <img
              key={data.image}
              src={getAssetUrl(`/assets/${data.image}`)}
              alt="Illustrated daily planning scene"
            />
            <span className={styles.step}>{String(step + 1).padStart(2, '0')} / 03</span>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
            <div className={styles.navigation}>
              <button
                aria-label="Previous introduction"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={18} />
              </button>
              <div role="group" aria-label="Onboarding step">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to step ${i + 1}`}
                    aria-pressed={i === step}
                    onClick={() => setStep(i)}
                  />
                ))}
              </div>
              <button
                className={styles.next}
                onClick={() => (step < 2 ? setStep(step + 1) : setReady(true))}
              >
                {step === 2 ? 'Begin' : 'Continue'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
