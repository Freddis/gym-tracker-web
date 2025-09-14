import {FC, useState} from 'react';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {RouteLink} from '../../atoms/RouteLink/RouteLink';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {deleteWorkoutPlansById, getWorkoutPlansById, patchWorkoutPlansById, WorkoutPlan} from '../../../utils/openapi-client';
import {WorkoutPlanUpdateForm} from './WorkoutPlanUpdateForm';
import {AppButton} from '../../atoms/AppButton/AppButton';
import {AppBlockHeader} from '../../atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../atoms/AppToast/hooks/useToasts';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {AppSpinner} from '../../atoms/AppSpinner/AppSpinner';
import {useResponseErrors} from '../../../utils/useResponseErrors';
import {route, RouteId} from '../../../utils/route';

const routeApi = getRouteApi('/workouts/plans/update/$id');
export const WorkoutPlanUpdatePage: FC = () => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.workoutPlans.update);
  const {showToastsAndSetErrors} = useResponseErrors();
  const client = useQueryClient();
  const toasts = useToasts();
  const navigate = useNavigate();
  const params = routeApi.useParams();
  const id = !Number.isNaN(Number(params.id)) ? Number(params.id) : 0;
  const response = useQuery({
    queryFn: () => getWorkoutPlansById({
      path: {
        id,
      },
    }),
    queryKey: ['workout-plan', id],
  }
  );
  const [workoutPlan, setWorkoutPlan] = useState < Omit<WorkoutPlan, 'id'>>();

  if (response.isLoading || !response.data?.data) {
    return (
        <PageContainer>
          <AppSpinner />
        </PageContainer>
    );
  }

  const onFormUpdate = (update: Omit<WorkoutPlan, 'id'>) => {
    setWorkoutPlan({
      ...workoutPlan,
      ...update,
    });
  };
  const deleteButtonClick = async () => {
    const result = await deleteWorkoutPlansById({
      path: {
        id,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    await client.invalidateQueries({queryKey: ['workout-plans', 'workout-plan']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/plans',
    });
  };
  const saveButtonClick = async () => {
    if (!workoutPlan) {
      throw new Error('Workout plan not found');
    }
    const result = await patchWorkoutPlansById({
      path: {
        id,
      },
      body: {
        name: workoutPlan.name,
        description: workoutPlan.description,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    await client.invalidateQueries({queryKey: ['workout-plans', 'workout-plan']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/plans',
    });
  };
  const item = response.data.data;
  return (
    <PageContainer className="bg-main">
      <div className="flex flex-col max-w-5xl w-full">
      <div className="mb-5 -mt-5">
        <RouteLink to={route(RouteId.EntryList)}>{translations.pages.activities.list.heading}</RouteLink>
        <span className="mx-2">&gt;&gt;</span>
        <RouteLink to={route(RouteId.WorkoutPlanList)}>{translations.pages.workoutPlans.list.heading}</RouteLink>
        <span className="mx-2">&gt;&gt;</span>
        <span>{t(i18n.heading)} {item.id.toString()}</span>
      </div>
        <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.heading)} {item.id.toString()}</AppBlockHeader>
          <WorkoutPlanUpdateForm item={item} onUpdate={onFormUpdate} />
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
            <div className="mt-5 flex flex-row">
              <RouteLink to={route(RouteId.WorkoutPlanList)}>{translations.utils.generic.buttons.back}</RouteLink>
              <div className="grow flex flex-row-reverse gap-2">
                <AppButton onClick={saveButtonClick}>{translations.utils.generic.buttons.save}</AppButton>
                <AppButton onClick={deleteButtonClick}>{translations.utils.generic.buttons.delete}</AppButton>
              </div>
          </div>
        </AppBlock>
      </div>
    </PageContainer>
  );
};
