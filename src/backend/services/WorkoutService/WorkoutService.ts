import {eq} from 'drizzle-orm';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Workout} from 'src/backend/model/Workout/Workout';
import {dbSchema} from 'src/backend/drizzle/db';

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
    end: Date
    sets: {
      exerciseId: number,
      start: Date,
      weight: number | null,
      reps: number | null,
      end: Date,
    }[]
  }): Promise<void> {
    const db = await this.db.getDb();
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
    for (const set of data.sets) {
      await db.insert(dbSchema.workoutExerciseSets).values({
        ...set,
        workoutId: id,
        createdAt: new Date(),
      });
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
        sets: {
          with: {
            exercise: true,
          },
        },
      },
    });
    return result ?? null;
  }

  async getAll(userId: number): Promise<Workout[]> {
    const db = await this.db.getDb();
    const result = await db.query.workouts.findMany({
      where: (table, op) => op.and(
                              op.eq(table.userId, userId)
                            ),
      with: {
        sets: {
          with: {
            exercise: true,
          },
        },
      },
      orderBy: (table, op) => op.desc(table.createdAt),
      limit: 30,
    });
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
