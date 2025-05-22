import {FC, ReactNode, useMemo, useState} from 'react';
import {EditThemeContext} from './context/EditThemeContext';
import {Theme} from './enums/Theme';
import {ThemeContext} from './context/ThemeContext';
import {z} from 'zod';

export const ThemeProvider: FC<{children: ReactNode}> = (props) => {
  const initialTheme = useMemo(() => {
    if (typeof window === 'undefined') {
      return Theme.Light;
    }
    const storedTheme = localStorage.getItem('theme');
    const validatedTheme = z.nativeEnum(Theme).safeParse(storedTheme);
    const darkSchemePreferred = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
    const defaultTheme = darkSchemePreferred ? Theme.Dark : Theme.Dark;
    const initialTheme = validatedTheme.success ? validatedTheme.data : defaultTheme;
    return initialTheme;
  }, []);

  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const setTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    setThemeState(theme);
  };
  const themeStr = theme === Theme.Light ? 'theme-light' : 'theme-dark';
  return (
  <ThemeContext.Provider value={theme}>
    <EditThemeContext.Provider value={{setTheme}}>
      <body className={`bg-background text-on-background h-screen font-light ${themeStr}`}>
        {props.children}
      </body>
    </EditThemeContext.Provider>
  </ThemeContext.Provider>
  );
};
