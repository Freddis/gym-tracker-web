import {PaginatedResult} from '../ApiService/types/PaginatedResponse';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {User} from '../UserService/types/User';
import {UserService} from '../UserService/UserService';
import {WorkoutService} from '../WorkoutService/WorkoutService';
import {Entry, WeightEntry, WorkoutEntry} from './types/Entry';
import {EntryType} from './types/EntryType';
import {WeightEntryCreateDto, WorkoutEntryCreateDto} from './types/EntryCreateDto';
import {and, inArray, isNull, desc} from 'drizzle-orm';
import {Weight} from '../WeightService/types/Weight';
import {WeightService} from '../WeightService/WeightService';
import {Workout} from '../WorkoutService/types/Workout';


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
    const user = await this.userService.get(userId);
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
    const user = await this.userService.get(userId);
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

    const workout = await this.workoutService.create({
      ...entry.workout,
      userId: userId,
    });
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

  async get(id: number): Promise<Entry | null> {
    const res = await this.getAll({id: [id], perPage: 1});
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
      type?: T[]
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
      isNull(db._.fullSchema.entries.deletedAt)
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
    const workouts = await this.workoutService.getAll({id: workoutIds, perPage: limit});
    const workoutMap = workouts.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, Workout>());
    const weightIds = rows.map((x) => x.weightId).filter((x) => x !== null);
    const weight = await this.weightService.getAll({id: weightIds, perPage: limit});
    const weightMap = weight.items.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, Weight>());
    const userIds = rows.map((x) => x.userId);
    const users = await this.userService.getAll({ids: userIds, perPage: limit});
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
}
