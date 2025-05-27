import {Language} from '../components/layout/LanguageProvider/enums/Language';
import {extractTranslationKeys} from './extractTranslationKeys';
import {dictionary as en} from './locales/en/en';
import {dictionary as ru} from './locales/ru/ru';
import {Translation} from './types/Translation';

type TranlationMap = {
  [key in Language]: Translation
}
export const translations: TranlationMap = {
  [Language.English]: en,
  [Language.Russian]: ru,
};
export const i18nKeys = extractTranslationKeys(en);
