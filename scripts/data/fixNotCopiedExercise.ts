import {EntryType} from '../../src/backend/services/EntryService/types/EntryType';
import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {and, eq, inArray, isNull} from 'drizzle-orm';

const exerciseService = await globalServiceFactory.exercise();
const drizzle = await globalServiceFactory.drizzle();
const schema = drizzle.getSchema();
const db = await drizzle.getDb();

const rows = await db.selectDistinct({
  exerciseId: schema.workoutExercises.exerciseId,
  userId: schema.workoutExercises.userId,
})
.from(schema.workoutExercises)
.leftJoin(schema.exercises, eq(schema.workoutExercises.exerciseId, schema.exercises.id))
.where(isNull(schema.exercises.userId));


for (const row of rows) {
  const copiedExercise = await exerciseService.copy(row.userId, row.exerciseId);
  await db.update(schema.workoutExercises)
  .set({
    exerciseId: copiedExercise.id,
  })
  .where(eq(schema.workoutExercises.exerciseId, row.exerciseId));
}

const userIds = rows.map((row) => row.userId);
await db.update(schema.entries)
.set({
  updatedAt: new Date(),
})
.where(
  and(
    eq(schema.entries.type, EntryType.Workout),
    inArray(schema.entries.userId, userIds),
  )
);
await globalServiceFactory.cleanup();
