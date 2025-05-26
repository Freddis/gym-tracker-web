import {FC, ReactNode, useEffect, useState} from 'react';
import {EditThemeContext} from './context/EditThemeContext';
import {Theme} from './enums/Theme';
import {ThemeContext} from './context/ThemeContext';
import {z} from 'zod';
import {Cookie} from '../../../../common/utils/Cookie/Cookie';

export const ThemeProvider: FC<{children: ReactNode}> = (props) => {
  const themeCookieName = 'theme';
  const cookie = new Cookie();
  const detectCurrentTheme = () => {
    const storedTheme = cookie.get(themeCookieName);
    const validatedTheme = z.nativeEnum(Theme).safeParse(storedTheme);
    const initialTheme = validatedTheme.success ? validatedTheme.data : Theme.Light;
    return initialTheme;
  };
  const checkIfDarkThemeIsDefault = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const darkSchemePreferred = window.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
    const hasThemeSet = !!cookie.get(themeCookieName);
    if (!hasThemeSet && darkSchemePreferred) {
      setTheme(Theme.Dark);
    }
  };
  useEffect(checkIfDarkThemeIsDefault);
  const [theme, setThemeState] = useState<Theme>(detectCurrentTheme());
  const setTheme = (theme: Theme) => {
    // console.log('set', theme);;
    cookie.set(themeCookieName, theme);
    setThemeState(theme);
  };
  const themeStr = theme === Theme.Light ? 'theme-light' : 'theme-dark';
  // console.log(theme, themeStr);
  return (
  <ThemeContext.Provider value={theme}>
    <EditThemeContext.Provider value={{setTheme}}>
      <body className={`h-screen font-extralight ${themeStr}`}>
        {props.children}
      </body>
    </EditThemeContext.Provider>
  </ThemeContext.Provider>
  );
};
