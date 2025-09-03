import {Locator} from 'playwright/test';
import {BasePageTestUtils} from './BasePageTestUtils';

export class LoginPageTestUtils extends BasePageTestUtils {
  protected path = '/auth/login' as const;

  async fillEmail(text: string) {
    await this.page.getByTestId('email').fill(text);
  }

  async fillPassword(text: string) {
    await this.page.getByTestId('password').fill(text);
  }

  async clickLoginButton() {
    const button = this.page.locator('button.palette-accent');
    button.click();
  }

  async waitForPasswordError(): Promise<Locator> {
    const button = this.page.getByTestId('error-password');
    await button.waitFor({state: 'visible', timeout: this.timeout});
    return button;
  }
}
