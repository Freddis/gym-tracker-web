import {test, expect} from '@playwright/test';
import {TestUtils} from '../../../../../backend/utils/TestUtils/TestUtils';
import {LoginPage} from './LoginPage';

test.describe(LoginPage.name, async () => {

  test('Can login as user', async ({page}) => {
  // prepare
    const pageUtils = TestUtils.frontend.login(page);
    const user = await TestUtils.seed.createUser({
      name: 'James Willson',
    });

  // test
    await pageUtils.open();
    await pageUtils.fillEmail(user.email);
    await pageUtils.fillPassword(TestUtils.seed.getDefaultPassword());
    await pageUtils.clickLoginButton();

  // check
    const toast = await pageUtils.waitForToast('success');
    const toastText = await toast.textContent();
    expect(toastText, 'Should display toast about successful registration').toBe("You've successfully logged in");
    const userName = await pageUtils.getUserNameInHeader().textContent();
    expect(userName, 'Should display correct user name near the avatar').toBe('James Willson');
    expect(page.url(), 'Page should be /entries').toContain('/entries');
  });

  test("Can't login with wrong password", async ({page}) => {
  // prepare
    const pageUtils = TestUtils.frontend.login(page);
    const user = await TestUtils.seed.createUser({
      name: 'James Helms',
    });

  // test
    await pageUtils.open();
    await pageUtils.fillEmail(user.email);
    await pageUtils.fillPassword('wrongpassword');
    await pageUtils.clickLoginButton();

  // check
    const error = await pageUtils.waitForPasswordError();
    const errorText = await error.textContent();
    expect(errorText).toBe('Incorrect email or password');
  });

});
