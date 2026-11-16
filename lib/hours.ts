import type { site } from '@/lib/site';

type SiteHours = (typeof site)['hours'];

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export interface HoursLine {
  label: string;
  value: string;
}

interface Run {
  start: string;
  end: string;
  value: string;
}

/** "07:30" -> "7:30 AM" */
function formatTime(value: string): string {
  const [hours = 0, minutes = 0] = value.split(':').map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
}

/** Accepts "Monday" or "https://schema.org/Monday". */
const normaliseDay = (day: string): string => day.replace(/^https?:\/\/schema\.org\//, '');

const toLine = ({ start, end, value }: Run): HoursLine => ({
  label: start === end ? start : `${start} – ${end}`,
  value,
});

/** Groups consecutive days with identical hours: "Monday – Friday", "Saturday", "Sunday: Closed". */
export function hoursLines(hours: SiteHours): HoursLine[] {
  const byDay = new Map<string, string>();
  for (const entry of hours) {
    const value = `${formatTime(entry.opens)} – ${formatTime(entry.closes)}`;
    for (const day of [entry.days].flat()) byDay.set(normaliseDay(day), value);
  }

  const lines: HoursLine[] = [];
  let run: Run | null = null;

  for (const day of WEEK) {
    const value = byDay.get(day) ?? 'Closed';
    if (run && run.value === value) {
      run.end = day;
      continue;
    }
    if (run) lines.push(toLine(run));
    run = { start: day, end: day, value };
  }
  if (run) lines.push(toLine(run));

  return lines;
}