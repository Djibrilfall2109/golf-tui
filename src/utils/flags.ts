const FLAG_MAP: Record<string, string> = {
  USA: '🇺🇸',
  US: '🇺🇸',
  GBR: '🇬🇧',
  GB: '🇬🇧',
  ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  WAL: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  NIR: '🇬🇧',
  IRL: '🇮🇪',
  AUS: '🇦🇺',
  CAN: '🇨🇦',
  RSA: '🇿🇦',
  ZAF: '🇿🇦',
  ESP: '🇪🇸',
  FRA: '🇫🇷',
  GER: '🇩🇪',
  DEU: '🇩🇪',
  ITA: '🇮🇹',
  JPN: '🇯🇵',
  KOR: '🇰🇷',
  SWE: '🇸🇪',
  NOR: '🇳🇴',
  DEN: '🇩🇰',
  DNK: '🇩🇰',
  FIN: '🇫🇮',
  NED: '🇳🇱',
  NLD: '🇳🇱',
  BEL: '🇧🇪',
  AUT: '🇦🇹',
  SUI: '🇨🇭',
  CHE: '🇨🇭',
  ARG: '🇦🇷',
  BRA: '🇧🇷',
  MEX: '🇲🇽',
  CHI: '🇨🇱',
  CHL: '🇨🇱',
  COL: '🇨🇴',
  VEN: '🇻🇪',
  CHN: '🇨🇳',
  IND: '🇮🇳',
  THA: '🇹🇭',
  PHI: '🇵🇭',
  PHL: '🇵🇭',
  MAS: '🇲🇾',
  MYS: '🇲🇾',
  SGP: '🇸🇬',
  NZL: '🇳🇿',
  FIJ: '🇫🇯',
  TPE: '🇹🇼',
  TWN: '🇹🇼',
};

export function getFlag(countryCode: string | undefined): string {
  if (!countryCode) return '🏳️';
  const code = countryCode.toUpperCase();
  return FLAG_MAP[code] || '🏳️';
}

export function getCountryName(code: string | undefined): string {
  if (!code) return '';
  return code.toUpperCase();
}
