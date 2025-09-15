import {TestUtils} from '../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('HomePage', () => {

  test('Click on hero block CTA displays warning toast', async ({page}) => {
    const pageUtils = TestUtils.frontend.home(page);

    //test
    await pageUtils.open();
    await pageUtils.clickHeroCtaDownloadButton();

    //check
    await expect(page, 'Should have proper page title').toHaveTitle(/Discipline/);
    const toast = await pageUtils.waitForToast('warning');
    await expect(toast, 'Should display warning that app is not yet published')
    .toHaveText('Unfortunately the app is not yet published in stores');
  });

});
