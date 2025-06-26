import {RouterProvider, createRouter, createMemoryHistory, createRootRoute} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {AuthContext} from '../../../src/frontend/components/layout/AuthProvider/AuthContext';
import {AuthContextValue} from '../../../src/frontend/components/layout/AuthProvider/types/AuthContextValue';
import {
  LanguageContext,
  LanguageContextValue,
} from '../../../src/frontend/components/layout/LanguageProvider/context/LanguageContext';
import {Language} from '../../../src/frontend/components/layout/LanguageProvider/enums/Language';
import {ThemeContext} from '../../../src/frontend/components/layout/ThemeProvider/context/ThemeContext';
import {Theme} from '../../../src/frontend/components/layout/ThemeProvider/enums/Theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StoryBookComponentDisplay} from './components/StoryBookComponentDisplay/StoryBookComponentDisplay';
import {StoryBookPageDisplay} from './components/StoryBookPageDisplay/StoryBookPageDisplay';
import {StoryBookDisplayProps} from './types/StoryBookDisplayProps';
import {StoryBookDisplayType} from './enums/StoryBookDisplayType';
import {Conditional} from '../../../src/frontend/components/layout/Header/Header';
import {StoryBookPopupDisplay} from './components/StoryBookPopupDisplay/StoryBookPopupDisplay';
import {StorybookDataUtils} from '../../utils/StorybookDataUtils';
import {client} from '../../../src/frontend/openapi-client/client.gen';
import {AuthUser} from '../../../src/frontend/components/layout/AuthProvider/types/AuthUser';


const queryClient = new QueryClient();

export const StoryBookDisplay: FC<StoryBookDisplayProps> = (props) => {
  const type = props.type ?? StoryBookDisplayType.Component;
  const auth: AuthContextValue = {
    user: StorybookDataUtils.getUser(),
    login: function(): void {
      throw new Error('Function not implemented.');
    },
    logout: function(): void {
      throw new Error('Function not implemented.');
    },
  };

  const getClientConfig = (user: AuthUser | null) => {
    const authHeader = user ? 'Bearer ' + user.jwt : 'nothing';
    return {
      responseType: 'json' as const,
      throwOnError: false,
      headers: {
        Authorization: authHeader,
      },
    };
  };
  const conf = getClientConfig(auth.user);
  client.setConfig(conf);

  if (!props.user) {
    auth.user = null;
  }
  const [language, setLanguage] = useState(Language.English);
  const lang: LanguageContextValue = {
    language: language,
    setLanguage: function(l): void {
      setLanguage(l);
    },
  };
  const flexDiraction = props.column ? 'flex-col' : 'flex-row';
  const InternalDisplay: FC = () => {
    return (
      <LanguageContext.Provider value={lang}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={auth} >
          <div className={`flex ${flexDiraction} h-full w-full justify-center font-extralight`}>
            <ThemeContext.Provider value={Theme.Light}>
              <div className="theme-light">
                <Conditional condition={type === StoryBookDisplayType.Component}>
                  <StoryBookComponentDisplay {...props} />
                </Conditional>
                <Conditional condition={type === StoryBookDisplayType.Page}>
                  <StoryBookPageDisplay story={props.story} />
                </Conditional>
                <Conditional condition={type === StoryBookDisplayType.Popup}>
                  <StoryBookPopupDisplay {...props} />
                </Conditional>
              </div>
            </ThemeContext.Provider>
            <ThemeContext.Provider value={Theme.Dark}>
            <div className="theme-dark">
              <Conditional condition={type === StoryBookDisplayType.Component}>
              <StoryBookComponentDisplay {...props} />
              </Conditional>
              <Conditional condition={type === StoryBookDisplayType.Page}>
                <StoryBookPageDisplay story={props.story} />
              </Conditional>
              <Conditional condition={type === StoryBookDisplayType.Popup}>
                <StoryBookPopupDisplay {...props} />
              </Conditional>
            </div>
            </ThemeContext.Provider>
          </div>
          </AuthContext.Provider>
        </QueryClientProvider>
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


