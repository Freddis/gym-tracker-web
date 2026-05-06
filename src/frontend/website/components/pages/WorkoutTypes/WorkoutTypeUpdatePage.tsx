import {FC, useEffect} from 'react';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../../../common/components/layout/PageContainer/PageContainer';
import {RouteLink} from '../../../../common/components/atoms/RouteLink/RouteLink';
import {AppBlock} from '../../../../common/components/atoms/AppBlock/AppBlock';
import {deleteWorkoutTypesById, getWorkoutTypesById, patchWorkoutTypesById, WorkoutType} from '../../../../common/utils/openapi-client';
import {AppButton} from '../../../../common/components/atoms/AppButton/AppButton';
import {AppBlockHeader} from '../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {AppSpinner} from '../../../../common/components/atoms/AppSpinner/AppSpinner';
import {WorkoutTypeUpdateForm} from './WorkoutTypeUpdateForm';
import {useResponseErrors} from '../../../../common/utils/useResponseErrors';
import {useNonRenderingState} from '../../../../common/utils/useNonRenderingState';
import {route, RouteId} from '../../../../common/utils/route';
import {BreadCrumbs} from '../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BreadCrumbsBlock} from '../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BasicPage} from '../../../../common/components/layout/BasicPage/BasicPage';

const routeApi = getRouteApi('/workouts/types/update/$id');
export const WorkoutTypeUpdatePage: FC = () => {
  const {showToastsAndSetErrors} = useResponseErrors();
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.workoutTypes.update);
  const client = useQueryClient();
  const toasts = useToasts();
  const navigate = useNavigate();
  const params = routeApi.useParams();
  const id = !Number.isNaN(Number(params.id)) ? Number(params.id) : 0;
  const response = useQuery({
    queryFn: () => getWorkoutTypesById({
      path: {
        id,
      },
    }),
    queryKey: ['workout-types', id],
  }
  );
  const [workoutType, setWorkoutPlan] = useNonRenderingState<Omit<WorkoutType, 'id'>>({
    name: '',
    description: '',
    userId: 0,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    planIndex: null,
    planId: null,
    exercises: [],
  });
  useEffect(() => {
    if (response.data?.data) {
      setWorkoutPlan(response.data?.data);
    }
  }, [response.data?.data]);

  if (response.isLoading || !response.data?.data) {
    return (
        <PageContainer>
          <AppSpinner />
        </PageContainer>
    );
  }

  const onFormUpdate = (update: Omit<WorkoutType, 'id'>) => {
    setWorkoutPlan({
      ...workoutType,
      ...update,
    });
  };

  const deleteButtonClick = async () => {
    const result = await deleteWorkoutTypesById({
      path: {
        id,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    await client.invalidateQueries({queryKey: ['workout-types']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/types',
    });
  };

  const saveButtonClick = async () => {
    const result = await patchWorkoutTypesById({
      path: {
        id,
      },
      body: {
        name: workoutType.name,
        description: workoutType.description,
        planIndex: null,
        planId: null,
        exercises: workoutType.exercises.map((row) => ({
          index: row.index,
          exerciseId: row.exercise.id,
          sets: row.sets,
        })),
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    await client.invalidateQueries({queryKey: ['workout-types']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/types',
    });
  };
  const item = response.data.data;
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: translations.pages.workoutTypes.list.heading, url: route(RouteId.WorkoutTypeList)},
    {label: t(i18n.heading), url: route(RouteId.WorkoutTypeUpdate)},
  ];
  return (
    <PageContainer className="bg-main">
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.heading)} {item.id.toString()}</AppBlockHeader>
          <WorkoutTypeUpdateForm item={item} onUpdate={onFormUpdate} />
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
            <div className="mt-5 flex flex-row">
              <RouteLink to={route(RouteId.WorkoutTypeList)}>{translations.utils.generic.buttons.back}</RouteLink>
              <div className="grow flex flex-row-reverse gap-2">
                <AppButton onClick={saveButtonClick}>{translations.utils.generic.buttons.save}</AppButton>
                <AppButton onClick={deleteButtonClick}>{translations.utils.generic.buttons.delete}</AppButton>
              </div>
          </div>
        </AppBlock>
      </BasicPage>
    </PageContainer>
  );
};
