import {Page} from 'playwright/test';
import {RegistrationPageTestUtils} from './utils/RegistrationPageTestUtils';
import {HomePageTestUtils} from './utils/HomePageTestUtils';

export class FrontendUtils {
  static readonly registration = (page: Page) => new RegistrationPageTestUtils(page);
  static readonly home = (page: Page) => new HomePageTestUtils(page);
}
