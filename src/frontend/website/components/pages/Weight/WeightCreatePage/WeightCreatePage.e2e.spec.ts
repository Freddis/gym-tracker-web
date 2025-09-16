import {TestUtils} from '../../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('WeightCreatePage', async () => {

  test('Can open WeightCreatePage', async ({page}) => {
    // prepare
    const pageUtils = TestUtils.frontend.weight.create(page);

    // test
    const response = await pageUtils.open();

    // check
    expect(page.url(), 'Page should be on weight create route').toContain('/weight/create');
    expect(response?.status()).toBe(200);
    const saveButton = await pageUtils.getSaveButton();
    await expect(saveButton).toBeVisible();
  });

});
