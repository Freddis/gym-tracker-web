import {expect} from 'chai';
import {describe, test} from 'vitest';
import {OpenApiMethod} from 'strap-on-openapi';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {ApiErrorCode} from '../../types/ApiErrorCode';


describe('createExercise', () => {

  test('Can create exercise', async () => {
    console.log('Prepare');
    const user = await TestUtils.seed.createUser();
    console.log('Test');
    const response = await TestUtils.openApi.postWithUser('/exercises', user, {name: 'New exercise'});
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.success).to.eq(true);
  });

  test('Only users can create exercises', async () => {
    const response = await TestUtils.openApi.request('/exercises', OpenApiMethod.POST, {name: 'New exercise'});
    console.log('Check');
    expect(response.status).to.eq(401);
    expect(response.body.error.code).to.eq(ApiErrorCode.Unauthorized);
  });
});
