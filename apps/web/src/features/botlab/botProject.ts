import { type Bot, type Part, PRESETS } from './botlabData';
import { isBot, readBots } from './botStorage';
export type Slot = 'body' | 'head' | 'eyes' | 'mouth' | 'top';
export type CustomParts = Partial<Record<Slot, Part>>;
export interface BotProject {
  version: 1;
  bot: Bot;
  parts: CustomParts;
}
export const initialProject: BotProject = { version: 1, bot: PRESETS[0]!.bot, parts: {} };
export function isPart(value: unknown): value is Part {
  if (!value || typeof value !== 'object') return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.name === 'string' &&
    p.name.length <= 64 &&
    Array.isArray(p.grid) &&
    p.grid.length === 16 &&
    p.grid.every((row) => typeof row === 'string' && /^[.oabcde]{16}$/.test(row)) &&
    p.idle === undefined
  );
}
export function isProject(value: unknown): value is BotProject {
  if (!value || typeof value !== 'object') return false;
  const p = value as Record<string, unknown>;
  return (
    p.version === 1 &&
    isBot(p.bot) &&
    !!p.parts &&
    typeof p.parts === 'object' &&
    !Array.isArray(p.parts) &&
    Object.entries(p.parts).every(
      ([key, part]) => ['body', 'head', 'eyes', 'mouth', 'top'].includes(key) && isPart(part),
    )
  );
}
export function isCollection(value: unknown): value is BotProject[] {
  return Array.isArray(value) && value.length <= 100 && value.every(isProject);
}
export function legacyCollection(): BotProject[] {
  try {
    return readBots(localStorage.getItem('botlab-saved-v2')).map((bot) => ({
      version: 1,
      bot,
      parts: {},
    }));
  } catch {
    return [];
  }
}
