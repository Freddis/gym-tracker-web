import {FC, useContext, useState} from 'react';
import {Language} from '../../layout/LanguageProvider/enums/Language';
import {FiChevronDown, FiChevronUp} from 'react-icons/fi';
import {AppDropdownMenu, AppDropdownMenuTrigger,
  AppDropdownMenuContent,
  AppDropdownMenuItem} from '../AppDropdownMenu/AppDropdownMenu';
import {LanguageContext} from '../../layout/LanguageProvider/context/LanguageContext';
import {ThemeContext} from '../../layout/ThemeProvider/context/ThemeContext';
import {cn} from '../../../utils/cn';

export const AppLanguageDropdown: FC<{className?: string}> = ({className}) => {
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const languages = Object.values(Language);
  const [opened, setOpened] = useState(false);
  return (
    <div className={cn(className)} onClick={() => setOpened(!opened)}>
      <AppDropdownMenu open={opened} onOpenChange={(e) => setOpened(e)}>
        <AppDropdownMenuTrigger className="text-lg">
        <div className={'flex gap-0.5 items-center cursor-pointer'}>
          <span className="text-base w-5 ">{language.language}</span>
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
    </div>
  );
};
