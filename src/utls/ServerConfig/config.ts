import {EnvHelper} from '../EnvHelper/EnvHelper';
import {ServerConfig} from './ServerConfig';

export const serverConfig: ServerConfig = {
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
