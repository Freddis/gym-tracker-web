import {Locator, Page} from 'playwright/test';

export abstract class BasePageTestUtils {
  protected abstract path: `/${string}`;
  protected baseUrl = 'http://localhost:3000';
  protected page: Page;
  protected timeout = 5000;

  constructor(page: Page) {
    this.page = page;
    page.setDefaultTimeout(this.timeout);
  }

  async open() {
    await this.page.goto(`${this.baseUrl}${this.path}`);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForToast(type: 'success' | 'danger' | 'warning'): Promise<Locator> {
    const toast = this.page.locator(`.toast.palette-${type}`);
    await toast.waitFor({timeout: this.timeout});
    return toast;
  }

  getUserNameInHeader(): Locator {
    return this.page.getByTestId('my-name');
  }
}
