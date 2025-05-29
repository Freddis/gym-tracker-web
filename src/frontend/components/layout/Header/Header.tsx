import {Link} from '@tanstack/react-router';
import {FC, ReactNode, useContext} from 'react';
import {AuthContext} from '../AuthProvider/AuthContext';
import {HeaderLink} from './components/HeaderLink';
import {AppLogo} from '../../atoms/AppLogo/AppLogo';
import {EditThemeContext} from '../ThemeProvider/context/EditThemeContext';
import {Theme} from '../ThemeProvider/enums/Theme';
import {ThemeContext} from '../ThemeProvider/context/ThemeContext';
import {useAppPartialTranslation} from '../../../i18n/useAppPartialTranslation';
import {ProfileDropdownMenu} from './components/ProfileDropdownMenu/ProfileDropdownMenu';
import {DarkModeSwitch} from './components/DarkModeSwitch/DarkModeSwitch';

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
  const classes = 'bg-neutral-surface text-on-neutral-surface p-2 text-2xl border-b-2 border-b-accent flex justify-center w-full';
  return (
    <div className={classes}>
      <div className="min-w-5xl flex items-center m-auto">
        <Link to="/" className="flex items-center justify-center mr-20">
          <AppLogo />
        </Link>
        <div className="space-x-5 flex items-center grow gap-3">
          <HeaderLink to="/">{t(i18n.menu.home)}</HeaderLink>
          <Conditional condition={!!auth.user}>
            <HeaderLink to="/argus">{t(i18n.menu.feed)}</HeaderLink>
          </Conditional>
          <Conditional condition={!!auth.user}>
            <HeaderLink to="/workouts">{t(i18n.menu.activities)}</HeaderLink>
          </Conditional>
          <Conditional condition={!!auth.user}>
            <HeaderLink to="/exercises">{t(i18n.menu.calories)}</HeaderLink>
          </Conditional>
          <Conditional condition={!auth.user}>
            <HeaderLink to="/auth/login">{t(i18n.menu.feed)}</HeaderLink>
          </Conditional>
          <Conditional condition={!auth.user}>
            <HeaderLink to="/auth/login">{t(i18n.menu.product)}</HeaderLink>
          </Conditional>
          <Conditional condition={!auth.user}>
            <HeaderLink to="/auth/login">{t(i18n.menu.articles)}</HeaderLink>
          </Conditional>
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
