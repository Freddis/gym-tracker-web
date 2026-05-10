import {useContext} from 'react';
import {AuthContext} from '../AuthContext';
import {AuthContextValue} from '../types/AuthContextValue';

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  return context;
};
