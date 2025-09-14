import {FC, ReactNode, useEffect, useState} from 'react';
import {z} from 'zod';
import {Language} from './enums/Language';
import {LanguageContext} from './context/LanguageContext';
import * as locales from 'date-fns/locale';
import {Locale} from 'date-fns/locale';
import {Cookie} from '../../../utils/Cookie/Cookie';
import {CookieName} from '../../../types/CookieName';

export const LanguageProvider: FC<{children: ReactNode}> = (props) => {
  const cookie = new Cookie();
  const defaultLanguage = Language.English;
  const detectCurrentLanguage = () => {
    const storedLanguage = cookie.get(CookieName.Language);
    const validatedLanguage = z.nativeEnum(Language).safeParse(storedLanguage);
    const initialLanguage = validatedLanguage.success ? validatedLanguage.data : defaultLanguage;
    return initialLanguage;
  };
  const checkBrowserLanguage = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const locale = new Intl.Locale(navigator.language);
    const appLanguage = Object.values(Language)
      .filter((x) => x !== defaultLanguage)
      .find((x) => x === locale.language);
    const alreadySet = !!cookie.get(CookieName.Language);
    if (!alreadySet && appLanguage) {
      setLanguage(appLanguage);
    }
  };
  useEffect(checkBrowserLanguage);
  const [language, setLanguageState] = useState<Language>(detectCurrentLanguage());
  const setLanguage = (theme: Language) => {
    cookie.set(CookieName.Language, theme);
    setLanguageState(theme);
  };
  const getLocale = (): Locale => {
    const map: Record<Language, keyof typeof locales> = {
      [Language.English]: 'enUS',
      [Language.Russian]: Language.Russian,
    };
  // eslint-disable-next-line import/namespace
    return locales[map[language]];
  };

  return (
  <LanguageContext.Provider value={{language, setLanguage, getLocale}}>
      {props.children}
  </LanguageContext.Provider>
  );
};
