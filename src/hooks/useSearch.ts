import { useState, useMemo } from 'react';
import { searchPlayersInLeaderboard } from '../api/players.js';
import type { LeaderboardEntry } from '../api/types.js';

interface UseSearchResult {
  query: string;
  setQuery: (query: string) => void;
  results: LeaderboardEntry[];
  clearSearch: () => void;
}

export function useSearch(entries: LeaderboardEntry[]): UseSearchResult {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    return searchPlayersInLeaderboard(entries, query);
  }, [entries, query]);

  const clearSearch = () => {
    setQuery('');
  };

  return {
    query,
    setQuery,
    results,
    clearSearch,
  };
}
