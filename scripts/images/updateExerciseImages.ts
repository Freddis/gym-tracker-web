
import {eq} from 'drizzle-orm';
import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {Logger} from '../../src/common/utils/Logger/Logger';

const logger = new Logger('updateExerciseImages');
logger.info('Start');
const service = await globalServiceFactory.drizzle();
const db = await service.getDb();
const exercises = await db.query.exercises.findMany();
let i = 0;
for (const exercise of exercises) {
  logger.info(`Processing ${++i}/${exercises.length}: ${exercise.name}`);
  const newImages: string[] = [];
  for (const img of exercise.images) {
    logger.info(`Image ${img}`);
    const nameParts = img.split('/');
    const lastPart = nameParts[nameParts.length - 1];
    if (!lastPart) {
      // never
      throw new Error("Name doesn't exist");
    }
    const name = decodeURIComponent(lastPart);
    const existingImg = await db.query.images.findFirst({
      where: (t, op) => op.like(t.url, `%${name}`),
    });
    if (!existingImg) {
      logger.info('Db image not found');
      continue;
    }
    const encodedName = encodeURIComponent(name);
    const newUrl = existingImg.url.replaceAll(name, encodedName);
    newImages.push(newUrl);
  }
  exercise.images = newImages;
  await db.update(db._.fullSchema.exercises)
    .set({
      images: newImages,
      updatedAt: new Date(),
    })
    .where(eq(db._.fullSchema.exercises.id, exercise.id));
}
logger.info('Cleanup');
await globalServiceFactory.cleanup();
logger.info('Done');
