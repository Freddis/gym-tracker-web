import {DrizzleService} from 'src/server/services/DrizzleService/DrizzleService';
import {argusExercises} from './data/argusExercises';
import {Logger} from 'src/utls/Logger/Logger';
import {dbSchema} from 'src/server/drizzle/db';
import {and, isNull, like} from 'drizzle-orm';

const logger = new Logger('ArgusDataProcess');
logger.info('Starting argus static data processing');
const service = new DrizzleService();
const db = await service.getDb();

logger.info('Clearing existing exercises');
await db.delete(dbSchema.exercises);
let i = 1;
const map = new Map<string, typeof dbSchema.exercises.$inferInsert>();
const exercises: typeof dbSchema.exercises.$inferInsert[] = [];
for (const exercise of argusExercises) {
  logger.info(`Processing ${i++} /${argusExercises.length} `);
  const nameParts = exercise.exercise_name.split('(');
  const baseName = nameParts[0].trim();
  const name = exercise.exercise_name.replaceAll('_', ', ').trim();
  const params = exercise.params.split('|').map((x) => Number(x)).filter((x) => !Number.isNaN(x));
  const imgName = exercise.exercise_name.replaceAll(' ', '+');
  const image = `http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/${imgName}-a.jpg`;
  const image2 = `http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/${imgName}-b.jpg`;

  const row: typeof dbSchema.exercises.$inferInsert = {
    createdAt: new Date(),
    name: name,
    description: exercise.exercise_desc,
    equipmentId: exercise.equipment_id,
    difficulty: Number(exercise.difficulty),
    params: params,
    images: [image, image2],
  };
  exercises.push(row);
  if (!map.has(baseName)) {
    map.set(baseName, row);
    continue;
  }
}
for (const row of exercises) {
  const baseName = row.name.split('(')[0].trim();
  const visualParent = map.get(baseName);
  if (visualParent) {
    const result = await db.select()
      .from(dbSchema.exercises)
      .where(
        and(
          isNull(dbSchema.exercises.parentExerciseId),
          like(dbSchema.exercises.name, baseName)
        )
      );
    const record = result[0];
    if (record) {
      row.parentExerciseId = record.id;
    } else {
      const res = await db.insert(dbSchema.exercises).values({
        ...visualParent,
        name: baseName,
      }).returning({id: dbSchema.exercises.id});
      row.parentExerciseId = res[0].id;
    }
  }
  await db.insert(dbSchema.exercises).values(row);
}


logger.info('Freeing up resources');
await service.end();
logger.info('Done');
