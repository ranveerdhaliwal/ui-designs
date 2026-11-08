export const statuses = ['Open', 'In progress', 'Blocked', 'Done'] as const;
export type Status = (typeof statuses)[number];
export type Priority = 'High' | 'Medium' | 'Low';
export interface WorkItem {
  id: string;
  title: string;
  account: string;
  owner: string;
  initials: string;
  status: Status;
  priority: Priority;
  category: string;
  due: string;
  hours: number;
  note: string;
}
const titles = [
  ['Northstar', 'Resolve invoice mismatch', 'Finance', 5],
  ['Forma', 'Prepare workspace migration', 'Onboarding', 12],
  ['Aperture', 'Review access permissions', 'Security', 3],
  ['Common Ground', 'Investigate delayed delivery', 'Support', 8],
  ['Orbit', 'Confirm renewal scope', 'Success', 4],
  ['Monogram', 'Import historical records', 'Onboarding', 16],
  ['Fieldwork', 'Update billing contact', 'Finance', 2],
  ['Sable', 'Investigate webhook retries', 'Support', 10],
  ['Northstar', 'Provision regional workspace', 'Onboarding', 6],
  ['Forma', 'Verify SSO configuration', 'Security', 7],
  ['Aperture', 'Complete quarterly review', 'Success', 3],
  ['Orbit', 'Reconcile October usage', 'Finance', 5],
  ['Common Ground', 'Export audit evidence', 'Security', 4],
  ['Monogram', 'Schedule team training', 'Success', 2],
  ['Fieldwork', 'Validate integration mapping', 'Support', 9],
  ['Sable', 'Archive completed workspace', 'Onboarding', 3],
] as const;
export const owners = [
  { name: 'Maya Chen', initials: 'MC' },
  { name: 'Theo Park', initials: 'TP' },
  { name: 'Amara Okafor', initials: 'AO' },
  { name: 'Jules Martin', initials: 'JM' },
];
export const seedItems: WorkItem[] = titles.map(([account, title, category, hours], i) => ({
  id: `OPS-${1048 + i}`,
  title,
  account,
  category,
  hours,
  owner: owners[i % 4]!.name,
  initials: owners[i % 4]!.initials,
  status: statuses[[0, 1, 2, 1, 0, 1, 3, 2, 0, 3, 1, 0, 3, 0, 1, 3][i]!]!,
  priority: (['High', 'Medium', 'Low'] as const)[i % 3]!,
  due: `2026-10-${String(27 + (i % 5)).padStart(2, '0')}`,
  note: '',
}));
export function isItems(value: unknown): value is WorkItem[] {
  return (
    Array.isArray(value) &&
    value.length === seedItems.length &&
    new Set(value.map((v) => v?.id)).size === seedItems.length &&
    value.every((item) => {
      if (!item || typeof item !== 'object') return false;
      const original = seedItems.find((x) => x.id === item.id);
      return (
        !!original &&
        Object.keys(original).every((key) =>
          key === 'status'
            ? statuses.includes(item.status)
            : key === 'owner'
              ? owners.some((o) => o.name === item.owner && o.initials === item.initials)
              : key === 'initials'
                ? true
                : key === 'note'
                  ? typeof item.note === 'string' && item.note.length <= 1000
                  : item[key] === original[key as keyof WorkItem],
        )
      );
    })
  );
}
export function selectItems(items: WorkItem[], query: string, status: string, owner: string) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return items.filter(
    (i) =>
      (status === 'All work' || i.status === status) &&
      (owner === 'Everyone' || i.owner === owner) &&
      words.every((w) => `${i.id} ${i.title} ${i.account} ${i.category}`.toLowerCase().includes(w)),
  );
}
export function csvItems(items: WorkItem[]) {
  const quote = (s: string) => `"${s.replaceAll('"', '""')}"`;
  return [
    ['ID', 'Task', 'Account', 'Owner', 'Status', 'Priority', 'Due', 'Hours'],
    ...items.map((i) => [
      i.id,
      i.title,
      i.account,
      i.owner,
      i.status,
      i.priority,
      i.due,
      String(i.hours),
    ]),
  ]
    .map((row) => row.map(quote).join(','))
    .join('\r\n');
}
