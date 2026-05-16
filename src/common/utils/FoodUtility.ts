import {FoodAmountUnit} from '../../backend/services/FoodService/types/FoodAmountUnit';
import {avoidLet} from '../../frontend/common/utils/avoidLet';
import {FoodMacros} from './types/FoodMacros';
import {IFood} from './types/IFood';
import {IFoodComponent} from './types/IFoodComponent';

export interface NutritionFacts {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export class FoodUtility {


  getNutritionFacts(food: IFood | IFoodComponent[]): NutritionFacts {
    const foodOb: IFood = avoidLet(() => {
      if (Array.isArray(food)) {
        return {
          protein: 0,
          carbs: 0,
          fat: 0,
          servingSize: 0,
          isMeal: true,
          components: food,
        };
      }
      return food;
    });
    const facts: NutritionFacts = {
      calories: this.getFoodCalories(foodOb),
      carbs: this.getFoodMacro(foodOb, FoodMacros.Carbs),
      protein: this.getFoodMacro(foodOb, FoodMacros.Protein),
      fat: this.getFoodMacro(foodOb, FoodMacros.Fat),
    };
    return facts;
  }

  getMacroValue(food: IFood, macro: FoodMacros): number {
    const map: Record<FoodMacros, (food: IFood) => number> = {
      [FoodMacros.Protein]: (food) => food.protein,
      [FoodMacros.Carbs]: (food) => food.carbs,
      [FoodMacros.Fat]: (food) => food.fat,
    };
    return map[macro](food);
  };

  getFoodMacro(food: IFood, macro: FoodMacros): number {
    if (!food.isMeal) {
      const servingSize = food.servingSize ?? 100;
      const servings = servingSize / 100;
      return this.getMacroValue(food, macro) * servings;
    }
    return food.components.reduce((acc, curr) => {
      const servingSize = curr.food.servingSize ?? 100;
      const servings = curr.unit === FoodAmountUnit.Serving ? curr.amount : curr.amount / servingSize;
      const value = this.getFoodMacro(curr.food, macro) * servings;
      return acc + value;
    }, 0);
  };

  getFoodCalories(food: IFood): number {
    const protein = this.getFoodMacro(food, FoodMacros.Protein);
    const carbs = this.getFoodMacro(food, FoodMacros.Carbs);
    const fat = this.getFoodMacro(food, FoodMacros.Fat);
    return protein * 4 + carbs * 4 + fat * 9;
  }

}


