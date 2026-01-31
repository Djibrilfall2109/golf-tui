import { useState, useEffect } from 'react';

export function useBlink(intervalMs = 500): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setVisible(v => !v), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return visible;
}
