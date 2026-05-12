import {CalorieGoal} from './CalorieGoal';

export type CalorieGoalUpsertDto = Omit<CalorieGoal, 'id' | 'userId'>;
