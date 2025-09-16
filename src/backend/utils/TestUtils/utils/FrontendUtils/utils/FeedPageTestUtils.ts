import {BasePageTestUtils} from './BasePageTestUtils';

export class FeedPageTestUtils extends BasePageTestUtils {
  protected path = '/feed/' as const;

  async getPageHeading() {
    return this.page.getByTestId('page-heading');
  }

  async getEntryTypeSwitches() {
    return this.page.getByRole('switch').all();
  }

  async getEntryBlocks() {
    return this.page.getByTestId(/^entry-.*/).all();
  }

  async scrollDown() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise((res) => setTimeout(res, 300));
    await this.page.waitForLoadState('networkidle');
  }

}
