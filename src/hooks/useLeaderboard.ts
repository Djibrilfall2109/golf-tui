import { useState, useEffect, useCallback } from 'react';
import { fetchLeaderboard } from '../api/leaderboard.js';
import { clearCache } from '../api/client.js';
import type { Tour, Leaderboard } from '../api/types.js';

interface UseLeaderboardResult {
  leaderboard: Leaderboard | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useLeaderboard(tour: Tour): UseLeaderboardResult {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchLeaderboard(tour);
      setLeaderboard(data);
      if (!data) {
        setError('No active tournament found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  }, [tour]);

  const refresh = useCallback(() => {
    clearCache();
    loadLeaderboard();
  }, [loadLeaderboard]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  return {
    leaderboard,
    isLoading,
    error,
    refresh,
  };
}
