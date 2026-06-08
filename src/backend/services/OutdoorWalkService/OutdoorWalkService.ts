import {and, eq, inArray} from 'drizzle-orm';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorWalk} from './types/OutdoorWalk';
import {EntryType} from '../EntryService/types/EntryType';
import {IEntryService} from '../EntryService/types/IEntryService';
import {OutdoorWalkEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {BaseEntry, OutdoorWalkEntry} from '../EntryService/types/Entry';
import {OutdoorRun} from '../OutdoorRunService/types/OutdoorRun';
import {HeartRatePoint} from './types/HeartRatePoint';
import {PathPoint} from './types/PathPoint';

export class OutdoorWalkService implements IEntryService<EntryType.OutdoorWalk> {
  protected drizzle: DrizzleService;
  protected table: AppDbSchema['outdoorWalks'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().outdoorWalks;
  }

  async loadRows(params: {id: number[]}): Promise<OutdoorWalk[]> {
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

  async loadFromSeparateTable(params: {id: number[]}): Promise<OutdoorWalk[]> {
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
    const walkIds = rows.map((x) => x.id);
    const heartRateData = await db.select()
    .from(schema.outdoorWalkHeartRateData)
    .where(
      inArray(schema.outdoorWalkHeartRateData.outdoorWalkId, walkIds),
    )
    .orderBy(schema.outdoorWalkHeartRateData.timestamp);
    const geoData = await db.select()
    .from(schema.outdoorWalkGeoData)
    .where(
      inArray(schema.outdoorWalkGeoData.outdoorWalkId, walkIds),
    )
    .orderBy(schema.outdoorWalkGeoData.timestamp);
    const geoMap = geoData.reduce((acc, cur) => {
      const points = acc.get(cur.outdoorWalkId) ?? [];
      points.push(cur);
      acc.set(cur.outdoorWalkId, points);
      return acc;
    }, new Map<number, PathPoint[]>());
    const heartRateMap = heartRateData.reduce((acc, cur) => {
      const points = acc.get(cur.outdoorWalkId) ?? [];
      points.push(cur);
      acc.set(cur.outdoorWalkId, points);
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

  async upsertOne(userId: number, entry: OutdoorWalkEntryUpsertDto): Promise<{id: number, value: OutdoorWalk}> {
    const data = entry.outdoorWalk;
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const info: typeof db._.fullSchema.outdoorRuns.$inferInsert = {
      ...data,
      calories: Math.round(data.calories),
      duration: Math.round(data.duration),
      userId: userId,
    };
    const inserted = await db.insert(schema.outdoorWalks).values(info).onConflictDoUpdate({
      target: schema.outdoorRuns.id,
      set: this.drizzle.generateConflictUpdateSetAllColumns(schema.outdoorRuns),
    }).returning();
    const insertedRow = inserted[0];
    if (!insertedRow) {
      throw new Error('Unable to insert outdoor run');
    }
    const result: OutdoorWalk = insertedRow;
    return {id: result.id, value: result};
  }
  getRelationKey(): 'outdoorWalkId' {
    return 'outdoorWalkId';
  }
  construct(row: BaseEntry, value: OutdoorWalk): OutdoorWalkEntry {
    return {
      ...row,
      outdoorWalk: value,
      type: EntryType.OutdoorWalk,
    };
  }
  async loadMap(ids: number[]): Promise<Map<number, OutdoorWalk>> {
    const outdoorWalks = await this.loadRows({id: ids});
    return outdoorWalks.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, OutdoorWalk>());
  }
}
