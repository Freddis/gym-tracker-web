import {expect} from 'chai';
import {describe, test} from 'vitest';
import {TestUtils} from '../../../../../test/TestUtils';


describe('getBuiltInExerciseList', () => {
  test('Can get exercise', async () => {
    console.log('Prepare');
    await TestUtils.seed.wipeDb();
    await TestUtils.seed.createExercise({
      name: 'Test Exercise 1',
    });
    console.log('Test');
    const response = await TestUtils.openApi.get('/exercises/built-in');
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.items[0].name).to.eq('Test Exercise 1');
  });
});
