
import {FC, useContext} from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';
import {cn} from '../../../../../../common/utils/cn';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {route, RouteId} from '../../../../../../common/utils/route';
import {AppLogo} from '../../../../../../common/components/atoms/AppLogo/AppLogo';
import {AuthContext} from '../../../../../../common/components/layout/AuthProvider/AuthContext';
import {Conditional} from '../../Header';
import {HeaderLink} from '../HeaderLink';
import {ProfileDropdownMenu} from '../ProfileDropdownMenu/ProfileDropdownMenu';
import {ThemeUtilityBar} from '../ThemeUtilityBar/ThemeUtilityBar';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';

export const MenuBar:FC<{onMobileMenuClick: () => void}> = ({onMobileMenuClick}) => {
  const auth = useContext(AuthContext);
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.header);
  return (
  // eslint-disable-next-line max-len
  <div className={cn('bg-surface text-on-surface py-2 px-3 border-b-1 border-b-on-surface/10 flex justify-center w-full z-20 sticky top-0')}>
    <div className={cn('w-full max-w-5xl flex items-center justify-items-start m-auto')}>
        <GiHamburgerMenu size={25} className="block md:hidden" onClick={onMobileMenuClick}/>
        <div className="flex flex-row-reverse grow md:flex-row md:grow-0">
        <RouteLink to={auth.user ? route(RouteId.EntryList) : route(RouteId.Home)} className="flex items-center justify-center md:mr-20">
          <AppLogo className="my-2" withText/>
        </RouteLink>
        </div>
        <div className="hidden md:flex items-center  grow gap-10">
          <HeaderLink to={route(RouteId.Home)}>{t(i18n.menu.home)}</HeaderLink>
          <HeaderLink to={route(RouteId.Feed)}>{t(i18n.menu.feed)}</HeaderLink>
          <Conditional condition={!!auth.user}>
            <HeaderLink to={route(RouteId.EntryList)}>{t(i18n.menu.activities)}</HeaderLink>
          </Conditional>
          <HeaderLink to={route(RouteId.ExerciseLibrary)}>{t(i18n.menu.exerciseLibrary)}</HeaderLink>
          <Conditional condition={!auth.user}>
            <HeaderLink to={route(RouteId.Login)}>{t(i18n.menu.signIn)}</HeaderLink>
          </Conditional>
        </div>
        <Conditional condition={!!auth.user}>
          <div className="grow hidden md:flex flex-row-reverse">
          <ProfileDropdownMenu />
          </div>
        </Conditional>
        <Conditional condition={!auth.user}>
          <ThemeUtilityBar className="hidden md:flex" />
        </Conditional>
      </div>
    </div>
  );
};
