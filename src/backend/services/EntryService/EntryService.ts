import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {User} from '../UserService/types/User';
import {UserService} from '../UserService/UserService';
import {WorkoutService} from '../WorkoutService/WorkoutService';
import {BaseEntry, Entry, PostEntry, OutdoorRunEntry, WeightEntry, WorkoutEntry, OutdoorWalkEntry} from './types/Entry';
import {EntryType} from './types/EntryType';
import {PostEntryCreateDto, WeightEntryCreateDto, WorkoutEntryCreateDto} from './types/EntryCreateDto';
import {and, inArray, isNull, desc, gte, or, eq, sql, between} from 'drizzle-orm';
import {Weight} from '../WeightService/types/Weight';
import {WeightService} from '../WeightService/WeightService';
import {Workout} from '../WorkoutService/types/Workout';
import {Language} from '../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {EntryVisibility} from './types/EntryVisibility';
import {EntryUpsertDto} from './types/EntryUpsertDto';
import {ImageService} from '../ImageService/ImageService';
import {randomUUID} from 'crypto';
import {ImageType} from '../../types/ImageType';
import {ImageRow} from '../DrizzleService/types/ImageRow';
import {SemiPartial} from '../../types/SemiPartial';
import {OutdoorRunService} from '../OutdoorRunService/OutdoorRunService';
import {OutdoorRun} from '../OutdoorRunService/types/OutdoorRun';
import {OutdoorWalkService} from '../OutdoorWalkService/OutdoorWalkService';
import {OutdoorWalk} from '../OutdoorWalkService/types/OutdoorWalk';

export class EntryService {
  protected workoutService: WorkoutService;
  protected userService: UserService;
  protected drizzle: DrizzleService;
  protected weightService: WeightService;
  protected imageService: ImageService;
  protected outdoorRunService: OutdoorRunService;
  protected outdoorWalkService: OutdoorWalkService;

  constructor(
    drizzle: DrizzleService,
    userService: UserService,
    workoutService: WorkoutService,
    weightService: WeightService,
    imageService: ImageService,
    runService: OutdoorRunService,
    walkService: OutdoorWalkService
  ) {
    this.workoutService = workoutService;
    this.userService = userService;
    this.drizzle = drizzle;
    this.weightService = weightService;
    this.imageService = imageService;
    this.outdoorRunService = runService;
    this.outdoorWalkService = walkService;
  }

