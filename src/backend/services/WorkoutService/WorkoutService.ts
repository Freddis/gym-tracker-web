import {eq, and, desc, gte, isNull} from 'drizzle-orm';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Workout} from 'src/backend/services/WorkoutService/types/Workout';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {WorkoutExerciseRow} from 'src/backend/services/DrizzleService/types/WorkoutExerciseRow';
import {WorkoutExerciseSetRow} from 'src/backend/services/DrizzleService/types/WorkoutExerciseSetRow';
import {NewModel} from 'src/common/types/NewModel';
import {SemiPartial} from 'src/common/types/SemiPartial';
import {WorkoutRow} from 'src/backend/services/DrizzleService/types/WorkoutRow';
import {ExerciseService} from '../ExerciseService/ExerciseService';
import {PaginatedResult} from '../ApiService/types/PaginatedResponse';
import {Exercise} from '../ExerciseService/types/Exercise';
import {WorkoutUpdateDto} from './types/WorkoutUpdateDto';
import {WorkoutUpsertDto} from './types/WorkoutUpsertDto';
export class WorkoutService {
  protected db: DrizzleService;
  protected exerciseService: ExerciseService;
  protected table = dbSchema.workouts;
  constructor(db: DrizzleService, exerciseService: ExerciseService) {
    this.db = db;
    this.exerciseService = exerciseService;
  }

  async create(userId: number): Promise<Workout> {
    const db = await this.db.getDb();
    const entity: typeof this.table.$inferInsert = {
      createdAt: new Date(),
      userId: userId,
      start: new Date(),
      calories: 0,
    };
    const result = await db.insert(this.table).values(entity).returning();
    if (!result[0]) {
      throw new Error('Unable to get inserted workout ');
    }
    const firstRow: Workout = {
      ...result[0],
      exercises: [],
    };
    return firstRow;
  }

