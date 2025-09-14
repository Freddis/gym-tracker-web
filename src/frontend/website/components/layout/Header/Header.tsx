import {FC, ReactNode, useState} from 'react';
import {MenuBar} from './components/MenuBar/MenuBar';
import {MobileMenu} from './components/MobileMenu/MobileMenu';

export const Conditional: FC<{condition: boolean, children: ReactNode}> = (props) => {
  return props.condition ? props.children : null;
};

export const Header: FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const openMobileMenu = () => {
    setShowMobileMenu(true);
  };
  const resetMobileMenu = () => {
    setShowMobileMenu(false);
  };
  return (
    <>
    <MenuBar onMobileMenuClick={openMobileMenu}/>
    {showMobileMenu && <MobileMenu onClose={resetMobileMenu} />}
    </>
  );
};
