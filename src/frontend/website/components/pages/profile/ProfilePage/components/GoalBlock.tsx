import {FC} from 'react';
import {ConsumedCalories, ConsumedCaloriesHistory, Goal, UnitSettings} from '../../../../../../common/utils/openapi-client';
import {CalorieGoalBlock} from './CalorieGoalBlock';
import {WeightGoalBlock} from './WeightGoalBlock';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {FaQuestion} from 'react-icons/fa6';
interface GoalBlockProps {
  goal: Goal;
  units: UnitSettings;
  consumedCalories: ConsumedCalories;
  history: ConsumedCaloriesHistory;
}
export const GoalBlock: FC<GoalBlockProps> = ({goal, consumedCalories, units, history}) => {
  if (goal.calorie) {
    return <CalorieGoalBlock units={units} goal={goal.calorie} consumedCalories={consumedCalories} history={history} />;
  }
  if (goal.weight) {
    return <WeightGoalBlock goal={goal.weight} />;
  }
  return (
    <AppBlock>
      <div className="w-full flex flex-row gap-5 items-center">
        <FaQuestion className="w-10 h-10" />
        <div className="flex flex-col gap-2">
          <div className="text-md text-bold">Unknown Goal</div>
        </div>
      </div>
    </AppBlock>
  );
};
