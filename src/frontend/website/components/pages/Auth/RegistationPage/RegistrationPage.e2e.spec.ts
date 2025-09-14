import {test, expect} from '@playwright/test';
import {TestUtils} from '../../../../../../backend/utils/TestUtils/TestUtils';

test.describe('RegistrationPage', async () => {

  test('Can register a user', async ({page}) => {
  // prepare
    const pageUtils = TestUtils.frontend.registration(page);

  // test
    await pageUtils.open();
    await pageUtils.fillName('Alex Smith');
    await pageUtils.fillEmail(`alex${new Date().getTime()}@smit.com`);
    await pageUtils.fillPassword('1q2w3e4rDD');
    await pageUtils.fillPasswordConfirmation('1q2w3e4rDD');
    await pageUtils.clickRegisterButton();

  // check
    const toast = await pageUtils.waitForToast('success');
    const toastText = await toast.textContent();
    expect(toastText, 'Should display toast about successful registration').toBe("You've successfully registered");
    const userName = await pageUtils.getUserNameInHeader().textContent();
    expect(userName, 'Should display correct user name near the avatar').toBe('Alex Smith');
    expect(page.url(), 'Page should be /entries').toContain('/entries');
  });

});
