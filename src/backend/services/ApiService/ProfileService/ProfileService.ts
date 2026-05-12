import {CoreUserService} from '../../CoreUserService/CoreUserService';
import {EntryService} from '../../EntryService/EntryService';
import {EntryType} from '../../EntryService/types/EntryType';
import {FoodAmountUnit} from '../../FoodService/types/FoodAmountUnit';
import {FoodComponent} from '../../FoodService/types/FoodComponent';
import {Meal} from '../../MealService/types/Meal';
import {User} from '../../UserService/types/User';
import {UserService} from '../../UserService/UserService';
import {Goal} from './types/Goal';
import {GoalType} from './types/GoalType';
import {UserProfile} from './types/UserProfile';

enum FoodMacros {
  Protein = 'protein',
  Carbs = 'carbs',
  Fat = 'fat',
}

interface IFood {
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number | null;
  isMeal: boolean;
  components: FoodComponent[];
}

const getMacroValue = (food: IFood, macro: FoodMacros): number => {
  const map: Record<FoodMacros, (food: IFood) => number> = {
    [FoodMacros.Protein]: (food) => food.protein,
    [FoodMacros.Carbs]: (food) => food.carbs,
    [FoodMacros.Fat]: (food) => food.fat,
  };
  return map[macro](food);
};

const getFoodMacro = (food: IFood, macro: FoodMacros): number => {
  if (!food.isMeal) {
    const servingSize = food.servingSize ?? 100;
    const servings = servingSize / 100;
    return getMacroValue(food, macro) * servings;
  }
  return food.components.reduce((acc, curr) => {
    const servingSize = curr.food.servingSize ?? 100;
    const servings = curr.unit === FoodAmountUnit.Serving ? curr.amount : curr.amount / servingSize;
    const value = getFoodMacro(curr.food, macro) * servings;
    return acc + value;
  }, 0);
};

export class ProfileService {
  protected readonly coreUserService: CoreUserService;
  protected readonly userService: UserService;
  protected readonly entryService: EntryService;
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

    const meals = await this.entryService.getAll({
      userId: [id],
      type: [EntryType.Meal],
      perPage: 100,
      date: new Date(),
    });
    const consumedCalories = meals.items.reduce((acc, cur) => {
      const calories = this.calculateCalories(cur.meal);
      return {
        calories: acc.calories + calories.calories,
        carbs: acc.carbs + calories.carbs,
        protein: acc.protein + calories.protein,
        fat: acc.fat + calories.fat,
      };
    }, {calories: 0, carbs: 0, protein: 0, fat: 0});
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
      consumedCalories: {
        calories: Math.round(consumedCalories.calories),
        carbs: Math.round(consumedCalories.carbs),
        protein: Math.round(consumedCalories.protein),
        fat: Math.round(consumedCalories.fat),
      },
    };
    return profile;
  }

  protected calculateCalories(meal: Meal): {calories: number, carbs: number, protein: number, fat: number} {
    const carbs = getFoodMacro({protein: 0, carbs: 0, fat: 0, servingSize: 0, isMeal: true, components: meal.food}, FoodMacros.Carbs);
    const protein = getFoodMacro({protein: 0, carbs: 0, fat: 0, servingSize: 0, isMeal: true, components: meal.food}, FoodMacros.Protein);
    const fat = getFoodMacro({protein: 0, carbs: 0, fat: 0, servingSize: 0, isMeal: true, components: meal.food}, FoodMacros.Fat);
    return {calories: protein * 4 + carbs * 4 + fat * 9, carbs: carbs, protein: protein, fat: fat};
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
