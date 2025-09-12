import {FC, ReactNode, useContext, useMemo, useState} from 'react';
import {AuthContext} from './AuthContext';
import {authUserValidator, AuthUser} from './types/AuthUser';
import {Cookie} from '../../../utils/Cookie/Cookie';
import {CookieName} from '../../../types/CookieName';
import {client} from '../../../utils/openapi-client/client.gen';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {useToasts} from '../../atoms/AppToast/hooks/useToasts';
import {LanguageContext} from '../LanguageProvider/context/LanguageContext';

export const AuthProvider: FC<{children: ReactNode | ReactNode[], cookieName: CookieName}> = (props) => {
  const cookies = new Cookie();
  const {t, i18n} = useAppPartialTranslation((x) => x.layout);
  const language = useContext(LanguageContext).language;
  const toasts = useToasts();
  const storedUser = useMemo(() => {
    const user = cookies.get(props.cookieName);
    if (user === null) {
      return null;
    }
    let parsedUser: unknown = {};
    try {
      parsedUser = JSON.parse(user);
    } catch {
      /* empty */
    }
    const result = authUserValidator.safeParse(parsedUser);
    if (result.success) {
      return result.data;
    }
    return null;
  }, []);
  const [user, setUser] = useState<AuthUser | null>(storedUser);
  const getClientConfig = (user: AuthUser | null) => {
    const authHeader = user ? 'Bearer ' + user.jwt : 'nothing';
    return {
      ...client.getConfig(),
      responseType: 'json' as const,
      throwOnError: false,
      headers: {
        Authorization: authHeader,
        Locale: language,
      },
    };
  };
  client.setConfig(getClientConfig(user));
  const logout = () => {
    setUser(null);
    cookies.delete(props.cookieName);
    client.setConfig(getClientConfig(null));
    toasts.addSuccess(t(i18n.toasts.logoutSuccess));
  };
  const login = (user: AuthUser) => {
    setUser(user);
    cookies.set(props.cookieName, JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>{props.children}</AuthContext.Provider>
  );
};
