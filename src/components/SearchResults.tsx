import React from 'react';
import { Box, Text } from 'ink';
import type { LeaderboardEntry } from '../api/types.js';
import type { SearchResult } from '../api/players.js';
import { getScoreColor } from '../utils/theme.js';
import { Spinner } from './Spinner.js';

interface LeaderboardSearchResultsProps {
  type: 'leaderboard';
  results: LeaderboardEntry[];
  selectedIndex: number;
  query: string;
  isLoading?: boolean;
}

interface GlobalSearchResultsProps {
  type: 'global';
  results: SearchResult[];
  selectedIndex: number;
  query: string;
  isLoading?: boolean;
}

type SearchResultsProps = LeaderboardSearchResultsProps | GlobalSearchResultsProps;

export function SearchResults(props: SearchResultsProps) {
  const { results, selectedIndex, query, isLoading } = props;

  if (isLoading) {
    return (
      <Box marginY={1} paddingX={1}>
        <Spinner label="Searching..." />
      </Box>
    );
  }

  if (query.length < 2) {
    return (
      <Box marginY={1} paddingX={1}>
        <Text dimColor>Type at least 2 characters to search all players...</Text>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box marginY={1} paddingX={1}>
        <Text dimColor>No players found matching "{query}"</Text>
      </Box>
    );
  }

  if (props.type === 'leaderboard') {
    return (
      <Box flexDirection="column" marginY={1} borderStyle="round" borderColor="gray" paddingX={1}>
        <Text dimColor>In tournament: {results.length} player{results.length !== 1 ? 's' : ''}</Text>
        {(results as LeaderboardEntry[]).slice(0, 10).map((entry, index) => {
          const isSelected = index === selectedIndex;
          const scoreColor = getScoreColor(entry.scoreNum);
          return (
            <Box key={entry.player.id}>
              <Text color={isSelected ? 'cyan' : 'white'}>
                {isSelected ? '> ' : '  '}
              </Text>
              <Text color={isSelected ? 'cyan' : 'white'}>
                {entry.player.name.padEnd(25)}
              </Text>
              <Text dimColor>{entry.position.padEnd(5)}</Text>
              <Text color={scoreColor}>{entry.score}</Text>
            </Box>
          );
        })}
      </Box>
    );
  }

  // Global search results
  return (
    <Box flexDirection="column" marginY={1} borderStyle="round" borderColor="gray" paddingX={1}>
      <Text dimColor>All players: {results.length} result{results.length !== 1 ? 's' : ''}</Text>
      {(results as SearchResult[]).slice(0, 10).map((player, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Box key={player.id}>
            <Text color={isSelected ? 'cyan' : 'white'}>
              {isSelected ? '> ' : '  '}
            </Text>
            <Text color={isSelected ? 'cyan' : 'white'}>
              {player.name.padEnd(30)}
            </Text>
            {player.country && <Text dimColor>{player.country}</Text>}
          </Box>
        );
      })}
    </Box>
  );
}
