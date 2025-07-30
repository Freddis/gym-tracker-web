import {useNavigate} from '@tanstack/react-router';
import {FC, MouseEventHandler, useContext} from 'react';
import {AuthContext} from '../../../AuthProvider/AuthContext';
import {FiChevronDown} from 'react-icons/fi';
import {
  AppDropdownMenu,
  AppDropdownMenuContent,
  AppDropdownMenuItem,
  AppDropdownMenuLabel,
  AppDropdownMenuSeparator,
  AppDropdownMenuTrigger,
} from '../../../../atoms/AppDropdownMenu/AppDropdownMenu';
import {AppSwitch} from '../../../../atoms/AppSwitch/AppSwitch';
import {EditThemeContext} from '../../../ThemeProvider/context/EditThemeContext';
import {ThemeContext} from '../../../ThemeProvider/context/ThemeContext';
import {Theme} from '../../../ThemeProvider/enums/Theme';
import {AppLanguageDropdown} from '../../../../atoms/AppLanguageDropdown/AppLanguageDropdown';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';


export const ProfileDropdownMenu: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.header);
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
      <span className="text-base ">{auth.user?.name}</span>
      <FiChevronDown className=" relative" />
      <div className="text-white ml-2 font-bold border-light rounded-full w-12 h-12 flex items-center justify-center bg-cyan-600">
      {auth.user?.name.substring(0, 1)}
      </div>
    </div>
    </AppDropdownMenuTrigger>
    <AppDropdownMenuContent sideOffset={-2} className={`w-50 ${theme.toLowerCase()}`}>
      <AppDropdownMenuLabel>{t(i18n.profileMenu.name)}</AppDropdownMenuLabel>
      <AppDropdownMenuSeparator />
      <AppDropdownMenuItem onClick={(e) => e.preventDefault()} className="focus:bg-inherit">
        <div className="flex flex-row items-center w-full">
          <span>{t(i18n.profileMenu.darkTheme)}</span>
          <div className="flex-grow flex flex-row-reverse">
          <AppSwitch onClick={toggleDarkTheme} checked={theme === Theme.Dark}/>
          </div>
        </div>
      </AppDropdownMenuItem>
      <AppDropdownMenuItem onClick={(e) => e.preventDefault()} className="focus:bg-inherit">
        <div className="flex flex-row items-center w-full">
          <span>{t(i18n.profileMenu.language)}</span>
          <div className="flex-grow flex flex-row-reverse">
            <AppLanguageDropdown />
          </div>
        </div>
      </AppDropdownMenuItem>
      <AppDropdownMenuItem onClick={logout} className="cursor-pointer focus:bg-inherit focus:text-accent">
        <span>{t(i18n.profileMenu.signOut)}</span>
      </AppDropdownMenuItem>
    </AppDropdownMenuContent>
  </AppDropdownMenu>

  );
};
