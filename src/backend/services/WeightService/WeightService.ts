import {WeightUnits} from '../../types/WeightUnits';
import {NewModel} from '../../types/NewModel';
import {WeightRow} from '../DrizzleService/types/WeightRow';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {Weight} from './types/Weight';
import {PaginatedResult} from '../ApiService/types/PaginatedResponse';
import {and, isNull, desc, eq, inArray} from 'drizzle-orm';
export class WeightService {
  protected drizzle: DrizzleService;
  protected table: AppDbSchema['weight'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().weight;
  }

  async create(props: {userId: number, weight: number}): Promise<Weight> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const obj: NewModel<WeightRow> = {
      externalId: null,
      createdAt: new Date(),
      updatedAt: null,
      weight: props.weight,
      userId: props.userId,
      units: WeightUnits.Kg,
      deletedAt: null,
    };
    const result = await db.insert(schema.weight).values(obj).returning();
    if (!result[0]) {
      throw new Error('Unable to get inserted weight');
    }
    return result[0];
  }

  async update(id: number, userId:number, weight: {weight: number}): Promise<Weight> {
    const existing = this.get(id, userId);
    if (!existing) {
      throw new Error('Record not found');
    }
    const db = await this.drizzle.getDb();
    await db.update(db._.fullSchema.weight)
    .set({
      ...weight,
      updatedAt: new Date(),
    })
    .where(
      eq(db._.fullSchema.weight.id, id)
    ).returning();

    const updated = await this.get(id, userId);
    if (!updated) {
      throw new Error('Record not found after update');
    }
    return updated;

  }

  async get(id: number, userId: number): Promise<Weight| null> {
    const record = await this.getAll({id: [id]});
    const result = record.items[0];
    if (!result || result.userId !== userId) {
      return null;
    }
    return result;
  }

  async getAll(params: {id?: number[], page?: number, perPage?: number}): Promise<PaginatedResult<Weight>> {
    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;
    const where = and(
        params.id ? inArray(this.table.id, params.id) : undefined,
        isNull(this.table.deletedAt),
      );
    const rows = await db.select()
    .from(this.table)
    .where(where)
    .orderBy(
      desc(this.table.createdAt)
    )
    .limit(limit)
    .offset(offset);

    const count = await db.$count(this.table, where);
    const result: PaginatedResult<Weight> = {
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
