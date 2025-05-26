import {Link, useNavigate} from '@tanstack/react-router';
import {FC, MouseEventHandler, ReactNode, useContext} from 'react';
import {AuthContext} from '../AuthProvider/AuthContext';
import {AppLink} from '../../atoms/AppLink/AppLink';
import {HeaderLink} from './components/HeaderLink';
import {AppLogo} from '../../atoms/AppLogo/AppLogo';
import {EditThemeContext} from '../ThemeProvider/context/EditThemeContext';
import {Theme} from '../ThemeProvider/enums/Theme';
import {ThemeContext} from '../ThemeProvider/context/ThemeContext';
import {useAppPartialTranslation} from '../../../i18n/useAppPartialTranslation';
import {DarkModeSwitch} from '../../composite/DarkModeSwitch/DarkModeSwitch';

function exists<T>(x: T| null | undefined): x is T {
  return !!x;
}
export const Conditional: FC<{condition: boolean, children: ReactNode}> & {exists: typeof exists} = (props) => {
  return props.condition ? props.children : null;
};
Conditional.exists = exists;

export const Header: FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.header);
  const theme = useContext(ThemeContext);
  const themeContext = useContext(EditThemeContext);

  const logout: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    auth.logout();
    navigate({to: '/'});
  };
  const toggleTheme = () => {
    themeContext.setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
  };
  return (
    <div className="bg-lightest text-on-lightest p-2 text-2xl  border-b-2 border-b-accent flex justify-center w-full">
      <div className="min-w-5xl flex items-center m-auto">
        <Link to="/" className="flex items-center justify-center mr-20">
          <AppLogo />
        </Link>
        <div className="space-x-5 flex items-center grow gap-3">
          <HeaderLink to="/">Home</HeaderLink>
          <Conditional condition={!!auth.user}>
            <HeaderLink to="/feed">{t(i18n.menu.feed)}</HeaderLink>
          </Conditional>
          <Conditional condition={!!auth.user}>
            <HeaderLink to="/workouts">{t(i18n.menu.activities)}</HeaderLink>
          </Conditional>
          <Conditional condition={!!auth.user}>
            <HeaderLink to="/exercises">{t(i18n.menu.calories)}</HeaderLink>
          </Conditional>
          {/* <Conditional condition={!!auth.user}>
            <Link to="/exercises" style={aStyle}>Exercise Library</Link>
          </Conditional> */}

          {/* <Conditional condition={!!auth.user}>
            <Link to="/" onClick={logout} style={aStyle}>Logout</Link>
          </Conditional> */}
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
          <DarkModeSwitch onClick={toggleTheme} checked={theme === Theme.Dark} />
        </div>
        <Conditional condition={!!auth.user}>
          <div className="flex items-center ml-20">
            <span className="text-base">{auth.user?.name} (<AppLink onClick={logout}>{t(i18n.menu.signOut)}</AppLink>)</span>
            <img src="/images/avatar.gif" className="ml-2 border-light border-2 shadow-2xl shadow-red-600 rounded-full w-12"/>
          </div>
        </Conditional>
      </div>
    </div>
  );
};
