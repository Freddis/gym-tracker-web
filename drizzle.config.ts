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
    schema: serverConfig.services.drizzle.schema,
  },
  schemaFilter: serverConfig.services.drizzle.schema,
  dbCredentials: {
    //should be esxactly like that, otherwise schema in serverConfig will mess things up
    //even though it's not even listed in dbCredentials type
    database: serverConfig.services.drizzle.database,
    user: serverConfig.services.drizzle.user,
    password: serverConfig.services.drizzle.password,
    host: serverConfig.services.drizzle.host,
    port: serverConfig.services.drizzle.port,
    ssl: serverConfig.services.drizzle.ssl,
  },
  verbose: true,
});
