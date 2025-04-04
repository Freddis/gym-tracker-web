import {FC, ReactNode, useMemo, useState} from 'react';
import {AuthContext} from './AuthContext';
import {authUserValidator, AuthUser} from './types/AuthUser';
import {client} from 'src/frontend/openapi-client/client.gen';
import {ClientOptions, Config} from '@hey-api/client-axios';

export const AuthProvider: FC<{children: ReactNode | ReactNode[]}> = (props) => {
  const storedUser = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    const user = localStorage.getItem('user');
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
  const getClientConfig = (user: AuthUser | null): Config<ClientOptions> => {
    const authHeader = user ? 'Bearer ' + user.jwt : 'nothing';
    return {
      // baseURL: '/api/v1',
      responseType: 'json',
      headers: {
        Authorization: authHeader,
      },
    };
  };
  client.setConfig(getClientConfig(user));
  client.setConfig({
    responseType: 'json',
  });
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    client.setConfig(getClientConfig(null));
  };
  const login = (user: AuthUser) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>{props.children}</AuthContext.Provider>
  );
};
