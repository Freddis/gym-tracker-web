import {Link} from '@tanstack/react-router';
import {FC, ReactNode, useContext} from 'react';
import {AuthContext} from '../AuthProvider/AuthContext';
import {HeaderLink} from './components/HeaderLink';
import {AppLogo} from '../../atoms/AppLogo/AppLogo';
import {EditThemeContext} from '../ThemeProvider/context/EditThemeContext';
import {Theme} from '../ThemeProvider/enums/Theme';
import {ThemeContext} from '../ThemeProvider/context/ThemeContext';
import {ProfileDropdownMenu} from './components/ProfileDropdownMenu/ProfileDropdownMenu';
import {DarkModeSwitch} from './components/DarkModeSwitch/DarkModeSwitch';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';

export const Conditional: FC<{condition: boolean, children: ReactNode}> = (props) => {
  return props.condition ? props.children : null;
};

export const Header: FC = () => {
  const auth = useContext(AuthContext);
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.header);
  const theme = useContext(ThemeContext);
  const themeContext = useContext(EditThemeContext);
  const toggleTheme = () => {
    themeContext.setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
  };

  return (
    <div className="bg-surface text-on-surface p-2 text-2xl border-b-2 border-b-accent flex justify-center w-full">
      <div className="w-full max-w-5xl flex items-center m-auto">
        <Link to="/" className="flex items-center justify-center mr-20">
          <AppLogo />
        </Link>
        <div className="space-x-5 hidden md:flex items-center grow gap-3">
          <HeaderLink to="/">{t(i18n.menu.home)}</HeaderLink>
          <HeaderLink to="/feed">{t(i18n.menu.feed)}</HeaderLink>
          <Conditional condition={!!auth.user}>
            <HeaderLink to="/workouts">{t(i18n.menu.activities)}</HeaderLink>
          </Conditional>
          <HeaderLink to="/exercises">{t(i18n.menu.exerciseLibrary)}</HeaderLink>
          <Conditional condition={!auth.user}>
            <HeaderLink to="/auth/login">{t(i18n.menu.signIn)}</HeaderLink>
          </Conditional>
        </div>
        <Conditional condition={!!auth.user}>
          <ProfileDropdownMenu />
        </Conditional>
        <Conditional condition={!auth.user}>
          <DarkModeSwitch onClick={toggleTheme} checked={theme === Theme.Dark} />
        </Conditional>
      </div>
    </div>
  );
};
