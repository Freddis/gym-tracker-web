import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/frontend/hooks/useOpenApiQuery';
import {getWorkoutsOptions, postWorkoutsMutation} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {Link, useNavigate} from '@tanstack/react-router';
import {CSSProperties, MouseEventHandler} from 'react';
import {useMutation} from '@tanstack/react-query';
import {WorkoutBlock} from './WorkoutBlock/WorkoutBlock';
import {AppButton} from 'src/frontend/components/atoms/AppButton/AppButton';

export function WorkoutListPage() {
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
        <div>Loading...</div>
      </PageContainer>
    );
  }
  const items = response.data.items;
  const aStyle: CSSProperties = {color: 'white', textDecoration: 'none', cursor: 'pointer'};
  return (
    <PageContainer>
      <Link to="/workouts" onClick={createWorkout} style={aStyle}>
      <AppButton>Add Workout</AppButton>
      </Link>
      <div>{items.map((item) => <WorkoutBlock key={item.id} item={item}/>)}</div>
    </PageContainer>
  );
}
