import {createContext} from 'react';
import {AuthContextValue} from './types/AuthContextValue';

export const AuthContext = createContext<AuthContextValue>({user: null, login: () => {}, logout: () => {}});
