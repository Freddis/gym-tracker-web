import {BasePageTestUtils} from './BasePageTestUtils';

export class WeightCreatePageTestUtils extends BasePageTestUtils {
  protected path = '/weight/create' as const;

  async fillWeight(weight: number): Promise<void> {
    const weightInput = this.page.getByTestId('weight-input');
    await weightInput.fill(weight.toString());
  }

  async clickSaveButton(): Promise<void> {
    const saveButton = this.page.getByRole('button', {name: /save/i});
    await saveButton.click();
  }

  async getSaveButton() {
    return this.page.getByRole('button', {name: /save/i});
  }
}
