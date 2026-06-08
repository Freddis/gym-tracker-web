import {and, eq, inArray} from 'drizzle-orm';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorRun} from './types/OutdoorRun';
import {IEntryService} from '../EntryService/types/IEntryService';
import {EntryType} from '../EntryService/types/EntryType';
import {BaseEntry, OutdoorRunEntry} from '../EntryService/types/Entry';
import {OutdoorRunEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {PathPoint} from '../OutdoorWalkService/types/PathPoint';
import {HeartRatePoint} from '../OutdoorWalkService/types/HeartRatePoint';
export class OutdoorRunService implements IEntryService<EntryType.OutdoorRun> {
  protected drizzle: DrizzleService;
  protected table: AppDbSchema['outdoorRuns'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().outdoorRuns;
  }

  async loadRows(params: {id: number[]}): Promise<OutdoorRun[]> {
    return this.loadFromSeparateTable(params);
    // const db = await this.drizzle.getDb();
    // const where = and(
    //     inArray(this.table.id, params.id)
    //   );
    // const rows = await db.select()
    // .from(this.table)
    // .where(where);
    // return rows;
  }

  async loadFromSeparateTable(params: {id: number[]}): Promise<OutdoorRun[]> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const rows = await db.select({
      id: this.table.id,
      userId: this.table.userId,
      distance: this.table.distance,
      elevationGain: this.table.elevationGain,
      duration: this.table.duration,
      calories: this.table.calories,
      pace: this.table.pace,
      cadence: this.table.cadence,
      maxPace: this.table.maxPace,
      maxCadence: this.table.maxCadence,
      heartRate: this.table.heartRate,
      maxHeartRate: this.table.maxHeartRate,
      start: this.table.start,
      end: this.table.end,
    })
    .from(this.table)
    .where(
      and(
        inArray(this.table.id, params.id),
      )
    );
    const runIds = rows.map((x) => x.id);
    const heartRateData = await db.select()
    .from(schema.outdoorRunHeartRateData)
    .where(
      inArray(schema.outdoorRunHeartRateData.outdoorRunId, runIds),
    );
    // .orderBy(schema.outdoorRunHeartRateData.timestamp);
    const geoData = await db.select()
    .from(schema.outdoorRunGeoData)
    .where(
      inArray(schema.outdoorRunGeoData.outdoorRunId, runIds),
    );
    // .orderBy(schema.outdoorRunGeoData.timestamp);
    const geoMap = geoData.reduce((acc, cur) => {
      const points = acc.get(cur.outdoorRunId) ?? [];
      points.push(cur);
      acc.set(cur.outdoorRunId, points);
      return acc;
    }, new Map<number, PathPoint[]>());
    const heartRateMap = heartRateData.reduce((acc, cur) => {
      const points = acc.get(cur.outdoorRunId) ?? [];
      points.push(cur);
      acc.set(cur.outdoorRunId, points);
      return acc;
    }, new Map<number, HeartRatePoint[]>());
    const result: OutdoorRun[] = rows.map((x) => {
      return {
        ...x,
        geoData: geoMap.get(x.id) ?? [],
        heartRateData: heartRateMap.get(x.id) ?? [],
      };
    });
    return result;
  }

  async deleteOne(userId: number, id: number): Promise<void> {
    const db = await this.drizzle.getDb();
    await db.delete(this.table).where(and(
      eq(this.table.id, id),
      eq(this.table.userId, userId),
    ));
  }

  async upsertOne(userId: number, entry: OutdoorRunEntryUpsertDto): Promise<{id: number, value: OutdoorRun}> {
    const data = entry.outdoorRun;
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const info: typeof db._.fullSchema.outdoorRuns.$inferInsert = {
      ...data,
      calories: Math.round(data.calories),
      duration: Math.round(data.duration),
      userId: userId,
    };
    const inserted = await db.insert(schema.outdoorRuns).values(info).onConflictDoUpdate({
      target: schema.outdoorRuns.id,
      set: this.drizzle.generateConflictUpdateSetAllColumns(schema.outdoorRuns),
    }).returning();
    const insertedRow = inserted[0];
    if (!insertedRow) {
      throw new Error('Unable to insert outdoor run');
    }

    const result: OutdoorRun = {
      ...insertedRow,
      geoData: data.geoData ?? null,
      heartRateData: data.heartRateData ?? null,
    };
    return {id: result.id, value: result};
  }
  getRelationKey(): 'outdoorRunId' {
    return 'outdoorRunId';
  }
  construct(row: BaseEntry, value: OutdoorRun): OutdoorRunEntry {
    return {
      ...row,
      outdoorRun: value,
      type: EntryType.OutdoorRun,
    };
  }
  async loadMap(ids: number[]): Promise<Map<number, OutdoorRun>> {
    const outdoorRuns = await this.loadRows({id: ids});
    return outdoorRuns.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, OutdoorRun>());
  }
}
