import {FC, useContext, useState} from 'react';
import {Conditional} from '../../Header';
import {HeaderLink} from '../HeaderLink';
import {AuthContext} from '../../../AuthProvider/AuthContext';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';

export const MobileMenu: FC<{onClose: () => void}> = ({onClose}) => {
  const [displayed, setDisplayed] = useState(true);
  const auth = useContext(AuthContext);
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.header);

  const mobileMenuBackgroundClick = () => {
    setDisplayed(false);
    onClose();
  };
  const closeMobileMenu = () => {
    setDisplayed(false);
    onClose();
  };
  const logout = () => {
    auth.logout();
    setDisplayed(false);
    onClose();
  };
  if (!displayed) {
    return null;
  }
  return (
  <div className="fixed bg-black/50 bg-opacity-40 h-full w-full z-20" onClick={mobileMenuBackgroundClick}>
    <div className="bg-surface text-on-surface w-60 h-full p-5" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col gap-5" onClick={closeMobileMenu}>
      <HeaderLink to="/" >{t(i18n.menu.home)}</HeaderLink>
        <HeaderLink to="/feed" >{t(i18n.menu.feed)}</HeaderLink>
        <Conditional condition={!!auth.user}>
          <HeaderLink to="/workouts">{t(i18n.menu.activities)}</HeaderLink>
        </Conditional>
        <HeaderLink to="/exercises">{t(i18n.menu.exerciseLibrary)}</HeaderLink>
        <Conditional condition={!auth.user}>
          <HeaderLink to="/auth/login">{t(i18n.menu.signIn)}</HeaderLink>
        </Conditional>
          <Conditional condition={!!auth.user}>
          <HeaderLink onClick={logout}>{t(i18n.menu.signOut)}</HeaderLink>
        </Conditional>
      </div>
    </div>
  </div>
  );
};
