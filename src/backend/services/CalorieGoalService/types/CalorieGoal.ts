export interface CalorieGoal {
  id: number;
  userId: number;
  calories: number;
  carbs: number | null;
  protein: number | null;
  fat: number | null;
  start: Date;
  end: Date | null;
}
