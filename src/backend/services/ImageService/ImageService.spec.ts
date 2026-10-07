import {describe, expect, test} from 'vitest';
import {ImageService} from './ImageService';
import {TestUtils} from '../../utils/TestUtils/TestUtils';
import {ImageType} from '../../types/ImageType';

const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

describe(ImageService.name, () => {
  test('Url with a plus sign is encoded when the image is fetched by id', async () => {
    await TestUtils.seed.wipeDb();
    const image = await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench+Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    const service = await TestUtils.business.getFactory().image();

    const result = await service.getById(image.id);

    expect(result?.url).toBe('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench%2BPress-a.jpg');
  });

  test('Url with a plus sign is encoded when the image is fetched by name', async () => {
    await TestUtils.seed.wipeDb();
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench+Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    const service = await TestUtils.business.getFactory().image();

    const result = await service.getImageByName('Bench+Press-a.jpg');

    expect(result?.url).toBe('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench%2BPress-a.jpg');
  });

  test('An image created by the service is found by its raw name', async () => {
    await TestUtils.seed.wipeDb();
    const service = await TestUtils.business.getFactory().image();

    const created = await service.createFromBase64(PNG, 'Stretch + Gastrocnemius.jpg', ImageType.Exercise);
    const found = await service.getImageByName('Stretch + Gastrocnemius.jpg');

    expect(found?.id).toBe(created.id);
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.url).toBe('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Stretch-%2B-Gastrocnemius.jpg');
  });

  test('Creating an image whose url is already stored fails', async () => {
    await TestUtils.seed.wipeDb();
    await TestUtils.seed.createImage({
      id: '11111111-1111-1111-1111-111111111111',
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/72473931-247e-4d38-8828-d952e2eb9231',
      imageType: ImageType.Exercise,
    });
    const service = await TestUtils.business.getFactory().image();
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());

    const error = await service.createFromBase64(
      PNG,
      '72473931-247e-4d38-8828-d952e2eb9231',
      ImageType.Exercise,
    ).catch((err: unknown) => err as Error);

    expect((error as Error).message).toContain('duplicate key value violates unique constraint "images_url_unique"');
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(1);
  });

  test('Resolving an image that is already stored under the same name reuses the stored row', async () => {
    await TestUtils.seed.wipeDb();
    const stored = await TestUtils.seed.createImage({
      id: '22222222-2222-2222-2222-222222222222',
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/72473931-247e-4d38-8828-d952e2eb9231',
      imageType: ImageType.Exercise,
    });
    const service = await TestUtils.business.getFactory().image();
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());

    const result = await service.resolveUpsertedImage(
      {id: '72473931-247e-4d38-8828-d952e2eb9231', data: PNG},
      ImageType.Exercise,
    );

    expect(result?.id).toBe(stored.id);
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(1);
  });

  test('Resolving the same image twice at the same time stores it once', async () => {
    await TestUtils.seed.wipeDb();
    const service = await TestUtils.business.getFactory().image();
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());

    const results = await Promise.all([
      service.resolveUpsertedImage({id: '72473931-247e-4d38-8828-d952e2eb9231', data: PNG}, ImageType.Exercise),
      service.resolveUpsertedImage({id: '72473931-247e-4d38-8828-d952e2eb9231', data: PNG}, ImageType.Exercise),
    ]);

    expect(results[0]?.id).toBe(results[1]?.id);
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.url).toBe('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/72473931-247e-4d38-8828-d952e2eb9231');
  });

  test('Resolving an image whose name needs encoding reuses the stored row', async () => {
    await TestUtils.seed.wipeDb();
    const service = await TestUtils.business.getFactory().image();
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());

    const created = await service.resolveUpsertedImage({id: 'Stretch + Gastrocnemius.jpg', data: PNG}, ImageType.Exercise);
    const again = await service.resolveUpsertedImage({id: 'Stretch + Gastrocnemius.jpg', data: PNG}, ImageType.Exercise);

    expect(again?.id).toBe(created?.id);
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(1);
  });

  test('Resolving an image reuses the row stored under that name whatever its type', async () => {
    await TestUtils.seed.wipeDb();
    const stored = await TestUtils.seed.createImage({
      id: '33333333-3333-3333-3333-333333333333',
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/72473931-247e-4d38-8828-d952e2eb9231',
      imageType: ImageType.Food,
    });
    const service = await TestUtils.business.getFactory().image();
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());

    const result = await service.resolveUpsertedImage(
      {id: '72473931-247e-4d38-8828-d952e2eb9231', data: PNG},
      ImageType.Exercise,
    );

    expect(result?.id).toBe(stored.id);
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.imageType).toBe('Food');
  });

  test('Resolving a deleted image returns nothing', async () => {
    await TestUtils.seed.wipeDb();
    const service = await TestUtils.business.getFactory().image();
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());

    const result = await service.resolveUpsertedImage(
      {id: '44444444-4444-4444-4444-444444444444', data: PNG, isDeleted: true},
      ImageType.Exercise,
    );

    expect(result).toBeNull();
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(0);
  });

  test('Resolving an image sent by stored id without data returns the stored image', async () => {
    await TestUtils.seed.wipeDb();
    const stored = await TestUtils.seed.createImage({
      id: '55555555-5555-5555-5555-555555555555',
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/55555555-5555-5555-5555-555555555555',
      imageType: ImageType.Exercise,
    });
    const service = await TestUtils.business.getFactory().image();

    const result = await service.resolveUpsertedImage({id: stored.id}, ImageType.Exercise);

    expect(result?.id).toBe(stored.id);
    expect(result?.url).toBe('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/55555555-5555-5555-5555-555555555555');
  });

  test('Resolving an image sent by an id that was never uploaded returns nothing', async () => {
    await TestUtils.seed.wipeDb();
    const service = await TestUtils.business.getFactory().image();
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());

    const result = await service.resolveUpsertedImage({id: '66666666-6666-6666-6666-666666666666'}, ImageType.Exercise);

    expect(result).toBeNull();
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(0);
  });

  test('Resolving an image sent by a name that is not an id returns nothing', async () => {
    await TestUtils.seed.wipeDb();
    const service = await TestUtils.business.getFactory().image();
    const db = await TestUtils.business.getFactory().drizzle().then((drizzle) => drizzle.getDb());

    const result = await service.resolveUpsertedImage({id: 'Bench Press.jpg'}, ImageType.Exercise);

    expect(result).toBeNull();
    const rows = await db.select().from(db._.fullSchema.images);
    expect(rows).toHaveLength(0);
  });
});
