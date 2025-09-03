import {Page} from 'playwright/test';
import {RegistrationPageTestUtils} from './utils/RegistrationPageTestUtils';
import {HomePageTestUtils} from './utils/HomePageTestUtils';
import {LoginPageTestUtils} from './utils/LoginPageTestUtils';

export class FrontendUtils {
  static readonly registration = (page: Page) => new RegistrationPageTestUtils(page);
  static readonly login = (page: Page) => new LoginPageTestUtils(page);
  static readonly home = (page: Page) => new HomePageTestUtils(page);
}
