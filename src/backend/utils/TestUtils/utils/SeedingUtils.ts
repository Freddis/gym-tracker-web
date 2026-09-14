import {ManagerRow} from '../../../services/DrizzleService/types/ManagerRow';
import {UserRow} from '../../../services/DrizzleService/types/UserRow';
import {Country} from '../../../types/Country';
import {Gender} from '../../../types/Gender';
import {ImageType} from '../../../types/ImageType';
import {Logger} from '../../Logger/Logger';
import {BusinessUtils} from './BusinessUtils/BusinessUtils';
import {Exercise} from 'src/backend/services/ExerciseService/types/Exercise';
import {Image} from 'src/backend/services/ImageService/types/Image';
import {randomUUID} from 'node:crypto';
import {Food} from 'src/backend/services/FoodService/types/Food';
import {FoodComponent} from 'src/backend/services/FoodService/types/FoodComponent';
import {ServingSizeUnit} from 'src/backend/services/FoodService/types/ServingSizeUnit';
import {EntryVisibility} from 'src/backend/services/EntryService/types/EntryVisibility';

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
      gender: Gender.Male,
      country: Country.UnitedStates,
      birthDate: new Date('1990-02-23'),
      height: 180,
      ...data,
      ...(data?.password ? {passwordConfirmation: data?.password} : undefined),
    });
    const user = await db.query.users.findFirst({where: (t, op) => op.eq(t.id, result.id)});
    if (!user) {
      throw new Error("User wasn't found");
    }
    return user;
  }

  static async createManager(data?: Partial<{name: string, email:string, password: string}>): Promise<ManagerRow> {
    const factory = BusinessUtils.getFactory();
    const auth = await factory.auth();
    const managerService = await factory.manager();
    const tag = this.counter++;
    const result = await auth.registerManager({
      name: `Manager Manager ${tag}`,
      email: `manager${tag}@test.com`,
      password: this.getDefaultPassword(),
      ...data,
    });
    const manager = await managerService.getById(result.id);
    if (!manager) {
      throw new Error("Manager wasn't found");
    }
    return manager;
  }


  static async createImage(image: Partial<Image> & {imageType?: ImageType} = {}): Promise<Image> {
    const factory = BusinessUtils.getFactory();
    const drizzle = await factory.drizzle();
    const db = await drizzle.getDb();
    const result = await db.insert(db._.fullSchema.images).values({
      id: image.id ?? randomUUID(),
      url: image.url ?? `https://example.com/${randomUUID()}.jpg`,
      imageType: image.imageType ?? ImageType.Exercise,
      createdAt: new Date(),
    }).returning();
    const row = result[0];
    if (!row) {
      throw new Error("Image wasn't found");
    }
    return {
      id: row.id,
      url: row.url,
    };
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

  static async createFood(
    food: Partial<Omit<Food, 'image' | 'id' | 'components'>> & {
      images?: string[];
      components?: FoodComponent[],
      user?: UserRow
    } = {}
  ): Promise<Food> {
    const factory = BusinessUtils.getFactory();
    const foodService = await factory.food();
    const drizzle = await factory.drizzle();
    const db = await drizzle.getDb();
    const imageUrl = food.images?.[0];
    const image = imageUrl ? await this.createImage({
      url: imageUrl,
      imageType: ImageType.Food,
    }) : null;
    const id = randomUUID();
    await db.insert(db._.fullSchema.food).values({
      id,
      userId: food.user?.id ?? null,
      name: food.name ?? '',
      description: food.description ?? null,
      imageId: image?.id ?? null,
      protein: food.protein ?? 0,
      carbs: food.carbs ?? 0,
      fat: food.fat ?? 0,
      calories: food.calories ?? null,
      barcode: food.barcode ?? null,
      copiedFromId: food.copiedFromId ?? null,
      visibility: food.visibility ?? EntryVisibility.Public,
      servingSize: food.servingSize ?? null,
      servingSizeUnit: food.servingSizeUnit ?? ServingSizeUnit.Gram,
      createdAt: food.createdAt ?? new Date(),
      updatedAt: food.updatedAt ?? null,
      deletedAt: food.deletedAt ?? null,
      isMeal: food.isMeal ?? false,
      brand: food.brand ?? null,
    });
    const components = food.components ?? [];
    if (components.length > 0) {
      await db.insert(db._.fullSchema.foodComponents).values(components.map((component) => ({
        mealId: id,
        componentId: component.food.id,
        amount: component.amount,
        unit: component.unit,
      })));
    }
    return foodService.decorate(id);
  }

  static async wipeDb() {
    this.logger.info('Cleaning up tables');
    const factory = BusinessUtils.getFactory();
    const drizzle = await factory.drizzle();
    const db = await drizzle.getDb();
    const tables = [
      db._.fullSchema.entries,
      db._.fullSchema.weight,
      db._.fullSchema.workoutExerciseSets,
      db._.fullSchema.workoutExercises,
      db._.fullSchema.workouts,
      db._.fullSchema.muscles,
      db._.fullSchema.exerciseImages,
      db._.fullSchema.exercises,
      db._.fullSchema.mealFoodComponents,
      db._.fullSchema.meals,
      db._.fullSchema.foodComponents,
      db._.fullSchema.food,
      db._.fullSchema.images,
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

  static getPublicAssetUrl(path: `/${string}`): string {
    const config = BusinessUtils.getFactory().getConfig();
    return `${config.baseUrl}${path}`;
  }
}
