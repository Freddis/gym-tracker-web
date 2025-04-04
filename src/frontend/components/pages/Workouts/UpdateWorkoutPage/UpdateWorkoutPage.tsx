import {
  getWorkoutsByIdOptions,
  } from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {UpdateWorkoutForm} from './components/UpdateWorkoutForm/UpdateWorkoutForm';

const routeApi = getRouteApi('/workouts/update/$workoutId');
export function UpdateWorkoutPage() {
  const params = routeApi.useParams();
  const id = !Number.isNaN(Number(params.workoutId)) ? Number(params.workoutId) : 0;
  const response = useQuery(getWorkoutsByIdOptions({
    path: {
      id,
    },
  }),
  );

  if (response.isLoading || !response.data) {
    return (
        <PageContainer>
          <div>Loading...</div>
        </PageContainer>
    );
  }

  return (
    <PageContainer>
      <UpdateWorkoutForm item={response.data.item}/>
    </PageContainer>
  );
}
