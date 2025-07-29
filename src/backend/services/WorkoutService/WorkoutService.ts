import {eq, and, desc, gte, isNull, inArray} from 'drizzle-orm';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Workout} from 'src/backend/model/Workout/Workout';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {WorkoutExerciseRow} from 'src/backend/model/WorkoutExercise/WorkoutExerciseRow';
import {WorkoutExerciseSet} from 'src/backend/model/WorkoutExerciseSet/WorkoutExerciseSet';
import {Exercise} from 'src/backend/model/Exercise/Exercise';
import {NewModel} from 'src/common/types/NewModel';
import {WorkoutUpdateDto} from 'src/backend/model/Workout/WorkoutUpdateDto';
import {WorkoutUpsertDto} from 'src/backend/model/Workout/WorkoutUpsertDto';
import {SemiPartial} from 'src/common/types/SemiPartial';
import {WorkoutRow} from 'src/backend/model/Workout/WorkoutRow';

export class WorkoutService {
  protected db: DrizzleService;
  protected table = dbSchema.workouts;
  constructor(db: DrizzleService) {
    this.db = db;
  }

  async create(userId: number): Promise<{id: number}> {
    const db = await this.db.getDb();
    const entity: typeof this.table.$inferInsert = {
      createdAt: new Date(),
      userId: userId,
      start: new Date(),
      calories: 0,
    };
    const result = await db.insert(this.table).values(entity).returning({id: this.table.id});
    if (!result[0]) {
      throw new Error('Unable to get inserted workout ');
    }
    const firstRow = result[0];
    return firstRow;
  }

  async update(id: number, data: WorkoutUpdateDto): Promise<void> {
    const db = await this.db.getDb();
    const workout = await this.get(id);
    if (!workout) {
      throw new Error('Workout not found');
    }
    await db.transaction(async (db) => {
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
        const existing: Partial<WorkoutExerciseRow> = workout.exercises.find((x) => x.id === exercise.id) ?? {};
        const newExercise: NewModel<WorkoutExerciseRow> = {
          ...exercise,
          id: undefined,
          userId: workout.userId,
          workoutId: workout.id,
          exerciseId: exercise.exerciseId,
          createdAt: existing.createdAt ?? new Date(),
          updatedAt: existing.createdAt ? new Date() : null,
        };
        const inserted = await db.insert(dbSchema.workoutExercises)
        .values(newExercise)
        .returning({id: dbSchema.workoutExercises.id});
        if (!inserted[0]) {
          throw new Error('Unable to get inserted workout exercise');
        }
        const workoutExerciseid = inserted[0].id;
        for (const set of exercise.sets) {
          const existing: Partial<WorkoutExerciseSet> = workout.exercises
          .find(
            (x) => x.id === exercise.id
          )?.sets.find(
            (x) => x.id === set.id
        ) ?? {};
          const newSet: NewModel<WorkoutExerciseSet> = {
            ...set,
            id: undefined,
            userId: workout.userId,
            workoutId: workout.id,
            exerciseId: exercise.exerciseId,
            workoutExerciseId: workoutExerciseid,
            createdAt: existing.createdAt ?? new Date(),
            updatedAt: existing.createdAt ? new Date() : null,
          };
          await db.insert(dbSchema.workoutExerciseSets).values(newSet);
        }
      }
    });
  }
  async upsert(userId: number, data: WorkoutUpsertDto[]): Promise<WorkoutRow[]> {
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
          const row: SemiPartial<WorkoutExerciseRow, 'id'> = {
            id: exercise.id ?? undefined,
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

          const sets: SemiPartial<WorkoutExerciseSet, 'id'>[] = exercise.sets.map((y) => ({
            id: y.id ?? undefined,
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
    return result;
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
    const result = await db.query.workouts.findFirst({
      where: (table, {eq, and, isNull}) =>
        and(
          eq(table.id, id),
          isNull(table.deletedAt),
          userId ? eq(table.userId, userId ?? 0) : undefined,
        ),
      with: {
        exercises: {
          with: {
            exercise: true,
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
    return result ?? null;
  }

  async getAll(userId: number, params?: {
    page: number,
    perPage: number,
    updatedAfter?: Date
  }) {
    const db = await this.db.getDb();
    const omitDrizzleFields = <T>(
      table: T
    ): Omit<T, '_'| 'getSQL' | 'shouldOmitSQLParens' | '$inferInsert' | '$inferSelect' | 'enableRLS'> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const copy: any = {...table};
      const keys = ['_', 'getSQL', 'shouldOmitSQLParens', '$inferInsert', '$inferSelect', 'enableRLS'];
      for (const key of keys) {
        delete copy[key];
      }
      return copy;
    };
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 10;
    const offset = (page - 1) * limit;
    const where = and(
        eq(dbSchema.workouts.userId, userId),
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
    const query2 = db.select({
      workout: {
        ...omitDrizzleFields(dbSchema.workouts),
      },
      exercise: {
        ...omitDrizzleFields(dbSchema.exercises),
      },
      workoutExercise: {
        ...omitDrizzleFields(dbSchema.workoutExercises),
      },
      set: {
        ...omitDrizzleFields(dbSchema.workoutExerciseSets),
      },
    }).from(
      dbSchema.workouts
    ).where(
      inArray(dbSchema.workouts.id, workoutIds)
    ).leftJoin(
      dbSchema.workoutExercises,
      eq(dbSchema.workoutExercises.workoutId, dbSchema.workouts.id)
    ).leftJoin(
      dbSchema.exercises,
      eq(dbSchema.workoutExercises.exerciseId, dbSchema.exercises.id)
    ).leftJoin(
      dbSchema.workoutExerciseSets,
      eq(dbSchema.workoutExerciseSets.workoutExerciseId, dbSchema.workoutExercises.id)
    )
    .orderBy(
      desc(dbSchema.workouts.createdAt)
    );
    const queryResult = await query2;
    const workouts = new Map<number, Workout & {exercises: WorkoutExerciseRow[]}>();
    const exercises = new Map<number, WorkoutExerciseRow & {exercise: Exercise, sets: WorkoutExerciseSet[]}>();
    for (const row of queryResult) {
      const workout = workouts.get(row.workout.id) ?? {...row.workout, exercises: []};
      workouts.set(workout.id, workout);
      if (!row.workoutExercise || !row.exercise) {
        continue;
      }
      const exercise = exercises.get(row.workoutExercise.id) ?? {...row.workoutExercise, sets: [], exercise: row.exercise};
      if (!workout.exercises.find((x) => x.id === exercise.id)) {
        workout.exercises.push(exercise);
      }
      if (!row.set) {
        continue;
      }
      exercises.set(exercise.id, exercise);
      exercise.sets.push(row.set);
    }
    const result = Array.from(workouts.values());
    for (const row of result) {
      row.exercises.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
      for (const exercise of row.exercises) {
        exercise.sets.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
      }
    }
    return {
      items: result,
      info: {
        page: page,
        pageSize: limit,
        count: count,
      },
    };
    // return result;
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
