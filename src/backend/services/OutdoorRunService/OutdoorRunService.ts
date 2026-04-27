import {and, eq, inArray} from 'drizzle-orm';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {OutdoorRun} from './types/OutdoorRun';
import {OutdoorRunUpsertDto} from './types/OutdoorRunUpsertDto';

export class OutdoorRunService {

  protected drizzle: DrizzleService;
  protected table: AppDbSchema['outdoorRuns'];
  protected geoDataTable: AppDbSchema['geoData'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().outdoorRuns;
    this.geoDataTable = drizzle.getSchema().geoData;
  }

  async getAll(params: {id: number[]; perPage: number; page?: number;}): Promise<PaginatedResult<OutdoorRun>> {
    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;
    const where = and(
        params.id ? inArray(this.table.id, params.id) : undefined,
      );
    const rows = await db.select()
    .from(this.table)
    .where(where)
    .limit(limit)
    .offset(offset);

    const count = await db.$count(this.table, where);

    const geoData = await db.select()
      .from(this.geoDataTable)
      .where(inArray(this.geoDataTable.outdoorRunId, rows.map((x) => x.id)))
      .orderBy(this.geoDataTable.timestamp);
    const geoDataMap = geoData.reduce((acc, cur) => {
      const points = acc.get(cur.outdoorRunId) ?? [];
      points.push(cur);
      acc.set(cur.outdoorRunId, points);
      return acc;
    }, new Map<number, typeof this.geoDataTable.$inferSelect[]>());

    const result: PaginatedResult<OutdoorRun> = {
      items: rows.map((row) => {
        const getData = geoDataMap.get(row.id);
        const run: OutdoorRun = {
          id: row.id,
          userId: row.userId,
          distance: row.distance,
          elevationGain: row.elevationGain,
          start: row.start,
          end: row.end,
          calories: row.calories,
          pace: row.pace,
          maxPace: row.maxPace,
          cadence: row.cadence,
          maxCadence: row.maxCadence,
          heartRate: row.heartRate,
          maxHeartRate: row.maxHeartRate,
          duration: row.duration,
          geoData: getData ? getData.map((x) => ({
            altitude: x.altitude,
            course: x.course,
            timestamp: x.timestamp,
            distance: x.distance,
            horizontalAccuracy: x.horizontalAccuracy,
            heartRate: x.heartRate,
            verticalAccuracy: x.verticalAccuracy,
            latitude: x.latitude,
            longitude: x.longitude,
            speed: x.speed,
            speedAccuracy: x.speedAccuracy,
          })) : null,
        };
        return run;
      }),
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }

  async upsertOne(userId: number, data: OutdoorRunUpsertDto): Promise<OutdoorRun> {
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

    let insertedGeoData: typeof schema.geoData.$inferSelect[] = [];
    if (data.geoData) {
      await db.delete(schema.geoData).where(eq(schema.geoData.outdoorRunId, insertedRow.id));
      if (data.geoData.length > 0) {
        const geodata: typeof schema.geoData.$inferInsert[] = data.geoData?.map((x) => ({
          outdoorRunId: insertedRow.id,
          latitude: x.latitude,
          longitude: x.longitude,
          altitude: x.altitude,
          timestamp: x.timestamp,
          distance: x.distance,
          heartRate: x.heartRate,
          speed: x.speed,
          speedAccuracy: x.speedAccuracy,
          horizontalAccuracy: x.horizontalAccuracy,
          verticalAccuracy: x.verticalAccuracy,
          course: x.course,
        }));
        insertedGeoData = await db.insert(schema.geoData).values(geodata).returning();
      }
    }
    const result: OutdoorRun = {
      ...insertedRow,
      geoData: insertedGeoData,
    };
    return result;
  }
}
