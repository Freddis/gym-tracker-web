import {User} from '../../UserService/types/User';

export interface AuthUser extends User {
  email: string;
  jwt: string
}
