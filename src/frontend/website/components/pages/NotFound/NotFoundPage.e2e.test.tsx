import {TestUtils} from '../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('NotFoundPage', () => {

  test('Not found page displayed correctly', async ({page}) => {
    const pageUtils = TestUtils.frontend.notFound(page);

    //test
    const response = await pageUtils.open();

    //check
    expect(response?.status(), 'Status supposed to be 404').toBe(404);
    const title = await pageUtils.getTitleBlock().innerText()
    expect(title, 'Title should contain useful').toContain('Page Not Found');
    const status = await pageUtils.getStatusBlock().innerText()
    expect(status, '404 status should be visible to the user').toContain('404');
  });

});
