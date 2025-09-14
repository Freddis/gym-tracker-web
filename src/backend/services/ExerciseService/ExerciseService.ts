import {and, inArray, eq, exists, isNull, asc, or, gte, ilike, sql, not} from 'drizzle-orm';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {ExerciseRow} from 'src/backend/services/DrizzleService/types/ExerciseRow';
import {ExerciseUpsertDto} from 'src/backend/services/ExerciseService/types/ExerciseUpsertDto';
import {SemiPartial} from 'src/backend/types/SemiPartial';
import {Exercise} from './types/Exercise';
import {Muscle} from '../../types/Muscle';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {ExerciseFilter} from './types/ExerciseFilter';
import {TranslationService} from '../TranslationService/TranslationService';
import {TranslationType} from '../TranslationService/types/TranslationType';
import {Language} from '../../../frontend/common/components/layout/LanguageProvider/enums/Language';

export class ExerciseService {
  protected drizzle: DrizzleService;
  protected translations: TranslationService;

  constructor(drizzle: DrizzleService, translations: TranslationService) {
    this.drizzle = drizzle;
    this.translations = translations;
  }

  async create(data: Omit<Exercise, 'id'|'variations'|'createdAt'|'updatedAt'>): Promise<Exercise> {
    const db = await this.drizzle.getDb();
    const dbSchema = this.drizzle.getSchema();
    const entity: typeof dbSchema.exercises.$inferInsert = {
      ...data,
      createdAt: new Date(),
    };
    const firstRow = await db.transaction(async (db) => {
      const result = await db.insert(dbSchema.exercises).values(entity).returning();
      const firstRow = result[0];
      if (!firstRow) {
        throw new Error('Unable to get inserted user');
      }
      if (data.muscles.primary.length > 0 || data.muscles.secondary.length > 0) {
        const muscles: typeof dbSchema.muscles.$inferInsert[] = [];
        muscles.push(
          ...data.muscles.primary.map((x) => ({
            muscle: x,
            createdAt: new Date(),
            isPrimary: true,
            exerciseId: firstRow.id,
          })),
          ...data.muscles.secondary.map((x) => ({
            muscle: x,
            createdAt: new Date(),
            isPrimary: false,
            exerciseId: firstRow.id,
          }))
        );
        await db.insert(dbSchema.muscles).values(muscles);
      }
      return firstRow;
    });

    const exercise: Exercise = {
      ...firstRow,
      variations: [],
      muscles: {
        primary: [],
        secondary: [],
      },
    };
    return exercise;
  }

  async update(id: number, data: {name: string; description: string | null;}): Promise<void> {
    const db = await this.drizzle.getDb();
    const dbSchema = this.drizzle.getSchema();
    await db.update(dbSchema.exercises)
      .set({
        ...data,
        updatedAt: new Date(),
      }).where(
        eq(dbSchema.exercises.id, id)
      );
  }

  async delete(exerciseId: number): Promise<void> {
    const db = await this.drizzle.getDb();
    const dbSchema = this.drizzle.getSchema();
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
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    if (data.length === 0) {
      return [];
    }
    const attachedToUser: SemiPartial<ExerciseRow, 'id'>[] = data.map((x) => ({
      ...x,
      id: x.id ?? undefined,
      userId: userId,
      parentExerciseId: null,
    }));
    const inserted = await db.insert(schema.exercises).values(attachedToUser).onConflictDoUpdate({
      target: schema.exercises.id,
      set: this.drizzle.generateConflictUpdateSetAllColumns(schema.exercises),
    }).returning();
    const items = this.nestExercises(inserted, []);
    return items;
  }

  async get(exerciseId: number, userId?: number, language?: Language): Promise<Exercise | null> {
    const exercises = await this.getPage({ids: [exerciseId], userId, language});
    const result = exercises.items[0];
    return result ?? null;
  }

  /**
   * Gets list of exercises. If exercises have variations they're going to be nested.
   * <b>Variations are going to be present in the list on top level as well, unless parentsOnly = true</b>
   */
  async getPage(params?: ExerciseFilter & {
    /** Only include parent exercises in items. Children only going to be nested in that case */
    parentsOnly?: boolean
  }): Promise<PaginatedResult<Exercise>> {
    // todo: this algorithm is flawed. Ideally we want include parents that don't match the criteria if their children match
    const parents = await this.paginateRows({
      ...params,
      parentIds: params?.parentsOnly ? null : undefined,
    });
    const children = await this.paginateRows({
      ...params,
      ids: undefined,
      parentIds: parents.items.map((x) => x.id),
      perPage: 1000, // no limit
    });
    await this.translate([...parents.items, ...children.items], params?.language);
    const items = await this.nestExercises(parents.items, children.items);
    const result: PaginatedResult<Exercise> = {
      items,
      info: parents.info,
    };
    return result;
  }

