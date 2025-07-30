import {expect} from 'chai';
import {describe, test} from 'vitest';
import {WeightUnits} from '../../../../../common/enums/WeightUnits';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';


describe('Add Weight', () => {
  test('Can add weight', async () => {
    console.log('Prepare');
    const user = await TestUtils.seed.createUser();

    console.log('Test');
    const response = await TestUtils.openApi.postWithUser('/weight', user, {weight: 23});
    console.log('Check');
    expect(response.status).to.eq(200);
    expect(response.body.weight).to.eq(23);
    expect(response.body.units).to.eq(WeightUnits.Kg);
  });
});
