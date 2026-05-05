import {Food, FoodAmountUnit} from '../../common/utils/openapi-client';

export enum FoodMacros {
  Protein = 'protein',
  Carbs = 'carbs',
  Fat = 'fat',
}

const getMacroValue = (food: Food, macro: FoodMacros): number => {
  const map: Record<FoodMacros, (food: Food) => number> = {
    [FoodMacros.Protein]: (food) => food.protein,
    [FoodMacros.Carbs]: (food) => food.carbs,
    [FoodMacros.Fat]: (food) => food.fat,
  };
  return map[macro](food);
};

export const getFoodMacro = (food: Food, macro: FoodMacros): number => {

  if (!food.isMeal) {
    const servingSize = food.servingSize ?? 100;
    const servings = servingSize / 100;
    return getMacroValue(food, macro) * servings;
  }

  return food.components.reduce((acc, curr) => {
    const servingSize = curr.food.servingSize ?? 100;
    const servings = curr.unit === FoodAmountUnit.SERVING ? curr.amount : curr.amount / servingSize;
    const value = getFoodMacro(curr.food, macro) * servings;
    return acc + value;
  }, 0);
};

export const getFoodCalories = (food: Food): number => {
  return getFoodMacro(food, FoodMacros.Protein) * 4 + getFoodMacro(food, FoodMacros.Carbs) * 4 + getFoodMacro(food, FoodMacros.Fat) * 9;
};
