import React from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import InkSpinner from 'ink-spinner';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  isFocused: boolean;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  isLoading = false,
  isFocused,
  placeholder = 'Type / for commands...',
}: SearchInputProps) {
  return (
    <Box marginBottom={1}>
      <Text color={isFocused ? 'cyan' : 'gray'}>{'>'} </Text>
      {isFocused ? (
        <TextInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <Text dimColor>{placeholder}</Text>
      )}
      {isLoading && (
        <Box marginLeft={1}>
          <Text color="green">
            <InkSpinner type="dots" />
          </Text>
        </Box>
      )}
    </Box>
  );
}
