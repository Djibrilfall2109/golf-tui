import React from 'react';
import { Box, Text } from 'ink';
import type { Tournament, Tour } from '../api/types.js';
import { Spinner } from './Spinner.js';
import { formatDateRange } from '../utils/format.js';

interface TournamentListProps {
  tournaments: Tournament[];
  isLoading: boolean;
  error: string | null;
  selectedIndex: number;
  tour: Tour;
}

const TOUR_NAMES: Record<Tour, string> = {
  pga: 'PGA Tour',
  lpga: 'LPGA Tour',
  eur: 'DP World Tour',
  'champions-tour': 'Champions Tour',
};

export function TournamentList({ tournaments, isLoading, error, selectedIndex, tour }: TournamentListProps) {
  if (isLoading && tournaments.length === 0) {
    return (
      <Box justifyContent="center" marginY={1}>
        <Spinner label="Loading schedule..." />
      </Box>
    );
  }

  if (error && tournaments.length === 0) {
    return (
      <Box marginY={1}>
        <Text color="red">Error: {error}</Text>
      </Box>
    );
  }

  if (tournaments.length === 0) {
    return (
      <Box marginY={1}>
        <Text color="yellow">No tournaments found for {TOUR_NAMES[tour]}</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">{TOUR_NAMES[tour]} Schedule</Text>
      <Text dimColor>{'─'.repeat(60)}</Text>

      {tournaments.map((tournament, index) => {
        const isSelected = index === selectedIndex;
        const selector = isSelected ? '>' : ' ';
        
        let statusText = '';
        let statusColor: string = 'gray';
        if (tournament.status === 'in') {
          statusText = 'LIVE';
          statusColor = 'green';
        } else if (tournament.status === 'post') {
          statusText = 'FINAL';
          statusColor = 'yellow';
        }

        return (
          <Box key={tournament.id} flexDirection="column">
            <Box>
              <Text color={isSelected ? 'cyan' : 'white'}>{selector} </Text>
              <Text dimColor>{formatDateRange(tournament.date, tournament.endDate).padEnd(12)}</Text>
              <Text bold={isSelected}>{tournament.name}</Text>
              {statusText && <Text color={statusColor}> [{statusText}]</Text>}
            </Box>
            {isSelected && (
              <Box marginLeft={3}>
                {tournament.venue && <Text dimColor>{tournament.venue}</Text>}
                {tournament.location && <Text dimColor> - {tournament.location}</Text>}
                {tournament.purse && <Text dimColor> | {tournament.purse}</Text>}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
