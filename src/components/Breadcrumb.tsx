import React from 'react';
import { Box, Text } from 'ink';

interface BreadcrumbProps {
  items: string[];
  selectedIndex?: number;
}

export function Breadcrumb({ items, selectedIndex }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <Box marginBottom={1}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isSelected = selectedIndex !== undefined && selectedIndex === index;
        const isParent = index < items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && <Text dimColor> › </Text>}
            <Text
              color={isSelected ? 'cyan' : isLast ? 'cyan' : undefined}
              dimColor={!isSelected && isParent}
              underline={isSelected && !isLast}
            >
              {item}
            </Text>
          </React.Fragment>
        );
      })}
    </Box>
  );
}
