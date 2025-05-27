import {FC, ReactNode, useEffect, useState} from 'react';
import {z} from 'zod';
import {Cookie} from '../../../../common/utils/Cookie/Cookie';
import {CookieName} from '../../../../common/enums/CookieName';
import {Language} from './enums/Language';
import {LanguageContext} from './context/LanguageContext';

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
  return (
  <LanguageContext.Provider value={{language, setLanguage}}>
      {props.children}
  </LanguageContext.Provider>
  );
};
