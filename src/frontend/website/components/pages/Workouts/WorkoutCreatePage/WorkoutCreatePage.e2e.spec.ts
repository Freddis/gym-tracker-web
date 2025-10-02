import {TestUtils} from '../../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('WorkoutCreatePage', async () => {

  test('Can create a minimal workout', async ({page, context}) => {
    const entryList = TestUtils.frontend.entries(page);
    const workoutCreate = TestUtils.frontend.workouts.create(page);
    const user = await TestUtils.seed.createUser({
      name: 'James Peterson',
    });
    await TestUtils.frontend.authenticateAsUser(user, context);

    // pre-check
    await entryList.open();
    const entryCount = await entryList.getEntryCount();
    expect(entryCount, 'Entry count should be zero ').toBe(0);

    // test
    await workoutCreate.open();
    await workoutCreate.clickSave();

    // check
    const toast = await workoutCreate.waitForToast('success');
    const toastText = await toast.textContent();
    expect(toastText, 'Should display toast about successful workout creation').toBe('You successfully added workout record');
    expect(page.url(), 'Url has to change to entry list').toContain('/entries');

    await entryList.open();
    const entryCount2 = await entryList.getEntryCount();
    expect(entryCount2, 'New workout should appear among entries ').toBe(1);
  });

  test('Can navigate to workout create page from entries', async ({page, context}) => {
    // prepare
    const entryList = TestUtils.frontend.entries(page);
    const workoutCreate = TestUtils.frontend.workouts.create(page);
    const user = await TestUtils.seed.createUser({
      name: 'Sarah Connor',
    });
    await TestUtils.frontend.authenticateAsUser(user, context);

    // test
    await entryList.open();
    await page.getByRole('link', {name: /add/i}).first().click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', {name: /workout/i}).click();
    await page.waitForLoadState('networkidle');

    // check
    expect(page.url(), 'Should navigate to workout create page').toContain('/workouts/create');
    const heading = await workoutCreate.getBlockHeading();
    await expect(heading, 'Page heading should be visible').toBeVisible();
    const saveButton = await workoutCreate.getSaveButton();
    await expect(saveButton, 'Save button should be visible').toBeVisible();
  });

  test('Can add remove exercises', async ({page, context}) => {
    // prepare
    const workoutCreate = TestUtils.frontend.workouts.create(page);
    const user = await TestUtils.seed.createUser({
      name: 'Mike Johnson',
    });
    await TestUtils.frontend.authenticateAsUser(user, context);

    // Seed exercises for selection
    await TestUtils.seed.createExercise({
      name: 'Push-ups',
    });
    await TestUtils.seed.createExercise({
      name: 'Squats',
    });

    // pre-check
    await workoutCreate.open();
    const initialExerciseCount = await workoutCreate.getExerciseCount();
    expect(initialExerciseCount, 'Should start with no exercises').toBe(0);

    // test
    const addExerciseButton = await workoutCreate.getAddExerciseButton();
    await expect(addExerciseButton, 'Add exercise button should be visible').toBeVisible();
    await workoutCreate.clickAddExercise();
    await page.waitForTimeout(1000); // Wait for popup to load exercises
    await workoutCreate.selectFirstExerciseFromPopup();

    // check
    const exercisesSection = await workoutCreate.getExercisesSection();
    await expect(exercisesSection, 'Exercises section should be visible after adding exercise').toBeVisible();

    const firstExerciseCount = await workoutCreate.getExerciseCount();
    expect(firstExerciseCount, 'Should have one exercise after adding first').toBe(1);

    // test - add second exercise
    await workoutCreate.clickAddExercise();
    await page.waitForTimeout(1000); // Wait for popup to load exercises
    await workoutCreate.selectFirstExerciseFromPopup();

    // check - verify second exercise was added
    const finalExerciseCount = await workoutCreate.getExerciseCount();
    expect(finalExerciseCount, 'Should have two exercises after adding second').toBe(2);

    const saveButton = await workoutCreate.getSaveButton();
    await expect(saveButton, 'Save button should remain visible after exercise interaction').toBeVisible();
  });

  test('Can navigate back to entries list', async ({page, context}) => {
    // prepare
    const workoutCreate = TestUtils.frontend.workouts.create(page);
    const user = await TestUtils.seed.createUser({
      name: 'Bob Wilson',
    });
    await TestUtils.frontend.authenticateAsUser(user, context);

    // test
    await workoutCreate.open();
    const backButton = await workoutCreate.getBackButton();
    await expect(backButton, 'Back button should be visible').toBeVisible();
    await workoutCreate.clickBack();
    await page.waitForLoadState('networkidle');

    // check
    expect(page.url(), 'Should navigate back to entries or entry add page').toMatch(/\/(entries|entries\/add)/);
  });
});
