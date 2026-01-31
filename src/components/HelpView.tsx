import React from 'react';
import { Box, Text } from 'ink';

export function HelpView() {
  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" paddingX={2} paddingY={1}>
      <Text bold color="cyan">Commands</Text>
      <Text dimColor>Press any key to close</Text>
      
      <Box marginTop={1} flexDirection="column">
        <Text><Text color="yellow">/leaderboard</Text>  View live tournament leaderboard</Text>
        <Text><Text color="yellow">/schedule</Text>     View tournament schedule</Text>
        <Text><Text color="yellow">/pga</Text>          Switch to PGA Tour</Text>
        <Text><Text color="yellow">/lpga</Text>         Switch to LPGA Tour</Text>
        <Text><Text color="yellow">/eur</Text>          Switch to DP World Tour</Text>
        <Text><Text color="yellow">/champions</Text>    Switch to Champions Tour</Text>
        <Text><Text color="yellow">/help</Text>         Show this help</Text>
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text bold color="cyan">Navigation</Text>
        <Text><Text color="yellow">j / Down</Text>   Move down</Text>
        <Text><Text color="yellow">k / Up</Text>     Move up</Text>
        <Text><Text color="yellow">Tab</Text>        Cycle tours (leaderboard) / breadcrumb</Text>
        <Text><Text color="yellow">Enter</Text>      Select / drill down</Text>
        <Text><Text color="yellow">c</Text>          View player scorecard</Text>
        <Text><Text color="yellow">1-4</Text>        Switch round (in scorecard)</Text>
        <Text><Text color="yellow">Esc</Text>        Go back / cancel</Text>
        <Text><Text color="yellow">/</Text>          Open command palette</Text>
        <Text><Text color="yellow">r</Text>          Refresh data</Text>
        <Text><Text color="yellow">q</Text>          Quit</Text>
      </Box>
    </Box>
  );
}
