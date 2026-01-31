export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  muted: string;
}

export function getThemeColors(): ThemeColors {
  return {
    primary: 'green',
    secondary: 'cyan',
    accent: 'yellow',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    muted: 'gray',
  };
}

export function getScoreColor(score: number): string {
  if (score < 0) return 'green';
  if (score > 0) return 'red';
  return 'white';
}

export function getPositionColor(position: string): string {
  if (position === '1' || position === 'T1') return 'yellow';
  if (position.startsWith('T') || parseInt(position) <= 10) return 'cyan';
  return 'white';
}
