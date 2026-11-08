import { ArrowDown, Check, Database, Mail, Play, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './Workflow.module.css';
const triggers = [
  {
    name: 'New enquiry',
    record: { name: 'Alex Morgan', email: 'alex@example.test', interest: 'Studio plan' },
  },
  {
    name: 'New subscriber',
    record: { name: 'Sam Rivera', email: 'sam@example.test', interest: 'Design notes' },
  },
  {
    name: 'New purchase',
    record: { name: 'Jamie Lee', email: 'jamie@example.test', interest: 'Field journal' },
  },
];
export function Workflow({ dark = false }: { dark?: boolean }) {
  const [source, setSource] = useState(0);
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [inspect, setInspect] = useState<number | null>(null);
  const [template, setTemplate] = useState(
    'Hello {{name}}, thanks for your interest in {{interest}}.',
  );
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const event = triggers[source]!;
  const output = template
    .replaceAll('{{name}}', event.record.name)
    .replaceAll('{{interest}}', event.record.interest);
  const reset = () => {
    clearTimeout(timer.current);
    setRunning(false);
    setStep(-1);
  };
  const run = () => {
    reset();
    setRunning(true);
    let next = 0;
    const advance = () => {
      setStep(next++);
      if (next < 3) timer.current = setTimeout(advance, 450);
      else setRunning(false);
    };
    timer.current = setTimeout(advance, 250);
  };
  return (
    <div className={`${styles.workflow} ${dark ? styles.dark : ''}`}>
      <div className={styles.top}>
        <span>YOUR WORKFLOW</span>
        <span>Local preview</span>
      </div>
      <label className={styles.source}>
        When this happens
        <select
          value={source}
          onChange={(e) => {
            reset();
            setSource(Number(e.target.value));
          }}
        >
          {triggers.map((t, i) => (
            <option value={i} key={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.steps}>
        {[
          { Icon: Mail, title: event.name, description: 'Capture a sample event' },
          {
            Icon: Database,
            title: 'Find the right context',
            description: 'Match a fictional customer record',
          },
          {
            Icon: Send,
            title: 'Make it personal',
            description: 'Prepare a message from your template',
          },
        ].map(({ Icon, title, description }, i) => (
          <div key={i}>
            <button
              className={styles.step}
              aria-expanded={inspect === i}
              onClick={() => setInspect(inspect === i ? null : i)}
            >
              <span className={styles.icon}>
                {step >= i ? <Check size={20} /> : <Icon size={20} />}
              </span>
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
            </button>
            {inspect === i && (
              <div className={styles.inspector}>
                {i < 2 ? (
                  <pre>
                    {JSON.stringify(
                      i === 0
                        ? { event: event.name, ...event.record }
                        : {
                            matched: true,
                            customer: event.record.name,
                            segment: event.record.interest,
                          },
                      null,
                      2,
                    )}
                  </pre>
                ) : (
                  <label>
                    Message template
                    <textarea
                      maxLength={500}
                      value={template}
                      onChange={(e) => {
                        reset();
                        setTemplate(e.target.value);
                      }}
                    />
                    <small>
                      Use {'{{name}}'} and {'{{interest}}'}.
                    </small>
                  </label>
                )}
              </div>
            )}
            {i < 2 && <ArrowDown className={styles.arrow} size={17} />}
          </div>
        ))}
      </div>
      <button className={styles.run} onClick={running ? reset : step === 2 ? reset : run}>
        <Play size={14} />
        {running ? 'Cancel preview' : step === 2 ? 'Reset workflow' : 'Run a sample event'}
      </button>
      <p className={styles.result} role="status">
        {running
          ? `Step ${Math.max(1, step + 1)} of 3…`
          : step === 2
            ? `${event.name} processed. Welcome message prepared locally.`
            : 'Inspect a step, adjust the message, then run a sample.'}
      </p>
      {step === 2 && (
        <blockquote className={styles.output}>
          <span>PREPARED MESSAGE / NOT SENT</span>
          <p>{output}</p>
        </blockquote>
      )}
    </div>
  );
}
