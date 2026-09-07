import {randomUUID} from 'node:crypto';
import {describe, expect, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {ImageType} from '../../../../types/ImageType';
import {ScriptType} from '../../types/ScriptType';
import {TransferExerciseImages} from './TransferExerciseImages';

describe(TransferExerciseImages.name, () => {
  test('Exposes type and description', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const script = new TransferExerciseImages(drizzle);

    expect(script.getType()).toBe(ScriptType.TransferExerciseImages);
    expect(script.getDescription()).toContain('exercise_images');
  });

  test('Links exercises to matching Exercise images by URL', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    const url = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    const insertedImages = await db.insert(schema.images).values({
      id: randomUUID(),
      url,
      imageType: ImageType.Exercise,
      createdAt: new Date(),
    }).returning();
    const image = insertedImages[0];
    const exercise = await TestUtils.seed.createExercise({
      name: 'Transfer images match',
      images: [url],
    });

    const result = await new TransferExerciseImages(drizzle).run();
    const links = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, exercise.id),
    });

    expect(result).toBe(true);
    expect(image).toBeDefined();
    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe(image?.id);
    expect(links[0]?.exerciseId).toBe(exercise.id);
  });

  test('Does not link URLs that have no matching Exercise image', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    const matchedUrl = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    const unmatchedUrl = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    const insertedImages = await db.insert(schema.images).values({
      id: randomUUID(),
      url: matchedUrl,
      imageType: ImageType.Exercise,
      createdAt: new Date(),
    }).returning();
    const image = insertedImages[0];
    const exercise = await TestUtils.seed.createExercise({
      name: 'Transfer images partial match',
      images: [matchedUrl, unmatchedUrl],
    });

    await new TransferExerciseImages(drizzle).run();
    const links = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, exercise.id),
    });

    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe(image?.id);
  });

  test('Ignores images that are not ImageType.Exercise', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    const url = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    await db.insert(schema.images).values({
      id: randomUUID(),
      url,
      imageType: ImageType.Food,
      createdAt: new Date(),
    });
    const exercise = await TestUtils.seed.createExercise({
      name: 'Transfer images wrong type',
      images: [url],
    });

    await new TransferExerciseImages(drizzle).run();
    const links = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, exercise.id),
    });

    expect(links).toHaveLength(0);
  });

  test('Skips empty image URLs', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const exercise = await TestUtils.seed.createExercise({
      name: 'Transfer images empty urls',
      images: ['', ''],
    });

    const result = await new TransferExerciseImages(drizzle).run();
    const links = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, exercise.id),
    });

    expect(result).toBe(true);
    expect(links).toHaveLength(0);
  });

  test('Deduplicates the same image on one exercise', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    const url = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    const insertedImages = await db.insert(schema.images).values({
      id: randomUUID(),
      url,
      imageType: ImageType.Exercise,
      createdAt: new Date(),
    }).returning();
    const image = insertedImages[0];
    const exercise = await TestUtils.seed.createExercise({
      name: 'Transfer images duplicate url',
      images: [url, url],
    });

    await new TransferExerciseImages(drizzle).run();
    const links = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, exercise.id),
    });

    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe(image?.id);
  });

  test('Shares one image across exercises with the same URL', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    const url = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    const insertedImages = await db.insert(schema.images).values({
      id: randomUUID(),
      url,
      imageType: ImageType.Exercise,
      createdAt: new Date(),
    }).returning();
    const image = insertedImages[0];
    const first = await TestUtils.seed.createExercise({
      name: 'Transfer images shared 1',
      images: [url],
    });
    const second = await TestUtils.seed.createExercise({
      name: 'Transfer images shared 2',
      images: [url],
    });

    await new TransferExerciseImages(drizzle).run();
    const firstLinks = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, first.id),
    });
    const secondLinks = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, second.id),
    });

    expect(firstLinks).toHaveLength(1);
    expect(secondLinks).toHaveLength(1);
    expect(firstLinks[0]?.imageId).toBe(image?.id);
    expect(secondLinks[0]?.imageId).toBe(image?.id);
  });

  test('Does not duplicate links when run twice', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    const url = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    const insertedImages = await db.insert(schema.images).values({
      id: randomUUID(),
      url,
      imageType: ImageType.Exercise,
      createdAt: new Date(),
    }).returning();
    const image = insertedImages[0];
    const exercise = await TestUtils.seed.createExercise({
      name: 'Transfer images idempotent',
      images: [url],
    });
    const script = new TransferExerciseImages(drizzle);

    await script.run();
    await script.run();
    const links = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, exercise.id),
    });

    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe(image?.id);
  });

  test('Processes exercises across multiple batches', async () => {
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    const firstUrl = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    const secondUrl = `https://test.example/exercise-images/${randomUUID()}.jpg`;
    const firstInserted = await db.insert(schema.images).values({
      id: randomUUID(),
      url: firstUrl,
      imageType: ImageType.Exercise,
      createdAt: new Date(),
    }).returning();
    const secondInserted = await db.insert(schema.images).values({
      id: randomUUID(),
      url: secondUrl,
      imageType: ImageType.Exercise,
      createdAt: new Date(),
    }).returning();
    const firstImage = firstInserted[0];
    const secondImage = secondInserted[0];
    const first = await TestUtils.seed.createExercise({
      name: 'Transfer images batch 1',
      images: [firstUrl],
    });
    const second = await TestUtils.seed.createExercise({
      name: 'Transfer images batch 2',
      images: [secondUrl],
    });

    await new TransferExerciseImages(drizzle, 1).run();
    const firstLinks = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, first.id),
    });
    const secondLinks = await db.query.exerciseImages.findMany({
      where: (t, op) => op.eq(t.exerciseId, second.id),
    });

    expect(firstLinks.map((link) => link.imageId)).toEqual([firstImage?.id]);
    expect(secondLinks.map((link) => link.imageId)).toEqual([secondImage?.id]);
  });
});
