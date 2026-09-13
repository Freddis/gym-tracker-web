import {eq} from 'drizzle-orm';
import {describe, expect, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {ImageType} from '../../../../types/ImageType';
import {ScriptType} from '../../types/ScriptType';
import {TransferExerciseImages} from './TransferExerciseImages';

describe(TransferExerciseImages.name, () => {
  test('Exposes type and description', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();

    const script = new TransferExerciseImages(drizzle, images);

    expect(script.getType()).toBe(ScriptType.TransferExerciseImages);
    expect(script.getDescription()).toContain('exercise_images');
  });

  test('Links exercises to matching Exercise images by URL', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    await TestUtils.seed.createImage({
      id: '11111111-1111-1111-1111-111111111111',
      url: 'https://test.example/exercise-images/Bench-Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    const exercise = await TestUtils.seed.createExercise({name: 'Transfer images match'});
    await db.update(schema.exercises)
      .set({images: ['https://test.example/exercise-images/Bench-Press-a.jpg']})
      .where(eq(schema.exercises.id, exercise.id));

    const result = await new TransferExerciseImages(drizzle, images).run();

    const links = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, exercise.id));
    expect(result).toBe(true);
    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe('11111111-1111-1111-1111-111111111111');
    expect(links[0]?.exerciseId).toBe(exercise.id);
  });

  test('Links encoded exercise URLs to raw image URLs', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    await TestUtils.seed.createImage({
      id: '22222222-2222-2222-2222-222222222222',
      url: 'https://test.example/exercise-images/Stretch+-+Gastrocnemius+(Standing_Toe+Flex)-b.jpg',
      imageType: ImageType.Exercise,
    });
    const exercise = await TestUtils.seed.createExercise({name: 'Transfer images encoded url'});
    await db.update(schema.exercises)
      .set({images: ['https://test.example/exercise-images/Stretch%2B-%2BGastrocnemius%2B(Standing_Toe%2BFlex)-b.jpg']})
      .where(eq(schema.exercises.id, exercise.id));

    await new TransferExerciseImages(drizzle, images).run();

    const links = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, exercise.id));
    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe('22222222-2222-2222-2222-222222222222');
  });

  test('Does not link URLs that have no matching Exercise image', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    await TestUtils.seed.createImage({
      id: '33333333-3333-3333-3333-333333333333',
      url: 'https://test.example/exercise-images/Dead-Lift-a.jpg',
      imageType: ImageType.Exercise,
    });
    const exercise = await TestUtils.seed.createExercise({name: 'Transfer images partial match'});
    await db.update(schema.exercises)
      .set({images: [
        'https://test.example/exercise-images/Dead-Lift-a.jpg',
        'https://test.example/exercise-images/Missing-Image-a.jpg',
      ]})
      .where(eq(schema.exercises.id, exercise.id));

    await new TransferExerciseImages(drizzle, images).run();

    const links = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, exercise.id));
    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe('33333333-3333-3333-3333-333333333333');
  });

  test('Ignores images that are not ImageType.Exercise', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    await TestUtils.seed.createImage({
      id: '44444444-4444-4444-4444-444444444444',
      url: 'https://test.example/exercise-images/Banana.jpg',
      imageType: ImageType.Food,
    });
    const exercise = await TestUtils.seed.createExercise({name: 'Transfer images wrong type'});
    await db.update(schema.exercises)
      .set({images: ['https://test.example/exercise-images/Banana.jpg']})
      .where(eq(schema.exercises.id, exercise.id));

    await new TransferExerciseImages(drizzle, images).run();

    const links = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, exercise.id));
    expect(links).toHaveLength(0);
  });

  test('Skips empty image URLs', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    const exercise = await TestUtils.seed.createExercise({name: 'Transfer images empty urls'});
    await db.update(schema.exercises)
      .set({images: ['', '']})
      .where(eq(schema.exercises.id, exercise.id));

    const result = await new TransferExerciseImages(drizzle, images).run();

    const links = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, exercise.id));
    expect(result).toBe(true);
    expect(links).toHaveLength(0);
  });

  test('Deduplicates the same image on one exercise', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    await TestUtils.seed.createImage({
      id: '55555555-5555-5555-5555-555555555555',
      url: 'https://test.example/exercise-images/Pull-Up-a.jpg',
      imageType: ImageType.Exercise,
    });
    const exercise = await TestUtils.seed.createExercise({name: 'Transfer images duplicate url'});
    await db.update(schema.exercises)
      .set({images: [
        'https://test.example/exercise-images/Pull-Up-a.jpg',
        'https://test.example/exercise-images/Pull-Up-a.jpg',
      ]})
      .where(eq(schema.exercises.id, exercise.id));

    await new TransferExerciseImages(drizzle, images).run();

    const links = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, exercise.id));
    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe('55555555-5555-5555-5555-555555555555');
  });

  test('Shares one image across exercises with the same URL', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    await TestUtils.seed.createImage({
      id: '66666666-6666-6666-6666-666666666666',
      url: 'https://test.example/exercise-images/Calf-Raise-a.jpg',
      imageType: ImageType.Exercise,
    });
    const first = await TestUtils.seed.createExercise({name: 'Transfer images shared 1'});
    const second = await TestUtils.seed.createExercise({name: 'Transfer images shared 2'});
    await db.update(schema.exercises)
      .set({images: ['https://test.example/exercise-images/Calf-Raise-a.jpg']})
      .where(eq(schema.exercises.id, first.id));
    await db.update(schema.exercises)
      .set({images: ['https://test.example/exercise-images/Calf-Raise-a.jpg']})
      .where(eq(schema.exercises.id, second.id));

    await new TransferExerciseImages(drizzle, images).run();

    const firstLinks = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, first.id));
    const secondLinks = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, second.id));
    expect(firstLinks).toHaveLength(1);
    expect(secondLinks).toHaveLength(1);
    expect(firstLinks[0]?.imageId).toBe('66666666-6666-6666-6666-666666666666');
    expect(secondLinks[0]?.imageId).toBe('66666666-6666-6666-6666-666666666666');
  });

  test('Does not duplicate links when run twice', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    await TestUtils.seed.createImage({
      id: '77777777-7777-7777-7777-777777777777',
      url: 'https://test.example/exercise-images/Barbell-Squat-a.jpg',
      imageType: ImageType.Exercise,
    });
    const exercise = await TestUtils.seed.createExercise({name: 'Transfer images idempotent'});
    await db.update(schema.exercises)
      .set({images: ['https://test.example/exercise-images/Barbell-Squat-a.jpg']})
      .where(eq(schema.exercises.id, exercise.id));
    const script = new TransferExerciseImages(drizzle, images);

    await script.run();
    await script.run();

    const links = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, exercise.id));
    expect(links).toHaveLength(1);
    expect(links[0]?.imageId).toBe('77777777-7777-7777-7777-777777777777');
  });

  test('Processes exercises across multiple batches', async () => {
    await TestUtils.seed.wipeDb();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const images = await TestUtils.business.getFactory().image();
    const db = await drizzle.getDb();
    const schema = drizzle.getSchema();
    await TestUtils.seed.createImage({
      id: '88888888-8888-8888-8888-888888888888',
      url: 'https://test.example/exercise-images/Leg-Extension-a.jpg',
      imageType: ImageType.Exercise,
    });
    await TestUtils.seed.createImage({
      id: '99999999-9999-9999-9999-999999999999',
      url: 'https://test.example/exercise-images/Barbell-Shrug-a.jpg',
      imageType: ImageType.Exercise,
    });
    const first = await TestUtils.seed.createExercise({name: 'Transfer images batch 1'});
    const second = await TestUtils.seed.createExercise({name: 'Transfer images batch 2'});
    await db.update(schema.exercises)
      .set({images: ['https://test.example/exercise-images/Leg-Extension-a.jpg']})
      .where(eq(schema.exercises.id, first.id));
    await db.update(schema.exercises)
      .set({images: ['https://test.example/exercise-images/Barbell-Shrug-a.jpg']})
      .where(eq(schema.exercises.id, second.id));

    await new TransferExerciseImages(drizzle, images, 1).run();

    const firstLinks = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, first.id));
    const secondLinks = await db.select()
      .from(schema.exerciseImages)
      .where(eq(schema.exerciseImages.exerciseId, second.id));
    expect(firstLinks).toHaveLength(1);
    expect(secondLinks).toHaveLength(1);
    expect(firstLinks[0]?.imageId).toBe('88888888-8888-8888-8888-888888888888');
    expect(secondLinks[0]?.imageId).toBe('99999999-9999-9999-9999-999999999999');
  });
});
