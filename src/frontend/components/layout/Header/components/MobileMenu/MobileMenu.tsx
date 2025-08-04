import {FC, MouseEventHandler, useContext, useState} from 'react';
import {Conditional} from '../../Header';
import {HeaderLink} from '../HeaderLink';
import {AuthContext} from '../../../AuthProvider/AuthContext';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {Animated} from '../../../../atoms/Animated/Animated';

export const MobileMenu: FC<{onClose: () => void}> = ({onClose}) => {
  const [displayed, setDisplayed] = useState(true);
  const auth = useContext(AuthContext);
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.header);

  const close = () => {
    // ordering animated blocks to animate itself out
    // onAnimatedObjectGone is going to be final step
    setDisplayed(false);
  };
  const onAnimatedObjectGone = () => {
    // calling onClose, letting the parent element know menu is gone and it can be removed from DOM
    onClose();
  };

  const logout = () => {
    auth.logout();
    close();
  };
  const blockClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
  };

  return (
  <Animated onHide={onAnimatedObjectGone}
   show={displayed}
   className="fixed h-full w-full z-20  duration-500 ease-out"
   animation="bg-black/50"
   onClick={close}
   >
    <Animated show={displayed}
    className="fixed -left-60 bg-surface text-on-surface w-60 h-full p-5 duration-500 ease-out"
    animation="left-0"
    onClick={blockClick}
    >
      <div className="flex flex-col gap-5" onClick={close}>
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
    </Animated>
  </Animated>
  );
};
