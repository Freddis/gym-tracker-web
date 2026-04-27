import {DrizzleService} from '../DrizzleService/DrizzleService';
import {ArgusCheckinType} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
import {PaginatedResult} from 'src/backend/services/ApiService/types/PaginatedResult';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {eq, count} from 'drizzle-orm';
import {ArgusCheckIn} from './types/ArgusCheckin';
import {ArgusCheckinSubtype} from '../DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinSubtype';
import {ImageType} from '../../types/ImageType';
import {EntryType} from '../EntryService/types/EntryType';
import {EntryVisibility} from '../EntryService/types/EntryVisibility';
import {ExternalSource} from '../EntryService/types/ExternalSource';
import {ImageUpsertDto, OutdoorRunEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {ImageService} from '../ImageService/ImageService';
import {ArgusPhoto} from '../DrizzleService/types/ArgusCheckinRow/validators/ArgusPhoto';
import {GeoDataPoint} from '../RunService/types/GeoDataPoint';
import {ArgusRunCheckin} from '../DrizzleService/types/ArgusCheckinRow/validators/ArgusRunCheckin';
export class ArgusCheckinService {
  protected db: DrizzleService;
  protected imageService: ImageService;

  constructor(db: DrizzleService, imageService: ImageService) {
    this.db = db;
    this.imageService = imageService;
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


  async convertRunDataToUpsertDto(checkin: ArgusRunCheckin): Promise<OutdoorRunEntryUpsertDto> {
    const data = checkin.data;
    let heartRateCursor = 0;
    const findHeartRate = (time: number) => {
      if (!data.heartrate_profile) {
        return null;
      }
      const heartRate = data.heartrate_profile[heartRateCursor];
      if (!heartRate) {
        return null;
      }
      while (true) {
        const nextHeartRate = data.heartrate_profile[heartRateCursor];
        if (!nextHeartRate || nextHeartRate[0] > time) {
          return heartRate[1];
        }
        heartRateCursor++;
      }
    };
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
    const start = new Date(data.start + data.timezone * 1000 * 60 * 60);
    const end = new Date(data.end + data.timezone * 1000 * 60 * 60);
    // data.averageSpeed = undefined;
    const duration = Math.round((end.getTime() - start.getTime()) / 1000);
    const pace = Math.round(duration / data.distance * 1000);

    let image: ImageUpsertDto | null = null;
    if (data.photos?.[0]) {
      image = await this.convertImageToUpsertDto(data.photos[0]);
    }

    const runEntry: OutdoorRunEntryUpsertDto = {
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
        start: new Date(data.start + data.timezone * 1000 * 60 * 60),
        end: new Date(data.end + data.timezone * 1000 * 60 * 60),
        geoData: data.path ? data.path.map((x) => {
          const [time, lat, lon, horizontalAccuracy, elevation, verticalAccuracy] = x;
          const speed = findSpeed(time);
          const distance = findDistance(time);
          const heartRate = findHeartRate(time);
          const geodata: GeoDataPoint = {
            altitude: elevation,
            course: null,
            timestamp: new Date(data.start + time + data.timezone * 1000 * 60 * 60),
            distance: distance,
            horizontalAccuracy: horizontalAccuracy,
            heartRate: heartRate,
            latitude: lat,
            longitude: lon,
            speed: speed,
            speedAccuracy: 0,
            verticalAccuracy: verticalAccuracy,
          };
          return geodata;
        }) : null,
      },
      visibility: EntryVisibility.Public,
      time: new Date(data.start + data.timezone * 1000 * 60 * 60),
      createdAt: new Date(data.created + data.timezone * 1000 * 60 * 60),
      deletedAt: null,
      updatedAt: new Date(data.modified + data.timezone * 1000 * 60 * 60),
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
      imageType: ImageType.Entry,
    };
  }
}
