import {AuthServiceConfig} from 'src/backend/services/AuthService/types/AuthServiceConfig';
import {ArgusServiceConfig} from '../../services/ArgusService/types/ArgusServiceConfig';
import {DrizzleServiceConfig} from '../../services/DrizzleService/types/DrizzleServiceConfig';

export interface ServerConfig {
  services: {
    auth: AuthServiceConfig,
    drizzle: DrizzleServiceConfig
    argus?: ArgusServiceConfig,
    dbSync?: DrizzleServiceConfig,
  },
}
