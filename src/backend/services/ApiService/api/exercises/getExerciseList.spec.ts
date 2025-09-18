import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';

describe('getExerciseList', async () => {
  const service = await TestUtils.business.getFactory().exercise();

  test('Unauthorized user blocked', async () => {
    console.log('Prepare');
    await TestUtils.seed.createExercise({
      name: 'Test Exercise 1',
    });
    console.log('Test');
    const response = await TestUtils.openApi.get('/exercises');
    console.log('Check');
    expect(response.status).to.eq(401);
  });

  test('Can get exercises', async () => {
    console.log('Prepare');
    const user = await TestUtils.seed.createUser();
    await service.createForUser(user.id, {
      name: 'Test Exercise for user',
      description: null,
      difficulty: null,
      params: [],
      equipment: null,
      images: [],
      copiedFromId: null,
      parentExerciseId: null,
      deletedAt: null,
      muscles: {
        primary: [],
        secondary: [],
      },
    });
    console.log('Test');
    const response = await TestUtils.openApi.getWithUser('/exercises', user);
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items[0].name).to.eq('Test Exercise for user');
  });
});
