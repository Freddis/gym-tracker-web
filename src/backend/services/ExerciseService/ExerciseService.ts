import {and, inArray, eq} from 'drizzle-orm';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {ExerciseRow} from 'src/backend/services/DrizzleService/types/ExerciseRow';
import {ExerciseUpsertDto} from 'src/backend/services/ExerciseService/types/ExerciseUpsertDto';
import {SemiPartial} from 'src/common/types/SemiPartial';
import {Exercise} from './types/Exercise';
import {Muscle} from '../../../common/enums/Muscle';

export class ExerciseService {
  protected db: DrizzleService;
  constructor(db: DrizzleService) {
    this.db = db;
  }

  async create(data: {userId?: number, name: string;}): Promise<ExerciseRow> {
    const db = await this.db.getDb();
    const dbSchema = this.db.getSchema();
    const entity: typeof dbSchema.exercises.$inferInsert = {
      params: [],
      name: data.name,
      createdAt: new Date(),
      userId: data.userId,
      images: [],
    };
    const result = await db.insert(dbSchema.exercises).values(entity).returning();
    const firstRow = result[0];
    if (!firstRow) {
      throw new Error('Unable to get inserted user');
    }
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
    const now = new Date();
    await db.update(dbSchema.exercises)
      .set({
        deletedAt: now,
        updatedAt: now,
      })
      .where(
        eq(dbSchema.exercises.id, exerciseId),
      );
  }

  async upsert(userId: number, data: ExerciseUpsertDto[]): Promise<ExerciseRow[]> {
    const db = await this.db.getDb();
    const schema = this.db.getSchema();
    if (data.length === 0) {
      return [];
    }
    const attachedToUser: SemiPartial<ExerciseRow, 'id'>[] = data.map((x) => ({
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
      where: (table, {eq, and, or, isNull}) =>
        and(
          eq(table.id, exerciseId),
          isNull(table.deletedAt),
          or(
            isNull(table.userId),
            eq(table.userId, userId ?? 0)
          )
        ),
    });
    if (!result) {
      return null;
    }
    const nested = await this.nestExercises([result]);
    return nested[0] ?? null;
  }

  async getAll(params?: {
    ids?: number[],
    filter?: string,
    userId?: number | null,
    muscle?: Muscle[],
    updatedAfter?: Date
  }): Promise<Exercise[]> {
    const db = await this.db.getDb();
    const result = await db.query.exercises.findMany({
      where: (t, op) => op.and(
        op.isNull(t.deletedAt),
        op.or(
          params?.userId === null ? op.isNull(t.userId) : undefined,
          params?.userId ? op.eq(t.userId, params.userId) : undefined
        ),
        params?.updatedAfter ? op.gte(t.updatedAt, params.updatedAfter) : undefined,
        !params?.filter ? undefined : op.and(
          ...params.filter.trim().split(' ').map((filter) => op.ilike(t.name, `%${filter}%`))
        ),
        params?.ids ? op.inArray(t.id, params.ids) : undefined,
      ),
      orderBy: (table, {asc}) => asc(table.name),
    });
    const nested = await this.nestExercises(result);
    let filtered = nested;
    if (params?.muscle) {
      filtered = [];
      for (const row of nested) {
        const allMuscles = [...row.muscles.primary, ...row.muscles.secondary];
        let include = true;
        for (const muscle of params.muscle) {
          if (!allMuscles.includes(muscle)) {
            // continue outer;
            include = false;
            break;
          }
        }
        if (!include) {
          continue;
        }
        filtered.push(row);
      }

    }
    return filtered;
  }

  async nestExercises(exercises: ExerciseRow[]): Promise<Exercise[]> {
    const primaryExercises: (ExerciseRow)[] = [];
    const personalExercises: (ExerciseRow)[] = [];
    const map = new Map<number, ExerciseRow[]>();
    const exerciseIds = exercises.map((x) => x.id);
    const db = await this.db.getDb();
    const muscles = await db.select({
      exersizeId: db._.fullSchema.muscles.exerciseId,
      muscle: db._.fullSchema.muscles.muscle,
      isPrimary: db._.fullSchema.muscles.isPrimary,
    }).from(db._.fullSchema.muscles).where(
      and(
        inArray(db._.fullSchema.muscles.exerciseId, exerciseIds),
      )
    );

    const muscleMap = new Map<number, {muscle: Muscle, isPrimary: boolean}[]>();
    for (const muscle of muscles) {
      const arr = muscleMap.get(muscle.exersizeId) ?? [];
      arr.push(muscle);
      muscleMap.set(muscle.exersizeId, arr);
    }
    for (const exercise of exercises) {
      if (exercise.userId !== null) {
        personalExercises.push(exercise);
        continue;
      }

      if (exercise.parentExerciseId == null) {
        primaryExercises.push(exercise);
        continue;
      }

      const existing = map.get(exercise.parentExerciseId) ?? [];
      existing.push(exercise);
      map.set(exercise.parentExerciseId, existing);
    }

    const items: Exercise[] = exercises.map((item) => ({
      ...item,
      variations: map.get(item.id)?.map((variation) => ({
        ...variation,
        muscles: {
          primary: (muscleMap.get(variation.id) ?? []).filter((x) => x.isPrimary).map((x) => x.muscle),
          secondary: (muscleMap.get(variation.id) ?? []).filter((x) => !x.isPrimary).map((x) => x.muscle),
        },
      })) ?? [],
      muscles: {
        primary: (muscleMap.get(item.id) ?? []).filter((x) => x.isPrimary).map((x) => x.muscle),
        secondary: (muscleMap.get(item.id) ?? []).filter((x) => !x.isPrimary).map((x) => x.muscle),
      },
    }));
    return items;
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
