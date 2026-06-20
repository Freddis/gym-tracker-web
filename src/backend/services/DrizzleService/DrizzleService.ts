import {getTableColumns, SQL, sql} from 'drizzle-orm';
import {PgTable, PgUpdateSetSource} from 'drizzle-orm/pg-core';
import {dbRelations, dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {drizzle, NodePgDatabase} from 'drizzle-orm/node-postgres';
import {QueryLogger} from './utils/QueryLogger/QueryLogger';
import pg from 'pg';
import {DrizzleServiceConfig} from './types/DrizzleServiceConfig';
import {Logger} from '../../utils/Logger/Logger';
declare module 'pg' {
  interface Query {
    patched?: boolean;
  }
}

const schema = {...dbSchema, ...dbRelations};
export type AppDbSchema = typeof schema;
export type AppDb = NodePgDatabase<AppDbSchema>
export class DrizzleService {
  protected static connected = false;
  protected db?: AppDb;
  protected pgClient?: pg.Client;
  protected config: DrizzleServiceConfig;
  protected logger = new Logger(DrizzleService.name);

  constructor(config: DrizzleServiceConfig) {
    this.config = config;
    this.patchPg();
  }
  patchPg() {
    if (!pg.Query.prototype.patched) {
      this.logger.info('Monkey patching PG to track query performance');
      pg.Query.prototype.patched = true;
      const originalSubmit = pg.Query.prototype.submit;
      const logger = new QueryLogger(false, true, 'postgres');
      pg.Query.prototype.submit = function(...args) {
        const startTime = performance.now();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const text = (this as any).text;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values = (this as any).values || [];

        this.once('end', () => {
          const duration = performance.now() - startTime;
          logger.logQuery(text, values, duration);
        });

        return originalSubmit.apply(this, args);
      };
    } else {
      this.logger.info('PG already patched');
    }
  }

  async getDb(): Promise<AppDb> {
    if (!this.db) {
      this.pgClient = new pg.Client({
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database,
        ssl: this.config.ssl,
        connectionTimeoutMillis: 2000,
      });
      await this.pgClient.connect();
      this.db = drizzle(this.pgClient, {
        // logger: new QueryLogger(false, true, 'postgres'), //swapped in favor of performance-tracking hack
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

  getClient() {
    return this.pgClient!;
  }
}
