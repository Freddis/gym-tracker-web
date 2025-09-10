import {FC} from 'react';
import {WorkoutPlan} from '../../../utils/openapi-client';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {AppLink} from '../../atoms/AppLink/AppLink';
import {AppButton} from '../../atoms/AppButton/AppButton';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';

export const WorkoutPlanBlock: FC<{plan: WorkoutPlan}> = ({plan}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.components.workoutPlanBlock);
  return (
    <AppBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          <AppLink to="/workouts/plans/update/$id" params={{id: plan.id.toString()}}>{plan.name}</AppLink>
        </div>
      </div>
      <div className="mt-5">
        <AppLink to="/workouts/types/create" params={{id: plan.id.toString()}}>
          <AppButton>{t(i18n.buttons.addWorkout)}</AppButton>
        </AppLink>
      </div>
    </AppBlock>
  );
};
