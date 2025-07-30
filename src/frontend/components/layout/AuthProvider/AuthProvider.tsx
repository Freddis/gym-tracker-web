import {FC, ReactNode, useMemo, useState} from 'react';
import {AuthContext} from './AuthContext';
import {authUserValidator, AuthUser} from './types/AuthUser';
import {Cookie} from '../../../../common/utils/Cookie/Cookie';
import {CookieName} from '../../../../common/enums/CookieName';
import {client} from '../../../utils/openapi-client/client.gen';

export const AuthProvider: FC<{children: ReactNode | ReactNode[]}> = (props) => {
  const cookies = new Cookie();
  const storedUser = useMemo(() => {
    const user = cookies.get(CookieName.User);
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
      },
    };
  };
  client.setConfig(getClientConfig(user));
  const logout = () => {
    setUser(null);
    cookies.delete(CookieName.User);
    client.setConfig(getClientConfig(null));
  };
  const login = (user: AuthUser) => {
    setUser(user);
    cookies.set(CookieName.User, JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>{props.children}</AuthContext.Provider>
  );
};
