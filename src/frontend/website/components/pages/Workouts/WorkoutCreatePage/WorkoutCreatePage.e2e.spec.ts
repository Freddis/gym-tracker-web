import {TestUtils} from '../../../../../../backend/utils/TestUtils/TestUtils';
import {expect, test} from '../../../../../../backend/utils/TestUtils/utils/FrontendUtils/utils/test';

test.describe('WorkoutCreatePage', async () => {

  test('Can create a minimal workout', async ({page, context}) => {
    const entryList = TestUtils.frontend.entries(page);
    const workouteCreate = TestUtils.frontend.workouts.create(page);
    const user = await TestUtils.seed.createUser({
      name: 'James Peterson',
    });
    await TestUtils.frontend.authenticateAsUser(user, context);

    // pre-check
    await entryList.open();
    const entryCount = await entryList.getEntryCount();
    expect(entryCount, 'Entry count should be zero ').toBe(0);

   // test
    await workouteCreate.open();
    await workouteCreate.clickSave();

    // check
    const toast = await workouteCreate.waitForToast('success');
    const toastText = await toast.textContent();
    expect(toastText, 'Should display toast about successful workout creation').toBe('You successfully added workout record');
    expect(page.url(), 'Url has to change to entry list').toContain('/entries');

    await entryList.open();
    const entryCount2 = await entryList.getEntryCount();
    expect(entryCount2, 'New workout should appear among entries ').toBe(1);

  });

});
