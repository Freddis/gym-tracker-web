import {AuthServiceConfig} from 'src/server/services/AuthService/types/AuthServiceConfig';

export interface ServerConfig {
  services: {
    auth: AuthServiceConfig,
  },
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    schema: string,
    ssl: boolean
  }
}
