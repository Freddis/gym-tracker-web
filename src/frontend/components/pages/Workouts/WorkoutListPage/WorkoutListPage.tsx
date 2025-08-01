import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {getRouteApi, Link} from '@tanstack/react-router';
import {MouseEventHandler} from 'react';
import {keepPreviousData, useMutation, useQuery} from '@tanstack/react-query';
import {WorkoutBlock} from './WorkoutBlock/WorkoutBlock';
import {AppButton} from 'src/frontend/components/atoms/AppButton/AppButton';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {Pagination} from '../../../atoms/Pagination/Pagination';
import {AppApiErrorDisplay} from '../../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppToast} from '../../../atoms/AppToast/AppToast';
import {Color} from '../../../../utils/design-system/types/Color';
import {getWorkouts} from '../../../../utils/openapi-client';
import {postWorkoutsMutation} from '../../../../utils/openapi-client/@tanstack/react-query.gen';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

const routeApi = getRouteApi('/workouts/');

export function WorkoutListPage() {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list);
  const searchParams = routeApi.useSearch();
  const response = useQuery({
    queryFn: () => getWorkouts({
      query: {
        page: searchParams.page,
      },
    }),
    queryKey: ['workouts', searchParams],
    placeholderData: keepPreviousData,
  });


  const createWorkoutMutation = useMutation({
    ...postWorkoutsMutation(),
  });
  const navigate = routeApi.useNavigate();
  const createWorkout: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
    const result = await createWorkoutMutation.mutateAsync({});
    navigate({
      to: '/workouts/update/$workoutId',
      params: {
        workoutId: result.id.toString(),
      },
    });
  };
  const onPageChanged = (page: number) => {
    navigate({
      search: {
        page,
      }});
  };
  if (response.isLoading) {
    return (
      <PageContainer className="bg-main">
        <AppSpinner/>
      </PageContainer>
    );
  }
  if (response.isError || response.data?.error) {
    const error = response.data?.error?.error;
    return (
        <PageContainer>
          <AppApiErrorDisplay error={error} />
        </PageContainer>
    );
  }
  return (
    <PageContainer className="bg-main">
      <Link to="/workouts" onClick={createWorkout}>
        <AppButton>{t(i18n.buttons.addWorkout)}</AppButton>
      </Link>
      <div className="mt-5 flex flex-col gap-5">
        {response.data && response.data.data.items.length > 0 && (
          <>
            <div className="flex justify-center mb-3">
              <Pagination onPageChanged={onPageChanged} info={response.data?.data.info} />
            </div>
            {response.data?.data.items.map((item) => <WorkoutBlock key={item.id} item={item}/>)}
            <div className="flex justify-center">
              <Pagination onPageChanged={onPageChanged} info={response.data?.data.info} />
            </div>
          </>
        )}
        {response.data?.data.items.length === 0 && <AppToast variant={Color.Warning}>No Acitivities Found</AppToast>}
      </div>
    </PageContainer>
  );
}
