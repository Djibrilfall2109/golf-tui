import React from 'react';
import { Box, Text } from 'ink';

export function Header() {
  return (
    <Box flexDirection="column" alignItems="center" marginBottom={1}>
      <Box flexDirection="column">
        <Text>
          <Text color="white" bold>█████</Text>
          <Text color="gray">▄</Text>
          <Text> </Text>
          <Text color="white" bold>████</Text>
          <Text color="gray">▄</Text>
          <Text> </Text>
          <Text color="white" bold>█</Text>
          <Text>    </Text>
          <Text color="white" bold>█████</Text>
          <Text color="gray">▄</Text>
        </Text>
        <Text>
          <Text color="white" bold>█    </Text>
          <Text color="gray">█</Text>
          <Text> </Text>
          <Text color="white" bold>█   █</Text>
          <Text> </Text>
          <Text color="white" bold>█</Text>
          <Text>    </Text>
          <Text color="white" bold>█    </Text>
          <Text color="gray">█</Text>
        </Text>
        <Text>
          <Text color="white" bold>█ ██ </Text>
          <Text> </Text>
          <Text> </Text>
          <Text color="white" bold>█   █</Text>
          <Text> </Text>
          <Text color="white" bold>█</Text>
          <Text>    </Text>
          <Text color="white" bold>█████</Text>
          <Text color="gray">▀</Text>
        </Text>
        <Text>
          <Text color="white" bold>█  █ </Text>
          <Text> </Text>
          <Text> </Text>
          <Text color="white" bold>█   █</Text>
          <Text> </Text>
          <Text color="white" bold>█</Text>
          <Text>    </Text>
          <Text color="white" bold>█    </Text>
        </Text>
        <Text>
          <Text color="white" bold>█████</Text>
          <Text color="gray">▀</Text>
          <Text> </Text>
          <Text color="white" bold>████</Text>
          <Text color="gray">▀</Text>
          <Text> </Text>
          <Text color="white" bold>█████</Text>
          <Text> </Text>
          <Text color="white" bold>█    </Text>
        </Text>
      </Box>
      <Text color="gray">Live Tournament Leaderboards</Text>
    </Box>
  );
}
