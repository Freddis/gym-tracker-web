import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {User} from '../UserService/types/User';
import {UserService} from '../UserService/UserService';
import {WorkoutService} from '../WorkoutService/WorkoutService';
import {BaseEntry, Entry, PostEntry, WeightEntry, WorkoutEntry} from './types/Entry';
import {EntryType} from './types/EntryType';
import {PostEntryCreateDto, WeightEntryCreateDto, WorkoutEntryCreateDto} from './types/EntryCreateDto';
import {and, inArray, isNull, desc, gte, or, eq, sql, between, lte, gt} from 'drizzle-orm';
import {WeightService} from '../WeightService/WeightService';
import {EntryVisibility} from './types/EntryVisibility';
import {EntryUpsertDto} from './types/EntryUpsertDto';
import {ImageService} from '../ImageService/ImageService';
import {randomUUID} from 'crypto';
import {ImageType} from '../../types/ImageType';
import {SemiPartial} from '../../types/SemiPartial';
import {OutdoorRunService} from '../OutdoorRunService/OutdoorRunService';
import {OutdoorWalkService} from '../OutdoorWalkService/OutdoorWalkService';
import {Image} from '../ImageService/types/Image';
import {EntryRow} from '../DrizzleService/types/EntryRow';
import {EntryServiceMap} from './types/EntryServiceMap';
import {EntryObjectMapMap} from './types/EntryObjectMapMap';
import {EntryObjectMap} from './types/EntryObjectMap';
import {IEntryService} from './types/IEntryService';
import {PostService} from '../PostService/PostService';
import {MealService} from '../MealService/MealService';
import {CalorieGoalService} from '../CalorieGoalService/CalorieGoalService';
import {EntryFilter} from './types/EntryFilter';
export class EntryService {
  protected workoutService: WorkoutService;
  protected userService: UserService;
  protected drizzle: DrizzleService;
  protected weightService: WeightService;
  protected imageService: ImageService;
  protected entryServiceMap: EntryServiceMap;
  constructor(
    drizzle: DrizzleService,
    userService: UserService,
    workoutService: WorkoutService,
    weightService: WeightService,
    imageService: ImageService,
    runService: OutdoorRunService,
    walkService: OutdoorWalkService,
    postService: PostService,
    mealService: MealService,
    calorieGoalService: CalorieGoalService,
  ) {
    this.workoutService = workoutService;
    this.userService = userService;
    this.drizzle = drizzle;
    this.weightService = weightService;
    this.imageService = imageService;
    this.entryServiceMap = {
      [EntryType.Weight]: weightService,
      [EntryType.Workout]: workoutService,
      [EntryType.Post]: postService,
      [EntryType.OutdoorRun]: runService,
      [EntryType.OutdoorWalk]: walkService,
      [EntryType.Meal]: mealService,
      [EntryType.CalorieGoal]: calorieGoalService,
    };
  }

