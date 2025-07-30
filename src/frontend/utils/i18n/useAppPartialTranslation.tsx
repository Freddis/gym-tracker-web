import {ReactNode, useContext} from 'react';
import reactStringReplace from 'react-string-replace';
import {FreeFormTranslationKeysObject} from './types/FreeFormTranslationKeysObject';
import {FreeFormTranslationObject} from './types/FreeFormTranslationObject';
import {Translation} from './types/Translation';
import {TranslationKey} from './types/TranslationKey';
import {TranslationKeys} from './types/TranslationKeys';
import {translations, i18nKeys} from './i18nKeys';
import {LanguageContext} from '../../components/layout/LanguageProvider/context/LanguageContext';

export function useAppPartialTranslation<T extends FreeFormTranslationKeysObject>(
    callback: (dictionary: TranslationKeys<Translation>) => T,
) {
  const language = useContext(LanguageContext);
  const findTranslationString = (key: TranslationKey): string => {
    const parts = key.split('.');
    let cursor: FreeFormTranslationObject = translations[language.language];
    for (const currentKey of parts) {
      if (typeof cursor[currentKey] === 'string') {
        return cursor[currentKey];
      }
      if (!cursor[currentKey]) {
        // never
        throw new Error(`Path not found for key '${key}: ${currentKey}`);
      }
      cursor = cursor[currentKey];
    }
    throw new Error(`No translation found for key '${key}'`);
  };

    // strings
  const t = (key: TranslationKey, variables?: Record<string, string | number>): string => {
    // return `--${key}---`; // uncomment for checks
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
  return {t, tc, i18n: subKeys, translations: translations[language.language]};
}
