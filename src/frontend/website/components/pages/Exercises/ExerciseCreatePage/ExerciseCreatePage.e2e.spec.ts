import {TestUtils} from '../../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('ExerciseCreatePage', async () => {
  test('Can open ExerciseCreatePage', async ({page}) => {
    // prepare
    const pageUtils = TestUtils.frontend.exercises.create(page);

    // test
    const response = await pageUtils.open();

    // check
    expect(page.url(), 'Page should be on exercise create route').toContain('/exercises/create');
    expect(response?.status()).toBe(200);
    const saveButton = await pageUtils.getSaveButton();
    await expect(saveButton).toBeVisible();
    const header = await pageUtils.getHeader();
    await expect(header).toBeVisible();
  });
});
