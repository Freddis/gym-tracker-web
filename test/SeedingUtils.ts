import {User} from '../src/backend/model/User/User';
import {BusinessUtils} from './BusinessUtils';

export class SeedUtils {
  protected static counter = new Date().getTime();
  protected static defaultPassword = '1q2w3e4r';

  static async createUser(): Promise<User> {
    const factory = BusinessUtils.getFactory();
    const drizzle = await factory.drizzle();
    const db = await drizzle.getDb();
    const auth = await factory.auth();
    const tag = this.counter++;
    const result = await auth.register({
      name: `User User ${tag}`,
      email: `user${tag}@test.com`,
      password: this.getDefaultPassword(),
      passwordConfirmation: this.getDefaultPassword(),
    });
    const user = await db.query.users.findFirst({where: (t, op) => op.eq(t.id, result.id)});
    if (!user) {
      throw new Error("User wasn't found");
    }
    return user;
  }

  static getDefaultPassword(): string {
    return this.defaultPassword;
  }
}
