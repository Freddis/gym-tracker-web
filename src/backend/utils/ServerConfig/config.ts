import {EnvHelper} from '../EnvHelper/EnvHelper';
import {ServerConfig} from './ServerConfig';

export const serverConfig: ServerConfig = {
  services: {
    auth: {
      hashSalt: EnvHelper.getNumber('SERVICES_AUTH_HASH_SALT'),
      jwtSecret: EnvHelper.getString('SERVICES_AUTH_JWT_SECRET'),
    },
  },
  database: {
    host: EnvHelper.getString('DB_HOST'),
    port: EnvHelper.getNumber('DB_PORT'),
    user: EnvHelper.getString('DB_USER'),
    password: EnvHelper.getString('DB_PASSWORD'),
    database: EnvHelper.getString('DB_DATABASE'),
    ssl: EnvHelper.getBoolean('DB_SSL'),
    schema: EnvHelper.getString('DB_SCHEMA'),
  },
};