  async update(id: number, data: WorkoutUpdateDto): Promise<Workout> {
    const db = await this.db.getDb();
    const workout = await this.get(id);
    if (!workout) {
      throw new Error('Workout not found');
    }
    const updatedWorkout = await db.transaction(async (db) => {
      await db.update(this.table)
      .set({
        ...data,
        updatedAt: new Date(),
      }).where(
        eq(this.table.id, id)
      );
      await db.delete(dbSchema.workoutExerciseSets).where(
        eq(dbSchema.workoutExerciseSets.workoutId, id)
      );
      await db.delete(dbSchema.workoutExercises).where(
      eq(dbSchema.workoutExercises.workoutId, id)
    );
      for (const exercise of data.exercises) {
        const newExercise: NewModel<WorkoutExerciseRow> = {
          ...exercise,
          id: undefined,
          userId: workout.userId,
          workoutId: workout.id,
          exerciseId: exercise.exerciseId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const inserted = await db.insert(dbSchema.workoutExercises)
        .values(newExercise)
        .returning({id: dbSchema.workoutExercises.id});
        if (!inserted[0]) {
          throw new Error('Unable to get inserted workout exercise');
        }
        const workoutExerciseid = inserted[0].id;
        for (const set of exercise.sets) {
          const newSet: NewModel<WorkoutExerciseSetRow> = {
            ...set,
            id: undefined,
            userId: workout.userId,
            workoutId: workout.id,
            exerciseId: exercise.exerciseId,
            workoutExerciseId: workoutExerciseid,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          await db.insert(dbSchema.workoutExerciseSets).values(newSet);
        }
      }
      const updatedWorkout = await this.get(id);
      if (!updatedWorkout) {
        throw new Error("Can't fetch updated workout");
      }
      return updatedWorkout;
    });
    return updatedWorkout;
  }

  async upsert(userId: number, data: WorkoutUpsertDto[]): Promise<Workout[]> {
    const db = await this.db.getDb();
    const schema = this.db.getSchema();
    if (data.length === 0) {
      return [];
    }
    const result = await db.transaction(async (db) => {
      const result: WorkoutRow[] = [];
      for (const workout of data) {
        const attachedToUser: SemiPartial<WorkoutRow, 'id'> = {
          ...workout,
          id: workout.id ?? undefined,
          userId: userId,
        };
        const res = await db.insert(schema.workouts).values(attachedToUser).onConflictDoUpdate({
          target: schema.exercises.id,
          set: this.db.generateConflictUpdateSetAllColumns(schema.workouts),
        }).returning();
        result.push(...res);
        if (!result[0]) {
          throw new Error('Unable to get inserted workout');
        }
        const workoutId = result[0].id;
        await db.delete(dbSchema.workoutExerciseSets).where(
          eq(dbSchema.workoutExerciseSets.workoutId, workoutId)
        );
        await db.delete(dbSchema.workoutExercises).where(
        eq(dbSchema.workoutExercises.workoutId, workoutId)
        );
        for (const exercise of workout.exercises) {
          const row: NewModel<WorkoutExerciseRow> = {
            userId,
            workoutId,
            createdAt: exercise.createdAt,
            updatedAt: exercise.updatedAt,
            exerciseId: exercise.exerciseId,
          };
          const res = await db.insert(dbSchema.workoutExercises).values(row).onConflictDoUpdate({
            target: schema.workoutExercises.id,
            set: this.db.generateConflictUpdateSetAllColumns(schema.workoutExercises),
          }).returning();
          if (!res[0]) {
            throw new Error('Unable to get inserted workout exercise');
          }
          const workoutExerciseId = res[0].id;

          const sets: SemiPartial<WorkoutExerciseSetRow, 'id'>[] = exercise.sets.map((y) => ({
            userId,
            workoutId,
            exerciseId: exercise.exerciseId,
            workoutExerciseId,
            createdAt: y.createdAt,
            updatedAt: y.updatedAt,
            reps: y.reps,
            weight: y.weight,
            start: y.start,
            end: y.end,
          }));
          if (sets.length === 0) {
            continue;
          }
          await db.insert(dbSchema.workoutExerciseSets).values(sets);
        }
      }
      return result;
    });
    // todo: should I go out of my way to insure ordering of result rows in returning()?
    // going with the flow for now and relying on posgress returning() implementation, which for now preserves the order
    const workouts = this.load(result.map((x) => x.id));
    return workouts;
  }


  async delete(id: number): Promise<void> {
    const db = await this.db.getDb();
    const now = new Date();
    await db.update(this.table)
      .set({
        deletedAt: now,
        updatedAt: now,
      })
      .where(
        eq(this.table.id, id),
      );
  }

  async get(id: number, userId?: number): Promise<Workout | null> {
    const db = await this.db.getDb();
    const table = db._.fullSchema.workouts;
    const result = await db.select({
      id: table.id,
    }).from(table).where(
        and(
          eq(table.id, id),
          isNull(table.deletedAt),
          userId ? eq(table.userId, userId ?? 0) : undefined,
        ),
    );
    const workouts = await this.load(result.map((x) => x.id));
    return workouts[0] ?? null;
  }

  async load(ids: number[]): Promise<Workout[]> {
    const db = await this.db.getDb();
    const rows = await db.query.workouts.findMany({
      where: (t, op) => op.inArray(t.id, ids),
      with: {
        exercises: {
          with: {
            sets: {
              orderBy: (t, op) => [
                op.asc(t.createdAt),
              ],
            },
          },
          orderBy: (t, op) => [
            op.asc(t.createdAt),
          ],
        },
      },
    });
    const exerciseIds = rows.flatMap((r) => r.exercises.map((e) => e.exerciseId));
    const exercises = await this.exerciseService.getPage({ids: exerciseIds, perPage: 1000});
    const eMap = new Map<number, Exercise>();
    for (const exercise of exercises.items) {
      eMap.set(exercise.id, exercise);
      for (const variation of exercise.variations) {
        eMap.set(variation.id, {...variation, variations: []});
      }
    }
    const getOrThrow = <T>(map: Map<number, T>, key: number): T => {
      const x = map.get(key);
      if (!x) {
        throw new Error(`Exercise '${key}' not found`);
      }
      return x;
    };
    const workouts: Workout[] = rows.map((row) => ({
      ...row,
      exercises: row.exercises.map((erow) => ({
        ...erow,
        exercise: getOrThrow(eMap, erow.exerciseId),
      })),
    }));

    const map = new Map<number, Workout>();
    for (const workout of workouts) {
      map.set(workout.id, workout);
    }
    const ordered: Workout[] = [];
    for (const id of ids) {
      const w = map.get(id);
      if (!w) {
        throw new Error('Error while ordering workouts');
      }
      ordered.push(w);
    }
    return ordered;
  }

  async getAll(params?: {
    userId?: number,
    page?: number,
    perPage?: number,
    updatedAfter?: Date
  }): Promise<PaginatedResult<Workout>> {
    const db = await this.db.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 10;
    const offset = (page - 1) * limit;
    const where = and(
        params?.userId ? eq(dbSchema.workouts.userId, params.userId) : undefined,
        isNull(dbSchema.workouts.deletedAt),
        params?.updatedAfter ? gte(dbSchema.workouts.updatedAt, params.updatedAfter) : undefined
      );
    const query = db.select({
      id: dbSchema.workouts.id,
    }).from(
      dbSchema.workouts
    ).where(where
    )
    .orderBy(
      desc(dbSchema.workouts.createdAt)
    ).limit(params?.perPage ?? 10,).offset(offset);

    const count = await db.$count(dbSchema.workouts, where);
    const workoutQueryResult = await query;
    const workoutIds = workoutQueryResult.map((x) => x.id);
    const items = await this.load(workoutIds);
    const result: PaginatedResult<Workout> = {
      items,
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }

  async hasWriteAccess(id: number, userId: number): Promise<boolean> {
    const db = await this.db.getDb();
    const item = await db.query.workouts.findFirst({
      where: (t, op) =>
        op.and(
          op.eq(t.id, id),
          op.eq(t.userId, userId)
        ),
    });
    return !!item;
  }

}
