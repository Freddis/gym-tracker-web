import {TestUtils} from '../../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('ExerciseLibraryPage', async () => {

  test('Can open ExerciseLibraryPage', async ({page}) => {
    // prepare
    const pageUtils = TestUtils.frontend.exercises.library(page);

    // test
    const response = await pageUtils.open();

    // check
    expect(page.url(), 'Page should be on exercises route').toContain('/exercises/');
    expect(response?.status(), 'Page should have sucessful HTTP status').toBe(200);

    const heading = await pageUtils.getPageHeading();
    await expect(heading, 'Heading supposed to be visible').toBeVisible();

    const searchInput = await pageUtils.getSearchInput();
    await expect(searchInput, 'Search element should be present on the page').toBeVisible();

    const equipmentCombobox = await pageUtils.getEquipmentCombobox();
    await expect(equipmentCombobox, 'Equipment dropdown should be present on the page').toBeVisible();
  });

});
