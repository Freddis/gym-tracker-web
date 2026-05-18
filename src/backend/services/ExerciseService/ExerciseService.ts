import {and, inArray, eq, exists, isNull, asc, or, ilike, sql, not, Query, gt} from 'drizzle-orm';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {ExerciseRow} from 'src/backend/services/DrizzleService/types/ExerciseRow';
import {ExerciseUpsertDto} from 'src/backend/services/ExerciseService/types/ExerciseUpsertDto';
import {Exercise} from './types/Exercise';
import {Muscle} from '../../types/Muscle';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {ExerciseFilter} from './types/ExerciseFilter';
import {TranslationService} from '../TranslationService/TranslationService';
import {TranslationType} from '../TranslationService/types/TranslationType';
import {Language} from '../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {EntityService} from '../../types/ModelService/types/EntityService';
import {ActionError} from '../ApiService/errors/ActionError';
import {ActionErrorCode} from '../ApiService/types/ActionErrorCode';
import {ImageService} from '../ImageService/ImageService';
import {ExerciseMuscleRow} from '../DrizzleService/types/ExerciseMuscleRow';
import {NewModel} from '../../types/NewModel';
import {ManagedExerciseUpdateDto} from './types/MangagedExerciseUpdateDto';
import {ImageType} from '../../types/ImageType';
import {randomUUID} from 'node:crypto';

interface SelectPromise<T> extends Promise<T> {
  limit: (n: number) => Omit<SelectPromise<T>, 'limit'>
  offset: (n: number) => Omit<SelectPromise<T>, 'limit'| 'offset'>
  toSQL: () => Query
}
type Exact<Shape, Input> =
  Input extends Shape
    ? Exclude<keyof Input, keyof Shape> extends never
      ? Input
      : never
    : never;

export class ExerciseService implements EntityService<Exercise, string, ExerciseFilter> {
  protected drizzle: DrizzleService;
  protected translations: TranslationService;
  protected images: ImageService;
  protected table: AppDbSchema['exercises'];
  protected muscleTable: AppDbSchema['muscles'];

  constructor(drizzle: DrizzleService, translations: TranslationService, images: ImageService) {
    this.drizzle = drizzle;
    this.table = this.drizzle.getSchema().exercises;
    this.muscleTable = this.drizzle.getSchema().muscles;
    this.translations = translations;
    this.images = images;
  }

