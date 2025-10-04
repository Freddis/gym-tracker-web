import {BrowserContext, Page} from 'playwright/test';
import {RegistrationPageTestUtils} from './utils/RegistrationPageTestUtils';
import {HomePageTestUtils} from './utils/HomePageTestUtils';
import {LoginPageTestUtils} from './utils/LoginPageTestUtils';
import {WorkoutCreatePageTestUtils} from './utils/WorkoutCreatePageTestUtils';
import {WeightCreatePageTestUtils} from './utils/WeightCreatePageTestUtils';
import {BusinessUtils} from '../BusinessUtils/BusinessUtils';
import {UserRow} from '../../../../services/DrizzleService/types/UserRow';
import {CookieName} from '../../../../../frontend/common/types/CookieName';
import {AuthUser} from '../../../../services/AuthService/types/AuthUser';
import {EntryListPageTestUtils} from './utils/EntryListPageTestUtils';
import {NotFoundPageUtils} from './utils/NotFoundPageUtils';
import {ExerciseLibraryPageTestUtils} from './utils/ExerciseLibraryPageTestUtils';
import {FeedPageTestUtils} from './utils/FeedPageTestUtils';
import {ExerciseCreatePageTestUtils} from './utils/ExerciseCreatePageTestUtils';

export class FrontendUtils {
  static readonly registration = (page: Page) => new RegistrationPageTestUtils(page);
  static readonly login = (page: Page) => new LoginPageTestUtils(page);
  static readonly home = (page: Page) => new HomePageTestUtils(page);
  static readonly notFound = (page: Page) => new NotFoundPageUtils(page);
  static readonly entries = (page: Page) => new EntryListPageTestUtils(page);
  static readonly feed = (page: Page) => new FeedPageTestUtils(page);

  static readonly workouts = {
    create: (page: Page) => new WorkoutCreatePageTestUtils(page),
  };

  static readonly weight = {
    create: (page: Page) => new WeightCreatePageTestUtils(page),
  };

  static readonly exercises = {
    library: (page: Page) => new ExerciseLibraryPageTestUtils(page),
    create: (page: Page) => new ExerciseCreatePageTestUtils(page),
  };

  static async authenticateAsUser(user: UserRow, context: BrowserContext) {
    const auth = await BusinessUtils.getFactory().auth();
    const token = auth.createToken(user);
    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      jwt: token,
    };
    await context.addCookies([
      {
        domain: 'localhost',
        path: '/',
        name: CookieName.User,
        value: JSON.stringify(authUser),
      },
    ]);
  }
}
