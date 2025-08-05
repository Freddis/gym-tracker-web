
import {eq} from 'drizzle-orm';
import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {Logger} from '../../src/common/utils/Logger/Logger';

const logger = new Logger('updateExerciseImages');
logger.info('Start');
const service = await globalServiceFactory.drizzle();
const db = await service.getDb();
const exercises = await db.query.exercises.findMany({
  where: (t, op) => op.eq(t.images, []),
});
let i = 0;
for (const exercise of exercises) {
  logger.info(`Processing ${++i}/${exercises.length}: ${exercise.name}`);
  const postfixes = ['-a', '-b'];
  const newImages: string[] = [];
  for (const postfix of postfixes) {
    logger.info(`Image ${postfix}`);

    const name = `${exercise.name.replaceAll(' ', '_')}${postfix}.jpg`;
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
  if (newImages.length === 0) {
    console.log('No images found');
    continue;
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
