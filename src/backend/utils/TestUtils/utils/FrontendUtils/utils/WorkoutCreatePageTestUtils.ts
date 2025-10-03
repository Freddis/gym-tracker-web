import {BasePageTestUtils} from './BasePageTestUtils';
import {Locator} from 'playwright/test';

export class WorkoutCreatePageTestUtils extends BasePageTestUtils {
  protected path = '/workouts/create' as const;

  async clickSave() {
    const button = this.page.getByTestId('save');
    await button.click();
  }

  async getSaveButton(): Promise<Locator> {
    return this.page.getByTestId('save');
  }

  async getBackButton(): Promise<Locator> {
    return this.page.getByTestId('back-button');
  }

  async fillCalories(calories: number): Promise<void> {
    const caloriesInput = this.page.getByTestId('calories-input');
    await caloriesInput.fill(calories.toString());
  }

  async getCaloriesInput(): Promise<Locator> {
    return this.page.getByTestId('calories-input');
  }

  async clickAddExercise(): Promise<void> {
    const addExerciseButton = this.page.getByTestId('add-exercise-button');
    await addExerciseButton.click();
  }

  async getAddExerciseButton(): Promise<Locator> {
    return this.page.getByTestId('add-exercise-button');
  }

  async getWorkoutTypeCombobox(): Promise<Locator> {
    return this.page.getByTestId('workout-type-combobox');
  }

  async getStartDatePicker(): Promise<Locator> {
    return this.page.getByTestId('start-date-picker');
  }

  async getEndDatePicker(): Promise<Locator> {
    return this.page.getByTestId('end-date-picker');
  }

  async getPageHeading(): Promise<Locator> {
    return this.page.getByTestId('page-heading');
  }

  async getBlockHeading(): Promise<Locator> {
    return this.page.getByTestId('block-heading');
  }

  async getBreadcrumbLinks(): Promise<Locator> {
    return this.page.getByTestId('breadcrumb-navigation').locator('a');
  }

  async getBreadcrumbNavigation(): Promise<Locator> {
    return this.page.getByTestId('breadcrumb-navigation');
  }

  async clickBack(): Promise<void> {
    const backButton = await this.getBackButton();
    await backButton.click();
  }

  async waitForExercisePopup(): Promise<Locator> {
    const popup = this.page.locator('[role="dialog"]').or(
      this.page.locator('.popup')
    ).or(
      this.page.locator('div').filter({hasText: /select.*exercise/i})
    );
    await popup.waitFor({timeout: this.timeout});
    return popup;
  }

  async selectFirstExerciseFromPopup(): Promise<void> {
    const exerciseItems = this.page.locator('[data-testid^="exercise-row-"]');
    await exerciseItems.first().click();
  }

  async getExercisesSection(): Promise<Locator> {
    return this.page.getByTestId('exercises-section');
  }

  async getExercisesList(): Promise<Locator> {
    return this.page.getByTestId('exercises-list');
  }

  async getExerciseCount(): Promise<number> {
    const exercisesList = await this.getExercisesList();
    const exercises = exercisesList.locator('> div'); // Direct children of exercises-list
    return await exercises.count();
  }

  async closeExercisePopup(): Promise<void> {
    // Always use Escape key to close popup - more reliable than looking for close button
    await this.page.keyboard.press('Escape');
  }

  async getErrorMessages(): Promise<Locator> {
    return this.page.locator('.error').or(
      this.page.locator('[class*="error"]')
    ).or(
      this.page.locator('text=/error|invalid|required/i')
    );
  }

  async hasValidationErrors(): Promise<boolean> {
    const errorMessages = await this.getErrorMessages();
    const errorCount = await errorMessages.count();
    return errorCount > 0;
  }

}
