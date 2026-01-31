import React from 'react';
import { Text } from 'ink';
import { useBlink } from '../hooks/useBlink.js';

export function LiveIndicator() {
  const visible = useBlink(800);

  return (
    <Text color="green" bold dimColor={!visible}>● LIVE</Text>
  );
}
