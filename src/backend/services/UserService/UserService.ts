import {and, desc, inArray} from 'drizzle-orm';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {User} from './types/User';


export class UserService {
  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }

  async get(id: number): Promise<User | null> {
    const exercises = await this.getAll({ids: [id]});
    const result = exercises.items[0];
    return result ?? null;
  }

  async getAll(params: { ids?: number[], page?: number, perPage?: number}): Promise<PaginatedResult<User>> {
    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 100;
    const offset = (page - 1) * limit;

    const where = and(
      params.ids ? inArray(db._.fullSchema.users.id, params.ids) : undefined
    );
    const count = await db.$count(db._.fullSchema.users, where);
    const rows = await db.select()
      .from(db._.fullSchema.users)
      .where(where)
      .orderBy(
        desc(db._.fullSchema.users.id)
      )
      .limit(limit)
      .offset(offset);
    const items: User[] = rows.map((row) => ({
      id: row.id,
      email: row.email,
      name: row.name,
      profilePicture: '',
    }));
    const result: PaginatedResult<User> = {
      items,
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }

}
