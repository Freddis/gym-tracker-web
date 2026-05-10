import {Prettify} from '../../../../../../common/types/Prettify';
import {SemiNonNullable} from '../../../../../../common/types/SemiNonNullable';
import {AuthContextValue} from '../types/AuthContextValue';
import {useAuth} from './useAuth';

export const useRequiredAuth = (): Prettify<SemiNonNullable<AuthContextValue, 'user'>> => {
  const auth = useAuth();
  const user = auth.user;
  if (user === null) {
    throw new Error('User not authenticated');
  }
  return {
    ...auth,
    user,
  };
};
