import {FaWeight} from 'react-icons/fa';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {WeightGoal} from '../../../../../../common/utils/openapi-client';
import {FC} from 'react';

interface WeightGoalBlockProps {
  goal: WeightGoal;
}
export const WeightGoalBlock: FC<WeightGoalBlockProps> = () => {
  return (
    <AppBlock>
    <div className="w-full flex flex-row gap-5 items-center">
      <FaWeight className="w-10 h-10" />
      <div className="flex flex-col gap-2">
        <div className="text-md text-bold">Weight Goal</div>
        <div className="text-lg font-semibold">70 kg</div>
      </div>
    </div>
  </AppBlock>
  );
};
