import {FC, useContext} from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AppLogo} from '../../../../atoms/AppLogo/AppLogo';
import {Theme} from '../../../ThemeProvider/enums/Theme';
import {Conditional} from '../../Header';
import {DarkModeSwitch} from '../DarkModeSwitch/DarkModeSwitch';
import {HeaderLink} from '../HeaderLink';
import {ProfileDropdownMenu} from '../ProfileDropdownMenu/ProfileDropdownMenu';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {AuthContext} from '../../../AuthProvider/AuthContext';
import {ThemeContext} from '../../../ThemeProvider/context/ThemeContext';
import {EditThemeContext} from '../../../ThemeProvider/context/EditThemeContext';
import {Link} from '@tanstack/react-router';
import {cn} from '../../../../../utils/cn';

export const MenuBar:FC<{onMobileMenuClick: () => void}> = ({onMobileMenuClick}) => {
  const auth = useContext(AuthContext);
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.header);
  const theme = useContext(ThemeContext);
  const themeContext = useContext(EditThemeContext);
  const toggleTheme = () => {
    themeContext.setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
  };
  return (
  <div className={cn('bg-surface text-on-surface py-2 px-3  border-b-2 border-b-accent flex justify-center w-full z-20 sticky top-0')}>
    <div className={cn('w-full max-w-5xl flex items-center justify-items-start m-auto')}>
        <GiHamburgerMenu size={25} className="block md:hidden" onClick={onMobileMenuClick}/>
        <div className="flex flex-row-reverse grow md:flex-row md:grow-0">
        <Link to="/" className="flex items-center justify-center md:mr-20">
          <AppLogo className="my-2" withText/>
        </Link>
        </div>
        <div className="hidden md:flex items-center  grow gap-10">
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
          <div className="grow hidden md:flex flex-row-reverse">
          <ProfileDropdownMenu />
          </div>
        </Conditional>
        <Conditional condition={!auth.user}>
          <DarkModeSwitch onClick={toggleTheme} checked={theme === Theme.Dark} />
        </Conditional>
      </div>
    </div>
  );
};
