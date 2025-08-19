import {test, expect} from '@playwright/test';

test('Can register a user', async ({page}) => {
  // prepare
  const timeout = 5000;
  await page.goto('http://localhost:3000/auth/register');
  await page.waitForLoadState('networkidle');
  const name = 'Alex Smith';
  const email = `alex${new Date().getTime()}@smit.com`;
  const password = '1q2w3e4rDD';

  // test
  await page.getByTestId('name').fill(name);
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('passwordConfirmation').fill(password);

  const button = page.locator('button.palette-accent');
  button.click();

  // check
  await page.waitForSelector('.toast', {timeout});
  const toast = page.locator('.toast');
  await expect(toast, 'Should display toast about successful registration').toHaveText("You've successfully registered");
  const nameNearAvatar = await page.getByTestId('my-name').textContent({timeout});
  expect(nameNearAvatar, 'Should display correct user name near the avatar').toBe('Alex Smith');
  expect(page.url(), 'Page should be /entries').toContain('/entries');
});
