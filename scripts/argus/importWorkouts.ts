import 'zod-openapi/extend';
import {DrizzleService} from 'src/backend/services/DrizzleService/DrizzleService';
import {Logger} from 'src/common/utils/Logger/Logger';
import {workoutEntryValidator} from 'src/backend/model/Entry/validators/WorkoutEntry';
import {inspect} from 'util';
import {eq} from 'drizzle-orm';

const logger = new Logger('ImportWorkouts');
logger.info('Importing workouts from argus entries');
const service = new DrizzleService();
const db = await service.getDb();
const dbSchema = await service.getSchema();
const userId = 4;

logger.info('Clearing existing exercises');
await db.delete(dbSchema.exercises).where(eq(dbSchema.exercises.userId, userId));
await db.delete(dbSchema.workoutExerciseSets);
await db.delete(dbSchema.workouts);
const renameMap: Record<string, string> = {
  'Full preacher': 'EZ Curl Bar Biceps Curl (Preacher, Underhand Grip, Sitting)',
  'Smith weighted bridge': 'Weighted Bridge',
};
const workoutEntriesRows = await db.query.entries.findMany({
  where: (table, ops) => ops.eq(table.subtype, 'workout'),
});
const workoutEntries = workoutEntriesRows.map((x) => workoutEntryValidator.parse(x));
let i = 1;
for (const item of workoutEntries) {
  logger.info(`Processing ${i++} /${workoutEntries.length} `);
  console.log(inspect(item, true, null, true));

  const workout: typeof dbSchema.workouts.$inferInsert = {
    createdAt: new Date(item.data.start),
    calories: item.data.calories ?? 0,
    start: new Date(item.data.start),
    end: new Date(item.data.end),
    userId,
  };
  const exercises = item.data.exercises ?? [];
  const ids = await db.insert(dbSchema.workouts).values(workout).returning({id: dbSchema.workouts.id});
  const workoutId = ids[0].id;
  for (const exercise of exercises) {
    const name = exercise.exercise_name.replaceAll('_', ', ');
    let exerciseId = 0;
    const libraryExercise = await db.query.exercises.findFirst({
      where: (t, op) => op.eq(t.name, name),
    });
    if (!libraryExercise) {
      if (exercise.exercise_type === 'custom_exercise' && renameMap[name]) {
        // continue;
        const anotherName = renameMap[name];
        const libraryExercise = await db.query.exercises.findFirst({
          where: (t, op) => op.eq(t.name, anotherName),
        });
        if (!libraryExercise) {
          throw new Error(`Library exercise for name ${anotherName} not found`);
        }
        libraryExercise.name = name;
        const ids = await db.insert(dbSchema.exercises).values({
          ...libraryExercise, name, userId,
        }).returning({id: dbSchema.exercises.id});
        exerciseId = ids[0].id;
      } else {
        throw new Error(`Library exercise for name ${name} not found`);
      }
    } else {
      const userExercise = await db.query.exercises.findFirst({
        where: (t, op) => op.and(
          op.eq(t.name, name),
          op.eq(t.userId, userId)
        ),
      });

      let id = userExercise?.id;
      if (!id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete ((libraryExercise as any).id);
        const ids = await db.insert(dbSchema.exercises).values({
          ...libraryExercise, name, userId,
        }).returning({id: dbSchema.exercises.id});
        id = ids[0].id;
      }
      exerciseId = id;
    }

    const sets = exercise.sets;
    for (const set of sets) {
      const userSet : typeof dbSchema.workoutExerciseSets.$inferInsert = {
        createdAt: workout.start,
        start: workout.start,
        end: workout.start,
        workoutId: workoutId,
        exerciseId: exerciseId,
        weight: set.weight,
        reps: set.reps,
      };
      await db.insert(dbSchema.workoutExerciseSets).values(userSet);
    }
  }
}

logger.info('Freeing up resources');
await service.end();
logger.info('Done');