  protected async translate(items: ExerciseRow[], language?: Language): Promise<void> {
    if (!language || language === this.translations.getDefaultLanguage()) {
      return;
    }
    const keys = [...items.map((x) => x.id.toString())];
    const map = await this.translations.getMap(TranslationType.ExeciseName, keys, language);
    for (const item of items) {
      item.name = map.get(item.id.toString()) ?? item.name;
    }
    const map2 = await this.translations.getMap(TranslationType.ExeciseDescription, keys, language);
    for (const item of items) {
      item.description = map2.get(item.id.toString()) ?? item.description;
    }
  }

  protected async paginateRows(params?: ExerciseFilter): Promise<PaginatedResult<ExerciseRow>> {
    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;

    // For each muscle we need subquery to find if the muscle is attached to this exercise
    // All muscles have to be attached
    const muscleSubsqueries = params?.muscle?.map((muscle) => exists(
        db.select({id: db._.fullSchema.muscles.id})
          .from(db._.fullSchema.muscles)
          .where(
            and(
              eq(db._.fullSchema.muscles.exerciseId, db._.fullSchema.exercises.id),
              eq(db._.fullSchema.muscles.muscle, muscle),
            )
          )
      )
    ) ?? [];

    const where = and(
      or(
          params?.userId === null ? isNull(db._.fullSchema.exercises.userId) : undefined,
          params?.userId ? or(
            eq(db._.fullSchema.exercises.userId, params.userId),
            params?.includeBuiltIn ? isNull(db._.fullSchema.exercises.userId) : undefined,
          ) : undefined
        ),
      params?.updatedAfter ? gte(db._.fullSchema.exercises.updatedAt, params.updatedAfter) : undefined,
      params?.filter ? or(
        and(
          isNull(db._.fullSchema.translations.value),
          ...params.filter.trim().split(' ').map((filter) => ilike(db._.fullSchema.exercises.name, `%${filter}%`))
        ),
        and(
          not(isNull(db._.fullSchema.translations.value)),
          ...params.filter.trim().split(' ').map((filter) => ilike(db._.fullSchema.translations.value, `%${filter}%`))
        )
      ) : undefined,
      params?.ids ? inArray(db._.fullSchema.exercises.id, params.ids) : undefined,
      params?.muscle ? and(...muscleSubsqueries) : undefined,
      params?.equipment ? eq(db._.fullSchema.exercises.equipment, params.equipment) : undefined,
      and(
        params?.parentIds === null ? isNull(db._.fullSchema.exercises.parentExerciseId) : undefined,
        params?.parentIds ? inArray(db._.fullSchema.exercises.parentExerciseId, params.parentIds) : undefined,
      ),
      isNull(db._.fullSchema.exercises.deletedAt)
    );
    const joinOn = and(
      eq(db._.fullSchema.translations.type, TranslationType.ExeciseName),
      params?.language ? eq(db._.fullSchema.translations.language, params.language) : sql`FALSE`,
      eq(db._.fullSchema.translations.numericKey, db._.fullSchema.exercises.id),
    );
    const rows = await db.select()
    .from(db._.fullSchema.exercises)
    .leftJoin(db._.fullSchema.translations, joinOn)
    .where(where)
    .orderBy(
        asc(db._.fullSchema.translations.value),
        asc(db._.fullSchema.exercises.name),
        asc(db._.fullSchema.exercises.id),
    )
    .limit(limit)
    .offset(offset);

    // const count = await db.$count(db._.fullSchema.exercises, where);
    const countRows = await db.select({
      count: sql<number>`COUNT(*)::int`,
    })
    .from(db._.fullSchema.exercises)
    .leftJoin(db._.fullSchema.translations, joinOn)
    .where(where);
    const count = countRows[0]?.count;
    if (count === undefined) {
      throw new Error("Couldn't count");
    }

    const result: PaginatedResult<ExerciseRow> = {
      items: rows.map((x) => x.exercises),
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }

  protected async nestExercises(exercises: ExerciseRow[], variations: ExerciseRow[]): Promise<Exercise[]> {
    const exerciseIds = [...exercises.map((x) => x.id), ...variations.map((x) => x.id)];
    const db = await this.drizzle.getDb();
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

    const exerciseMap = new Map<number, ExerciseRow>();
    const variationMap = new Map<number, ExerciseRow[]>();
    for (const exercise of variations) {
      exerciseMap.set(exercise.id, exercise);
      if (!exercise.parentExerciseId) {
        continue;
      }
      const existing = variationMap.get(exercise.parentExerciseId) ?? [];
      existing.push(exercise);
      variationMap.set(exercise.parentExerciseId, existing);
    }
    const items: Exercise[] = [];
    for (const item of exercises) {
      const nested: Exercise = {
        ...item,
        variations: variationMap.get(item.id)?.map((variation) => ({
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
      };
      items.push(nested);
    }
    return items;
  }

  async hasWriteAccess(exerciseId: number, userId: number): Promise<boolean> {
    const db = await this.drizzle.getDb();
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
