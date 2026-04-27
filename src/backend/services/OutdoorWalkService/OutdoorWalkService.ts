import {and, inArray} from 'drizzle-orm';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorWalk} from './types/OutdoorWalk';
import {OutdoorWalkUpsertDto} from './types/OutdoorWalkUpsertDto';

export class OutdoorWalkService {

  protected drizzle: DrizzleService;
  protected table: AppDbSchema['outdoorWalks'];
  protected geoDataTable: AppDbSchema['geoData'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().outdoorWalks;
    this.geoDataTable = drizzle.getSchema().geoData;
  }

  async getAll(params: {id: number[]; perPage: number; page?: number;}): Promise<PaginatedResult<OutdoorWalk>> {
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
    const result: PaginatedResult<OutdoorWalk> = {
      items: rows,
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }

  async upsertOne(userId: number, data: OutdoorWalkUpsertDto): Promise<OutdoorWalk> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const info: typeof db._.fullSchema.outdoorRuns.$inferInsert = {
      ...data,
      calories: Math.round(data.calories),
      duration: Math.round(data.duration),
      userId: userId,
    };
    const inserted = await db.insert(schema.outdoorWalks).values(info).onConflictDoUpdate({
      target: schema.outdoorRuns.id,
      set: this.drizzle.generateConflictUpdateSetAllColumns(schema.outdoorRuns),
    }).returning();
    const insertedRow = inserted[0];
    if (!insertedRow) {
      throw new Error('Unable to insert outdoor run');
    }
    const result: OutdoorWalk = insertedRow;
    return result;
  }
}
