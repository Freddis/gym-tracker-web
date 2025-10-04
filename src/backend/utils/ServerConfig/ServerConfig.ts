import {AuthServiceConfig} from 'src/backend/services/AuthService/types/AuthServiceConfig';
import {ArgusServiceConfig} from '../../services/ArgusService/types/ArgusServiceConfig';
import {DrizzleServiceConfig} from '../../services/DrizzleService/types/DrizzleServiceConfig';
import {EmailServiceConfig} from '../../services/EmailService/types/EmailServiceConfig';

export interface ServerConfig {
  baseUrl: string,
  services: {
    auth: AuthServiceConfig,
    email: EmailServiceConfig
    drizzle: DrizzleServiceConfig
    argus?: ArgusServiceConfig,
    dbSync?: DrizzleServiceConfig,
  },
}
