import {CalorieGoal} from '../../../CalorieGoalService/types/CalorieGoal';
import {GoalType} from './GoalType';

interface WeightGoalRecord {
  type: GoalType.Weight,
  weght: {
    target: number;
  }
}

interface CalorieGoalRecord {
  type: GoalType.Calorie,
  calorie: CalorieGoal;
}
export type Goal = CalorieGoalRecord | WeightGoalRecord
