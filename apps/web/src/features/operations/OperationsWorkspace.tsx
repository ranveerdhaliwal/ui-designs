import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  Download,
  Inbox,
  Layers,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { EditorToolbar } from '@/components/ui/EditorToolbar';
import { useStoredHistory } from '@/hooks/useStoredHistory';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';
import { downloadBlob } from '@/lib/download';
import {
  csvItems,
  isItems,
  owners,
  seedItems,
  selectItems,
  statuses,
  type Status,
  type WorkItem,
} from './operationsData';
import styles from './OperationsWorkspace.module.css';
const referenceDate = '2026-10-29';
export function OperationsWorkspace() {
  const history = useStoredHistory('relay-workspace-v1', seedItems, isItems);
  const { persisted } = history;
  const items = history.value;
  useEditorShortcuts(history);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All work');
  const [owner, setOwner] = useState('Everyone');
  const [sort, setSort] = useState<'due' | 'priority' | 'account'>('due');
  const [ascending, setAscending] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState('');
  const [bulk, setBulk] = useState<Status>('In progress');
  const [view, setView] = useState<'work' | 'team'>('work');
  const filtered = useMemo(
    () =>
      selectItems(items, query, status, owner).sort((a, b) => {
        const rank = { High: 0, Medium: 1, Low: 2 };
        return (
          (sort === 'priority'
            ? rank[a.priority] - rank[b.priority]
            : a[sort].localeCompare(b[sort])) * (ascending ? 1 : -1)
        );
      }),
    [items, query, status, owner, sort, ascending],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / 8));
  const currentPage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(currentPage * 8, currentPage * 8 + 8);
  const active = items.find((i) => i.id === detail);
  const change = (
    id: string,
    patch: Partial<Pick<WorkItem, 'status' | 'owner' | 'initials' | 'note'>>,
    group?: string,
  ) => history.set((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)), group);
  const resetFilters = () => {
    setQuery('');
    setStatus('All work');
    setOwner('Everyone');
    setPage(0);
    setSelected(new Set());
  };
  const filterStatus = (next: string) => {
    setStatus(next);
    setPage(0);
    setSelected(new Set());
    setView('work');
  };
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const counts = statuses.map((s) => items.filter((i) => i.status === s).length);
  const overdue = items.filter((i) => i.status !== 'Done' && i.due < referenceDate).length;
  const remaining = items.filter((i) => i.status !== 'Done').reduce((sum, i) => sum + i.hours, 0);
  return (
    <main className={styles.app}>
      <aside className={styles.sidebar}>
        <a className={styles.logo} href="#/operations">
          <Layers size={22} />
          relay<span>®</span>
        </a>
        <div className={styles.workspace}>
          <span className={styles.workspaceIcon}>S</span>
          <div>
            Studio workspace<small>Operations / sample team</small>
          </div>
        </div>
        <p className={styles.navLabel}>WORKSPACE</p>
        <nav aria-label="Workspace navigation">
          <button
            aria-current={view === 'work' ? 'page' : undefined}
            onClick={() => setView('work')}
          >
            <Inbox size={16} />
            Overview<span>{items.filter((i) => i.status !== 'Done').length}</span>
          </button>
          <button
            aria-current={view === 'team' ? 'page' : undefined}
            onClick={() => setView('team')}
          >
            <Users size={16} />
            Team workload
          </button>
        </nav>
        <div className={styles.sideNote}>
          <span>BUILT FOR THE EVERYDAY</span>
          <p>
            A little more clarity.
            <br />A lot less chasing.
          </p>
          <div className={styles.miniBars}>
            {[35, 60, 45, 80, 65, 95, 75].map((h, i) => (
              <span key={i} style={{ height: h }} />
            ))}
          </div>
        </div>
        <div className={styles.profile}>
          <span className={styles.avatar}>MC</span>
          <div>
            Maya Chen<small>Workspace lead</small>
          </div>
          <Command size={15} />
        </div>
      </aside>
      <div className={styles.main}>
        <header className={styles.topbar}>
          <span>
            Workspace <span>/</span> {view === 'work' ? 'Overview' : 'Team workload'}
          </span>
          <span>
            <i />
            Local demo · Oct 29, 2026
          </span>
        </header>
        <nav className={styles.mobileNav} aria-label="Mobile workspace navigation">
          <button
            aria-current={view === 'work' ? 'page' : undefined}
            onClick={() => setView('work')}
          >
            Overview
          </button>
          <button
            aria-current={view === 'team' ? 'page' : undefined}
            onClick={() => setView('team')}
          >
            Team workload
          </button>
        </nav>
        <div className={styles.content}>
          <section className={styles.heading}>
            <div>
              <p>THURSDAY, OCTOBER 29</p>
              <h1>A clear view of the work.</h1>
              <span>Everything moving. Nothing slipping through.</span>
            </div>
            <button
              onClick={() => {
                downloadBlob(
                  new Blob([csvItems(filtered)], { type: 'text/csv;charset=utf-8' }),
                  'relay-work.csv',
                );
                setMessage(`${filtered.length} work items exported.`);
              }}
            >
              <Download size={15} />
              Export view
            </button>
          </section>
          <section className={styles.metrics} aria-label="Workspace summary">
            <button onClick={() => filterStatus('All work')}>
              <span>
                Active work <ArrowUpRight size={15} />
              </span>
              <strong>
                {items.length - counts[3]!}
                <small>items</small>
              </strong>
              <p>{remaining} estimated hours remaining</p>
            </button>
            <button onClick={() => filterStatus('In progress')}>
              <span>
                In progress <ArrowUpRight size={15} />
              </span>
              <strong>
                {counts[1]}
                <small>items</small>
              </strong>
              <p>
                Across{' '}
                {new Set(items.filter((i) => i.status === 'In progress').map((i) => i.owner)).size}{' '}
                team members
              </p>
            </button>
            <button onClick={() => filterStatus('Blocked')}>
              <span>
                Needs attention <ArrowUpRight size={15} />
              </span>
              <strong>
                {counts[2]}
                <small>blocked</small>
              </strong>
              <p>{overdue} open items past their due date</p>
            </button>
            <button onClick={() => filterStatus('Done')}>
              <span>
                Completed <Check size={15} />
              </span>
              <strong>
                {Math.round((counts[3]! / items.length) * 100)}
                <small>%</small>
              </strong>
              <div className={styles.progress}>
                <span style={{ width: `${(counts[3]! / items.length) * 100}%` }} />
              </div>
            </button>
          </section>
          {view === 'team' ? (
            <section className={styles.team}>
              <div className={styles.sectionTitle}>
                <h2>Capacity, at a glance</h2>
                <span>Estimated open work</span>
              </div>
              {owners.map((o) => {
                const work = items.filter((i) => i.owner === o.name && i.status !== 'Done');
                const hours = work.reduce((n, i) => n + i.hours, 0);
                return (
                  <button
                    key={o.name}
                    onClick={() => {
                      setOwner(o.name);
                      setView('work');
                      setStatus('All work');
                      setQuery('');
                      setSelected(new Set());
                      setPage(0);
                    }}
                  >
                    <span className={styles.avatar}>{o.initials}</span>
                    <div>
                      <strong>{o.name}</strong>
                      <small>
                        {work.length} active items · {hours} hours
                      </small>
                      <div className={styles.progress}>
                        <span style={{ width: `${Math.min(100, (hours / 40) * 100)}%` }} />
                      </div>
                    </div>
                    <ArrowUpRight size={17} />
                  </button>
                );
              })}
            </section>
          ) : (
            <section className={styles.tablePanel}>
              <div className={styles.sectionTitle}>
                <div>
                  <h2>
                    Work queue <span>{filtered.length}</span>
                  </h2>
                  <p>The details that keep things moving.</p>
                </div>
                <EditorToolbar
                  undo={history.undo}
                  redo={history.redo}
                  canUndo={history.canUndo}
                  canRedo={history.canRedo}
                />
              </div>
              <div className={styles.filters}>
                <label className={styles.search}>
                  <Search size={15} />
                  <input
                    aria-label="Search work"
                    placeholder="Search work, account, or ID…"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(0);
                      setSelected(new Set());
                    }}
                  />
                </label>
                <label>
                  <SlidersHorizontal size={14} />
                  <span className="sr-only">Status filter</span>
                  <select value={status} onChange={(e) => filterStatus(e.target.value)}>
                    {['All work', ...statuses].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <Users size={14} />
                  <span className="sr-only">Owner filter</span>
                  <select
                    value={owner}
                    onChange={(e) => {
                      setOwner(e.target.value);
                      setPage(0);
                      setSelected(new Set());
                    }}
                  >
                    <option>Everyone</option>
                    {owners.map((o) => (
                      <option key={o.name}>{o.name}</option>
                    ))}
                  </select>
                </label>
                {(query || status !== 'All work' || owner !== 'Everyone') && (
                  <button onClick={resetFilters}>
                    Clear <X size={12} />
                  </button>
                )}
              </div>
              {selected.size > 0 && (
                <div className={styles.bulk}>
                  <strong>{selected.size} selected</strong>
                  <label>
                    <span className="sr-only">Bulk status</span>
                    <select value={bulk} onChange={(e) => setBulk(e.target.value as Status)}>
                      {statuses.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <button
                    onClick={() => {
                      history.set((prev) =>
                        prev.map((i) => (selected.has(i.id) ? { ...i, status: bulk } : i)),
                      );
                      setMessage(`${selected.size} items moved to ${bulk}. Undo is available.`);
                      setSelected(new Set());
                    }}
                  >
                    Update selected
                  </button>
                  <button aria-label="Clear selection" onClick={() => setSelected(new Set())}>
                    <X size={15} />
                  </button>
                </div>
              )}
              <div className={styles.tableScroll}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          aria-label="Select visible work"
                          checked={visible.length > 0 && visible.every((i) => selected.has(i.id))}
                          onChange={(e) =>
                            setSelected((prev) => {
                              const next = new Set(prev);
                              for (const i of visible) {
                                if (e.target.checked) next.add(i.id);
                                else next.delete(i.id);
                              }
                              return next;
                            })
                          }
                        />
                      </th>
                      <th>Work item</th>
                      {(['account', 'priority'] as const).map((s) => (
                        <th
                          key={s}
                          aria-sort={sort === s ? (ascending ? 'ascending' : 'descending') : 'none'}
                        >
                          <button
                            onClick={() => {
                              setSort(s);
                              setAscending(sort === s ? !ascending : true);
                            }}
                          >
                            {s}
                            <ArrowDown size={12} />
                          </button>
                        </th>
                      ))}
                      <th>Status</th>
                      <th>Owner</th>
                      <th
                        aria-sort={
                          sort === 'due' ? (ascending ? 'ascending' : 'descending') : 'none'
                        }
                      >
                        <button
                          onClick={() => {
                            setSort('due');
                            setAscending(sort === 'due' ? !ascending : true);
                          }}
                        >
                          Due date
                          <ArrowDown size={12} />
                        </button>
                      </th>
                      <th>
                        <span className="sr-only">Details</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((i) => (
                      <tr key={i.id} data-selected={selected.has(i.id)}>
                        <td>
                          <input
                            type="checkbox"
                            aria-label={`Select ${i.id}`}
                            checked={selected.has(i.id)}
                            onChange={() => toggle(i.id)}
                          />
                        </td>
                        <td>
                          <button className={styles.titleButton} onClick={() => setDetail(i.id)}>
                            <small>
                              {i.id} · {i.category}
                            </small>
                            <strong>{i.title}</strong>
                          </button>
                        </td>
                        <td>{i.account}</td>
                        <td>
                          <span className={styles.priority} data-priority={i.priority}>
                            {i.priority}
                          </span>
                        </td>
                        <td>
                          <span className={styles.badge} data-status={i.status}>
                            <i />
                            {i.status}
                          </span>
                        </td>
                        <td>
                          <span className={styles.avatar} title={i.owner} aria-label={i.owner}>
                            {i.initials}
                          </span>
                        </td>
                        <td
                          className={
                            i.due < referenceDate && i.status !== 'Done'
                              ? styles.overdue
                              : undefined
                          }
                        >
                          Oct {i.due.slice(-2)}
                        </td>
                        <td>
                          <button aria-label={`Open ${i.id}`} onClick={() => setDetail(i.id)}>
                            <ArrowUpRight size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!visible.length && (
                <div className={styles.empty}>
                  <Search size={24} />
                  <h3>No work matches these filters.</h3>
                  <p>Try another account, owner, or status.</p>
                  <button onClick={resetFilters}>Clear filters</button>
                </div>
              )}
              <footer className={styles.pagination}>
                <span>
                  {filtered.length ? currentPage * 8 + 1 : 0}–
                  {Math.min((currentPage + 1) * 8, filtered.length)} of {filtered.length} items
                </span>
                <div>
                  <button
                    aria-label="Previous page"
                    disabled={currentPage === 0}
                    onClick={() => setPage(currentPage - 1)}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span>
                    {currentPage + 1} / {pageCount}
                  </span>
                  <button
                    aria-label="Next page"
                    disabled={currentPage >= pageCount - 1}
                    onClick={() => setPage(currentPage + 1)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </footer>
            </section>
          )}
          <section className={styles.bottom}>
            <div>
              <div className={styles.sectionTitle}>
                <h2>Work distribution</h2>
                <span>{items.length} total items</span>
              </div>
              <div
                className={styles.distribution}
                role="img"
                aria-label={statuses.map((s, i) => `${s}: ${counts[i]}`).join(', ')}
              >
                {statuses.map((s, i) => (
                  <span key={s} data-status={s} style={{ flex: counts[i] }} />
                ))}
              </div>
              <div className={styles.legend}>
                {statuses.map((s, i) => (
                  <button key={s} onClick={() => filterStatus(s)}>
                    <i data-status={s} />
                    {s}
                    <strong>{counts[i]}</strong>
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.note}>
              <span>
                <Layers size={16} />A workspace with a point of view
              </span>
              <p>Filter, assign, and move work forward. Your changes stay on this device.</p>
              <small>Fictional records · Fixed sample date · No connected services</small>
            </div>
          </section>
          <p role="status" className={styles.message}>
            {!persisted
              ? 'Storage is unavailable; changes last for this visit.'
              : message || 'All changes saved locally.'}
          </p>
        </div>
      </div>
      <Dialog
        open={!!active}
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
        title={active?.title ?? 'Work item'}
        description={active ? `${active.id} · ${active.account} · ${active.category}` : undefined}
      >
        {active && (
          <div className={styles.detail}>
            <div className={styles.detailMeta}>
              <span>
                Priority <strong>{active.priority}</strong>
              </span>
              <span>
                Due date <strong>October {active.due.slice(-2)}, 2026</strong>
              </span>
              <span>
                Estimate <strong>{active.hours} hours</strong>
              </span>
            </div>
            <label>
              Status
              <select
                aria-label="Status"
                value={active.status}
                onChange={(e) => change(active.id, { status: e.target.value as Status })}
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Assigned to
              <select
                aria-label="Assigned to"
                value={active.owner}
                onChange={(e) => {
                  const o = owners.find((o) => o.name === e.target.value)!;
                  change(active.id, { owner: o.name, initials: o.initials });
                }}
              >
                {owners.map((o) => (
                  <option key={o.name}>{o.name}</option>
                ))}
              </select>
            </label>
            <label>
              Working notes
              <textarea
                maxLength={1000}
                value={active.note}
                onChange={(e) => change(active.id, { note: e.target.value }, `note-${active.id}`)}
                placeholder="Add context for your next step…"
              />
            </label>
            <span className={styles.detailHint}>Changes save automatically on this device.</span>
            <button
              onClick={() => {
                change(active.id, { status: active.status === 'Done' ? 'Open' : 'Done' });
                setMessage(`${active.id} updated.`);
                setDetail(null);
              }}
            >
              {active.status === 'Done' ? 'Reopen work item' : 'Mark complete'}
              <Check size={16} />
            </button>
          </div>
        )}
      </Dialog>
    </main>
  );
}
