import {getTableColumns, SQL, sql} from 'drizzle-orm';
import {PgTable, PgUpdateSetSource} from 'drizzle-orm/pg-core';
import {dbRelations, dbSchema} from 'src/backend/drizzle/db';
import {drizzle, NodePgDatabase} from 'drizzle-orm/node-postgres';
import {QueryLogger} from './utils/QueryLogger/QueryLogger';
import pg from 'pg';
import {DrizzleServiceConfig} from './types/DrizzleServiceConfig';

const schema = {...dbSchema, ...dbRelations};
export type AppDbSchema = typeof schema;
export type AppDb = NodePgDatabase<AppDbSchema>
export class DrizzleService {
  protected static connected = false;
  protected db?: AppDb;
  protected pgClient?: pg.Client;
  protected config: DrizzleServiceConfig;

  constructor(config: DrizzleServiceConfig) {
    this.config = config;
  }

  async getDb(): Promise<AppDb> {
    if (!this.db) {
      this.pgClient = new pg.Client({
        ...this.config,
        connectionTimeoutMillis: 2000,
      });
      await this.pgClient.connect();
      this.db = drizzle(this.pgClient, {
        logger: new QueryLogger(false, true, 'postgres'),
        schema: schema,
      });
    }
    return this.db;
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
    this.pgClient?.end();
  }
}
