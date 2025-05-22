import {ReactNode} from 'react';
import reactStringReplace from 'react-string-replace';
import {FreeFormTranslationKeysObject} from './types/FreeFormTranslationKeysObject';
import {FreeFormTranslationObject} from './types/FreeFormTranslationObject';
import {Translation} from './types/Translation';
import {TranslationKey} from './types/TranslationKey';
import {TranslationKeys} from './types/TranslationKeys';
import {currentTranslation, i18nKeys} from './i18nKeys';

export function useAppPartialTranslation<T extends FreeFormTranslationKeysObject>(
    callback: (dictionary: TranslationKeys<Translation>) => T,
) {
  const findTranslationString = (key: TranslationKey): string => {
    const parts = key.split('.');
    let cursor: FreeFormTranslationObject = currentTranslation;
    for (const currentKey of parts) {
      if (typeof cursor[currentKey] === 'string') {
        return cursor[currentKey];
      }
      cursor = cursor[currentKey];
    }
    throw new Error(`No translation found for key '${key}'`);
  };

    // strings
  const t = (key: TranslationKey, variables?: Record<string, string | number>): string => {
    let translationString = findTranslationString(key);
    if (!variables) {
      return translationString;
    }

    for (const key of Object.keys(variables)) {
      const find = `{${key}}`;
      translationString = translationString.replaceAll(find, variables[key]?.toString() ?? 'unknown-variable');
    }
    return translationString;
  };

    // components
  const tc = (key: TranslationKey, variables?: Record<string, string | number | ReactNode>): ReactNode[] => {
    const translationString = findTranslationString(key);
    if (!variables) {
      return [translationString];
    }

    const replaced = reactStringReplace(translationString, /{(.*?)}/, (match) => {
      return variables[match] ?? 'translation-varible-not-found';
    });

    const result: ReactNode[] = [];
    let keyCounter = 1;
    for (const node of replaced) {
            // adding keys
      result.push(<span key={(keyCounter++).toString()}>{node}</span>);
    }

    return result;
  };

  const subKeys = callback(i18nKeys);
  return {t, tc, i18n: subKeys};
}
