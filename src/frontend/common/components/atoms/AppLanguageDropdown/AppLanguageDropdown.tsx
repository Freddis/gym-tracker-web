import {FC, useContext, useState} from 'react';
import {Language} from '../../layout/LanguageProvider/enums/Language';
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
  const flagUrl = (lang: Language) => {
    const country = lang === Language.English ? 'US' : lang;
    const ucCountry = country.toUpperCase();
    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${ucCountry}.svg`;
  };
  return (
    <div className={cn(className)} onClick={() => setOpened(!opened)}>
      <AppDropdownMenu open={opened} onOpenChange={(e) => setOpened(e)}>
        <AppDropdownMenuTrigger className="text-lg" data-testid="dropdown-languages">
        <div className={'flex gap-0.5 items-center cursor-pointer'}>
          <img alt={language.language} src={flagUrl(language.language)} className="w-5" data-testid="selected-language" />
        </div>
        </AppDropdownMenuTrigger>
        <AppDropdownMenuContent sideOffset={-2} className={`${theme.toLowerCase()}`}>
          {languages.map((lang) => (
            <AppDropdownMenuItem
              key={lang}
              onClick={() => language.setLanguage(lang)}
              className="focus:bg-on-surface cursor-pointer focus:text-accent"
              data-testid={`language-${lang}}`}
              >
              <div className="flex gap-2 items-center">
                <img alt={lang} src={flagUrl(lang)} className="w-5" />
                <span>{lang}</span>
              </div>
              </AppDropdownMenuItem>
          ))}
        </AppDropdownMenuContent>
      </AppDropdownMenu>
    </div>
  );
};
