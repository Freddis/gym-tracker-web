import {Exercise} from '../src/backend/model/Exercise/Exercise';
import {User} from '../src/backend/model/User/User';
import {Logger} from '../src/common/utils/Logger/Logger';
import {BusinessUtils} from './BusinessUtils';

export class SeedUtils {
  protected static counter = new Date().getTime();
  protected static defaultPassword = '1q2w3e4r';
  protected static logger = new Logger(SeedUtils.name);

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

  static async createExercise(exercise: Partial<Exercise> = {}): Promise<Exercise> {
    const factory = BusinessUtils.getFactory();
    const exerciseService = await factory.getExerciseService();
    const result = await exerciseService.create({
      name: exercise.name ?? 'something',
      userId: exercise.userId ?? undefined,
    });
    return result;
  }

  static async wipeDb() {
    this.logger.info('Cleaning up tables');
    const factory = BusinessUtils.getFactory();
    const drizzle = await factory.drizzle();
    const db = await drizzle.getDb();
    const tables = [
      db._.fullSchema.workoutExerciseSets,
      db._.fullSchema.workoutExercises,
      db._.fullSchema.workouts,
      db._.fullSchema.muscles,
      db._.fullSchema.exercises,
    ];
    for (const table of tables) {
      await db.delete(table);
    }
  }

  static getDefaultPassword(): string {
    return this.defaultPassword;
  }
}
