export interface WellnessState {
  name: string;
  startDate: string;
  checkIns: string[];
}
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function isDateKey(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T12:00:00');
  return !Number.isNaN(date.getTime()) && localDate(date) === value;
}
export function isWellnessState(value: unknown): value is WellnessState {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Partial<WellnessState>;
  return (
    typeof v.name === 'string' &&
    v.name.length <= 80 &&
    isDateKey(v.startDate) &&
    Array.isArray(v.checkIns) &&
    v.checkIns.length <= 10000 &&
    v.checkIns.every(isDateKey) &&
    new Set(v.checkIns).size === v.checkIns.length
  );
}
export const initialWellness: WellnessState = { name: '', startDate: localDate(), checkIns: [] };
