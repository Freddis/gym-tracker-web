import {eq} from 'drizzle-orm';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Exercise} from 'src/backend/model/Exercise/Exercise';
import {ExerciseUpsertDto} from 'src/backend/model/Exercise/ExerciseUpsertDto';
import {SemiPartial} from 'src/common/types/SemiPartial';

export class ExerciseService {
  protected db: DrizzleService;
  constructor(db: DrizzleService) {
    this.db = db;
  }

  async create(userId: number, data: {name: string;}): Promise<{id: number}> {
    const db = await this.db.getDb();
    const dbSchema = this.db.getSchema();
    const entity: typeof dbSchema.exercises.$inferInsert = {
      params: [],
      name: data.name,
      createdAt: new Date(),
      userId: userId,
      equipmentId: 0,
      images: [],
    };
    const result = await db.insert(dbSchema.exercises).values(entity).returning({id: dbSchema.exercises.id});
    const firstRow = result[0];
    return firstRow;
  }

  async update(id: number, data: {name: string; description: string;}): Promise<void> {
    const db = await this.db.getDb();
    const dbSchema = this.db.getSchema();
    await db.update(dbSchema.exercises)
      .set({
        ...data,
        updatedAt: new Date(),
      }).where(
        eq(dbSchema.exercises.id, id)
      );
  }

  async delete(exerciseId: number): Promise<void> {
    const db = await this.db.getDb();
    const dbSchema = this.db.getSchema();
    await db.delete(dbSchema.exercises)
      .where(
        eq(dbSchema.exercises.id, exerciseId),
      );
  }

  async upsert(userId: number, data: ExerciseUpsertDto[]): Promise<Exercise[]> {
    const db = await this.db.getDb();
    const schema = this.db.getSchema();
    if (data.length === 0) {
      return [];
    }
    const attachedToUser: SemiPartial<Exercise, 'id'>[] = data.map((x) => ({
      ...x,
      id: x.id ?? undefined,
      userId: userId,
      parentExerciseId: null,
    }));
    const result = await db.insert(schema.exercises).values(attachedToUser).onConflictDoUpdate({
      target: schema.exercises.id,
      set: this.db.generateConflictUpdateSetAllColumns(schema.exercises),
    }).returning();
    return result;
  }

  async get(exerciseId: number, userId?: number): Promise<Exercise | null> {
    const db = await this.db.getDb();
    const result = await db.query.exercises.findFirst({
      where: (table, {eq, not, and, or, isNull}) =>
        and(
          eq(table.id, exerciseId),
          not(
            eq(table.equipmentId, 13)
          ),
          or(
            isNull(table.userId),
            eq(table.userId, userId ?? 0)
          )
        ),
    });
    return result ?? null;
  }

  async getAll(userId: number, params?: {
    updatedAfter?: Date
  }): Promise<Exercise[]> {
    const db = await this.db.getDb();
    const result = await db.query.exercises.findMany({
      where: (table, op) => op.and(
                              op.not(op.eq(table.equipmentId, 13)),
                              op.or(
                                op.isNull(table.userId),
                                op.eq(table.userId, userId)
                              ),
                              params?.updatedAfter ? op.gte(table.updatedAt, params.updatedAfter) : undefined
                            ),
      orderBy: (table, {asc}) => asc(table.name),
    });
    return result;
  }

  async hasWriteAccess(exerciseId: number, userId: number): Promise<boolean> {
    const db = await this.db.getDb();
    const item = await db.query.exercises.findFirst({
      where: (t, op) =>
        op.and(
          op.eq(t.id, exerciseId),
          op.eq(t.userId, userId)
        ),
    });
    return !!item;
  }

}
