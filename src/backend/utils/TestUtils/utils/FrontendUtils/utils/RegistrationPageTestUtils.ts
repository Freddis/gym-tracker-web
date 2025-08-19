import {BasePageTestUtils} from './BasePageTestUtils';

export class RegistrationPageTestUtils extends BasePageTestUtils {
  protected path = '/auth/register' as const;

  async fillName(text: string) {
    await this.page.getByTestId('name').fill(text);
  }

  async fillEmail(text: string) {
    await this.page.getByTestId('email').fill(text);
  }

  async fillPassword(text: string) {
    await this.page.getByTestId('password').fill(text);
  }

  async fillPasswordConfirmation(text: string) {
    await this.page.getByTestId('passwordConfirmation').fill(text);
  }

  async clickRegisterButton() {
    const button = this.page.locator('button.palette-accent');
    button.click();
  }
}
