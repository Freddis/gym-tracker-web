import {extractTranslationKeys} from './extractTranslationKeys';
import {dictionary as enDefault} from './locales/en/en';
// todo: this is where we are going to set current language and whitelabel (for now only english)
export const currentTranslation = enDefault;
export const i18nKeys = extractTranslationKeys(currentTranslation);
