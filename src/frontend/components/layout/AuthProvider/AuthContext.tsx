import {createContext} from 'react';
import {AuthContextValue} from './types/AuthContextValue';

// eslint-disable-next-line no-empty-function
export const AuthContext = createContext<AuthContextValue>({user: null, login: () => {}, logout: () => {}});
