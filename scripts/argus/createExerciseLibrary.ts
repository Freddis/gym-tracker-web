import {DrizzleService} from 'src/backend/services/DrizzleService/DrizzleService';
import {exerciseData} from './data/argusExercisesJson';
import {Logger} from 'src/common/utils/Logger/Logger';
import {dbSchema} from 'src/backend/drizzle/db';
import {and, isNull, like} from 'drizzle-orm';

const logger = new Logger('CreateExerciseLibrary');
logger.info('Starting argus static data processing');
const service = new DrizzleService();
const db = await service.getDb();

logger.info('Clearing existing exercises');
await db.delete(dbSchema.exercises);
let i = 1;
const map = new Map<string, typeof dbSchema.exercises.$inferInsert>();
const exercises: typeof dbSchema.exercises.$inferInsert[] = [];
for (const exercise of exerciseData.exercises) {
  logger.info(`Processing ${i++} /${exerciseData.exercises.length} `);
  const nameParts = exercise.name.split('(');
  const baseName = nameParts[0].trim().replaceAll('_', ' ').trim();
  const extension = nameParts[1] ? ' (' + nameParts[1].replaceAll('_', ', ') : '';
  const name = baseName + extension;
  // const params = exercise.params.split('|').map((x) => Number(x)).filter((x) => !Number.isNaN(x));
  const params = [0];
  const imgName = exercise.name.replaceAll(' ', '+');
  const image = `http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/${imgName}-a.jpg`;
  const image2 = `http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/${imgName}-b.jpg`;

  const row: typeof dbSchema.exercises.$inferInsert = {
    createdAt: new Date(),
    name: name,
    description: exercise.description.map((item, i) => `<${i + 1}>${item}`).join(''),
    equipmentId: 0,
    difficulty: Number(0),
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
  const baseName = row.name.split('(')[0].trim().replaceAll('_', ' ').trim();
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