  async createPostEntry(userId: number, entry: PostEntryCreateDto): Promise<PostEntry> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const db = await this.drizzle.getDb();
    const image = entry.data ? await this.imageService.createFromBase64(entry.data, randomUUID(), ImageType.Entry) : null;
    const newRow: typeof db._.fullSchema.entries.$inferInsert = {
      id: randomUUID(),
      createdAt: new Date(),
      time: new Date(),
      updatedAt: null,
      deletedAt: null,
      note: entry.note,
      visibility: entry.visibility,
      type: EntryType.Post,
      userId: userId,
      imageId: image?.id,
    };
    const rows = await db.insert(db._.fullSchema.entries).values(newRow).returning();
    const result = rows[0];
    if (!result) {
      throw new Error("Couldn't create entry");
    }
    const created: PostEntry = {
      ...result,
      type: EntryType.Post,
      image,
      user,
    };
    return created;
  }

  async getPostEntry(userId: number, entryId: string): Promise<PostEntry | null> {
    const entry = await this.get({ids: [entryId], userId: [userId], type: [EntryType.Post]});
    if (!entry || entry.type !== EntryType.Post) {
      return null;
    }
    return entry;
  }

  async updatePostEntry(userId: number, entryId: string, dto: SemiPartial<PostEntryCreateDto, 'data'>): Promise<PostEntry> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const entry = await this.getPostEntry(userId, entryId);
    if (!entry) {
      throw new Error('Entry not found');
    }
    const db = await this.drizzle.getDb();
    const image = dto.data ? await this.imageService.createFromBase64(dto.data, randomUUID(), ImageType.Entry) : entry.image;
    const update: Omit<typeof db._.fullSchema.entries.$inferInsert, 'id'> = {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      visibility: entry.visibility,
      type: EntryType.Post,
      userId: userId,
      imageId: image?.id,
      note: dto.note,
      time: dto.time,
    };
    await db.update(db._.fullSchema.entries).set(update).where(
      eq(db._.fullSchema.entries.id, entryId)
    ).returning();

    const updated: PostEntry = {
      ...entry,
      image: image,
      user,
    };
    return updated;
  }

  async createWeightEntry(userId: number, entry: WeightEntryCreateDto): Promise<WeightEntry> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const db = await this.drizzle.getDb();
    const newRow: typeof db._.fullSchema.entries.$inferInsert = {
      id: randomUUID(),
      createdAt: new Date(),
      time: entry.time,
      updatedAt: null,
      deletedAt: null,
      visibility: entry.visibility,
      type: EntryType.Weight,
      userId: userId,
    };

    const weight = await this.weightService.create({
      weight: entry.weight,
      userId: userId,
    });
    newRow.weightId = weight.id;


    const rows = await db.insert(db._.fullSchema.entries).values(newRow).returning();
    const result = rows[0];
    if (!result) {
      throw new Error("Couldn't create entry");
    }

    const created: WeightEntry = {
      ...result,
      type: EntryType.Weight,
      weight,
      user,
      image: null,
    };
    return created;
  }

  async createWorkoutEntry(userId: number, entry: WorkoutEntryCreateDto): Promise<WorkoutEntry> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const db = await this.drizzle.getDb();
    const newRow: typeof db._.fullSchema.entries.$inferInsert = {
      id: randomUUID(),
      createdAt: new Date(),
      time: entry.time,
      updatedAt: null,
      deletedAt: null,
      visibility: entry.visibility,
      type: EntryType.Workout,
      userId: userId,
    };

    const workout = await this.workoutService.create(userId, entry.workout);
    newRow.workoutId = workout.id;

    const rows = await db.insert(db._.fullSchema.entries).values(newRow).returning();
    const result = rows[0];
    if (!result) {
      throw new Error("Couldn't create entry");
    }

    const created: WorkoutEntry = {
      ...result,
      type: EntryType.Workout,
      workout,
      user,
      image: null,
    };
    return created;
  }

  async get<T extends EntryType>(params?: EntryFilter<T>): Promise<(Entry & {type: T}) | null> {
    const res = await this.getAll(params);
    return res.items[0] ?? null;
  }

  async getByExternalId(externalId: string): Promise<Entry | null> {
    const res = await this.getAll({externalId: [externalId], perPage: 1});
    return res.items[0] ?? null;
  }

  async getAll<T extends EntryType>(
      params?: EntryFilter<T>
  ): Promise<PaginatedResult<Entry & {type: T}>> {

    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 10;
    const offset = (page - 1) * limit;
    const where = and(
      params?.ids ? inArray(db._.fullSchema.entries.id, params.ids) : undefined,
      params?.externalId ? inArray(db._.fullSchema.entries.externalId, params.externalId) : undefined,
      params?.weightIds ? inArray(db._.fullSchema.entries.weightId, params.weightIds) : undefined,
      params?.workoutIds ? inArray(db._.fullSchema.entries.workoutId, params.workoutIds) : undefined,
      params?.type ? inArray(db._.fullSchema.entries.type, params.type) : undefined,
      params?.userId ? inArray(db._.fullSchema.entries.userId, params.userId) : undefined,
      params?.includeDeleted ? undefined : isNull(db._.fullSchema.entries.deletedAt),
      params?.after ? gte(db._.fullSchema.entries.time, params.after) : undefined,
      params?.before ? lte(db._.fullSchema.entries.time, params.before) : undefined,
      params?.updatedAfter ? or(
        gt(db._.fullSchema.entries.updatedAt, params.updatedAfter),
        gt(db._.fullSchema.entries.createdAt, params.updatedAfter),
        gt(db._.fullSchema.entries.deletedAt, params.updatedAfter),
      ) : undefined,
      params?.date ? between(
        db._.fullSchema.entries.time,
         new Date(params.date.getFullYear(), params.date.getMonth(), params.date.getDate()),
         new Date(params.date.getFullYear(), params.date.getMonth(), params.date.getDate() + 1)
        ) : undefined,
    );
    const count = await db.$count(db._.fullSchema.entries, where);
    const rows = await db
      .select()
      .from(db._.fullSchema.entries)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(
        db._.fullSchema.entries.time
      ));

    const createMap = async <T extends EntryType>(type: T, rows: EntryRow[]): Promise<Map<number, EntryObjectMap[T]>> => {
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

    const mapMap: EntryObjectMapMap = {
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

    const items: Entry[] = rows.map((row) => {
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
      info: {
        page: page,
        count: count,
        pageSize: limit,
      },
    };
    return result;
  }

  async upsert(userId: number, items: EntryUpsertDto[]): Promise<Entry[]> {
    const db = await this.drizzle.getDb();
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const result: Entry[] = [];
    for (const item of items) {
      const existing = await db.query.entries.findFirst({
        where: (t, op) => op.and(
          op.eq(t.id, item.id),
        ),
      });
      if (existing && existing.userId !== userId) {
        throw new Error('You are not allowed to update this entry');
      }
      const data: typeof db._.fullSchema.entries.$inferInsert = {
        id: item.id,
        userId: userId,
        type: item.type,
        visibility: EntryVisibility.Public,
        time: item.time,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deletedAt: item.deletedAt,
        note: item.note,
        title: item.title,
        imageId: existing?.imageId,
        externalId: item.externalId,
        externalSource: item.externalSource,
        healthkitId: item.healthkitId,
        healthkitAnchor: item.healthkitAnchor,
        healthkitAnchors_3_0: item.healthkitAnchors_3_0,
        healthkitSource: item.healthkitSource,
        healthkitSourceName: item.healthkitSourceName,
        healthkitDevice: item.healthkitDevice,
        healthkitDeviceName: item.healthkitDeviceName,
      };
      let image: Image | undefined;
      const entryService = this.getService(item.type);
      const upsertResult = await entryService.upsertOne(userId, item);
      const key = entryService.getRelationKey();
      if (key) {
        data[key] = upsertResult.id;
      }

      if (item.image) {
        image = await this.imageService.createFromBase64(item.image.data, randomUUID(), ImageType.Entry);
        data.imageId = image.id;
      }
      if (item.image === null) {
        data.imageId = null;
      }

      const rows = await db.insert(db._.fullSchema.entries).values(data).onConflictDoUpdate({
        target: db._.fullSchema.entries.id,
        set: this.drizzle.generateConflictUpdateSetAllColumns(db._.fullSchema.entries),
      }
      ).returning();
      const row = rows[0];
      if (!row) {
        throw new Error('Entry not found');
      }
      const baseEntry: BaseEntry = {
        ...row,
        user: user,
        image: image ?? null,
      };
      const entry = entryService.construct(baseEntry, upsertResult.value);
      result.push(entry);
    }
    return result;
  }

  async delete(userId: number, entryId: string): Promise<void> {
    const db = await this.drizzle.getDb();
    const entry = await this.get({ids: [entryId], userId: [userId], type: [EntryType.Post]});
    if (!entry || entry.user.id !== userId) {
      throw new Error('Entry not found');
    }
    await db.update(db._.fullSchema.entries).set({deletedAt: new Date()}).where(
      and(
        eq(db._.fullSchema.entries.id, entryId),
        eq(db._.fullSchema.entries.userId, userId)
      )
    );
  }

  async getDates(id: number, params: {date: Date, type?: EntryType[]}): Promise<Date[]> {
    const db = await this.drizzle.getDb();
    const year = params.date.getFullYear();
    const surrounded = 10;
    const rows = await db.select({time: db._.fullSchema.entries.time})
      .from(db._.fullSchema.entries)
      .where(
        and(
          between(db._.fullSchema.entries.time, new Date(year - surrounded, 0, 1), new Date(year + surrounded, 0, 1)),
          eq(db._.fullSchema.entries.userId, id),
          params.type ? inArray(db._.fullSchema.entries.type, params.type) : undefined,
          isNull(db._.fullSchema.entries.deletedAt),
        )
      )
      .groupBy(sql`date(time), time`);
    return rows.map((x) => new Date(x.time.getFullYear(), x.time.getMonth(), x.time.getDate()));
  }

  protected getService<T extends EntryType>(type: T): IEntryService<T> {
    return this.entryServiceMap[type];
  }

}
