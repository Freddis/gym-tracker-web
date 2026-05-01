import {and, desc, eq, inArray, isNull, SQL} from 'drizzle-orm';
import {Manager} from './types/Manager';
import {EntityService} from '../../types/ModelService/types/EntityService';
import {ModelService} from '../../types/ModelService/ModelService';
import {ManagerRow} from '../DrizzleService/types/ManagerRow';
import {PgColumn} from 'drizzle-orm/pg-core';
import {ManagerFilter} from './types/ManagerFilter';

export class ManagerService
extends ModelService<ManagerRow, Manager, ManagerFilter> implements EntityService<Manager, number, ManagerFilter> {

  async create(manager: Omit<Manager, 'id'|'createdAt'|'updatedAt'|'deletedAt'>): Promise<Manager> {
    const db = await this.drizzle.getDb();
    const rows = await db.insert(db._.fullSchema.managers).values({
      ...manager,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      id: undefined,
    }).returning();
    if (!rows[0]) {
      throw new Error("Couldn't inser");
    }
    return rows[0];
  }

  async getByEmail(email: string): Promise<Manager | null> {
    const result = await this.get({
      email: email,
    });
    return result;
  }

  protected getTable() {
    return this.drizzle.getSchema().managers;
  }

  protected getWhere(params: Partial<ManagerFilter>): SQL<unknown> | undefined {
    const where = and(
        params?.ids ? inArray(this.getTable().id, params.ids) : undefined,
        params?.email ? eq(this.getTable().email, params.email) : undefined,
        isNull(this.getTable().deletedAt),
      );
    return where;
  }
  protected async decorateRows(rows: ManagerRow[]): Promise<Manager[]> {
    return rows;
  }
  protected getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().id);
  }

}
