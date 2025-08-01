import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';
import {serverConfig} from 'src/backend/utils/ServerConfig/config';

export default defineConfig({
  out: './src/backend/services/DrizzleService/migrations',
  schema: './src/backend/services/DrizzleService/schema/schema.ts',
  dialect: 'postgresql',
  strict: true,
  migrations: {
    table: 'drizzle_migrations',
    schema: serverConfig.database.schema,
  },
  schemaFilter: serverConfig.database.schema,
  dbCredentials: {
    //should be esxactly like that, otherwise schema in serverConfig will mess things up
    //even though it's not even listed in dbCredentials type
    database: serverConfig.database.database,
    user: serverConfig.database.user,
    password: serverConfig.database.password,
    host: serverConfig.database.host,
    port: serverConfig.database.port,
    ssl: serverConfig.database.ssl,
  },
  verbose: true,
});
