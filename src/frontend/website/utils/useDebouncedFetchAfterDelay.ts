import {useState, useEffect} from 'react';

export const useDebouncedFetchAfterDelay = <T>(condition: boolean, delay: number, callback: () => Promise<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);
  const [timeoutValue, setTimeoutValue] = useState<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    // once fetched, don't fetch again
    if (debouncedValue !== null) {
      return;
    }
    // if not in view, don't fetch
    if (!condition) {
      if (timeoutValue) {
        clearTimeout(timeoutValue);
        setTimeoutValue(null);
      }
      return;
    }
    // if already fetching, don't fetch again
    if (timeoutValue) {
      return;
    }
    // fetch after delay
    const id = setTimeout(async () => {
      const result = await callback();
      setDebouncedValue(result);
    }, delay);
    setTimeoutValue(id);

    // clear timeout on unmount
    return () => clearTimeout(id);
  }, [condition, delay]);
  return debouncedValue;
};
