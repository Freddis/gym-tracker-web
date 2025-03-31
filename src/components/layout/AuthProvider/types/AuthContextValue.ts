import {AuthUser} from './AuthUser';

export interface AuthContextValue {
  user: AuthUser | null
  login(user: AuthUser): void;
  logout(): void
}
