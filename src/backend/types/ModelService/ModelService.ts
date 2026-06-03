import {TableConfig, SQL, eq, inArray, and, ilike} from 'drizzle-orm';
import {PgColumn, PgTable} from 'drizzle-orm/pg-core';
import {PaginatedResult} from '../../services/ApiService/types/PaginatedResult';
import {AppDb, DrizzleService} from '../../services/DrizzleService/DrizzleService';
import {Filter} from './types/Filter';
import {IdColumn} from './types/IdColumn';
import {EntityService} from './types/EntityService';

export abstract class ModelService<
TKey extends number | string,
TRow extends {id:TKey},
TModel extends {id: TKey},
TFilter extends Filter<TKey> = Filter<TKey>
>
implements EntityService<TModel, TKey, TFilter> {
  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }

  protected abstract getTable(): PgTable<TableConfig> & {id: IdColumn<TKey>}
  protected abstract getWhere(params: Partial<TFilter>):SQL<unknown> | undefined
  protected abstract decorateRows(rows: TRow[]): Promise<TModel[]>
  protected abstract getOrderBy(): PgColumn | SQL | SQL.Aliased
  protected async loadRows(ids: TKey[]): Promise<TRow[]> {
    const db = await this.drizzle.getDb();
    const result: TRow[] = await db.select().from(this.getTable()).where(
      inArray(this.getTable().id, ids),
    ) as TRow[];
    return this.restoreOrder(ids, result);
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

  async paginate(params: Partial<TFilter>): Promise<PaginatedResult<TModel>> {
    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;
    const where: SQL<unknown> | undefined = this.getWhere(params);
    const {rows, count} = await this.executeQuery(db, offset, limit, where);
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
    offset: number,
    limit: number,
    where: SQL<unknown> | undefined
  ): Promise<{rows: TRow[], count: number}> {
    const rows = await db.select()
    .from(this.getTable())
    .where(
      where
    )
    .orderBy(
     this.getOrderBy()
    )
    .limit(limit)
    .offset(offset) as TRow[];

    const count = await db.$count(this.getTable(), where);
    return {rows, count};
  }


  async getById(id: TKey): Promise<TModel | null> {
    const params: Partial<TFilter> = {};
    params.ids = [id];
    const result = await this.get(params);
    return result;
  }

  async get(filter: Partial<TFilter>): Promise<TModel | null> {
    const records = await this.getMany(filter);
    const result = records[0];
    return result ?? null;
  }

  async getMany(params: Partial<TFilter>): Promise<TModel[]> {
    const where: SQL<unknown> | undefined = this.getWhere(params);
    const db = await this.drizzle.getDb();
    const rows = await db.select({
      id: this.getTable().id,
    })
    .from(this.getTable())
    .where(where)
    .orderBy(
     this.getOrderBy()
    );
    const ids:TKey[] = rows.map((x) => x.id as TKey);
    return this.decorateMany(ids);
  }

  async deleteById(id: TKey) {
    const plan = await this.getById(id);
    if (!plan) {
      throw new Error('Object not found');
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

  protected restoreOrder(ids: TKey[], rows: TRow[]): TRow[] {
    const map = new Map<TKey, TRow>();
    for (const row of rows) {
      map.set(row.id, row);
    }
    const ordered: TRow[] = [];
    for (const id of ids) {
      const row = map.get(id);
      if (!row) {
        throw new Error(`Row ${id} not found`);
      }
      ordered.push(row);
    }
    return ordered;
  }

  protected generateLikeConditions(column: PgColumn, search: string): SQL<unknown> | undefined {
    return and(
        ...search.trim()
          .split(' ')
          .filter((x) => !!x.trim())
          .map((x) => ilike(column, `%${x.trim()}%`))
      );
  }

  async loadMap(ids: TKey[]): Promise<Map<TKey, TModel>> {
    const result = await this.decorateMany(ids);
    return result.reduce((acc, cur) => acc.set(cur.id, cur), new Map<TKey, TModel>());
  }

}
