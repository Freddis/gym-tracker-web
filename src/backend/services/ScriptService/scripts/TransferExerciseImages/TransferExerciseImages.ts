import {DrizzleService} from '../../../DrizzleService/DrizzleService';
import {Logger} from '../../../../utils/Logger/Logger';
import {ImageType} from '../../../../types/ImageType';
import {ImageService} from '../../../ImageService/ImageService';
import {IScript} from '../../types/IScript';
import {ScriptType} from '../../types/ScriptType';

export class TransferExerciseImages implements IScript<ScriptType.TransferExerciseImages> {
  protected drizzle: DrizzleService;
  protected images: ImageService;
  protected logger: Logger;
  protected batchSize: number;

  constructor(drizzle: DrizzleService, images: ImageService, batchSize = 100) {
    this.drizzle = drizzle;
    this.images = images;
    this.batchSize = batchSize;
    this.logger = new Logger(TransferExerciseImages.name);
  }

  getType(): ScriptType.TransferExerciseImages {
    return ScriptType.TransferExerciseImages;
  }

  getDescription(): string {
    return 'Copies exercise image URLs into the exercise_images relation by matching ImageType.Exercise rows with the same URL';
  }

  async run(): Promise<boolean> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    let lastId: string | undefined;
    let processed = 0;
    let linked = 0;
    let skipped = 0;

    this.logger.info('Starting exercise image transfer', {batchSize: this.batchSize});

    while (true) {
      const cursorId = lastId;
      const exercises = await db.query.exercises.findMany({
        where: cursorId ? (t, op) => op.gt(t.id, cursorId) : undefined,
        orderBy: (t, op) => [op.asc(t.id)],
        limit: this.batchSize,
      });
      const lastExercise = exercises[exercises.length - 1];
      if (!lastExercise) {
        break;
      }

      lastId = lastExercise.id;
      processed += exercises.length;

      const urls = [...new Set(exercises.flatMap((exercise) => exercise.images).filter((url) => url.length > 0))];
      if (urls.length === 0) {
        this.logger.info('Batch has no image URLs', {processed, lastId});
        continue;
      }

      const seen = new Set<string>();
      const rows: typeof schema.exerciseImages.$inferInsert[] = [];
      for (const exercise of exercises) {
        for (const url of exercise.images) {
          if (url.length === 0) {
            skipped += 1;
            continue;
          }
          const image = await this.images.getImageByUrl(url, ImageType.Exercise);
          if (!image) {
            skipped += 1;
            continue;
          }
          const key = `${exercise.id}:${image.id}`;
          if (seen.has(key)) {
            continue;
          }
          seen.add(key);
          rows.push({
            exerciseId: exercise.id,
            imageId: image.id,
          });
        }
      }

      if (rows.length === 0) {
        this.logger.info('No matching exercise images in batch', {processed, lastId});
        continue;
      }

      const inserted = await db.insert(schema.exerciseImages)
        .values(rows)
        .onConflictDoNothing()
        .returning();
      linked += inserted.length;

      this.logger.info('Processed exercise batch', {
        processed,
        batchSize: exercises.length,
        matched: rows.length,
        inserted: inserted.length,
        lastId,
      });
    }

    this.logger.info('Exercise image transfer finished', {processed, linked, skipped});
    return true;
  }
}
