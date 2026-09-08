import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../../utils/TestUtils/TestUtils';
import {ImageType} from '../../../../../types/ImageType';

describe('getManagedImages', () => {
  test('Unauthorized user blocked', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench-Press-a.jpg',
    });
    console.log('Test');
    const response = await TestUtils.openApi.get('/crm/images');
    console.log('Check');
    expect(response.status).to.eq(401);
  });

  test('Manager can get images', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    const manager = await TestUtils.seed.createManager();
    await TestUtils.seed.createImage({
      id: '11111111-1111-1111-1111-111111111111',
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench-Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    console.log('Test');
    const response = await TestUtils.openApi.getWithManager('/crm/images', manager);
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items).to.have.length(1);
    expect(response.body.items[0].id).to.eq('11111111-1111-1111-1111-111111111111');
    expect(response.body.items[0].url).to.eq('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench-Press-a.jpg');
    expect(response.body.items[0].imageType).to.eq('Exercise');
    expect(response.body.info.page).to.eq(1);
    expect(response.body.info.count).to.eq(1);
  });

  test('Image urls are encoded', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    const manager = await TestUtils.seed.createManager();
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench+Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    console.log('Test');
    const response = await TestUtils.openApi.getWithManager('/crm/images', manager);
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items[0].url).to.eq('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench%2BPress-a.jpg');
  });

  test('Returns images of every type when type filter is omitted', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    const manager = await TestUtils.seed.createManager();
    await TestUtils.seed.createImage({
      id: '22222222-2222-2222-2222-222222222222',
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench-Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    await TestUtils.seed.createImage({
      id: '11111111-1111-1111-1111-111111111111',
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Banana.jpg',
      imageType: ImageType.Food,
    });
    console.log('Test');
    const response = await TestUtils.openApi.getWithManager('/crm/images', manager);
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items).to.have.length(2);
    expect(response.body.items[0].id).to.eq('22222222-2222-2222-2222-222222222222');
    expect(response.body.items[1].id).to.eq('11111111-1111-1111-1111-111111111111');
    expect(response.body.info.count).to.eq(2);
  });

  test('Filters images by type', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    const manager = await TestUtils.seed.createManager();
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench-Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Banana.jpg',
      imageType: ImageType.Food,
    });
    console.log('Test');
    const response = await TestUtils.openApi.getWithManager('/crm/images?imageType=Food', manager);
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items).to.have.length(1);
    expect(response.body.items[0].url).to.eq('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Banana.jpg');
    expect(response.body.items[0].imageType).to.eq('Food');
    expect(response.body.info.count).to.eq(1);
  });

  test('Filters images by url search', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    const manager = await TestUtils.seed.createManager();
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench-Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Banana.jpg',
      imageType: ImageType.Exercise,
    });
    console.log('Test');
    const response = await TestUtils.openApi.getWithManager('/crm/images?search=Banana', manager);
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items).to.have.length(1);
    expect(response.body.items[0].url).to.eq('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Banana.jpg');
    expect(response.body.info.count).to.eq(1);
  });

  test('Filters images by type and search together', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    const manager = await TestUtils.seed.createManager();
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Banana-exercise.jpg',
      imageType: ImageType.Exercise,
    });
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Banana-food.jpg',
      imageType: ImageType.Food,
    });
    console.log('Test');
    const response = await TestUtils.openApi.getWithManager('/crm/images?search=Banana&imageType=Food', manager);
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items).to.have.length(1);
    expect(response.body.items[0].url).to.eq('https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Banana-food.jpg');
    expect(response.body.info.count).to.eq(1);
  });

  test('Unknown image type is rejected', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    const manager = await TestUtils.seed.createManager();
    await TestUtils.seed.createImage({
      url: 'https://gymtracker-images-23.s3.eu-central-1.amazonaws.com/Bench-Press-a.jpg',
      imageType: ImageType.Exercise,
    });
    console.log('Test');
    const response = await TestUtils.openApi.getWithManager('/crm/images?imageType=Airplane', manager);
    console.log('Check');
    expect(response.status).to.eq(400);
  });
});
