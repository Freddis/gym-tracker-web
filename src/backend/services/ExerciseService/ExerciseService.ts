import {and, inArray, eq} from 'drizzle-orm';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Exercise} from 'src/backend/model/Exercise/Exercise';
import {ExerciseUpsertDto} from 'src/backend/model/Exercise/ExerciseUpsertDto';
import {SemiPartial} from 'src/common/types/SemiPartial';
import {NestedExercise} from '../../model/Exercise/NestedExercise';
import {Muscle} from '../../../common/enums/Muscle';

export class ExerciseService {
  protected db: DrizzleService;
  constructor(db: DrizzleService) {
    this.db = db;
  }

  async create(data: {userId?: number, name: string;}): Promise<Exercise> {
    const db = await this.db.getDb();
    const dbSchema = this.db.getSchema();
    const entity: typeof dbSchema.exercises.$inferInsert = {
      params: [],
      name: data.name,
      createdAt: new Date(),
      userId: data.userId,
      equipmentId: 0,
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
          isNull(table.deletedAt),
          or(
            isNull(table.userId),
            eq(table.userId, userId ?? 0)
          )
        ),
    });
    return result ?? null;
  }

  async getAll(params?: {
    filter?: string,
    userId?: number,
    muscle?: Muscle[],
    updatedAfter?: Date
  }): Promise<NestedExercise[]> {
    const db = await this.db.getDb();
    const result = await db.query.exercises.findMany({
      where: (t, op) => op.and(
        op.not(
          op.eq(t.equipmentId, 13)
        ),
        op.isNull(t.deletedAt),
        op.or(
          op.isNull(t.userId),
          params?.userId ? op.eq(t.userId, params.userId) : undefined
        ),
        params?.updatedAfter ? op.gte(t.updatedAt, params.updatedAfter) : undefined,
        !params?.filter ? undefined : op.and(
          ...params.filter.trim().split(' ').map((filter) => op.ilike(t.name, `%${filter}%`))
        )
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

  async nestExercises(exercises: (Exercise)[]): Promise<NestedExercise[]> {
    const primaryExercises: (Exercise)[] = [];
    const personalExercises: (Exercise)[] = [];
    const map = new Map<number, Exercise[]>();
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

    const items: NestedExercise[] = primaryExercises.map((item) => ({
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
