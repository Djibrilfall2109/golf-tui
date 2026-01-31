export function formatScore(score: number): string {
  if (score === 0) return 'E';
  return score > 0 ? `+${score}` : `${score}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateRange(startStr: string, endStr?: string): string {
  const start = new Date(startStr);
  const startFormatted = start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  if (!endStr) return startFormatted;

  const end = new Date(endStr);
  const endFormatted = end.toLocaleDateString('en-US', {
    day: 'numeric',
  });

  return `${startFormatted}-${endFormatted}`;
}

export function formatPurse(purse: string | undefined): string {
  return purse || '';
}

export function padString(str: string, length: number, align: 'left' | 'right' = 'left'): string {
  if (align === 'right') {
    return str.padStart(length);
  }
  return str.padEnd(length);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + '…';
}
