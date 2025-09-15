import {test as base} from 'playwright/test';
import {promises as fs} from 'fs';
export {expect} from 'playwright/test';

/**
 * Collect coverage in e2e tests. Unfortunately in 2025 it seems like the most robust way to collect it so far.
 */
export const test = base.extend({
  page: async ({page, browserName}, use, testInfo) => {
    if (browserName !== 'chromium') {
      return use(page);
    }

    await page.coverage.startJSCoverage({
      resetOnNavigation: false,
    });

    await use(page);
    const result = await page.coverage.stopJSCoverage();
    const resultFile = testInfo.outputPath('v8-coverage.json');
    await fs.writeFile(resultFile, JSON.stringify({result}));
  },
});


