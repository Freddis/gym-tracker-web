import {realpathSync} from 'fs';
import {join} from 'path';
import {EnvHelper} from '../EnvHelper/EnvHelper';
import {ServerConfig} from './ServerConfig';
import {Environment} from '../../types/Environment';

export const serverConfig: ServerConfig = {
  baseUrl: EnvHelper.getString('APP_BASE_URL'),
  services: {
    drizzle: {
      host: EnvHelper.getString('DB_HOST'),
      port: EnvHelper.getNumber('DB_PORT'),
      user: EnvHelper.getString('DB_USER'),
      password: EnvHelper.getString('DB_PASSWORD'),
      database: EnvHelper.getString('DB_DATABASE'),
      ssl: EnvHelper.getBoolean('DB_SSL'),
      schema: EnvHelper.getString('DB_SCHEMA'),
    },
    auth: {
      hashSalt: EnvHelper.getNumber('SERVICES_AUTH_HASH_SALT'),
      jwtSecret: EnvHelper.getString('SERVICES_AUTH_JWT_SECRET'),
    },
    argus: EnvHelper.getObjectOrNothing({
      tempFolderPath: join(realpathSync('.'), '/temp'),
      seededUser: {
        name: EnvHelper.getOptionalString('SEED_USER_NAME'),
        email: EnvHelper.getOptionalString('SEED_USER_EMAIL'),
        password: EnvHelper.getOptionalString('SEED_USER_PASSWORD'),
        argusAuthToken: EnvHelper.getOptionalString('ARGUS_AUTH_TOKEN'),
      },
    }),
    dbSync: EnvHelper.getObjectOrNothing({
      host: EnvHelper.getOptionalString('PROD_DB_HOST'),
      port: EnvHelper.getOptionalNumber('PROD_DB_PORT'),
      user: EnvHelper.getOptionalString('PROD_DB_USER'),
      password: EnvHelper.getOptionalString('PROD_DB_PASSWORD'),
      database: EnvHelper.getOptionalString('PROD_DB_DATABASE'),
      ssl: EnvHelper.getOptinalBoolean('PROD_DB_SSL'),
      schema: EnvHelper.getOptionalString('PROD_DB_SCHEMA'),
    }),
    email: {
      from: EnvHelper.getString('EMAIL_FROM'),
      fromName: EnvHelper.getString('EMAIL_FROM_NAME'),
      environment: EnvHelper.getEnumValue('NODE_ENV', Environment, Environment.development),
    },
    fatsecret: {
      apiClient: {
        deviceIdentifier: EnvHelper.getString('FATSECRET_DEVICE_IDENTIFIER'),
        userName: EnvHelper.getString('FATSECRET_USERNAME'),
        password: EnvHelper.getString('FATSECRET_PASSWORD'),
      },
    },
    c0r: {
      apiKey: EnvHelper.getString('C0R_API_KEY'),
    },
    redis: {
      tmpFolderPath: join(realpathSync('.'), '/temp'),
    },
  },
};
