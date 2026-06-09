import {and, eq, inArray, sql} from 'drizzle-orm';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorRun} from './types/OutdoorRun';
import {IEntryService} from '../EntryService/types/IEntryService';
import {EntryType} from '../EntryService/types/EntryType';
import {BaseEntry, OutdoorRunEntry} from '../EntryService/types/Entry';
import {OutdoorRunEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {PathPoint} from '../OutdoorWalkService/types/PathPoint';
import {HeartRatePoint} from '../OutdoorWalkService/types/HeartRatePoint';
import {ArrayHelper} from '../../utils/ArrayHelper/ArrayHelper';
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
    const heartRateData = await db.select({
      data: sql<[number, number, number][] | null>`array_agg(array[
        ${schema.outdoorRunHeartRateData.outdoorRunId},
        ${schema.outdoorRunHeartRateData.heartRate},
        ${schema.outdoorRunHeartRateData.timestamp}
      ])`,
    })
    .from(schema.outdoorRunHeartRateData)
    .where(
      inArray(schema.outdoorRunHeartRateData.outdoorRunId, runIds),
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
        ${schema.outdoorRunGeoData.outdoorRunId},
        ${schema.outdoorRunGeoData.latitude}, 
        ${schema.outdoorRunGeoData.longitude},
        ${schema.outdoorRunGeoData.altitude},
        ${schema.outdoorRunGeoData.timestamp},
        ${schema.outdoorRunGeoData.speed},
        ${schema.outdoorRunGeoData.distance},
        ${schema.outdoorRunGeoData.course},
        ${schema.outdoorRunGeoData.horizontalAccuracy},
        ${schema.outdoorRunGeoData.verticalAccuracy},
        ${schema.outdoorRunGeoData.speedAccuracy}
        ])`,
    })
    .from(schema.outdoorRunGeoData)
    .where(
      inArray(schema.outdoorRunGeoData.outdoorRunId, runIds),
    );
    // .orderBy(schema.outdoorRunGeoData.timestamp);
    const geoMap = geoData.flatMap((x) => x.data ?? []).reduce((acc, cur) => {
      const [outdoorRunId, ...rest] = cur;
      const points = acc.get(outdoorRunId) ?? [];
      points.push(rest);
      acc.set(outdoorRunId, points);
      return acc;
    }, new Map<number, PathPoint[]>());
    const heartRateMap = heartRateData.flatMap((x) => x.data ?? []).reduce((acc, cur) => {
      const [outdoorRunId, heartRate, timestamp] = cur;
      const points = acc.get(outdoorRunId) ?? [];
      points.push([heartRate, timestamp]);
      acc.set(outdoorRunId, points);
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

  async upsertOne(userId: number, entry: OutdoorRunEntryUpsertDto): Promise<{id: number, value: OutdoorRun}> {
    const data = entry.outdoorRun;
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
    const inserted = await db.insert(schema.outdoorRuns).values(info).onConflictDoUpdate({
      target: schema.outdoorRuns.id,
      set: this.drizzle.generateConflictUpdateSetAllColumns(schema.outdoorRuns),
    }).returning();
    const insertedRow = inserted[0];
    if (!insertedRow) {
      throw new Error('Unable to insert outdoor run');
    }
    const geo: typeof db._.fullSchema.outdoorRunGeoData.$inferInsert[] = [];
    for (const point of data.geoData ?? []) {
      geo.push({
        latitude: point[0],
        longitude: point[1],
        altitude: point[2],
        timestamp: point[3],
        speed: point[4],
        distance: point[5],
        course: point[6],
        horizontalAccuracy: point[7],
        verticalAccuracy: point[8],
        speedAccuracy: point[9],
        outdoorRunId: insertedRow.id,
      });
    }
    if (geo.length > 0) {
      await ArrayHelper.inBatch(500, geo, async (batch) => {
        await db.insert(schema.outdoorRunGeoData).values(batch);
        return true;
      });
    }
    const heartRate: typeof db._.fullSchema.outdoorRunHeartRateData.$inferInsert[] = [];
    for (const point of data.heartRateData ?? []) {
      heartRate.push({
        outdoorRunId: insertedRow.id,
        heartRate: point[0],
        timestamp: point[1],
      });
    }
    if (heartRate.length > 0) {
      await ArrayHelper.inBatch(500, heartRate, async (batch) => {
        await db.insert(schema.outdoorRunHeartRateData).values(batch);
        return true;
      });
    }
    const result: OutdoorRun = {
      ...insertedRow,
      geoData: entry.outdoorRun.geoData ?? null,
      heartRateData: entry.outdoorRun.heartRateData ?? null,
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
