import {ArgusCheckin} from 'src/backend/model/ArgusCheckin/ArgusCheckin';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {ArgusCheckinType} from 'src/backend/model/ArgusCheckin/types/ArgusCheckinType';
import {PaginatedResult} from 'src/backend/services/OpenApiService/validators/convenience/PaginatedResponse';
import {dbSchema} from 'src/backend/drizzle/db';
import {eq, count} from 'drizzle-orm';


export class ArgusCheckinService {
  protected db: DrizzleService;
  constructor(db: DrizzleService) {
    this.db = db;
  }

  async getLatest(params: {type?: ArgusCheckinType, page: number;}): Promise<PaginatedResult<ArgusCheckin>> {
    const db = await this.db.getDb();
    const limit = 10;
    const offset = limit * (params.page - 1);
    const result = await db.query.argusCheckins.findMany({
      limit: limit,
      offset: offset,
      where: (entries, {eq}) => params.type ? eq(entries.type, params.type.toString()) : undefined,
      orderBy: (table, {desc}) => desc(table.createdAt),
    });
    const countResp = await db.select({count: count()})
      .from(dbSchema.argusCheckins)
      .where(params.type ? eq(dbSchema.argusCheckins.type, params.type) : undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {items: result as any, info: {page: params.page, pageSize: limit, count: countResp[0].count}};
  }

  getCategories(): ArgusCheckinType[] {
    return Object.values(ArgusCheckinType);
  }
}
