import {SQL, and, desc, eq, gte, inArray, isNull, or} from 'drizzle-orm';
import {PgColumn} from 'drizzle-orm/pg-core';
import {UserModelService} from '../../types/ModelService/UserModelService';
import {NewModelDto} from '../../types/NewModelDto';
import {NewModel} from '../../types/NewModel';
import {WorkoutType} from './types/WorkoutType';
import {WorkoutTypeFilter} from './types/WorkoutTypeFilter';
import {WorkoutTypeRow} from '../DrizzleService/types/WorkoutTypeRow';
import {WorkoutTypeUpdateDto} from './types/WorkoutTypeUpdateDto';
import {WorkoutTypeExerciseRow} from '../DrizzleService/types/WorkoutTypeExerciseRow';
import {AppDb, DrizzleService} from '../DrizzleService/DrizzleService';
import {ExerciseService} from '../ExerciseService/ExerciseService';
import {WorkoutTypeExerciseSetRow} from '../DrizzleService/types/WorkoutTypeExerciseSetRow';

export class WorkoutTypeService extends UserModelService<number, WorkoutTypeRow, WorkoutType, WorkoutTypeFilter> {
  protected exerciseService: ExerciseService;

  constructor(drizzle: DrizzleService, exerciseService: ExerciseService) {
    super(drizzle);
    this.exerciseService = exerciseService;
  }

  async create(userId: number, data: NewModelDto<WorkoutTypeUpdateDto>): Promise<WorkoutType> {
    const insertedId = await this.upsert(userId, data);
    return this.decorate(insertedId);
  }

  protected async decorateRows(rows: WorkoutTypeRow[]): Promise<WorkoutType[]> {
    const db = await this.drizzle.getDb();
    const newRows = await db.query.workoutTypes.findMany({
      where: (t, {inArray}) => inArray(t.id, rows.map((x) => x.id)),
      with: {
        exercises: true,
      },
    });
    const exerciseIds = newRows.flatMap((x) => x.exercises).map((x) => x.exerciseId);
    const exercises = await this.exerciseService.paginate({perPage: 1000, ids: exerciseIds});
    const exerciseMap = this.createMap(exercises.items, (x) => x.id);
    const workoutTypeExerciseIds = newRows.flatMap((x) => x.exercises.map((x) => x.id));
    const sets = await db.query.workoutTypeExerciseSets.findMany({
      where: (t, {inArray}) => inArray(t.workoutTypeExerciseId, workoutTypeExerciseIds),
    });
    const result = newRows.map((x) => ({
      ...x,
      exercises: x.exercises.map((y) => ({
        ...y,
        exercise: this.getMappedOrThrow(exerciseMap, y.exerciseId),
        sets: sets.filter((x) => x.workoutTypeExerciseId === y.id),
      })),
    }));
    return result;
  }

  protected async upsertRow(
    db: AppDb,
    userId: number,
    update: NewModelDto<WorkoutTypeUpdateDto>,
    existing?: WorkoutTypeRow): Promise<WorkoutTypeRow> {
    if (existing) {
      const upserted = await db.update(this.getTable()).set({
        ...update,
        userId: existing.userId,
        createdAt: existing.createdAt,
        updatedAt: new Date(),
        deletedAt: existing.deletedAt,
      })
      .where(
        eq(this.getTable().id, existing.id),
      ).returning();
      if (!upserted[0]) {
        throw new Error("Couldn't update record");
      }
      return upserted[0];
    }
    const upserted = await db.insert(this.getTable()).values({
      ...update,
      id: undefined,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      userId,
    }).returning();

    if (!upserted[0]) {
      throw new Error("Couldn't update record");
    }
    return upserted[0];
  }
  protected async upsert(userId: number, update: NewModelDto<WorkoutTypeUpdateDto>, existing?: WorkoutTypeRow): Promise<number> {
    const db = await this.drizzle.getDb();
    const inserted = await db.transaction(async (db) => {
      const upserted = await this.upsertRow(db, userId, update, existing);
      await db.delete(db._.fullSchema.workoutTypeExercises).where(
        eq(db._.fullSchema.workoutTypeExercises.workoutTypeId, upserted.id)
      );
      await db.delete(db._.fullSchema.workoutTypeExerciseSets).where(
        eq(db._.fullSchema.workoutTypeExerciseSets.workoutTypeId, upserted.id)
      );
      for (const exercise of update.exercises) {
        const newExercise: NewModel<WorkoutTypeExerciseRow> = {
          index: exercise.index,
          workoutTypeId: upserted.id,
          description: null,
          userId,
          exerciseId: exercise.exerciseId,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        };
        const result = await db.insert(db._.fullSchema.workoutTypeExercises).values(newExercise).returning();
        const insertedExercise = result[0];
        if (!insertedExercise) {
          throw new Error("Couldn't obtain inserted values");
        }
        const sets: NewModel<WorkoutTypeExerciseSetRow>[] = exercise.sets.map((row) => ({
          workoutTypeId: upserted.id,
          userId,
          reps: row.reps,
          exerciseId: exercise.exerciseId,
          workoutTypeExerciseId: insertedExercise.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        }));
        if (sets.length > 0) {
          await db.insert(db._.fullSchema.workoutTypeExerciseSets).values(sets);
        }
      }
      return upserted.id;
    });
    return inserted;
  }

  async update(userId: number, id:number, update: NewModelDto<WorkoutTypeUpdateDto>) {
    const existing = await this.getById(userId, id);
    if (!existing) {
      throw new Error('Workout type not found');
    }
    await this.upsert(userId, update, existing);
    const updated = await this.getById(userId, id);
    if (!updated) {
      throw new Error('Workout type not found after update');
    }
    return updated;
  }

  protected getTable() {
    return this.drizzle.getSchema().workoutTypes;
  }

  protected getWhere(params: WorkoutTypeFilter): SQL<unknown> | undefined {
    const where = and(
      params.ids ? inArray(this.getTable().id, params.ids) : undefined,
      params?.updatedAfter ? or(
        gte(this.getTable().updatedAt, params.updatedAfter),
        gte(this.getTable().createdAt, params.updatedAfter),
        gte(this.getTable().deletedAt, params.updatedAfter),
      ) : undefined,
      isNull(this.getTable().deletedAt),
    );
    return where;
  }


  protected getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.drizzle.getSchema().workoutTypes.id);
  }

}
