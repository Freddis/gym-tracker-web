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
    const response = await this.page.goto(`${this.baseUrl}${this.path}`);
    await this.page.waitForLoadState('networkidle');
    return response;
  }

  async navigate(path: `/${string}`) {
    const response = await this.page.goto(`${this.baseUrl}${path}`);
    await this.page.waitForLoadState('networkidle');
    return response;
  }

  async waitForToast(type: 'success' | 'danger' | 'warning'): Promise<Locator> {
    const toast = this.page.locator(`.toast.palette-${type}`);
    await toast.waitFor({timeout: this.timeout});
    return toast;
  }

  async clickBody(): Promise<void> {
    await this.page.mouse.click(1, 1);
  }

  async selectLanguage(lang: 'ru' | 'en') {
    await this.clickOnLangaugeDropdown();
    await this.page.getByTestId(new RegExp(`language-${lang}`)).click();
  }

  getUserNameInHeader(): Locator {
    return this.page.getByTestId('my-name');
  }

  getLanguageDrowdownButton(): Locator {
    return this.page.getByTestId('dropdown-languages');
  }

  async getSelectedLanguage(): Promise<string | null> {
    return await this.page.getByTestId('selected-language').getAttribute('alt');
  }

  async clickOnLangaugeDropdown(): Promise<void> {
    await this.getLanguageDrowdownButton().click();
  }

  async getLanguageDropdownLanguages(): Promise<string[]> {
    await this.clickOnLangaugeDropdown();
    const locators = await this.page.getByTestId(/^language-.*/).allTextContents();
    await this.clickBody();
    return locators;
  }

}
