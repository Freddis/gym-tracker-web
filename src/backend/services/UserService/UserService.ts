import {and, desc, inArray, SQL} from 'drizzle-orm';
import {User} from './types/User';
import {ModelService} from '../../types/ModelService/ModelService';
import {UserRow} from '../DrizzleService/types/UserRow';
import {PgColumn} from 'drizzle-orm/pg-core';
import {Filter} from '../../types/ModelService/types/Filter';

export class UserService extends ModelService<UserRow, User> {

  protected override getTable() {
    return this.drizzle.getSchema().users;
  }
  protected override getWhere(params: Partial<Filter>): SQL<unknown> | undefined {
    const where = and(
      params.ids ? inArray(this.getTable().id, params.ids) : undefined
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
