import { useState, useEffect, useRef } from 'react';
import { searchAllPlayers, type SearchResult } from '../api/players.js';

interface UseGlobalSearchResult {
  results: SearchResult[];
  isLoading: boolean;
}

export function useGlobalSearch(query: string): UseGlobalSearchResult {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query || query.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    debounceRef.current = setTimeout(async () => {
      const data = await searchAllPlayers(query);
      setResults(data);
      setIsLoading(false);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  return { results, isLoading };
}
