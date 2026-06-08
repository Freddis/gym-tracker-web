import {DrizzleService} from '../DrizzleService/DrizzleService';
import {ArgusCheckinType} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
import {PaginatedResult} from 'src/backend/services/ApiService/types/PaginatedResult';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {eq, count} from 'drizzle-orm';
import {ArgusCheckIn} from './types/ArgusCheckin';
import {ArgusCheckinSubtype} from '../DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinSubtype';
import {EntryType} from '../EntryService/types/EntryType';
import {EntryVisibility} from '../EntryService/types/EntryVisibility';
import {ExternalSource} from '../EntryService/types/ExternalSource';
import {ImageUpsertDto, OutdoorRunEntryUpsertDto, OutdoorWalkEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {ImageService} from '../ImageService/ImageService';
import {ArgusPhoto} from '../DrizzleService/types/ArgusCheckinRow/validators/ArgusPhoto';
import {ArgusRunCheckin} from '../DrizzleService/types/ArgusCheckinRow/validators/ArgusRunCheckin';
import {ArgusWalkingCheckin} from '../DrizzleService/types/ArgusCheckinRow/validators/ArgusWalkingCheckin';
import {PathPoint} from '../OutdoorWalkService/types/PathPoint';
import {EntryService} from '../EntryService/EntryService';
import {randomUUID} from 'crypto';
export class ArgusCheckinService {
  protected db: DrizzleService;
  protected imageService: ImageService;
  protected entryService: EntryService;

  constructor(db: DrizzleService, imageService: ImageService, entryService: EntryService) {
    this.db = db;
    this.imageService = imageService;
    this.entryService = entryService;
  }

  async getLatest(
    params: {
      type?: ArgusCheckinType,
      subtype?: ArgusCheckinSubtype,
      page?: number; perPage?: number
    }
  ): Promise<PaginatedResult<ArgusCheckIn>> {
    const db = await this.db.getDb();
    const page = params.page ?? 1;
    const limit = params.perPage ?? 10;
    const offset = limit * (page - 1);
    const result = await db.query.argusCheckins.findMany({
      limit: limit,
      offset: offset,
      where: (entries, {eq, and}) =>
        and(
          params.type ? eq(entries.type, params.type.toString()) : undefined,
          params.subtype ? eq(entries.subtype, params.subtype.toString()) : undefined,
        ),
      orderBy: (table, {desc}) => desc(table.createdAt),
    });
    const countResp = await db.select({count: count()})
      .from(dbSchema.argusCheckins)
      .where(params.type ? eq(dbSchema.argusCheckins.type, params.type) : undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {items: result as any, info: {page: page, pageSize: limit, count: countResp[0] ? countResp[0].count : 0}};
  }

  getCategories(): ArgusCheckinType[] {
    return Object.values(ArgusCheckinType);
  }

  async convertWalkingDataToUpsertDto(checkin: ArgusWalkingCheckin): Promise<OutdoorWalkEntryUpsertDto> {
    const data = checkin.data;
    let speedCursor = 0;
    const findSpeed = (time: number) => {
      if (!data.speed_profile) {
        return null;
      }
      const speed = data.speed_profile[speedCursor];
      if (!speed) {
        return null;
      }
      while (true) {
        const nextSpeed = data.speed_profile[speedCursor];
        if (!nextSpeed || nextSpeed[0] > time) {
          return speed[1];
        }
        speedCursor++;
      }
    };
    let distanceCursor = 0;
    const findDistance = (time: number) => {
      if (!data.distance_profile) {
        return null;
      }
      const distance = data.distance_profile[distanceCursor];
      if (!distance) {
        return null;
      }
      while (true) {
        const nextDistance = data.distance_profile[distanceCursor];
        if (!nextDistance || nextDistance[0] > time) {
          return distance[1];
        }
        distanceCursor++;
      }
    };
    const start = new Date(data.start);
    const end = new Date(data.end);
    // data.averageSpeed = undefined;
    const duration = Math.round((end.getTime() - start.getTime()) / 1000);
    const pace = Math.round(duration / data.distance * 1000);

    let image: ImageUpsertDto | null = null;
    if (data.photos?.[0]) {
      image = await this.convertImageToUpsertDto(data.photos[0]);
    }

    const walkEntry: OutdoorWalkEntryUpsertDto = {
      id: randomUUID(),
      type: EntryType.OutdoorWalk,
      outdoorWalk: {
        heartRate: data.averageHeartRate ?? null,
        maxHeartRate: data.maxHeartRate ?? null,
        distance: data.distance,
        elevationGain: data.elevationGain ?? null,
        duration: data.duration,
        calories: data.calories,
        pace: data.averageSpeed ? Math.round(1000 / data.averageSpeed) : pace,
        maxPace: data.maxSpeed ? Math.round(1000 / data.maxSpeed) : pace,
        cadence: data.averageCadence ?? null,
        maxCadence: data.maxCadence ?? null,
        start: new Date(data.start),
        end: new Date(data.end),
        heartRateData: data.heartrate_profile?.map((x) => ({timestamp: x[0], heartRate: x[1]})) ?? null,
        geoData: data.path ? data.path.map((x) => {
          const [time, lat, lon, horizontalAccuracy, elevation, verticalAccuracy] = x;
          const speed = findSpeed(time);
          const distance = findDistance(time);
          console.log(distance, horizontalAccuracy, verticalAccuracy); //todo: remove it
          const geodata: PathPoint = [lat, lon, elevation, speed ?? 0, time];
            // altitude: elevation,
            // course: null,
            // timestamp: time,
            // distance: distance,
            // horizontalAccuracy: horizontalAccuracy,
            // latitude: lat,
            // longitude: lon,
            // speed: speed,
            // speedAccuracy: 0,
            // verticalAccuracy: verticalAccuracy,
          // };
          return geodata;
        }) : null,
      },
      visibility: EntryVisibility.Public,
      time: new Date(data.start),
      createdAt: new Date(data.created),
      deletedAt: null,
      updatedAt: new Date(data.modified),
      image: image,
      title: null,
      note: (data.note && data.note.trim() !== '') ? data.note.trim() : null,
      externalId: data.id,
      externalSource: ExternalSource.Argus,
      healthkitId: data.remoteid.toLowerCase().includes('hk-') ? data.remoteid : null,
      healthkitAnchors_3_0: data.healthKitAnchors_3_0 ?? null,
      healthkitSource: data.healthKitSource ?? null,
      healthkitSourceName: data.healthKitSourceName ?? null,
      healthkitDevice: data.healthKitDevice ?? null,
      healthkitDeviceName: data.healthKitDeviceName ?? null,
      healthkitAnchor: data.healthKitAnchor ?? null,
    };
    return walkEntry;
  }


  async convertRunDataToUpsertDto(checkin: ArgusRunCheckin): Promise<OutdoorRunEntryUpsertDto> {
    const data = checkin.data;
    let speedCursor = 0;
    const existing = await this.entryService.getByExternalId(checkin.externalId);

    const findSpeed = (time: number) => {
      if (!data.speed_profile) {
        return null;
      }
      const speed = data.speed_profile[speedCursor];
      if (!speed) {
        return null;
      }
      while (true) {
        const nextSpeed = data.speed_profile[speedCursor];
        if (!nextSpeed || nextSpeed[0] > time) {
          return speed[1];
        }
        speedCursor++;
      }
    };
    let distanceCursor = 0;
    const findDistance = (time: number) => {
      if (!data.distance_profile) {
        return null;
      }
      const distance = data.distance_profile[distanceCursor];
      if (!distance) {
        return null;
      }
      while (true) {
        const nextDistance = data.distance_profile[distanceCursor];
        if (!nextDistance || nextDistance[0] > time) {
          return distance[1];
        }
        distanceCursor++;
      }
    };
    const start = new Date(data.start);
    const end = new Date(data.end);
    // data.averageSpeed = undefined;
    const duration = Math.round((end.getTime() - start.getTime()) / 1000);
    const pace = Math.round(duration / data.distance * 1000);

    let image: ImageUpsertDto | null | undefined;
    if (!existing?.image && data.photos?.[0]) {
      image = await this.convertImageToUpsertDto(data.photos[0]);
    }

    const runEntry: OutdoorRunEntryUpsertDto = {
      id: existing?.id ?? randomUUID(),
      type: EntryType.OutdoorRun,
      outdoorRun: {
        heartRate: data.averageHeartRate ?? null,
        maxHeartRate: data.maxHeartRate ?? null,
        distance: data.distance,
        elevationGain: data.elevationGain ?? null,
        duration: data.duration,
        calories: data.calories,
        pace: data.averageSpeed ? Math.round(1000 / data.averageSpeed) : pace,
        maxPace: data.maxSpeed ? Math.round(1000 / data.maxSpeed) : pace,
        cadence: data.averageCadence ?? null,
        maxCadence: data.maxCadence ?? null,
        start: new Date(data.start),
        end: new Date(data.end),
        heartRateData: data.heartrate_profile?.map((x) => ({timestamp: x[0], heartRate: x[1]})) ?? null,
        geoData: data.path ? data.path.map((x) => {
          const [time, lat, lon, horizontalAccuracy, elevation, verticalAccuracy] = x;
          const speed = findSpeed(time);
          const distance = findDistance(time);
          const geodata: PathPoint = [lat, lon, elevation, speed ?? 0, time];
          console.log(distance, horizontalAccuracy, verticalAccuracy); //todo: remove it
          return geodata;
        }) : null,
      },
      visibility: EntryVisibility.Public,
      time: new Date(data.start),
      createdAt: new Date(data.created),
      deletedAt: null,
      updatedAt: new Date(data.modified),
      image: image,
      title: null,
      note: (data.note && data.note.trim() !== '') ? data.note.trim() : null,
      externalId: data.id,
      externalSource: ExternalSource.Argus,
      healthkitId: data.remoteid.toLowerCase().includes('hk-') ? data.remoteid : null,
      healthkitAnchors_3_0: data.healthKitAnchors_3_0 ?? null,
      healthkitSource: data.healthKitSource ?? null,
      healthkitSourceName: data.healthKitSourceName ?? null,
      healthkitDevice: data.healthKitDevice ?? null,
      healthkitDeviceName: data.healthKitDeviceName ?? null,
      healthkitAnchor: data.healthKitAnchor ?? null,
    };
    return runEntry;
  }

  async convertImageToUpsertDto(data: ArgusPhoto): Promise<ImageUpsertDto> {
    return {
      data: await this.imageService.getImageData(data.href),
    };
  }
}
