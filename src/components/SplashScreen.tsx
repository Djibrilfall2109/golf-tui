import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

interface SplashScreenProps {
  onComplete: () => void;
}

const WIDTH = 40;
const HOLE_POS = WIDTH - 4;

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [ballPos, setBallPos] = useState(0);
  const [inHole, setInHole] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setBallPos(prev => {
        if (prev >= HOLE_POS) {
          setInHole(true);
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return prev;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  const grass = '~'.repeat(WIDTH);
  const ballLine = ' '.repeat(ballPos) + (inHole ? '' : 'o') + ' '.repeat(Math.max(0, HOLE_POS - ballPos - 1)) + (inHole ? '(o)' : '( )');

  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" padding={2}>
      <Box marginBottom={2}>
        <Text bold color="white">
{`   ██████╗  ██████╗ ██╗     ███████╗
  ██╔════╝ ██╔═══██╗██║     ██╔════╝
  ██║  ███╗██║   ██║██║     █████╗  
  ██║   ██║██║   ██║██║     ██╔══╝  
  ╚██████╔╝╚██████╔╝███████╗██║     
   ╚═════╝  ╚═════╝ ╚══════╝╚═╝     `}
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="center">
        <Text color="green">{grass}</Text>
        <Text color="white">{ballLine}</Text>
        <Text color="green">{grass}</Text>
      </Box>

      {inHole && (
        <Box marginTop={1}>
          <Text bold color="yellow">In the hole!</Text>
        </Box>
      )}

      <Box marginTop={2}>
        <Text dimColor>Live Tournament Leaderboards</Text>
      </Box>
    </Box>
  );
}
