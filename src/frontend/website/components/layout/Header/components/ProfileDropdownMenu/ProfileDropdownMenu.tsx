import {useNavigate} from '@tanstack/react-router';
import {FC, MouseEventHandler, useContext} from 'react';
import {AuthContext} from '../../../../../../common/components/layout/AuthProvider/AuthContext';
import {FiChevronDown} from 'react-icons/fi';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {AppAvatar} from '../../../../../../common/components/atoms/AppAvatar/AppAvatar';
import {
  AppDropdownMenu,
  AppDropdownMenuTrigger,
  AppDropdownMenuContent,
  AppDropdownMenuLabel,
  AppDropdownMenuSeparator,
  AppDropdownMenuItem,
} from '../../../../../../common/components/atoms/AppDropdownMenu/AppDropdownMenu';
import {AppLanguageDropdown} from '../../../../../../common/components/atoms/AppLanguageDropdown/AppLanguageDropdown';
import {AppSwitch} from '../../../../../../common/components/atoms/AppSwitch/AppSwitch';
import {EditThemeContext} from '../../../../../../common/components/layout/ThemeProvider/context/EditThemeContext';
import {ThemeContext} from '../../../../../../common/components/layout/ThemeProvider/context/ThemeContext';
import {Theme} from '../../../../../../common/components/layout/ThemeProvider/enums/Theme';


export const ProfileDropdownMenu: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.header.profileMenu);
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const themeContext = useContext(EditThemeContext);
  const navigate = useNavigate();
  const logout: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    auth.logout();
    navigate({to: '/'});
  };
  const toggleDarkTheme = () => {
    const newTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    themeContext.setTheme(newTheme);
  };

  return (
  <AppDropdownMenu>
    <AppDropdownMenuTrigger className="text-lg">
    <div className="flex items-center cursor-pointer">
      <span data-testid="my-name" className="text-base">{auth.user?.name}</span>
      <FiChevronDown className=" relative" />
      {auth.user && <AppAvatar user={auth.user} className="ml-2"/>}
    </div>
    </AppDropdownMenuTrigger>
    <AppDropdownMenuContent sideOffset={-2} className={`w-50 ${theme.toLowerCase()}`}>
      <AppDropdownMenuLabel>{t(i18n.menu.name)}</AppDropdownMenuLabel>
      <AppDropdownMenuSeparator />
      <AppDropdownMenuItem onClick={(e) => e.preventDefault()} className="focus:bg-inherit">
        <div className="flex flex-row items-center w-full">
          <span>{t(i18n.menu.darkTheme)}</span>
          <div className="flex-grow flex flex-row-reverse">
          <AppSwitch onClick={toggleDarkTheme} checked={theme === Theme.Dark}/>
          </div>
        </div>
      </AppDropdownMenuItem>
      <AppDropdownMenuItem onClick={(e) => e.preventDefault()} className="focus:bg-inherit">
        <div className="flex flex-row items-center w-full">
          <span>{t(i18n.menu.language)}</span>
          <div className="flex-grow flex flex-row-reverse">
            <AppLanguageDropdown />
          </div>
        </div>
      </AppDropdownMenuItem>
      <AppDropdownMenuItem onClick={logout} className="cursor-pointer focus:bg-inherit focus:text-accent">
        <span>{t(i18n.menu.signOut)}</span>
      </AppDropdownMenuItem>
    </AppDropdownMenuContent>
  </AppDropdownMenu>

  );
};
