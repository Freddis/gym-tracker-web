export interface CalorieGoal {
  id: number;
  userId: number;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  start: Date;
  end: Date | null;
}
