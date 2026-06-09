import {UserEntityService} from '../../types/ModelService/types/EntityService';
import {EntryRepositoryService} from '../EntryRepositoryService/EntryRepositoryService';
import {
  BaseEntry,
  Entry,
} from '../EntryService/types/Entry';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {StrictPick} from '../../types/StrictPick';
import {EntryType} from '../EntryService/types/EntryType';
import {EntryFilter} from '../EntryService/types/EntryFilter';
import {CalorieGoalService} from '../CalorieGoalService/CalorieGoalService';
import {WeightService} from '../WeightService/WeightService';
import {PostService} from '../PostService/PostService';
import {WorkoutService} from '../WorkoutService/WorkoutService';
import {MealService} from '../MealService/MealService';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {EntryRow} from '../DrizzleService/types/EntryRow';
import {ImageService} from '../ImageService/ImageService';
import {User} from '../UserService/types/User';
import {UserService} from '../UserService/UserService';
import {Image} from '../ImageService/types/Image';
import {FeedEntry} from './types/FeedEntry';
import {FeedEntryObjectMap} from './types/FeedEntryObjectMap';
import {FeedEntryObjectMapMap} from './types/FeedEntryObjectMapMap';
import {FeedEntryServiceMap} from './types/FeedEntryServiceMap';
import {IFeedEntryService} from './types/IFeedEntryService';
import {ReducedOutdoorRunService} from './services/ReducedOutdoorRunService/ReducedOutdoorRunService';
import {ReducedOutdoorWalkService} from './services/ReducedOutdoorWalkService/ReducedOutdoorWalkService';

export class FeedEntryService implements StrictPick<UserEntityService<FeedEntry, string, EntryFilter<EntryType>>, 'paginateForUser'> {
  protected entryRepositoryService: EntryRepositoryService;
  protected entryServiceMap: FeedEntryServiceMap;
  protected userService: UserService;
  protected imageService: ImageService;
  constructor(
    drizzle: DrizzleService,
    userService: UserService,
    imageService: ImageService,
    entryRepositoryService: EntryRepositoryService,
    workoutService: WorkoutService,
    weightService: WeightService,
    postService: PostService,
    mealService: MealService,
    calorieGoalService: CalorieGoalService,
  ) {
    this.entryRepositoryService = entryRepositoryService;
    this.userService = userService;
    this.imageService = imageService;
    const outdoorRunService = new ReducedOutdoorRunService(drizzle);
    const outdoorWalkService = new ReducedOutdoorWalkService(drizzle);
    this.entryServiceMap = {
      [EntryType.Workout]: workoutService,
      [EntryType.Weight]: weightService,
      [EntryType.Post]: postService,
      [EntryType.OutdoorRun]: outdoorRunService,
      [EntryType.OutdoorWalk]: outdoorWalkService,
      [EntryType.Meal]: mealService,
      [EntryType.CalorieGoal]: calorieGoalService,
    };
  }

  async paginateForUser<T extends EntryType>(params: Partial<EntryFilter<T>>): Promise<PaginatedResult<FeedEntry>> {
    const rowsResult = await this.entryRepositoryService.paginate(params ?? {});
    const limit = rowsResult.info.pageSize;
    const rows = rowsResult.items;
    const createMap = async <T extends EntryType>(type: T, rows: EntryRow[]): Promise<Map<number, FeedEntryObjectMap[T]>> => {
      if (rows.length === 0) {
        return new Map();
      }
      const entryService = this.entryServiceMap[type];
      const key = entryService.getRelationKey();
      if (!key) {
        return new Map();
      }
      const ids = rows.map((x) => x[key]).filter((x) => x !== null);
      if (ids.length === 0) {
        return new Map();
      }
      const uniqueIds = [...new Set(ids)];
      return await entryService.loadMap(uniqueIds);
    };

    const mapMap: FeedEntryObjectMapMap = {
      [EntryType.Workout]: await createMap(EntryType.Workout, rows),
      [EntryType.Weight]: await createMap(EntryType.Weight, rows),
      [EntryType.Post]: await createMap(EntryType.Post, rows),
      [EntryType.OutdoorRun]: await createMap(EntryType.OutdoorRun, rows),
      [EntryType.OutdoorWalk]: await createMap(EntryType.OutdoorWalk, rows),
      [EntryType.Meal]: await createMap(EntryType.Meal, rows),
      [EntryType.CalorieGoal]: await createMap(EntryType.CalorieGoal, rows),
    };

    const userIds = [...new Set(rows.map((x) => x.userId))];
    const users = await this.userService.getMany({ids: userIds, perPage: limit});
    const userMap = users.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, User>());
    const imageIds = [...new Set(rows.map((x) => x.imageId).filter((x) => x !== null))];
    const images = await this.imageService.getMany({ids: imageIds, perPage: limit});
    const imageMap = images.reduce((acc, cur) => acc.set(cur.id, cur), new Map<string, Image>());

    const getOrThrow = <T>(map: Map<number, T>, key: number | null): T => {
      if (!key) {
        throw new Error(`'${key}' not found`);
      }
      const x = map.get(key);
      if (!x) {
        throw new Error(`'${key}' not found`);
      }
      return x;
    };

    const items: FeedEntry[] = rows.map((row) => {
      const user = getOrThrow(userMap, row.userId);
      const base: BaseEntry = {
        id: row.id,
        user: user,
        visibility: row.visibility,
        type: row.type,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
        time: row.time,
        title: row.title,
        note: row.note,
        externalId: row.externalId,
        externalSource: row.externalSource,
        image: row.imageId ? imageMap.get(row.imageId) ?? null : null,
        healthkitId: row.healthkitId,
        healthkitAnchor: row.healthkitAnchor,
        healthkitAnchors_3_0: row.healthkitAnchors_3_0,
        healthkitSource: row.healthkitSource,
        healthkitSourceName: row.healthkitSourceName,
        healthkitDevice: row.healthkitDevice,
        healthkitDeviceName: row.healthkitDeviceName,
      };

      const entryService = this.getService(row.type);
      //todo: get rid of this post discrepancy
      if (row.type === EntryType.Post) {
        return entryService.construct(base, null);
      }

      const key = entryService.getRelationKey();
      const id = row[key];
      if (id === null) {
        throw new Error(`'${entryService.getRelationKey()}' not found`);
      }
      const data = mapMap[row.type].get(id);
      if (!data) {
        throw new Error(`'${id}' not found`);
      }
      return entryService.construct(base, data);
    });

    const result: PaginatedResult<Entry & {type: T}> = {
      items: items as (Entry & {type: T})[],
      info: rowsResult.info,
    };
    return result;
  }
  protected getService<T extends EntryType>(type: T): IFeedEntryService<T> {
    return this.entryServiceMap[type];
  }

}
