import {useMemo} from 'react';
import {atom, useAtom, PrimitiveAtom} from 'jotai';
import {splitAtom} from 'jotai/utils';

export const useSplitAtom = <T, U>(parentAtom: PrimitiveAtom<T>, selector: (value: T) => U[]): PrimitiveAtom<U>[] => {
  const focusedAtom = useMemo(
    () =>
      atom(
        (get) => selector(get(parentAtom)),
        (get, set, newValue: U[]) => {
          const base = get(parentAtom);
          // overwrite the selected array in a safe way
          // NOTE: this assumes shallow replacement of the field
          // for deep paths, you'd wrap selector in something smarter (optic style)
          set(parentAtom, {...base, ...patchWithSelector(selector, base, newValue)});
        }
      ),
    [parentAtom]
  );

  const split = useMemo(() => splitAtom(focusedAtom), [focusedAtom]);
  const [atoms] = useAtom(split);

  return atoms;
};

const patchWithSelector = <T, U>(selector: (value: T) => U[], base: T, newValue: U[]): Partial<T> => {
  // simplest implementation: we can only support direct property accessors here
  // for complex selectors, you'd need optics/lens introspection
  for (const key in base) {
    if (selector(base as T) === base[key]) {
      return {[key]: newValue} as Partial<T>;
    }
  }
  throw new Error('Selector must directly return a property of the object');
};
