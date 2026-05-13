import {PgColumn, PgTable} from 'drizzle-orm/pg-core';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Logger} from '../../utils/Logger/Logger';
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
    const tables: Array<[string, PgTable, PgColumn, boolean]> = [
      ['managers', localDb._.fullSchema.managers, localDb._.fullSchema.managers.id, false],
      ['images', localDb._.fullSchema.images, localDb._.fullSchema.images.id, false],
      ['users', localDb._.fullSchema.users, localDb._.fullSchema.users.id, false],
      ['food', localDb._.fullSchema.food, localDb._.fullSchema.food.id, true],
      ['food components', localDb._.fullSchema.foodComponents, localDb._.fullSchema.foodComponents.id, false],
      ['meals', localDb._.fullSchema.meals, localDb._.fullSchema.meals.id, false],
      ['meal food', localDb._.fullSchema.mealFoodComponents, localDb._.fullSchema.mealFoodComponents.id, false],
      ['outdoor runs', localDb._.fullSchema.outdoorRuns, localDb._.fullSchema.outdoorRuns.id, false],
      ['outdoor walks', localDb._.fullSchema.outdoorWalks, localDb._.fullSchema.outdoorWalks.id, false],
      ['calorie goals', localDb._.fullSchema.calorieGoals, localDb._.fullSchema.calorieGoals.id, false],
      ['exercises', localDb._.fullSchema.exercises, localDb._.fullSchema.exercises.id, true],
      ['exercise muscles', localDb._.fullSchema.muscles, localDb._.fullSchema.muscles.id, false],
      ['workouts', localDb._.fullSchema.workouts, localDb._.fullSchema.workouts.id, false],
      ['workout exercises', localDb._.fullSchema.workoutExercises, localDb._.fullSchema.workoutExercises.id, false],
      ['workout sets', localDb._.fullSchema.workoutExerciseSets, localDb._.fullSchema.workoutExerciseSets.id, false],
      ['weight', localDb._.fullSchema.weight, localDb._.fullSchema.weight.id, false],
      ['entries', localDb._.fullSchema.entries, localDb._.fullSchema.entries.id, true],
      ['translations', localDb._.fullSchema.translations, localDb._.fullSchema.translations.id, false],
    ];

    for (const [name, table] of [...tables].reverse()) {
      await this.deleteTable(name, table);
    }
    for (const [name, table, id, uuid] of tables) {
      await this.syncTable(name, table, id, uuid);
    }
    this.logger.info('Done');
  }

  protected async deleteTable(name: string, table: PgTable) {
    const prodDb = await this.prod.getDb();
    this.logger.info(`Deleting ${name}`);
    await prodDb.delete(table);
  }

  protected async syncTable(name: string, table: PgTable, orderColumn: PgColumn, uuid: boolean) {
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
    if (uuid) {
      return;
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
