
import {TestUtils} from '../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('FeedPage', async () => {

  test('Can open FeedPage', async ({page}) => {
    // prepare
    const pageUtils = TestUtils.frontend.feed(page);

    // test
    const response = await pageUtils.open();

    // check
    expect(page.url(), 'Page should be on feed route').toContain('/feed/');
    expect(response?.status(), 'Page should have sucessful HTTP status').toBe(200);

    const heading = await pageUtils.getPageHeading();
    await expect(heading, 'Heading supposed to be visible').toBeVisible();

    const entryTypeSwitches = await pageUtils.getEntryTypeSwitches();
    expect(entryTypeSwitches.length).toBeGreaterThan(0);
  });

  // todo: ha-ha, need to seed records first lol
  test.skip('Can load more entries when scrolling', async ({page}) => {
    // prepare
    const pageUtils = TestUtils.frontend.feed(page);
    await pageUtils.open();
    const initialEntryBlocks = await pageUtils.getEntryBlocks();
    const initialCount = initialEntryBlocks.length;

    //test
    await pageUtils.scrollDown();
    const newEntryBlocks = await pageUtils.getEntryBlocks();
    const newCount = newEntryBlocks.length;

    // check
    expect(newCount).toBeGreaterThan(initialCount);
  });
});
