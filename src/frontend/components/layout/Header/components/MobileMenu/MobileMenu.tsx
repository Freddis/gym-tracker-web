import {FC, MouseEventHandler, useContext, useState} from 'react';
import {Conditional} from '../../Header';
import {HeaderLink} from '../HeaderLink';
import {AuthContext} from '../../../AuthProvider/AuthContext';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {Animated} from '../../../../atoms/Animated/Animated';
import {ThemeUtilityBar} from '../ThemeUtilityBar/ThemeUtilityBar';
import {route, RouteId} from '../../../../../utils/route';

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
   animation="bg-black/80"
   onClick={close}
   >
    <Animated show={displayed}
    className="fixed -left-60 bg-surface text-on-surface w-60 h-full p-5 duration-500 ease-out flex flex-col"
    animation="left-0"
    onClick={blockClick}
    >
      <div onClick={blockClick} className=" flex flex-row-reverse mb-5">
        <ThemeUtilityBar/>
      </div>
      <div className="flex flex-col gap-5" onClick={close}>
        <HeaderLink to={route(RouteId.Home)} >{t(i18n.menu.home)}</HeaderLink>
        <HeaderLink to={route(RouteId.Feed)} >{t(i18n.menu.feed)}</HeaderLink>
        <Conditional condition={!!auth.user}>
          <HeaderLink to={route(RouteId.EntryList)}>{t(i18n.menu.activities)}</HeaderLink>
        </Conditional>
        <HeaderLink to={route(RouteId.ExerciseLibrary)}>{t(i18n.menu.exerciseLibrary)}</HeaderLink>
        <Conditional condition={!auth.user}>
          <HeaderLink to={route(RouteId.Login)}>{t(i18n.menu.signIn)}</HeaderLink>
        </Conditional>
          <Conditional condition={!!auth.user}>
          <HeaderLink onClick={logout} to={'/'}>{t(i18n.menu.signOut)}</HeaderLink>
        </Conditional>
      </div>

    </Animated>
  </Animated>
  );
};
