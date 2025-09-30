import {and, desc, eq, inArray, SQL} from 'drizzle-orm';
import {User} from './types/User';
import {ModelService} from '../../types/ModelService/ModelService';
import {UserRow} from '../DrizzleService/types/UserRow';
import {PgColumn} from 'drizzle-orm/pg-core';
import {UserFilter} from './types/UserFilter';

export class UserService extends ModelService<UserRow, User, UserFilter> {
  async update(id: number, data: {password?: string;}) {
    const db = await this.drizzle.getDb();
    await db.update(this.getTable()).set(data).where(
      eq(this.getTable().id, id)
    );
  }

  protected override getTable() {
    return this.drizzle.getSchema().users;
  }
  protected override getWhere(params: Partial<UserFilter>): SQL<unknown> | undefined {
    const where = and(
      params.ids ? inArray(this.getTable().id, params.ids) : undefined,
      params.email ? eq(this.getTable().email, params.email) : undefined
    );
    return where;
  }
  protected override async decorateRows(rows: UserRow[]): Promise<User[]> {
    return rows.map((x) => ({
      ...x,
      profilePicture: '',
    }));
  }
  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().id);
  }

}
