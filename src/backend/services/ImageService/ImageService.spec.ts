import {describe, expect, test} from 'vitest';
import {ImageService} from './ImageService';
import {TestUtils} from '../../utils/TestUtils/TestUtils';
import {ImageType} from '../../types/ImageType';

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
});
