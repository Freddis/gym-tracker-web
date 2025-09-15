import {BasePageTestUtils} from './BasePageTestUtils';

export class NotFoundPageUtils extends BasePageTestUtils {
  protected path = '/something-definitely-incorrect' as const;

  getTitleBlock() {
    return this.page.getByTestId('title');
  }

  getDescriptionBlock() {
    return this.page.getByTestId('description');
  }

  getStatusBlock() {
    return this.page.getByTestId('status');
  }

}