  async create(data: Omit<Exercise, 'id' | 'variations' | 'createdAt' | 'updatedAt'>) {
    const db = await this.drizzle.getDb();
    const dbSchema = this.drizzle.getSchema();
    const entity: typeof dbSchema.exercises.$inferInsert = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };
    const firstRow = await db.transaction(async (db) => {
      const result = await db.insert(dbSchema.exercises).values(entity).returning();
      const firstRow = result[0];
      if (!firstRow) {
        throw new Error('Unable to get inserted exercise');
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

  async createForUser(userId: number, data: Omit<Exercise, 'id' | 'userId' | 'variations' | 'createdAt' | 'updatedAt'>): Promise<Exercise> {
    return await this.create({
      ...data,
      userId,
    });
  }

  async update<T>(id: string, data: Exact<ManagedExerciseUpdateDto, T>): Promise<void> {
    const update: Partial<ExerciseRow> = {
      name: data.name,
      description: data.description,
      isArchived: data.isArchived,
      updatedAt: new Date(),
    };
    const existing = await this.getById(id);
    if (!existing) {
      throw new ActionError(ActionErrorCode.ExerciseNotFound);
    }
    const db = await this.drizzle.getDb();
    await db.transaction(async (db) => {

      if (data.image) {
        const now = new Date().getTime().toString();
        const mils = now.substring(now.length - 5);
        const imageName = data.name?.trim() ?? existing.name.trim();
        const name = `${imageName}${mils}.jpg`;
        const image = await this.images.createFromBase64(data.image, name, ImageType.Exercise);
        update.images = [image.url];
      }
      const dbSchema = this.drizzle.getSchema();
      await db.update(dbSchema.exercises)
        .set(update)
        .where(
          eq(dbSchema.exercises.id, id)
        );
      if (data.muscles) {
        const values: NewModel<ExerciseMuscleRow>[] = [
          ...data.muscles.primary.map((muscle) => ({
            muscle,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            exerciseId: id,
            isPrimary: true,
          })),
          ...data.muscles.secondary.map((muscle) => ({
            muscle,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            exerciseId: id,
            isPrimary: false,
          })),
        ];
        await db.delete(this.muscleTable).where(
          eq(this.muscleTable.exerciseId, id)
        );
        await db.insert(this.muscleTable).values(values);
      }

    });
  }

  async updateForUser(userId: number, id: string, data: {name: string; description: string | null;}): Promise<void> {
    await this.hasWriteAccess(id, userId);
    return await this.update(id, data);
  }

  async delete(userId: number, exerciseId: string): Promise<void> {
    await this.hasWriteAccess(exerciseId, userId);
    await this.deleteById(exerciseId);
  }

  async upsert(userId: number, data: ExerciseUpsertDto[]): Promise<Exercise[]> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    if (data.length === 0) {
      return [];
    }
    const result = db.transaction(async (db) => {
      const ids = data.map((x) => x.id).filter((x) => x !== null);
      const existing = await this.getMany({ids});
      if (existing.some((x) => x.userId !== userId)) {
        throw new ActionError(ActionErrorCode.NoOwnerShip);
      }
      const muscleTable = this.drizzle.getSchema().muscles;
      await db.delete(muscleTable).where(
        inArray(muscleTable.exerciseId, ids)
      );

      const attachedToUser: ExerciseRow[] = data.map((x) => ({
        ...x,
        id: x.id,
        userId: userId,
        parentExerciseId: null,
        isArchived: false,
      }));
      const inserted = await db.insert(schema.exercises).values(attachedToUser).onConflictDoUpdate({
        target: schema.exercises.id,
        set: this.drizzle.generateConflictUpdateSetAllColumns(schema.exercises),
      }).returning();
      const muscles: NewModel<ExerciseMuscleRow>[] = [];
      data.forEach((row, i) => {
        if (!inserted[i]) {
          throw new Error('Problem with inserted indexes'); // never
        }
        const exerciseId = inserted[i]?.id;
        for (const muscle of row.muscles.primary) {
          muscles.push({
            muscle,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            exerciseId: exerciseId,
            isPrimary: true,
          });
        }
        for (const muscle of row.muscles.secondary) {
          muscles.push({
            muscle,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            exerciseId: exerciseId,
            isPrimary: false,
          });
        }
      });
      if (muscles.length > 0) {
        await db.insert(muscleTable).values(muscles);
      }
      const items = this.decorateRows(inserted, {});
      return items;
    });
    return result;
  }

  async get(filter: ExerciseFilter): Promise<Exercise | null> {
    const exercises = await this.paginate(filter);
    const result = exercises.items[0];
    return result ?? null;
  }


  async getById(id: string, language?: Language): Promise<Exercise | null> {
    return this.get({ids: [id], language});
  }

  async getMany(filter: ExerciseFilter): Promise<Exercise[]> {
    const rows = await (await this.getQuery(filter)).query;
    if (rows.length === 0) {
      return [];
    }
    const items = await this.decorateRows(rows, filter);
    return items;
  }

  async deleteById(id: string): Promise<void> {
    const exercise = await this.getById(id);
    if (!exercise) {
      throw new ActionError(ActionErrorCode.ExerciseNotFound);
    }
    const table = this.drizzle.getSchema().exercises;
    const db = await this.drizzle.getDb();
    await db.update(table).set({
      deletedAt: new Date(),
    }).where(
      eq(table.id, exercise.id)
    );
  }

  /**
   * Gets list of exercises. If exercises have variations they're going to be nested.
   * <b>Variations are going to be present in the list on top level as well, unless parentsOnly = true</b>
   */
  async paginate(params?: ExerciseFilter): Promise<PaginatedResult<Exercise>> {
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;
    const query = await this.getQuery(params);
    const rows = await query.query.limit(limit).offset(offset);
    const count = await this.count(query.query);
    const items = await this.decorateRows(rows, params);
    const result: PaginatedResult<Exercise> = {
      items,
      info: {
        page,
        count,
        pageSize: limit,
      },
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

  protected async getQuery(
    params?: ExerciseFilter,
  ): Promise<{query: SelectPromise<ExerciseRow[]>}> {
    // For each muscle we need subquery to find if the muscle is attached to this exercise
    // All muscles have to be attached
    const db = await this.drizzle.getDb();
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
      params?.updatedAfter ? gt(db._.fullSchema.exercises.updatedAt, params.updatedAfter) : undefined,
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
      !params?.includeDeleted ? isNull(db._.fullSchema.exercises.deletedAt) : undefined,
       params?.isArchived !== undefined ? eq(this.table.isArchived, params.isArchived) : undefined,
    );
    const joinOn = and(
      eq(db._.fullSchema.translations.type, TranslationType.ExeciseName),
      params?.language ? eq(db._.fullSchema.translations.language, params.language) : sql`FALSE`,
      eq(db._.fullSchema.translations.key, sql`${db._.fullSchema.exercises.id}::varchar`),
    );

    const query = db.select({
      id: db._.fullSchema.exercises.id,
      name: db._.fullSchema.exercises.name,
      description: db._.fullSchema.exercises.description,
      difficulty: db._.fullSchema.exercises.difficulty,
      equipment: db._.fullSchema.exercises.equipment,
      images: db._.fullSchema.exercises.images,
      params: db._.fullSchema.exercises.params,
      userId: db._.fullSchema.exercises.userId,
      copiedFromId: db._.fullSchema.exercises.copiedFromId,
      parentExerciseId: db._.fullSchema.exercises.parentExerciseId,
      createdAt: db._.fullSchema.exercises.createdAt,
      updatedAt: db._.fullSchema.exercises.updatedAt,
      deletedAt: db._.fullSchema.exercises.deletedAt,
      isArchived: db._.fullSchema.exercises.isArchived,
    })
    .from(db._.fullSchema.exercises)
    .leftJoin(db._.fullSchema.translations, joinOn)
    .where(where)
    .orderBy(
        asc(db._.fullSchema.translations.value),
        asc(db._.fullSchema.exercises.name),
        asc(db._.fullSchema.exercises.id),
    );

    return {query};
  }


  protected async count(q: {toSQL: () => Query}): Promise<number> {
    const {sql: rawSql, params} = q.toSQL();
    let stripped = rawSql;
    let removedParams = 0;

    stripped = stripped.replace(/offset\s+\$\d+\s*$/i, () => {
      removedParams++;
      return '';
    });

    stripped = stripped.replace(/limit\s+\$\d+\s*$/i, () => {
      removedParams++;
      return '';
    });
    const adjustedParams = removedParams > 0 ? params.slice(0, -removedParams) : params;
    const countQuery = sql`select count(*) as count from (${sql.raw(stripped)}) as sub`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {sql: countSql} = countQuery.toQuery({} as any);
    const result = await this.drizzle.getClient().query(countSql, adjustedParams);
    if (result.rows[0]) {
      return Number(result.rows[0].count);
    }
    throw new Error("Couldn't obtain record count");
  }

  protected async decorateRows(exercises: ExerciseRow[], params?: ExerciseFilter): Promise<Exercise[]> {
    const variations = await this.getMany({
      ...params,
      ids: undefined,
      parentIds: exercises.map((x) => x.id),
    });
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

    const muscleMap = new Map<string, {muscle: Muscle, isPrimary: boolean}[]>();
    for (const muscle of muscles) {
      const arr = muscleMap.get(muscle.exersizeId) ?? [];
      arr.push(muscle);
      muscleMap.set(muscle.exersizeId, arr);
    }

    const exerciseMap = new Map<string, ExerciseRow>();
    const variationMap = new Map<string, ExerciseRow[]>();
    for (const exercise of variations) {
      exerciseMap.set(exercise.id, exercise);
      if (!exercise.parentExerciseId) {
        continue;
      }
      const existing = variationMap.get(exercise.parentExerciseId) ?? [];
      existing.push(exercise);
      variationMap.set(exercise.parentExerciseId, existing);
    }
    await this.translate([...exercises, ...variations], params?.language);
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

  protected async hasWriteAccess(exerciseId: string, userId: number): Promise<boolean> {
    const db = await this.drizzle.getDb();
    const item = await db.query.exercises.findFirst({
      where: (t, op) =>
        op.and(
          op.eq(t.id, exerciseId),
          op.eq(t.userId, userId)
        ),
    });
    if (!item) {
      throw new ActionError(ActionErrorCode.NoOwnerShip);
    }
    return !!item;
  }

}
