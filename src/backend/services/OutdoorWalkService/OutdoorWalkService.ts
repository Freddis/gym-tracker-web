import {and, eq, inArray} from 'drizzle-orm';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorWalk} from './types/OutdoorWalk';
import {EntryType} from '../EntryService/types/EntryType';
import {IEntryService} from '../EntryService/types/IEntryService';
import {OutdoorWalkEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {BaseEntry, OutdoorWalkEntry} from '../EntryService/types/Entry';

export class OutdoorWalkService implements IEntryService<EntryType.OutdoorWalk> {
  protected drizzle: DrizzleService;
  protected table: AppDbSchema['outdoorWalks'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().outdoorWalks;
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

  async deleteOne(userId: number, id: number): Promise<void> {
    const db = await this.drizzle.getDb();
    await db.delete(this.table).where(and(
      eq(this.table.id, id),
      eq(this.table.userId, userId),
    ));
  }

  async upsertOne(userId: number, entry: OutdoorWalkEntryUpsertDto): Promise<{id: number, value: OutdoorWalk}> {
    const data = entry.outdoorWalk;
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
    return {id: result.id, value: result};
  }
  getRelationKey(): 'outdoorWalkId' {
    return 'outdoorWalkId';
  }
  construct(row: BaseEntry, value: OutdoorWalk): OutdoorWalkEntry {
    return {
      ...row,
      outdoorWalk: value,
      type: EntryType.OutdoorWalk,
    };
  }
  async loadMap(ids: number[]): Promise<Map<number, OutdoorWalk>> {
    const outdoorWalks = await this.getAll({id: ids, perPage: ids.length});
    return outdoorWalks.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, OutdoorWalk>());
  }
}
