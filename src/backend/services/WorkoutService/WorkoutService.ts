import {eq, and, desc} from 'drizzle-orm';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Workout} from 'src/backend/model/Workout/Workout';
import {dbSchema} from 'src/backend/drizzle/db';
import {WorkoutExercise} from 'src/backend/model/WorkoutExercise/WorkoutExercise';
import {WorkoutExerciseSet} from 'src/backend/model/WorkoutExerciseSet/WorkoutExerciseSet';
import {Exercise} from 'src/backend/model/Exercise/Exercise';
import {NewModel} from 'src/common/types/NewModel';

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
      end: new Date(),
      calories: 0,
    };
    const result = await db.insert(this.table).values(entity).returning({id: this.table.id});
    const firstRow = result[0];
    return firstRow;
  }

  async update(id: number, data: {
    calories: number;
    start: Date;
    end: Date | null,
    exercises: {
      exerciseId: number,
      sets: {
        start: Date | null,
        weight: number | null,
        reps: number | null,
        end: Date | null,
      }[]
    }[]
  }): Promise<void> {
    const db = await this.db.getDb();
    const workout = await db.query.workouts.findFirst({
      where: (t, op) => op.eq(t.id, id),
    });
    if (!workout) {
      throw new Error('Workout not found');
    }
    await db.update(this.table)
      .set({
        ...data,
        end: data.end ?? undefined,
        updatedAt: new Date(),
      }).where(
        eq(this.table.id, id)
      );
    await db.delete(dbSchema.workoutExercises).where(
      eq(dbSchema.workoutExercises.workoutId, id)
    );
    await db.delete(dbSchema.workoutExerciseSets).where(
      eq(dbSchema.workoutExerciseSets.workoutId, id)
    );
    for (const exercise of data.exercises) {
      const newExercise: NewModel<WorkoutExercise> = {
        ...exercise,
        id: undefined,
        userId: workout.userId,
        createdAt: workout.createdAt,
        updatedAt: new Date(),
        workoutId: workout.id,
        exerciseId: exercise.exerciseId,
      };
      const inserted = await db.insert(dbSchema.workoutExercises)
        .values(newExercise)
        .returning({id: dbSchema.workoutExercises.id});
      const workoutExerciseid = inserted[0].id;
      for (const set of exercise.sets) {
        const newSet: NewModel<WorkoutExerciseSet> = {
          userId: workout.userId,
          start: set.start ?? null,
          end: set.end ?? null,
          createdAt: workout.createdAt,
          updatedAt: new Date(),
          workoutId: workout.id,
          exerciseId: exercise.exerciseId,
          workoutExerciseId: workoutExerciseid,
          weight: set.weight,
          reps: set.reps,
        };
        await db.insert(dbSchema.workoutExerciseSets).values(newSet);
      }
    }
  }

  async delete(id: number): Promise<void> {
    const db = await this.db.getDb();
    await db.delete(this.table)
      .where(
        eq(this.table.id, id),
      );
  }

  async get(id: number, userId?: number): Promise<Workout | null> {
    const db = await this.db.getDb();
    const result = await db.query.workouts.findFirst({
      where: (table, {eq, and}) =>
        and(
          eq(table.id, id),
          eq(table.userId, userId ?? 0)
        ),
      with: {
        exercises: {
          with: {
            exercise: true,
            sets: true,
          },
        },
      },
    });
    return result ?? null;
  }

  async getAll(userId: number): Promise<Workout[]> {
    const db = await this.db.getDb();
    // const result = await db.query.workouts.findMany({
    //   where: (table, op) => {
    //     return op.and(
    //       op.eq(table.userId, userId)
    //     );
    //   },
    //   with: {
    //     exercises: {
    //       with: {
    //         exercise: true,
    //         sets: true,
    //       },
    //     },
    //   },
    //   orderBy: (table, op) => op.desc(table.createdAt),
    // });

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
    const result2 = await db.select({
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
      and(
        eq(dbSchema.workouts.userId, userId)
      )
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
    const workouts = new Map<number, Workout & {exercises: WorkoutExercise[]}>();
    const exercises = new Map<number, WorkoutExercise & {exercise: Exercise, sets: WorkoutExerciseSet[]}>();
    for (const row of result2) {
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