  async createPostEntry(userId: number, entry: PostEntryCreateDto): Promise<PostEntry> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const db = await this.drizzle.getDb();
    const image = entry.data ? await this.imageService.createFromBase64(entry.data, randomUUID(), ImageType.Entry) : null;
    const newRow: typeof db._.fullSchema.entries.$inferInsert = {
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

  async getPostEntry(userId: number, entryId: number): Promise<PostEntry | null> {
    const entry = await this.get(userId, entryId);
    if (!entry || entry.type !== EntryType.Post) {
      return null;
    }
    return entry;
  }

  async updatePostEntry(userId: number, entryId: number, dto: SemiPartial<PostEntryCreateDto, 'data'>): Promise<PostEntry> {
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
    const update: typeof db._.fullSchema.entries.$inferInsert = {
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

  async get(userId: number, id: number): Promise<Entry | null> {
    const res = await this.getAll({id: [id], perPage: 1, userId: [userId]});
    return res.items[0] ?? null;
  }

  async getAll<T extends EntryType>(
    params?: {
      id?: number[],
      workoutIds?: number[],
      weightIds?: number[]
      page?: number,
      perPage?: number,
      userId?: number[],
      type?: T[],
      includeDeleted?: boolean,
      updatedAfter?: Date,
      language?:Language
      date?: Date,
    }
  ): Promise<PaginatedResult<Entry & {type: T}>> {

    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;
    const where = and(
      params?.id ? inArray(db._.fullSchema.entries.id, params.id) : undefined,
      params?.weightIds ? inArray(db._.fullSchema.entries.weightId, params.weightIds) : undefined,
      params?.workoutIds ? inArray(db._.fullSchema.entries.workoutId, params.workoutIds) : undefined,
      params?.type ? inArray(db._.fullSchema.entries.type, params.type) : undefined,
      params?.userId ? inArray(db._.fullSchema.entries.userId, params.userId) : undefined,
      params?.includeDeleted ? undefined : isNull(db._.fullSchema.entries.deletedAt),
      params?.updatedAfter ? or(
        gte(db._.fullSchema.entries.updatedAt, params.updatedAfter),
        gte(db._.fullSchema.entries.createdAt, params.updatedAfter),
        gte(db._.fullSchema.entries.deletedAt, params.updatedAfter),
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


    const workoutIds = rows.map((x) => x.workoutId).filter((x) => x !== null);
    const workouts = await this.workoutService.getAll({id: workoutIds, perPage: limit, language: params?.language});
    const workoutMap = workouts.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, Workout>());
    const weightIds = rows.map((x) => x.weightId).filter((x) => x !== null);
    const weight = await this.weightService.getAll({id: weightIds, perPage: limit});
    const weightMap = weight.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, Weight>());
    const userIds = rows.map((x) => x.userId);
    const users = await this.userService.paginate({ids: userIds, perPage: limit});
    const userMap = users.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, User>());
    const imageIds = rows.map((x) => x.imageId).filter((x) => x !== null);
    const images = await this.imageService.getAll({id: imageIds, perPage: limit});
    const imageMap = images.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, ImageRow>());
    const runIds = rows.map((x) => x.outdoorRunId).filter((x) => x !== null);
    const outdoorRuns = await this.outdoorRunService.getAll({id: runIds, perPage: limit});
    const outdoorRunsMap = outdoorRuns.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, OutdoorRun>());
    const walkIds = rows.map((x) => x.outdoorWalkId).filter((x) => x !== null);
    const outdoorWalks = await this.outdoorWalkService.getAll({id: walkIds, perPage: limit});
    const outdoorWalksMap = outdoorWalks.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, OutdoorWalk>());
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
        image: row.imageId ? getOrThrow(imageMap, row.imageId) : null,
        healthkitId: row.healthkitId,
        healthkitAnchor: row.healthkitAnchor,
        healthkitAnchors_3_0: row.healthkitAnchors_3_0,
        healthkitSource: row.healthkitSource,
        healthkitSourceName: row.healthkitSourceName,
        healthkitDevice: row.healthkitDevice,
        healthkitDeviceName: row.healthkitDeviceName,
      };
      if (row.type === EntryType.Workout) {
        const entry: WorkoutEntry = {
          ...base,
          type: row.type,
          workout: getOrThrow(workoutMap, row.workoutId),
        };
        return entry;
      } if (row.type === EntryType.Weight) {
        const entry: Entry = {
          ...base,
          type: row.type,
          weight: getOrThrow(weightMap, row.weightId),
        };
        return entry;
      } else if (row.type === EntryType.OutdoorRun) {
        const entry: OutdoorRunEntry = {
          ...base,
          type: row.type,
          outdoorRun: getOrThrow(outdoorRunsMap, row.outdoorRunId),
        };
        return entry;
      } else if (row.type === EntryType.OutdoorWalk) {
        const entry: OutdoorWalkEntry = {
          ...base,
          type: row.type,
          outdoorWalk: getOrThrow(outdoorWalksMap, row.outdoorWalkId),
        };
        return entry;
      }
      const entry: PostEntry = {
        ...base,
        type: row.type,
      };
      return entry;
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
      const data: typeof db._.fullSchema.entries.$inferInsert = {
        id: item.id ?? undefined,
        userId: userId,
        type: item.type,
        visibility: EntryVisibility.Public,
        time: item.time,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deletedAt: item.deletedAt,
        note: item.note,
        title: item.title,
        imageId: item.image?.id,
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
      let workout: Workout | undefined;
      let weight: Weight | undefined;
      let run: OutdoorRun | undefined;
      let image: ImageRow | undefined;
      let walk: OutdoorWalk | undefined;
      if (item.image && item.image.data) {
        image = await this.imageService.createFromBase64(item.image.data, randomUUID(), ImageType.Entry);
        data.imageId = image.id;
      }
      if (item.type === EntryType.Workout) {
        const workouts = await this.workoutService.upsert(userId, [item.workout]);
        const workoutId = workouts[0]?.id;
        if (!workoutId) {
          throw new Error('Workout not found');
        }
        data.workoutId = workoutId;
        workout = workouts[0];
      } else if (item.type === EntryType.Weight) {
        const weights = await this.weightService.upsert(userId, [item.weight]);
        const weightId = weights[0]?.id;
        if (!weightId) {
          throw new Error('Weight not found');
        }
        data.weightId = weightId;
        weight = weights[0];
      } else if (item.type === EntryType.OutdoorRun) {
        run = await this.outdoorRunService.upsertOne(userId, item.outdoorRun);
        data.outdoorRunId = run.id;
      } else if (item.type === EntryType.OutdoorWalk) {
        walk = await this.outdoorWalkService.upsertOne(userId, item.outdoorWalk);
        data.outdoorWalkId = walk.id;
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
      const created: Omit<Entry, 'workout' | 'weight' | 'outdoorRun'> = {
        ...row,
        user: user,
        type: row.type,
        image: image ?? null,
      };
      if (workout) {
        result.push({
          ...created,
          type: EntryType.Workout,
          workout: workout,
        });
      }
      if (weight) {
        result.push({
          ...created,
          type: EntryType.Weight,
          weight: weight,
        });
      }
      if (run) {
        result.push({
          ...created,
          type: EntryType.OutdoorRun,
          outdoorRun: run,
        });
      }
      if (walk) {
        result.push({
          ...created,
          type: EntryType.OutdoorWalk,
          outdoorWalk: walk,
        });
      }
    }
    return result;
  }

  async delete(userId: number, entryId: number): Promise<void> {
    const db = await this.drizzle.getDb();
    const entry = await this.get(userId, entryId);
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

}
