import {FreeFormTranslationObject} from './types/FreeFormTranslationObject';
import {TranslationKeys} from './types/TranslationKeys';

export function extractTranslationKeys<T extends FreeFormTranslationObject>(param: T): TranslationKeys<T> {
  const collectPath = <T extends FreeFormTranslationObject>(obj: T, path?: string): TranslationKeys<T> => {
    const result: Record<string, object | string> = {};
    for (const key of Object.keys(obj)) {
      const keyPath = (path ? path + '.' : '') + key;
      if (typeof obj[key] === 'string') {
        result[key] = keyPath;
        continue;
      }
      if (!obj[key]) {
        // never
        throw new Error(`Path ${key} not found in translation`);
      }
      result[key] = collectPath(obj[key], keyPath);
    }
    return result as TranslationKeys<T>;
  };
  const result = collectPath(param);
  return result;
}
