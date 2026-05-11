import {WeightUnit} from '../../types/WeightUnit';
import {NewModel} from '../../types/NewModel';
import {WeightRow} from '../DrizzleService/types/WeightRow';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {Weight} from './types/Weight';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {and, isNull, desc, eq, inArray} from 'drizzle-orm';
import {WeightUpsertDto} from './types/WeightUpsertDto';
import {SemiPartial} from '../../types/SemiPartial';
import {EntryType} from '../EntryService/types/EntryType';
import {BaseEntry, WeightEntry} from '../EntryService/types/Entry';
import {WeightEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {IEntryService} from '../EntryService/types/IEntryService';
export class WeightService implements IEntryService<EntryType.Weight> {
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
      units: WeightUnit.Kg,
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

  async upsert(userId: number, data: WeightUpsertDto[]): Promise<Weight[]> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const info = data.map((x) => {
      const info: SemiPartial<WeightRow, 'id'> = {
        ...x,
        id: x.id ?? undefined,
        userId: userId,
        externalId: null,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        deletedAt: x.deletedAt,
      };
      return info;
    });
    const result = await db.insert(schema.weight).values(info).onConflictDoUpdate({
      target: schema.weight.id,
      set: this.drizzle.generateConflictUpdateSetAllColumns(schema.weight),
    }).returning();
    return result;
  }

  getRelationKey() {
    return 'weightId' as const;
  }
  async upsertOne(userId: number, item: WeightEntryUpsertDto) {
    const result = await this.upsert(userId, [item.weight]);
    const weight = result[0];
    if (!weight) {
      throw new Error('Weight not found');
    }
    return {
      id: weight.id,
      value: weight,
    };
  }
  construct(row: BaseEntry, value: Weight): WeightEntry {
    const created: WeightEntry = {
      ...row,
      weight: value,
      type: EntryType.Weight,
    };
    return created;
  }
  async loadMap(ids: number[]): Promise<Map<number, Weight>> {
    const weights = await this.getAll({id: ids, perPage: ids.length});
    return weights.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, Weight>());
  }

}
