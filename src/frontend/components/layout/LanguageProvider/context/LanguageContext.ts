import {createContext} from 'react';
import {Language} from '../enums/Language';

export interface LanguageContextValue {
  language: Language,
  setLanguage: (lang: Language) => void,
}
export const LanguageContext = createContext<LanguageContextValue>({
  language: Language.English,
  // eslint-disable-next-line no-empty-function
  setLanguage: () => {},
});
