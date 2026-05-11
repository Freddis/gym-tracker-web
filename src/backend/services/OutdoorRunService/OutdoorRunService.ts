import {and, eq, inArray} from 'drizzle-orm';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorRun} from './types/OutdoorRun';
import {IEntryService} from '../EntryService/types/IEntryService';
import {EntryType} from '../EntryService/types/EntryType';
import {BaseEntry, OutdoorRunEntry} from '../EntryService/types/Entry';
import {OutdoorRunEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
export class OutdoorRunService implements IEntryService<EntryType.OutdoorRun> {
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

  async upsertOne(userId: number, entry: OutdoorRunEntryUpsertDto): Promise<{id: number, value: OutdoorRun}> {
    const data = entry.outdoorRun;
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
    return {id: result.id, value: result};
  }
  getRelationKey(): 'outdoorRunId' {
    return 'outdoorRunId';
  }
  construct(row: BaseEntry, value: OutdoorRun): OutdoorRunEntry {
    return {
      ...row,
      outdoorRun: value,
      type: EntryType.OutdoorRun,
    };
  }
  async loadMap(ids: number[]): Promise<Map<number, OutdoorRun>> {
    const outdoorRuns = await this.getAll({id: ids, perPage: ids.length});
    return outdoorRuns.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, OutdoorRun>());
  }
}
