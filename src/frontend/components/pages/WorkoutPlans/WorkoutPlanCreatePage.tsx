import {FC, useState} from 'react';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {RouteLink} from '../../atoms/RouteLink/RouteLink';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {postWorkoutPlans, WorkoutPlan} from '../../../utils/openapi-client';
import {WorkoutPlanUpdateForm} from './WorkoutPlanUpdateForm';
import {AppButton} from '../../atoms/AppButton/AppButton';
import {AppBlockHeader} from '../../atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../atoms/AppToast/hooks/useToasts';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {useResponseErrors} from '../../../utils/useResponseErrors';
import {route, RouteId} from '../../../utils/route';

export const WorkoutPlanCreatePage: FC = () => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.workoutPlans.create);
  const {showToastsAndSetErrors} = useResponseErrors();
  const client = useQueryClient();
  const toasts = useToasts();
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>({
    id: 0,
    name: null,
    description: null,
    userId: 0,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  });
  const onFormUpdate = (update: Omit<WorkoutPlan, 'id'>) => {
    setWorkoutPlan({
      ...workoutPlan,
      ...update,
    });
  };
  const save = async () => {
    const result = await postWorkoutPlans({
      body: {
        name: workoutPlan.name,
        description: workoutPlan.description,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    await client.invalidateQueries({queryKey: ['workout-plans']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/plans',
    });
  };
  return (
    <PageContainer className="bg-main">
      <div className="flex flex-col max-w-5xl w-full">
      <div className="mb-5 -mt-5">
        <RouteLink to={route(RouteId.WorkoutPlanList)}>{translations.pages.workoutPlans.list.heading}</RouteLink>
        <span className="ml-2">&gt;&gt;</span>
        <span className="ml-2">{t(i18n.heading)}</span>
      </div>
        <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.heading)}</AppBlockHeader>
          <WorkoutPlanUpdateForm item={workoutPlan} onUpdate={onFormUpdate} />
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
            <div className="mt-5 flex flex-row">
              <RouteLink to={route(RouteId.WorkoutPlanList)}>{translations.utils.generic.buttons.back}</RouteLink>
              <div className="grow flex flex-row-reverse gap-2">
                <AppButton onClick={save}>{translations.utils.generic.buttons.save}</AppButton>
              </div>
          </div>
        </AppBlock>
      </div>
    </PageContainer>
  );
};
