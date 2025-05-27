import {FC, useContext, useState} from 'react';
import {Language} from '../../layout/LanguageProvider/enums/Language';
import {FiChevronDown, FiChevronUp} from 'react-icons/fi';
import {AppDropdownMenu, AppDropdownMenuTrigger,
  AppDropdownMenuContent,
  AppDropdownMenuItem} from '../AppDropdownMenu/AppDropdownMenu';
import {LanguageContext} from '../../layout/LanguageProvider/context/LanguageContext';
import {ThemeContext} from '../../layout/ThemeProvider/context/ThemeContext';

export const AppLanguageDropdown: FC = () => {
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const languages = Object.values(Language);
  const [opened, setOpened] = useState(false);
  return (
    <AppDropdownMenu onOpenChange={(e) => setOpened(e)} >
      <AppDropdownMenuTrigger className="text-lg">
      <div className={'flex items-center cursor-pointer'}>
        <span className="text-base w-5">{language.language}</span>
        {!opened && <FiChevronDown className=" relative" />}
        {opened && <FiChevronUp className=" relative" />}
      </div>
      </AppDropdownMenuTrigger>
      <AppDropdownMenuContent sideOffset={-2} className={`${theme.toLowerCase()}`}>
        {languages.map((lang) => (
          <AppDropdownMenuItem
            key={lang}
            onClick={() => language.setLanguage(lang)}
            className="focus:bg-inherit cursor-pointer focus:text-accent"
            >{lang}</AppDropdownMenuItem>
        ))}
      </AppDropdownMenuContent>
    </AppDropdownMenu>
  );
};
