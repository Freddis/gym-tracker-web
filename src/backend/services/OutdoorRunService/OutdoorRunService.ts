import {and, eq, inArray} from 'drizzle-orm';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorRun} from './types/OutdoorRun';
import {OutdoorRunUpsertDto} from './types/OutdoorRunUpsertDto';

export class OutdoorRunService {

  protected drizzle: DrizzleService;
  protected table: AppDbSchema['outdoorRuns'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().outdoorRuns;
  }

  async getAll(params: {id: number[]; perPage: number; page?: number;}): Promise<PaginatedResult<OutdoorRun>> {
    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;
    const where = and(
        params.id ? inArray(this.table.id, params.id) : undefined,
      );
    const rows = await db.select()
    .from(this.table)
    .where(where)
    .limit(limit)
    .offset(offset);

    const count = await db.$count(this.table, where);
    const result: PaginatedResult<OutdoorRun> = {
      items: rows,
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }

  async deleteOne(userId: number, id: number): Promise<void> {
    const db = await this.drizzle.getDb();
    await db.delete(this.table).where(and(
      eq(this.table.id, id),
      eq(this.table.userId, userId),
    ));
  }

  async upsertOne(userId: number, data: OutdoorRunUpsertDto): Promise<OutdoorRun> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const info: typeof db._.fullSchema.outdoorRuns.$inferInsert = {
      ...data,
      calories: Math.round(data.calories),
      duration: Math.round(data.duration),
      userId: userId,
    };
    const inserted = await db.insert(schema.outdoorRuns).values(info).onConflictDoUpdate({
      target: schema.outdoorRuns.id,
      set: this.drizzle.generateConflictUpdateSetAllColumns(schema.outdoorRuns),
    }).returning();
    const insertedRow = inserted[0];
    if (!insertedRow) {
      throw new Error('Unable to insert outdoor run');
    }

    const result: OutdoorRun = {
      ...insertedRow,
      geoData: data.geoData ?? null,
      heartRateData: data.heartRateData ?? null,
    };
    return result;
  }
}
