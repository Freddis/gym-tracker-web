import {TranslationKeys} from './types/TranslationKeys';
import {Translation} from './types/Translation';
import {useAppPartialTranslation} from './useAppPartialTranslation';

// todo: this one seems to be inferior to partial version, delete after partials well tested
export function useAppTranslation() {
  const result = useAppPartialTranslation((x) => x);
  const i18n: TranslationKeys<Translation> = result.i18n;
  return {...result, i18n};
}
