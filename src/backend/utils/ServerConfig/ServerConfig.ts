import {AuthServiceConfig} from 'src/backend/services/AuthService/types/AuthServiceConfig';
import {ArgusServiceConfig} from '../../services/ArgusService/types/ArgusServiceConfig';
import {DrizzleServiceConfig} from '../../services/DrizzleService/types/DrizzleServiceConfig';
import {EmailServiceConfig} from '../../services/EmailService/types/EmailServiceConfig';
import {FatsecretServiceConfig} from '../../services/FatsecretService/types/FatsecretServiceConfig';
import {RedisServiceConfig} from '../../services/RedisService/types/RedisServiceConfig';
import {C0rServiceConfig} from '../../services/C0rService/types/C0rServiceConfig';

export interface ServerConfig {
  baseUrl: string,
  services: {
    auth: AuthServiceConfig,
    email: EmailServiceConfig,
    fatsecret: FatsecretServiceConfig,
    c0r: C0rServiceConfig,
    drizzle: DrizzleServiceConfig,
    redis: RedisServiceConfig,
    argus?: ArgusServiceConfig,
    dbSync?: DrizzleServiceConfig,
  },
}
