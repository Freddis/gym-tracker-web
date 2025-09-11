import {RefObject, useState} from 'react';

export function useNonRenderingState<T extends object| undefined>(
  initialValue?: T,
  notify?: () => void
) {

  const [refState, setState] = useState<{current: T|undefined}>({current: undefined});
  const setValue = (value: T | ((prev: T) => T), update?: boolean) => {
    const next = typeof value === 'function' ? (value as (prev: T | undefined) => T)(refState.current) : value;
    // delete old keys
    if (refState.current !== undefined) {
      Object.keys(refState.current).forEach((key) => {
        delete (refState.current as Record<string, unknown>)[key];
      });
      if (Array.isArray(refState.current)) {
        refState.current.splice(0, refState.current.length);
      }
    }

    // copy new keys
    if (next !== undefined && refState.current !== undefined && !update) {
      for (const key of Object.keys(next)) {
        (refState.current as Record<string, unknown>)[key] = (next as Record<string, unknown>)[key];
      }
    } else {
      let newVal: T | undefined;
      if (next) {
        newVal = Array.isArray(next) ? ([...next] as T) : ({...next} as T);
      }
      const newRef: RefObject<T | undefined> = {
        current: newVal,
      };
      setState(newRef);
    }

    if (notify) {
      notify();
    }
  };

  if (initialValue !== undefined && refState.current === undefined) {
    refState.current = Array.isArray(initialValue) ? ([...initialValue] as T) : ({...initialValue} as T);
  }

  return [refState.current as RefObject<T>['current'], setValue] as const;
}
