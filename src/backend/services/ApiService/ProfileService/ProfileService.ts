import {FoodUtility} from '../../../../common/utils/FoodUtility';
import {Meal} from '../../../../frontend/common/utils/openapi-client';
import {CoreUserService} from '../../CoreUserService/CoreUserService';
import {EntryService} from '../../EntryService/EntryService';
import {EntryType} from '../../EntryService/types/EntryType';
import {User} from '../../UserService/types/User';
import {UserService} from '../../UserService/UserService';
import {Goal} from './types/Goal';
import {GoalType} from './types/GoalType';
import {UserProfile} from './types/UserProfile';
export class ProfileService {
  protected readonly coreUserService: CoreUserService;
  protected readonly userService: UserService;
  protected readonly entryService: EntryService;
  protected readonly foodUtility: FoodUtility = new FoodUtility();

  constructor(
    coreUserService: CoreUserService,
    userService: UserService,
    entryService: EntryService,
  ) {
    this.coreUserService = coreUserService;
    this.userService = userService;
    this.entryService = entryService;
  }

  async getProfile(id: number): Promise<UserProfile> {
    const coreUser = await this.coreUserService.getById(id);
    if (!coreUser) {
      throw new Error('User not found');
    }
    const goals = await this.getGoalsForUser(coreUser);
    const weight = await this.getWeightForUser(coreUser);
    const age = new Date().getFullYear() - coreUser.birthDate.getFullYear();
    const historySize = 30;
    const meals = await this.entryService.getAll({
      userId: [id],
      type: [EntryType.Meal],
      perPage: 100,
      after: new Date(new Date().setDate(new Date().getDate() - historySize)),
      before: new Date(new Date().setDate(new Date().getDate() + 1)),
    });
    const todayText = new Date().toDateString();
    const todayMeals = meals.items.filter((x) => x.time.toDateString() === todayText).flatMap((x) => x.meal.food);
    const map = new Map<string, Meal[]>();
    for (const meal of meals.items) {
      const date = meal.time.toDateString();
      const rows = map.get(date) ?? [];
      rows.push(meal.meal);
      map.set(date, rows);
    }
    const history = Array.from(map.entries()).map(([date, meals]) => ({
      date: new Date(date),
      value: this.foodUtility.getNutritionFacts(meals.flatMap((x) => x.food)).calories,
    }));
    const consumedCalories = this.foodUtility.getNutritionFacts(todayMeals);
    const profile: UserProfile = {
      user: this.userService.decorateFromCore(coreUser),
      goals,
      note: coreUser.note,
      height: coreUser.height,
      weight: weight,
      age: age,
      gender: coreUser.gender,
      units: {
        weight: coreUser.weightUnit,
        distance: coreUser.distanceUnit,
        height: coreUser.heightUnit,
        temperature: coreUser.temperatureUnit,
      },
      consumedCalories,
      consumedCaloriesHistory: {
        data: history,
        size: historySize,
      },
    };
    return profile;
  }

  protected async getGoalsForUser(user: User): Promise<Goal[]> {
    const goals = await this.entryService.getAll({
      userId: [user.id],
      type: [EntryType.CalorieGoal],
      perPage: 1,
    });
    const result: Goal[] = goals.items.map((x) => ({
      type: GoalType.Calorie,
      calorie: x.calorieGoal,
    }));
    return result;
  }

  protected async getWeightForUser(user: User): Promise<number | null> {
    const entries = await this.entryService.getAll({
      userId: [user.id],
      type: [EntryType.Weight],
      perPage: 1,
    });
    const weight = entries.items[0];
    const weightValue = weight?.weight.weight;
    return weightValue ?? null;
  }
}
