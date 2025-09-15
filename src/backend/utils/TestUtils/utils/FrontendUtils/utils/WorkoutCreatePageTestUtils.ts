import {BasePageTestUtils} from './BasePageTestUtils';

export class WorkoutCreatePageTestUtils extends BasePageTestUtils {
  protected path = '/workouts/create' as const;

  async clickSave() {
    const button = this.page.getByTestId('save');
    button.click();
  }

}
