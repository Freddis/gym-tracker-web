import {BasePageTestUtils} from './BasePageTestUtils';

export class HomePageTestUtils extends BasePageTestUtils {
  protected path = '/' as const;

  getHeroButton() {
    return this.page.locator('#hero-cta-button');
  }

  async clickHeroCtaDownloadButton() {
    await this.getHeroButton().click();
  }
}
