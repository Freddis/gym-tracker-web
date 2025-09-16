import {BasePageTestUtils} from './BasePageTestUtils';

export class ExerciseCreatePageTestUtils extends BasePageTestUtils {
  protected path = '/exercises/create' as const;

  async fillName(name: string): Promise<void> {
    const nameInput = this.page.getByTestId('name-input');
    await nameInput.fill(name);
  }

  async clickSaveButton(): Promise<void> {
    const saveBtn = this.page.getByRole('button', {name: /save/i});
    await saveBtn.click();
  }

  async getSaveButton() {
    return this.page.getByRole('button', {name: /save/i});
  }

  async getHeader() {
    return this.page.getByTestId('block-heading');
  }
}


