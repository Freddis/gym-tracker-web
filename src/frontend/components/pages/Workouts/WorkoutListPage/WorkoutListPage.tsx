import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/frontend/hooks/useOpenApiQuery';
import {getWorkoutsOptions, postWorkoutsMutation} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {Link, useNavigate} from '@tanstack/react-router';
import {MouseEventHandler} from 'react';
import {useMutation} from '@tanstack/react-query';
import {WorkoutBlock} from './WorkoutBlock/WorkoutBlock';
import {AppButton} from 'src/frontend/components/atoms/AppButton/AppButton';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {useAppPartialTranslation} from '../../../../i18n/useAppPartialTranslation';

export function WorkoutListPage() {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list);
  const response = useOpenApiQuery(getWorkoutsOptions, {});
  const createWorkoutMutation = useMutation({
    ...postWorkoutsMutation(),
  });
  const navigate = useNavigate();
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
  if (response.isLoading || !response.data) {
    return (
      <PageContainer>
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
        {response.data.items.map((item) => <WorkoutBlock key={item.id} item={item}/>)}
      </div>
    </PageContainer>
  );
}
