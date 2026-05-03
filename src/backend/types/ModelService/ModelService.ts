import {TableConfig, SQL, eq, inArray, and, ilike} from 'drizzle-orm';
import {PgColumn, PgTable} from 'drizzle-orm/pg-core';
import {PaginatedResult} from '../../services/ApiService/types/PaginatedResult';
import {DrizzleService} from '../../services/DrizzleService/DrizzleService';
import {Filter} from './types/Filter';
import {IdColumn} from './types/IdColumn';
import {EntityService} from './types/EntityService';

export abstract class ModelService<TRow extends {id:number}, TModel extends {id: number}, TFilter extends Filter = Filter>
implements EntityService<TModel, number, TFilter> {
  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }

  protected abstract getTable(): PgTable<TableConfig> & {id: IdColumn<number>}
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
    return this.restoreOrder(ids, result);
  }

  async paginate(params: Partial<TFilter>): Promise<PaginatedResult<TModel>> {
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


  async getById(id: number): Promise<TModel | null> {
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
    return this.decorateMany(rows.map((x) => x.id));
  }
  async deleteById(id: number) {
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

  protected restoreOrder<T extends {id: number}>(ordered: number[], unordered: T[]): T[] {
    const map = ordered.reduce((acc, id, i) => acc.set(id, i), new Map<number, number>());
    const result: T[] = [];
    for (const obj of unordered) {
      const i = map.get(obj.id) ?? 0;
      result[i] = obj;
    }
    return result;
  }

  protected generateLikeConditions(column: PgColumn, search: string): SQL<unknown> | undefined {
    return and(
        ...search.trim()
          .split(' ')
          .filter((x) => !!x.trim())
          .map((x) => ilike(column, `%${x.trim()}%`))
      );
  }

}
