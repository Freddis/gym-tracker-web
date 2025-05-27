import {RouterProvider, createRouter, createMemoryHistory, createRootRoute} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
import {PartialStoryFn} from 'storybook/internal/types';
import {twMerge} from 'tailwind-merge';
import {AuthContext} from '../../../src/frontend/components/layout/AuthProvider/AuthContext';
import {AuthContextValue} from '../../../src/frontend/components/layout/AuthProvider/types/AuthContextValue';
import {
  LanguageContext,
  LanguageContextValue,
} from '../../../src/frontend/components/layout/LanguageProvider/context/LanguageContext';
import {Language} from '../../../src/frontend/components/layout/LanguageProvider/enums/Language';
export interface StoryBookDisplayProps {
  story: PartialStoryFn,
  className?: string,
  palette?: PaletteName,
  column?:boolean
}
export const StoryBookDisplay: FC<StoryBookDisplayProps> = (props) => {
  const auth: AuthContextValue = {
    user: {
      id: 1,
      name: 'Alex Sarychev',
      email: 'test@example.com',
      jwt: 'dsadsada',
    },
    login: function(): void {
      throw new Error('Function not implemented.');
    },
    logout: function(): void {
      throw new Error('Function not implemented.');
    },
  };
  const [language, setLanguage] = useState(Language.English);
  const lang: LanguageContextValue = {
    language: language,
    setLanguage: function(l): void {
      setLanguage(l);
    },
  };
  const pallete = props.palette ?? PaletteName.Neutral;
  const flexDiraction = props.column ? 'flex-col' : 'flex-row';
  const InternalDisplay: FC = () => {
    const baseClasses = `p-10 bg-${pallete} text-on-${pallete} flex items-center justify-center`;
    return (
      <LanguageContext.Provider value={lang}>
        <AuthContext.Provider value={auth} >
        <div className={`flex ${flexDiraction} h-full w-full justify-center font-extralight`}>
          <div className={twMerge(baseClasses, 'theme-light')}>
            <div className={props.className}>
              <props.story />
            </div>
          </div>
          <div className={twMerge(baseClasses, 'theme-dark')}>
            <div className={props.className}>
              <props.story />
            </div>
          </div>
        </div>
        </AuthContext.Provider>
      </LanguageContext.Provider>
    );
  };
  const router = createRouter({
    history: createMemoryHistory(),
    routeTree: createRootRoute({
      component: InternalDisplay,
    }),
  });
  return <RouterProvider router={router} />;
};


