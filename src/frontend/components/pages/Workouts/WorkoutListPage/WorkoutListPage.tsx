import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {getWorkoutsOptions, postWorkoutsMutation} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {getRouteApi, Link} from '@tanstack/react-router';
import {MouseEventHandler} from 'react';
import {useMutation} from '@tanstack/react-query';
import {WorkoutBlock} from './WorkoutBlock/WorkoutBlock';
import {AppButton} from 'src/frontend/components/atoms/AppButton/AppButton';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {useAppPartialTranslation} from '../../../../i18n/useAppPartialTranslation';
import {Pagination} from '../../../atoms/Pagination/Pagination';
import {useOpenApiQuery} from '../../../../hooks/useOpenApiQuery';

const routeApi = getRouteApi('/workouts/');

export function WorkoutListPage() {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list);
  const searchParams = routeApi.useSearch();
  const response = useOpenApiQuery(getWorkoutsOptions, {
    query: {
      page: searchParams.page,
    },
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
  if (response.isLoading || !response.data) {
    return (
      <PageContainer className="bg-neutral">
        <AppSpinner/>
      </PageContainer>
    );
  }
  return (
    <PageContainer className="bg-neutral">
      <Link to="/workouts" onClick={createWorkout}>
        <AppButton>{t(i18n.buttons.addWorkout)}</AppButton>
      </Link>
      <div className="mt-5">
        {response.data.items.slice(0, 10).map((item) => <WorkoutBlock key={item.id} item={item}/>)}
         {response.data && (
          <div className="flex justify-center">
            <Pagination onPageChanged={onPageChanged} info={response.data?.info} />
          </div>
          )}
      </div>
    </PageContainer>
  );
}
