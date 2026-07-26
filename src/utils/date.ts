export function formatDate(iso: string | null, options?: Intl.DateTimeFormatOptions): string {
  if (!iso) return 'No date';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', options ?? { month: 'short', day: 'numeric', year: 'numeric' });
}

export function relativeDaysLabel(iso: string | null): string {
  if (!iso) return 'No deadline';
  const now = new Date();
  const target = new Date(iso);
  const diffMs = target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days === -1) return 'Due yesterday';
  if (days > 1) return `Due in ${days} days`;
  return `${Math.abs(days)} days overdue`;
}

export function isoToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export function weekdayShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short' });
}

export function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, 'y'],
    [2592000, 'mo'],
    [86400, 'd'],
    [3600, 'h'],
    [60, 'm'],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count}${label} ago`;
  }
  return 'just now';
}
