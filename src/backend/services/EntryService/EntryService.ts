import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {User} from '../UserService/types/User';
import {UserService} from '../UserService/UserService';
import {WorkoutService} from '../WorkoutService/WorkoutService';
import {Entry, WeightEntry, WorkoutEntry} from './types/Entry';
import {EntryType} from './types/EntryType';
import {WeightEntryCreateDto, WorkoutEntryCreateDto} from './types/EntryCreateDto';
import {and, inArray, isNull, desc, gte, or, eq} from 'drizzle-orm';
import {Weight} from '../WeightService/types/Weight';
import {WeightService} from '../WeightService/WeightService';
import {Workout} from '../WorkoutService/types/Workout';
import {Language} from '../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {EntryVisibility} from './types/EntryVisibility';
import {EntryUpsertDto} from './types/EntryUpsertDto';


export class EntryService {
  protected workoutService: WorkoutService;
  protected userService: UserService;
  protected drizzle: DrizzleService;
  protected weightService: WeightService;

  constructor(
    drizzle: DrizzleService,
    userService: UserService,
    workoutService: WorkoutService,
    weightService: WeightService
  ) {
    this.workoutService = workoutService;
    this.userService = userService;
    this.drizzle = drizzle;
    this.weightService = weightService;
  }

  async createWeightEntry(userId: number, entry: WeightEntryCreateDto): Promise<WeightEntry> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const db = await this.drizzle.getDb();
    const newRow: typeof db._.fullSchema.entries.$inferInsert = {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      visibility: entry.visibility,
      type: entry.type,
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
      updatedAt: null,
      deletedAt: null,
      visibility: entry.visibility,
      type: entry.type,
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
    );

    const count = await db.$count(db._.fullSchema.entries, where);
    const rows = await db
      .select()
      .from(db._.fullSchema.entries)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(
        db._.fullSchema.entries.createdAt
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

      if (row.type === EntryType.Workout) {
        const entry: Entry = {
          id: row.id,
          user: user,
          visibility: row.visibility,
          type: row.type,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          deletedAt: row.deletedAt,
          workout: getOrThrow(workoutMap, row.workoutId),
        };
        return entry;
      } else {
        const entry: Entry = {
          id: row.id,
          user: user,
          visibility: row.visibility,
          type: row.type,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          deletedAt: row.deletedAt,
          weight: getOrThrow(weightMap, row.weightId),
        };
        return entry;
      }
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
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deletedAt: item.deletedAt,
      };
      let workout: Workout | undefined;
      let weight: Weight | undefined;
      if (item.type === EntryType.Workout) {
        const workouts = await this.workoutService.upsert(userId, [item.workout]);
        const workoutId = workouts[0]?.id;
        if (!workoutId) {
          throw new Error('Workout not found');
        }
        data.workoutId = workoutId;
        workout = workouts[0];
      } else {
        const weights = await this.weightService.upsert(userId, [item.weight]);
        const weightId = weights[0]?.id;
        if (!weightId) {
          throw new Error('Weight not found');
        }
        data.weightId = weightId;
        weight = weights[0];
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
      const created: Omit<Entry, 'workout' | 'weight'> = {
        ...row,
        user: user,
        type: row.type,
        visibility: row.visibility,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
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

}
