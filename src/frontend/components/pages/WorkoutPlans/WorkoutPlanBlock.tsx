import {FC} from 'react';
import {WorkoutPlan} from '../../../utils/openapi-client';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {AppLink} from '../../atoms/AppLink/AppLink';
import {AppButton} from '../../atoms/AppButton/AppButton';

export const WorkoutPlanBlock: FC<{plan: WorkoutPlan}> = ({plan}) => {
  return (
    <AppBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          <AppLink to="/workouts/plans/update/$id" params={{id: plan.id.toString()}}>{plan.name}</AppLink>
        </div>
        <div className="grow flex flex-row sm:justify-end">
          {/* {weekDayString} {date.toLocaleDateString()}, {date.toLocaleTimeString()} */}
        </div>
      </div>
      <div className="flex flex-col">
        {/* <div className="">{t(i18n.duration)}: {time}</div>
        <div>{t(i18n.calories)}: {workout.calories}</div> */}
      </div>
      <div className="mt-5">
        <AppLink to="/workouts/types/create" params={{id: plan.id.toString()}}>
          <AppButton>Add Workout</AppButton>
        </AppLink>
      </div>
    </AppBlock>
  );
};
