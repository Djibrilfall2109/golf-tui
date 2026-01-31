import { useState, useCallback, useEffect, useRef } from 'react';
import { fetchPlayerScorecard } from '../api/scorecard.js';
import { clearCache } from '../api/client.js';
import type { Tour, PlayerScorecard } from '../api/types.js';

const AUTO_REFRESH_INTERVAL = 60 * 1000; // 60 seconds

interface UseScorecardResult {
  scorecard: PlayerScorecard | null;
  isLoading: boolean;
  error: string | null;
  loadScorecard: (eventId: string, playerId: string, playerName: string, tour: Tour) => void;
  clear: () => void;
  setAutoRefresh: (enabled: boolean) => void;
}

export function useScorecard(): UseScorecardResult {
  const [scorecard, setScorecard] = useState<PlayerScorecard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const paramsRef = useRef<{ eventId: string; playerId: string; playerName: string; tour: Tour } | null>(null);

  const loadScorecard = useCallback(async (
    eventId: string,
    playerId: string,
    playerName: string,
    tour: Tour
  ) => {
    paramsRef.current = { eventId, playerId, playerName, tour };
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPlayerScorecard(eventId, playerId, playerName, tour);
      setScorecard(data);
      if (!data) {
        setError('Scorecard not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load scorecard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!paramsRef.current) return;
    const { eventId, playerId, playerName, tour } = paramsRef.current;

    clearCache();

    try {
      const data = await fetchPlayerScorecard(eventId, playerId, playerName, tour);
      setScorecard(data);
    } catch {
      // Silently fail on auto-refresh errors
    }
  }, []);

  useEffect(() => {
    if (!autoRefresh || !paramsRef.current) return;

    const id = setInterval(refresh, AUTO_REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [autoRefresh, refresh]);

  const clear = useCallback(() => {
    setScorecard(null);
    setError(null);
    setAutoRefresh(false);
    paramsRef.current = null;
  }, []);

  return {
    scorecard,
    isLoading,
    error,
    loadScorecard,
    clear,
    setAutoRefresh,
  };
}
