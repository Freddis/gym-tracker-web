// import pg from 'pg';

// import {drizzle as pgDrizzle} from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import * as relations from './schema/relations';
// import {QueryLogger} from '../utils/QueryLogger/QueryLogger';
// import {serverConfig} from '../utils/ServerConfig/config';

// export const pgClient = new pg.Client({
//   ...serverConfig.database,
//   connectionTimeoutMillis: 2000,
// });
// export const db = pgDrizzle(pgClient, {
//   logger: new QueryLogger(false, true, 'postgres'),
//   schema: {...schema, ...relations},
// });

export const dbSchema = schema;
export const dbRelations = relations;
