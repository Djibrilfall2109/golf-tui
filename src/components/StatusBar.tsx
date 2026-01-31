import React from 'react';
import { Box, Text } from 'ink';
import type { View, Tour } from '../api/types.js';

interface StatusBarProps {
  view: View;
  tour: Tour;
  isSearchFocused: boolean;
}

const TOUR_NAMES: Record<Tour, string> = {
  pga: 'PGA',
  lpga: 'LPGA',
  eur: 'DP World',
  'champions-tour': 'Champions',
};

export function StatusBar({ view, tour, isSearchFocused }: StatusBarProps) {
  const tourName = TOUR_NAMES[tour];

  return (
    <Box marginTop={1} borderStyle="single" borderColor="gray" paddingX={1}>
      <Box flexGrow={1}>
        <Text dimColor>
          {isSearchFocused ? (
            <Text>Type command or search • <Text color="yellow">Esc</Text> cancel</Text>
          ) : view === 'leaderboard' ? (
            <Text>
              <Text color="yellow">j/k</Text> navigate •
              <Text color="yellow"> Enter</Text> player •
              <Text color="yellow"> c</Text> scorecard •
              <Text color="yellow"> s</Text> search •
              <Text color="yellow"> Tab</Text> tour •
              <Text color="yellow"> r</Text> refresh •
              <Text color="yellow"> q</Text> quit
            </Text>
          ) : view === 'schedule' ? (
            <Text>
              <Text color="yellow">j/k</Text> navigate • 
              <Text color="yellow"> Enter</Text> select • 
              <Text color="yellow"> Esc</Text> back • 
              <Text color="yellow"> q</Text> quit
            </Text>
          ) : view === 'player' ? (
            <Text>
              <Text color="yellow">j/k</Text> navigate •
              <Text color="yellow"> Enter</Text> view event •
              <Text color="yellow"> Tab</Text> breadcrumb •
              <Text color="yellow"> Esc</Text> back •
              <Text color="yellow"> q</Text> quit
            </Text>
          ) : view === 'event-leaderboard' ? (
            <Text>
              <Text color="yellow">j/k</Text> navigate •
              <Text color="yellow"> Enter</Text> player •
              <Text color="yellow"> c</Text> scorecard •
              <Text color="yellow"> Tab</Text> breadcrumb •
              <Text color="yellow"> Esc</Text> back •
              <Text color="yellow"> q</Text> quit
            </Text>
          ) : view === 'scorecard' ? (
            <Text>
              <Text color="yellow">1-4</Text> switch round •
              <Text color="yellow"> Tab</Text> breadcrumb •
              <Text color="yellow"> Esc</Text> back •
              <Text color="yellow"> q</Text> quit
            </Text>
          ) : (
            <Text>
              <Text color="yellow">Esc</Text> close • 
              <Text color="yellow"> q</Text> quit
            </Text>
          )}
        </Text>
      </Box>
      <Text color="green">{tourName}</Text>
    </Box>
  );
}
