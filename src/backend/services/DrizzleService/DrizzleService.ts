import {getTableColumns, SQL, sql} from 'drizzle-orm';
import {PgTable, PgUpdateSetSource} from 'drizzle-orm/pg-core';
import {db, dbSchema, pgClient} from 'src/backend/drizzle/db';
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
