import {and, inArray, isNull, desc, SQL, eq} from 'drizzle-orm';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {WorkoutPlan} from './types/WorkoutPlan';
import {PgColumn} from 'drizzle-orm/pg-core';
import {UserModelService} from '../../types/ModelService/UserModelService';
import {WorkoutPlanFilter} from './types/WorkoutPlanFilter';
import {WorkoutPlanRow} from '../DrizzleService/types/WorkoutPlanRow';
import {randomUUID} from 'crypto';
import {NewModelDto} from '../../types/NewModelDto';
export class WorkoutPlanService extends UserModelService<string, WorkoutPlanRow, WorkoutPlan, WorkoutPlanFilter> {

  protected table: AppDbSchema['workoutPlans'];

  constructor(drizzle: DrizzleService) {
    super(drizzle);
    this.table = drizzle.getSchema().workoutPlans;
  }

  getTable() {
    return this.table;
  }

  protected getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.table.createdAt);
  }

  override getWhere(params: WorkoutPlanFilter): SQL<unknown> | undefined {
    const where = and(
        params.ids ? inArray(this.table.id, params.ids) : undefined,
        isNull(this.table.deletedAt),
      );
    return where;
  }

  protected async decorateRows(rows:WorkoutPlanRow[]): Promise<WorkoutPlan[]> {
    return rows;
  }

  async create(data: Omit<WorkoutPlan, 'id'|'createdAt'|'updatedAt'| 'deletedAt'>): Promise<WorkoutPlan> {
    const db = await this.drizzle.getDb();
    const newRow: WorkoutPlanRow = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };
    const rows = await db.insert(this.table).values(newRow).returning();
    const result = rows[0];
    if (!result) {
      throw new Error("Couldn't insert workout plan");
    }
    return result;
  }

  async update(userId: number, id: string, update: NewModelDto<WorkoutPlan>): Promise<WorkoutPlan> {
    const plan = await this.getById(userId, id);
    if (!plan) {
      throw new Error('Plan not found');
    }
    const db = await this.drizzle.getDb();
    await db.update(this.table).set({
      ...update,
      userId: userId,
      createdAt: plan.createdAt,
      updatedAt: new Date(),
      deletedAt: plan.deletedAt,
    })
    .where(
      eq(this.table.id, id),
    );
    const updated = await this.getById(userId, id);
    if (!updated) {
      throw new Error('Plan not found after update');
    }
    return updated;
  }


}
