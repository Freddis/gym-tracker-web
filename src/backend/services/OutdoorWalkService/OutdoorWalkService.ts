import {and, eq, inArray, sql} from 'drizzle-orm';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorWalk} from './types/OutdoorWalk';
import {EntryType} from '../EntryService/types/EntryType';
import {IEntryService} from '../EntryService/types/IEntryService';
import {OutdoorWalkEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {BaseEntry, OutdoorWalkEntry} from '../EntryService/types/Entry';
import {OutdoorRun} from '../OutdoorRunService/types/OutdoorRun';
import {HeartRatePoint} from './types/HeartRatePoint';
import {PathPoint} from './types/PathPoint';
import {ArrayHelper} from '../../utils/ArrayHelper/ArrayHelper';

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
    const heartRateData = await db.select({
      data: sql<[number, number, number][] | null>`array_agg(array[
        ${schema.outdoorWalkHeartRateData.outdoorWalkId},
        ${schema.outdoorWalkHeartRateData.heartRate},
        ${schema.outdoorWalkHeartRateData.timestamp}
      ])`,
    })
    .from(schema.outdoorWalkHeartRateData)
    .where(
      inArray(schema.outdoorWalkHeartRateData.outdoorWalkId, walkIds),
    );
    const geoData = await db.select({
      data: sql<[
      number,
      number,
      number,
      number,
      number,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
      ][] | null>`array_agg(array[
        ${schema.outdoorWalkGeoData.outdoorWalkId},
        ${schema.outdoorWalkGeoData.latitude}, 
        ${schema.outdoorWalkGeoData.longitude},
        ${schema.outdoorWalkGeoData.altitude},
        ${schema.outdoorWalkGeoData.timestamp},
        ${schema.outdoorWalkGeoData.speed},
        ${schema.outdoorWalkGeoData.distance},
        ${schema.outdoorWalkGeoData.course},
        ${schema.outdoorWalkGeoData.horizontalAccuracy},
        ${schema.outdoorWalkGeoData.verticalAccuracy},
        ${schema.outdoorWalkGeoData.speedAccuracy}
        ])`,
    }
    )
    .from(schema.outdoorWalkGeoData)
    .where(
      inArray(schema.outdoorWalkGeoData.outdoorWalkId, walkIds),
    );
    const geoMap = geoData.flatMap((x) => x.data ?? []).reduce((acc, cur) => {
      const [outdoorWalkId, ...rest] = cur;
      const points = acc.get(outdoorWalkId) ?? [];
      points.push(rest);
      acc.set(outdoorWalkId, points);
      return acc;
    }, new Map<number, PathPoint[]>());
    const heartRateMap = heartRateData.flatMap((x) => x.data ?? []).reduce((acc, cur) => {
      const [outdoorWalkId, heartRate, timestamp] = cur;
      const points = acc.get(outdoorWalkId) ?? [];
      points.push([heartRate, timestamp]);
      acc.set(outdoorWalkId, points);
      return acc;
    }, new Map<number, HeartRatePoint[]>());
    const result: OutdoorRun[] = rows.map((x) => {
      return {
        ...x,
        geoData: geoMap.get(x.id)?.sort((a, b) => a[3] - b[3]) ?? [],
        heartRateData: heartRateMap.get(x.id)?.sort((a, b) => a[1] - b[1]) ?? [],
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
      start: data.start,
      end: data.end,
      distance: data.distance,
      pace: data.pace,
      maxPace: data.maxPace,
      cadence: data.cadence,
      maxCadence: data.maxCadence,
      heartRate: data.heartRate,
      maxHeartRate: data.maxHeartRate,
      elevationGain: data.elevationGain,
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
    const geo: typeof db._.fullSchema.outdoorWalkGeoData.$inferInsert[] = [];
    for (const point of data.geoData ?? []) {
      geo.push({
        latitude: point[0],
        longitude: point[1],
        altitude: point[2],
        timestamp: Math.round(point[3]),
        speed: point[4],
        distance: point[5],
        course: point[6],
        horizontalAccuracy: point[7],
        verticalAccuracy: point[8],
        speedAccuracy: point[9],
        outdoorWalkId: insertedRow.id,
      });
    }
    if (geo.length > 0) {
      await ArrayHelper.inBatch(500, geo, async (batch) => {
        await db.insert(schema.outdoorWalkGeoData).values(batch);
        return true;
      });
    }
    const heartRate: typeof db._.fullSchema.outdoorWalkHeartRateData.$inferInsert[] = [];
    for (const point of data.heartRateData ?? []) {
      heartRate.push({
        outdoorWalkId: insertedRow.id,
        heartRate: point[0],
        timestamp: Math.round(point[1]),
      });
    }
    if (heartRate.length > 0) {
      await ArrayHelper.inBatch(500, heartRate, async (batch) => {
        await db.insert(schema.outdoorWalkHeartRateData).values(batch);
        return true;
      });
    }
    const result: OutdoorWalk = {
      ...insertedRow,
      geoData: entry.outdoorWalk.geoData ?? null,
      heartRateData: entry.outdoorWalk.heartRateData ?? null,
    };
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
