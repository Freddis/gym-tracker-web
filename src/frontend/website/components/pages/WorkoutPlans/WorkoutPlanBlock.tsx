import {FC} from 'react';
import {WorkoutPlan} from '../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../common/components/atoms/AppBlock/AppBlock';
import {RouteLink} from '../../../../common/components/atoms/RouteLink/RouteLink';
import {AppButton} from '../../../../common/components/atoms/AppButton/AppButton';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {route, RouteId} from '../../../../common/utils/route';

export const WorkoutPlanBlock: FC<{plan: WorkoutPlan}> = ({plan}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.components.workoutPlanBlock);
  return (
    <AppBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          <RouteLink to={route(RouteId.WorkoutPlanUpdate)} params={{id: plan.id.toString()}}>{plan.name}</RouteLink>
        </div>
      </div>
      <div className="mt-5">
        <RouteLink to={route(RouteId.WorkoutPlanCreate)} params={{id: plan.id.toString()}}>
          <AppButton>{t(i18n.buttons.addWorkout)}</AppButton>
        </RouteLink>
      </div>
    </AppBlock>
  );
};
