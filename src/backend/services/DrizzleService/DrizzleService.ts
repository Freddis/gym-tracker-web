import {getTableColumns, SQL, sql} from 'drizzle-orm';
import {PgTable, PgUpdateSetSource} from 'drizzle-orm/pg-core';
import {dbRelations, dbSchema} from 'src/backend/drizzle/db';
import {serverConfig} from '../../utils/ServerConfig/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import {QueryLogger} from '../../utils/QueryLogger/QueryLogger';
import pg from 'pg';

const pgClient = new pg.Client({
  ...serverConfig.database,
  connectionTimeoutMillis: 2000,
});
const db = drizzle(pgClient, {
  logger: new QueryLogger(false, true, 'postgres'),
  schema: {...dbSchema, ...dbRelations},
});

export class DrizzleService {
  protected static connected = false;

  async getDb(): Promise<typeof db> {
    if (!DrizzleService.connected) {
      DrizzleService.connected = true;
      await pgClient.connect();
    }
    return db;
  }

  getSchema() {
    return dbSchema;
  }

  generateConflictUpdateSetAllColumns<TTable extends PgTable>(table: TTable): PgUpdateSetSource<TTable> {
    const columns = getTableColumns(table);
    const record: Record<string, SQL> = {};
    for (const [columnName, columnInfo] of Object.entries(columns)) {
      if (columnName !== 'id') {
        record[columnName] = sql.raw(`excluded."${columnInfo.name}"`);
      }
    }
    return record as PgUpdateSetSource<TTable>;
  };

  async end() {
    pgClient.end();
  }
}
