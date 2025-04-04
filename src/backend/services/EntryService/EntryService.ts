import {Entry} from 'src/backend/model/Entry/Entry';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {EntryType} from 'src/backend/model/Entry/types/EntryType';
import {PaginatedResult} from 'src/backend/services/OpenApiService/validators/convenience/PaginatedResponse';
import {dbSchema} from 'src/backend/drizzle/db';
import {eq, count} from 'drizzle-orm';


export class EntryService {
  protected db: DrizzleService;
  constructor(db: DrizzleService) {
    this.db = db;
  }

  async getLatest(params: {type?: EntryType, page: number;}): Promise<PaginatedResult<Entry>> {
    const db = await this.db.getDb();
    const limit = 10;
    const offset = limit * (params.page - 1);
    const result = await db.query.entries.findMany({
      limit: limit,
      offset: offset,
      where: (entries, {eq}) => params.type ? eq(entries.type, params.type.toString()) : undefined,
      orderBy: (table, {desc}) => desc(table.createdAt),
    });
    const countResp = await db.select({count: count()})
      .from(dbSchema.entries)
      .where(params.type ? eq(dbSchema.entries.type, params.type) : undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {items: result as any, info: {page: params.page, pageSize: limit, count: countResp[0].count}};
  }

  getCategories(): EntryType[] {
    return Object.values(EntryType);
  }
}
