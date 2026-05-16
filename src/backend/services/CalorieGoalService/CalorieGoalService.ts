import {TableConfig, SQL, desc} from 'drizzle-orm';
import {PgTable, PgColumn} from 'drizzle-orm/pg-core';
import {ModelService} from '../../types/ModelService/ModelService';
import {IdColumn} from '../../types/ModelService/types/IdColumn';
import {AppDbSchema} from '../DrizzleService/DrizzleService';
import {IEntryService} from '../EntryService/types/IEntryService';
import {EntryType} from '../EntryService/types/EntryType';
import {BaseEntry, CalorieGoalEntry} from '../EntryService/types/Entry';
import {CalorieGoalEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {CalorieGoal} from './types/CalorieGoal';
export class CalorieGoalService
extends ModelService<number, AppDbSchema['calorieGoals']['$inferSelect'], CalorieGoal>
implements IEntryService<EntryType.CalorieGoal> {

  protected override getTable(): PgTable<TableConfig> & {id: IdColumn<number>;} {
    return this.drizzle.getSchema().calorieGoals;
  }
  protected override getWhere(): SQL<unknown> | undefined {
    return undefined;
  }

  protected override async decorateRows(rows: AppDbSchema['calorieGoals']['$inferSelect'][]): Promise<CalorieGoal[]> {
    return rows;
  }

  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().id);
  }

  async upsertOne(userId: number, item: CalorieGoalEntryUpsertDto): Promise<{id: number; value: CalorieGoal;}> {
    const data = item.calorieGoal;
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const info: typeof schema.calorieGoals.$inferInsert = {
      userId: userId,
      calories: data.calories,
      carbs: data.carbs,
      protein: data.protein,
      fat: data.fat,
      start: data.start,
      end: data.end,
    };
    const result = await db.insert(schema.calorieGoals).values(info).returning();
    const inserted = result[0];
    if (!inserted) {
      throw new Error('Unable to insert calorie goal');
    }
    const decorated = await this.decorateRow(inserted);
    return {id: inserted.id, value: decorated};
  }

  getRelationKey(): 'calorieGoalId' {
    return 'calorieGoalId';
  }

  construct(row: BaseEntry, value: CalorieGoal) {
    const created: CalorieGoalEntry = {
      ...row,
      calorieGoal: value,
      type: EntryType.CalorieGoal,
    };
    return created;
  };

  async loadMap(ids: number[]) {
    const calorieGoals = await this.getMany({ids: ids, perPage: ids.length});
    return calorieGoals.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, CalorieGoal>());
  }

}
