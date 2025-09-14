import {useMemo} from 'react';
import {atom, useAtom, PrimitiveAtom} from 'jotai';

export const usePropAtom = <T, K extends keyof T> (
  parentAtom: PrimitiveAtom<T>,
  key: K
): [T[K], (value: T[K]) => void] => {
  const keyAtom = useMemo(
    () =>
      atom(
        (get) => get(parentAtom)[key],
        (get, set, value: T[K]) => set(parentAtom, {...get(parentAtom), [key]: value})
      ),
    [parentAtom, key]
  );

  return useAtom(keyAtom);
};
