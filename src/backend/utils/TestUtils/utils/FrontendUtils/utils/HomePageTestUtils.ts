import {BasePageTestUtils} from './BasePageTestUtils';

export class HomePageTestUtils extends BasePageTestUtils {
  protected path = '/' as const;

  async clickHeroCtaDownloadButton() {
    await this.page.click('#hero-cta-button');
  }
}
