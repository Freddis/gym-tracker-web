import {PgTable} from 'drizzle-orm/pg-core';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Logger} from '../../../common/utils/Logger/Logger';

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
    const tables: Array<[string, PgTable]> = [
      ['users', localDb._.fullSchema.users],
      ['exercises', localDb._.fullSchema.exercises],
      ['exercise muscles', localDb._.fullSchema.muscles],
      ['workouts', localDb._.fullSchema.workouts],
      ['workout exercises', localDb._.fullSchema.workoutExercises],
      ['workout sets', localDb._.fullSchema.workoutExerciseSets],
      ['images', localDb._.fullSchema.images],
    ];

    for (const [name, table] of [...tables].reverse()) {
      await this.deleteTable(name, table);
    }
    for (const [name, table] of tables) {
      await this.syncTable(name, table);
    }
    this.logger.info('Done');
  }

  protected async deleteTable(name: string, table: PgTable) {
    const prodDb = await this.prod.getDb();
    this.logger.info(`Deleting ${name}`);
    await prodDb.delete(table);
  }

  protected async syncTable(name: string, table: PgTable) {
    this.logger.info(`Syncing ${name}`);
    const prodDb = await this.prod.getDb();
    const localDb = await this.local.getDb();
    await prodDb.delete(table);
    const limit = this.chunkSize;
    let offset = 0;
    while (true) {
      const values = await localDb.select().from(table).limit(limit).offset(offset);
      if (values.length === 0) {
        break;
      }
      await prodDb.insert(table).values(values);
      if (values.length < limit) {
        break;
      }
      offset += limit;
    }
  }
}
