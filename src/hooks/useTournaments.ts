import { useState, useEffect, useCallback } from 'react';
import { fetchTournaments, fetchSchedule } from '../api/tournaments.js';
import type { Tour, Tournament } from '../api/types.js';

interface UseTournamentsResult {
  tournaments: Tournament[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useTournaments(tour: Tour): UseTournamentsResult {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTournaments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchSchedule(tour);
      setTournaments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tournaments');
    } finally {
      setIsLoading(false);
    }
  }, [tour]);

  useEffect(() => {
    loadTournaments();
  }, [loadTournaments]);

  return {
    tournaments,
    isLoading,
    error,
    refresh: loadTournaments,
  };
}
