import {FC, useContext} from 'react';
import {FaSun, FaMoon} from 'react-icons/fa';
import {EditThemeContext} from '../../../../../../common/components/layout/ThemeProvider/context/EditThemeContext';
import {ThemeContext} from '../../../../../../common/components/layout/ThemeProvider/context/ThemeContext';
import {Theme} from '../../../../../../common/components/layout/ThemeProvider/enums/Theme';
import {cn} from '../../../../../../common/utils/cn';
import {AppLanguageDropdown} from '../../../../../../common/components/atoms/AppLanguageDropdown/AppLanguageDropdown';

export const ThemeUtilityBar: FC<{className?: string}> = ({className}) => {
  const theme = useContext(ThemeContext);
  const themeContext = useContext(EditThemeContext);
  const toggleTheme = () => {
    themeContext.setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
  };
  const isDark = theme === Theme.Dark;
  return (
  <div className={cn('flex flex-row items-center bg-on-cavity/5 rounded-sm', className)}>
    <AppLanguageDropdown className="p-2 basis-1/2  hover:bg-on-cavity/5 rounded-sm cursor-pointer "/>
    {!isDark && (
      <div className="p-2 basis-1/2 hover:bg-on-cavity/5 rounded-sm cursor-pointer" onClick={toggleTheme}>
        <FaMoon size={18} />
      </div>
      )}
    {isDark && (
      <div className="p-2 basis-1/2 hover:bg-on-cavity/5 rounded-sm cursor-pointer" onClick={toggleTheme}>
        <FaSun size={20}/>
      </div>
    )}
  </div>
  );
};
