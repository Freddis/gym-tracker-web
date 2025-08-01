import {PgColumn, PgTable} from 'drizzle-orm/pg-core';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Logger} from '../../../common/utils/Logger/Logger';
import {desc} from 'drizzle-orm';

/**
 * Syncs production and local databases.
 * Service supposed to be removed from the project or exlusively used in "pull" mode in future.
 */
export class DbSyncService {
  protected local: DrizzleService;
  protected prod: DrizzleService;
  protected logger: Logger;
  protected chunkSize = 500;

  constructor(local: DrizzleService, prod: DrizzleService) {
    this.local = local;
    this.prod = prod;
    this.logger = new Logger(DbSyncService.name);
  }

  async pushSync() {
    this.logger.info('Starting sync');
    const localDb = await this.local.getDb();
    const tables: Array<[string, PgTable, PgColumn]> = [
      ['users', localDb._.fullSchema.users, localDb._.fullSchema.users.id],
      ['exercises', localDb._.fullSchema.exercises, localDb._.fullSchema.exercises.id],
      ['exercise muscles', localDb._.fullSchema.muscles, localDb._.fullSchema.muscles.id],
      ['workouts', localDb._.fullSchema.workouts, localDb._.fullSchema.workouts.id],
      ['workout exercises', localDb._.fullSchema.workoutExercises, localDb._.fullSchema.workoutExercises.id],
      ['workout sets', localDb._.fullSchema.workoutExerciseSets, localDb._.fullSchema.workoutExerciseSets.id],
      ['images', localDb._.fullSchema.images, localDb._.fullSchema.images.id],
    ];

    for (const [name, table] of [...tables].reverse()) {
      await this.deleteTable(name, table);
    }
    for (const [name, table, id] of tables) {
      await this.syncTable(name, table, id);
    }
    this.logger.info('Done');
  }

  protected async deleteTable(name: string, table: PgTable) {
    const prodDb = await this.prod.getDb();
    this.logger.info(`Deleting ${name}`);
    await prodDb.delete(table);
  }

  protected async syncTable(name: string, table: PgTable, orderColumn: PgColumn,) {
    const nameSmb = Symbol.for('drizzle:Name');
    const schemaSmb = Symbol.for('drizzle:Schema');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableName = (table as any)[nameSmb];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableSchema = (table as any)[schemaSmb];
    this.logger.info(`Syncing ${name}`);
    const prodDb = await this.prod.getDb();
    const localDb = await this.local.getDb();
    await prodDb.delete(table);
    const limit = this.chunkSize;
    let offset = 0;
    while (true) {
      const values = await localDb.select().from(table).orderBy(desc(orderColumn)).limit(limit).offset(offset);
      if (values.length === 0) {
        break;
      }
      await prodDb.insert(table).values(values);
      if (values.length < limit) {
        break;
      }
      offset += limit;
    }
    await prodDb.execute(`
      SELECT setval(
        pg_get_serial_sequence('${tableSchema}.${tableName}', 'id'),
        COALESCE((SELECT MAX(id) FROM ${tableSchema}.${tableName}), 0) + 1,
        false
      );
    `);
  }
}
