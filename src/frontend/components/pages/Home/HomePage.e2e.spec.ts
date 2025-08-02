import {test, expect} from '@playwright/test';

test('Click on hero block CTA displays warning toast', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Discipline/);
  await page.waitForLoadState('networkidle');
  // await new Promise((res) => setTimeout(res, 5000));
  console.log('Click');
  await page.click('#hero-cta-button');
  await page.waitForSelector('.toast', {timeout: 2000});
  const toast = page.locator('.toast');
  await expect(toast).toHaveText('Unfortunately the app is not yet published in stores');
});
