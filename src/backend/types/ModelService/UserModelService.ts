import {TableConfig, SQL, eq, inArray} from 'drizzle-orm';
import {PgColumn, PgTable} from 'drizzle-orm/pg-core';
import {PaginatedResult} from '../../services/ApiService/types/PaginatedResult';
import {DrizzleService} from '../../services/DrizzleService/DrizzleService';
import {Filter} from './types/Filter';
import {IdColumn} from './types/IdColumn';
import {UserIdColumn} from './types/UserIdColumn';

export abstract class UserModelService<TRow extends {id:number}, TModel, TFilter extends Filter> {
  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }

  protected abstract getTable(): PgTable<TableConfig> & {id: IdColumn, userId: UserIdColumn}
  protected abstract getWhere(params: Partial<TFilter>):SQL<unknown> | undefined
  protected abstract decorateRows(rows: TRow[]): Promise<TModel[]>
  protected abstract getOrderBy(): PgColumn | SQL | SQL.Aliased
  protected async loadRows(ids: number[]): Promise<TRow[]> {
    const db = await this.drizzle.getDb();
    const result = await db.select().from(this.getTable()).where(
      inArray(this.getTable().id, ids),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result as any;
  }
  async decorateRow(row: TRow): Promise<TModel> {
    const result = await this.decorateRows([row]);
    if (!result[0]) {
      throw new Error(`Couldn't decorate row ${row.id}`);
    }
    return result[0];
  }
  async decorate(id: number): Promise<TModel> {
    const rows = await this.loadRows([id]);
    const result = await this.decorateRows(rows);
    if (!result[0]) {
      throw new Error(`Couldn't decorate id ${id}`);
    }
    return result[0];
  }
  async decorateMany(ids: number[]): Promise<TModel[]> {
    const rows = await this.loadRows(ids);
    const result = await this.decorateRows(rows);
    return result;
  }

  async paginate(userId: number, params: Partial<TFilter>): Promise<PaginatedResult<TModel>> {
    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;
    const where: SQL<unknown> | undefined = this.getWhere(params);
    const rows = await db.select({
      id: this.getTable().id,
    })
    .from(this.getTable())
    .where(where)
    .orderBy(
     this.getOrderBy()
    )
    .limit(limit)
    .offset(offset);

    const count = await db.$count(this.getTable(), where);

    const result: PaginatedResult<TModel> = {
      items: await this.decorateMany(rows.map((x) => x.id)),
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }


  async getById(userId: number, id: number): Promise<TModel | null> {
    const params: Partial<TFilter> = {};
    params.ids = [id];
    const record = await this.paginate(userId, params);
    const result = record.items[0];
    return result ?? null;
  }

  async get(filter: TFilter, userId: number): Promise<TModel | null> {
    const record = await this.paginate(userId, filter);
    const result = record.items[0];
    return result ?? null;
  }

  async deleteById(userId: number, id: number) {
    const plan = await this.getById(userId, id);
    if (!plan) {
      throw new Error('Plan not found');
    }
    const db = await this.drizzle.getDb();
    await db.delete(this.getTable()).where(
      eq(this.getTable().id, id)
    );
  }

  protected createMap<T extends {id: number}>(arr: T[]): Map<number, T> {
    const map = new Map<number, T>();
    for (const exercise of arr) {
      map.set(exercise.id, exercise);
    }
    return map;
  }
  protected getMappedOrThrow<T>(map: Map<number, T>, key: number): T {
    const x = map.get(key);
    if (!x) {
      throw new Error(`Exercise '${key}' not found`);
    }
    return x;
  }

}
