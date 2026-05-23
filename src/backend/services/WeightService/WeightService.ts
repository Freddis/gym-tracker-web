import {WeightUnit} from '../../types/WeightUnit';
import {NewModel} from '../../types/NewModel';
import {WeightRow} from '../DrizzleService/types/WeightRow';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {Weight} from './types/Weight';
import {and, isNull, desc, eq, inArray, SQL, gte, min, max} from 'drizzle-orm';
import {EntryType} from '../EntryService/types/EntryType';
import {BaseEntry, WeightEntry} from '../EntryService/types/Entry';
import {WeightEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {IEntryService} from '../EntryService/types/IEntryService';
import {PgColumn} from 'drizzle-orm/pg-core';
import {Filter} from '../../types/ModelService/types/Filter';
import {ModelService} from '../../types/ModelService/ModelService';
import {StrictOmit} from '../../types/StrictOmit';
import {WeightFilter} from './types/WeightFilter';

export class WeightService extends ModelService<number, WeightRow, Weight, WeightFilter>
implements IEntryService<EntryType.Weight> {
  protected override getTable() {
    return this.drizzle.getSchema().weight;
  }

  protected override getWhere(params: Partial<Filter<number>>): SQL<unknown> | undefined {
    const where = and(
      params.ids ? inArray(this.getTable().id, params.ids) : undefined,
      isNull(this.getTable().deletedAt),
    );
    return where;
  }

  protected override async decorateRows(rows: AppDbSchema['weight']['$inferSelect'][]): Promise<Weight[]> {
    const first = rows[0];
    if (!first) {
      return [];
    }
    const historySize = 30;
    const db = await this.drizzle.getDb();
    const minMax = await db.select({
      min: min(db._.fullSchema.entries.time),
    }).from(db._.fullSchema.entries).where(
      and(
        inArray(db._.fullSchema.entries.weightId, rows.map((x) => x.id)),
        isNull(db._.fullSchema.entries.deletedAt),
      )
    );
    const minTime = minMax[0]?.min ?? first.createdAt;
    const from = new Date(minTime?.getTime() - 1000 * 60 * 60 * 24 * historySize);
    const userIds = rows.map((x) => x.userId);
    const history = await db.select().from(
      this.getTable()
    )
    .leftJoin(
      db._.fullSchema.entries,
      eq(this.getTable().id, db._.fullSchema.entries.weightId),
    )
    .where(
      and(
        gte(db._.fullSchema.entries.time, from),
        inArray(db._.fullSchema.entries.userId, userIds),
        isNull(db._.fullSchema.entries.deletedAt),
      )
    );

    const final = rows.map((x) => ({
      ...x,
      history: history.filter((h) => h.entries?.userId === x.userId && h.entries?.time < x.createdAt).map((h) => h.weight),
      historySize: historySize,
    }));
    return final;
  }
  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().createdAt);
  }
  protected table: AppDbSchema['weight'];

  constructor(drizzle: DrizzleService) {
    super(drizzle);
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
    const row = await db.insert(schema.weight).values(obj).returning({id: this.getTable().id});
    if (!row[0]) {
      throw new Error('Unable to get inserted weight');
    }
    const result = await this.get({ids: [row[0].id]});
    if (!result) {
      throw new Error('Unable to get inserted weight');
    }
    return result;
  }

  async update(id: number, userId:number, weight: {weight: number}): Promise<Weight> {
    const existing = await this.get({
      ids: [id],
      userId: userId,
    });
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

    const updated = await this.get({
      ids: [id],
      userId: userId,
    });
    if (!updated) {
      throw new Error('Record not found after update');
    }
    return updated;

  }

  getRelationKey() {
    return 'weightId' as const;
  }

  async upsertOne(userId: number, item: WeightEntryUpsertDto) {
    const data = item.weight;
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const info: StrictOmit<WeightRow, 'id'> = {
      weight: data.weight,
      units: data.units,
      userId: userId,
      externalId: null,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
    const inserted = await db.insert(schema.weight).values(info).onConflictDoUpdate({
      target: schema.weight.id,
      set: this.drizzle.generateConflictUpdateSetAllColumns(schema.weight),
    }).returning();
    const weight = inserted[0];
    if (!weight) {
      throw new Error('Unable to insert weight');
    }
    const result = await this.get({ids: [weight.id]});
    if (!result) {
      throw new Error('Unable to get inserted weight');
    }
    return {
      id: weight.id,
      value: result,
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
    const weights = await this.paginate({ids: ids, perPage: ids.length});
    return weights.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, Weight>());
  }

}
