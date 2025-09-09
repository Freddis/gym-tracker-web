import {useRef, useCallback} from 'react';

/**
 * Like useState, but doesn't trigger re-renders.
 * Value lives in a ref and persists across renders.
 */
export function useLocalRefState<T extends object>(initialValue: T) {
  const ref = useRef<T>({...initialValue});
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const next = typeof value === 'function' ? (value as (prev: T) => T)(ref.current) : value;
    // delete old keys
    Object.keys(ref.current).forEach((key) => {
      delete (ref.current)[key];
    });

    // copy new keys
    Object.keys(next).forEach((key) => {
      (ref.current)[key] = (next)[key];
    });
  }, []);

  return [ref.current, setValue] as const;
}
