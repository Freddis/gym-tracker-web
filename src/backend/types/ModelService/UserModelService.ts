import {TableConfig, SQL, eq, inArray, and, or, isNull} from 'drizzle-orm';
import {PgColumn, PgTable} from 'drizzle-orm/pg-core';
import {PaginatedResult} from '../../services/ApiService/types/PaginatedResult';
import {AppDb, DrizzleService} from '../../services/DrizzleService/DrizzleService';
import {Filter} from './types/Filter';
import {IdColumn} from './types/IdColumn';
import {UserIdColumn} from './types/UserIdColumn';

export abstract class UserModelService<TKey extends number | string, TRow extends {id:TKey}, TModel, TFilter extends Filter<TKey>> {
  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }

  protected abstract getTable(): PgTable<TableConfig> & {id: IdColumn<TKey>, userId: UserIdColumn}
  protected abstract getWhere(params: Partial<TFilter>):SQL<unknown> | undefined
  protected abstract decorateRows(rows: TRow[]): Promise<TModel[]>
  protected abstract getOrderBy(): PgColumn | SQL | SQL.Aliased

  protected async loadRows(ids: TKey[]): Promise<TRow[]> {
    const db = await this.drizzle.getDb();
    const result = await db.select().from(this.getTable()).where(
      inArray(this.getTable().id, ids),
    );
    const map = new Map<TKey, unknown>();
    for (const row of result) {
      map.set(row.id, row);
    }
    const ordered: TRow[] = [];
    for (const id of ids) {
      const row = map.get(id);
      if (!row) {
        throw new Error(`Row ${id} not found`);
      }
      ordered.push(row as TRow);
    }
    return ordered;
  }
  async decorateRow(row: TRow): Promise<TModel> {
    const result = await this.decorateRows([row]);
    if (!result[0]) {
      throw new Error(`Couldn't decorate row ${row.id}`);
    }
    return result[0];
  }

  async decorate(id: TKey): Promise<TModel> {
    const rows = await this.loadRows([id]);
    const result = await this.decorateRows(rows);
    if (!result[0]) {
      throw new Error(`Couldn't decorate id ${id}`);
    }
    return result[0];
  }

  async decorateMany(ids: TKey[]): Promise<TModel[]> {
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
    const {rows, count} = await this.executeQuery(db, userId, offset, limit, where);
    const ids: TKey[] = rows.map((x) => x.id);
    const result: PaginatedResult<TModel> = {
      items: await this.decorateMany(ids),
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }

  protected async executeQuery(
    db: AppDb,
    userId: number,
    offset: number,
    limit: number,
    where: SQL<unknown> | undefined
  ): Promise<{rows: {id: TKey}[], count: number}> {
    const rows = await db.select()
    .from(this.getTable())
    .where(
      and(
        where,
        or(
          eq(this.getTable().userId, userId),
          isNull(this.getTable().userId),
        )
      )
    )
    .orderBy(
     this.getOrderBy()
    )
    .limit(limit)
    .offset(offset) as TRow[];

    const count = await db.$count(this.getTable(), and(
      where,
      or(
        eq(this.getTable().userId, userId),
        isNull(this.getTable().userId),
      )
    ));
    return {rows, count};
  }


  async getById(userId: number, id: TKey): Promise<TModel | null> {
    const params: Partial<TFilter> = {};
    params.ids = [id];
    const record = await this.paginate(userId, params);
    if (record.items.length > 1) {
      throw new Error(`Multiple records found for id ${id}`);
    }
    const result = record.items[0];
    return result ?? null;
  }

  async get(filter: TFilter, userId: number): Promise<TModel | null> {
    const record = await this.paginate(userId, filter);
    const result = record.items[0];
    return result ?? null;
  }

  async deleteById(userId: number, id: TKey) {
    const plan = await this.getById(userId, id);
    if (!plan) {
      throw new Error('Plan not found');
    }
    const db = await this.drizzle.getDb();
    await db.delete(this.getTable()).where(
      eq(this.getTable().id, id)
    );
  }

  protected createMap<X, T extends {id: X}>(arr: T[], keySelector: (x: T) => X): Map<X, T> {
    const map = new Map<X, T>();
    for (const item of arr) {
      map.set(keySelector(item), item);
    }
    return map;
  }
  protected getMappedOrThrow<X, T>(map: Map<X, T>, key: X): T {
    const x = map.get(key);
    if (!x) {
      throw new Error(`Exercise '${key}' not found`);
    }
    return x;
  }

}
