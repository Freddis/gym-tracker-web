import {BasePageTestUtils} from './BasePageTestUtils';

export class ExerciseLibraryPageTestUtils extends BasePageTestUtils {
  protected path = '/exercises/' as const;

  async getSearchInput() {
    return this.page.getByTestId('exercise-search-input');
  }

  async fillSearch(searchTerm: string): Promise<void> {
    const searchInput = await this.getSearchInput();
    await searchInput.fill(searchTerm);
  }

  async getEquipmentCombobox() {
    return this.page.getByTestId('equipment-combobox');
  }

  async getMuscleSwitch(muscle: string) {
    return this.page.getByTestId(`muscle-switch-${muscle.toLowerCase()}`);
  }

  async getExerciseBlocks() {
    return this.page.getByTestId(/^exercise-block-/).all();
  }

  async getPageHeading() {
    return this.page.getByTestId('page-heading');
  }
}
