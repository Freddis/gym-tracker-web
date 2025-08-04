import {and, desc, isNull} from 'drizzle-orm';
import {PaginatedResult} from '../ApiService/types/PaginatedResponse';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {Manager} from './types/Manager';

export class ManagerService {
  protected db: DrizzleService;
  protected table: AppDbSchema['managers'];

  constructor(db: DrizzleService) {
    this.db = db;
    this.table = db.getSchema().managers;
  }

  async getByEmail(email: string): Promise<Manager | null> {
    const result = await this.getAll({
      email: [email],
    });
    return result.items[0] ?? null;
  }

  async getById(id: number): Promise<Manager | null> {
    const result = await this.getAll({
      id: [id],
    });
    return result.items[0] ?? null;
  }

  async getAll(params?: {
    id?: number[],
    email?: string[],
    page?: number,
    perPage?: number,
  }): Promise<PaginatedResult<Manager>> {
    const db = await this.db.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 10;
    const offset = (page - 1) * limit;
    const where = and(
        isNull(this.table.deletedAt),
      );
    const rows = await db.select()
    .from(this.table)
    .where(where)
    .orderBy(
      desc(this.table.createdAt)
    )
    .limit(params?.perPage ?? 10)
    .offset(offset);

    const count = await db.$count(this.table, where);
    const result: PaginatedResult<Manager> = {
      items: rows,
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }

}
