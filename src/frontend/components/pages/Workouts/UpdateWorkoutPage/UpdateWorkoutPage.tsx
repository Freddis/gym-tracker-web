import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {UpdateWorkoutForm} from './components/UpdateWorkoutForm/UpdateWorkoutForm';
import {FC} from 'react';
import {getWorkoutsByIdOptions} from '../../../../openapi-client/@tanstack/react-query.gen';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';

const routeApi = getRouteApi('/workouts/update/$workoutId');
export const UpdateWorkoutPage: FC = () => {
  const params = routeApi.useParams();
  const id = !Number.isNaN(Number(params.workoutId)) ? Number(params.workoutId) : 0;
  const response = useQuery(getWorkoutsByIdOptions({
    path: {
      id: id,
    },
  }),
  );

  if (response.isLoading || !response.data) {
    return (
        <PageContainer>
          <AppSpinner />
        </PageContainer>
    );
  }

  return (
    <PageContainer>
      <UpdateWorkoutForm item={response.data.item}/>
    </PageContainer>
  );
};
