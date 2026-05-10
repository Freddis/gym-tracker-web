import {Environment} from '../../../types/Environment';
export interface EmailServiceConfig {
  environment: Environment,
  from: string,
  fromName: string,
}
