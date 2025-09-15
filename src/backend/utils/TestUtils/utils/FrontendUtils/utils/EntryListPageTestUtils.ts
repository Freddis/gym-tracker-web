import {BasePageTestUtils} from './BasePageTestUtils';

export class EntryListPageTestUtils extends BasePageTestUtils {
  protected path = '/entries' as const;

  async getEntryCount() {
    // make sure the list is loaded first
    await this.page.getByTestId('main-content').waitFor();
    const count = await this.page.getByTestId(/entry.*/).count();
    return count;
  }

}
