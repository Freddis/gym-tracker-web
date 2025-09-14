import {createContext} from 'react';
import {Language} from '../enums/Language';
import {Locale} from 'date-fns';
import {enUS} from 'date-fns/locale';

export interface LanguageContextValue {
  language: Language,
  setLanguage: (lang: Language) => void,
  getLocale(): Locale
}
export const LanguageContext = createContext<LanguageContextValue>({
  language: Language.English,
  setLanguage: () => { },
  getLocale: () => enUS,
});
