import {UserRow} from '../../../services/DrizzleService/types/UserRow';
import {Logger} from '../../Logger/Logger';
import {BusinessUtils} from './BusinessUtils';
import {Exercise} from 'src/backend/services/ExerciseService/types/Exercise';

export class SeedUtils {
  protected static counter = new Date().getTime();
  protected static defaultPassword = '1q2w3e4r';
  protected static logger = new Logger(SeedUtils.name);

  static async createUser(data?: Partial<{name: string, email:string, password: string}>): Promise<UserRow> {
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
      ...data,
      ...(data?.password ? {passwordConfirmation: data?.password} : undefined),
    });
    const user = await db.query.users.findFirst({where: (t, op) => op.eq(t.id, result.id)});
    if (!user) {
      throw new Error("User wasn't found");
    }
    return user;
  }

  static async createExercise(exercise: Partial<Exercise> = {}): Promise<Exercise> {
    const factory = BusinessUtils.getFactory();
    const exerciseService = await factory.exercise();
    const result = await exerciseService.create({
      muscles: {
        primary: [],
        secondary: [],
      },
      params: [],
      name: '',
      description: null,
      difficulty: null,
      equipment: null,
      images: [],
      userId: null,
      copiedFromId: null,
      parentExerciseId: null,
      deletedAt: null,
      isArchived: false,
      ...exercise,
    });
    return result;
  }

  static async wipeDb() {
    this.logger.info('Cleaning up tables');
    const factory = BusinessUtils.getFactory();
    const drizzle = await factory.drizzle();
    const db = await drizzle.getDb();
    const tables = [
      db._.fullSchema.entries,
      db._.fullSchema.workoutExerciseSets,
      db._.fullSchema.workoutExercises,
      db._.fullSchema.workouts,
      db._.fullSchema.muscles,
      db._.fullSchema.exercises,
      db._.fullSchema.users,
      db._.fullSchema.managers,
    ];
    for (const table of tables) {
      await db.delete(table);
    }
  }

  static getDefaultPassword(): string {
    return this.defaultPassword;
  }
}
