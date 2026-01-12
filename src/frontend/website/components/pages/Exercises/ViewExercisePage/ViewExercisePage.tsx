import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {FC} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {getExercisesById} from '../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {ExerciseViewPagePresenter} from './components/ExerciseViewPagePresenter';

const routeApi = getRouteApi('/exercises/$exerciseId');

export const ViewExercisePage:FC = () => {
  const params = routeApi.useParams();
  const {translations} = useAppPartialTranslation((x) => x.pages.exercise);
  const id = !Number.isNaN(Number(params.exerciseId)) ? Number(params.exerciseId) : 0;
  const response = useQuery({
    queryFn: () => getExercisesById({
      path: {
        id,
      },
    }),
    queryKey: ['exercise', id, translations],
  });
  if (response.isLoading || !response.data) {
    return (
        <PageContainer>
          <AppSpinner/>
        </PageContainer>
    );
  }

  const apiError = response.data?.error;
  if (response.isError || apiError) {
    return (
        <PageContainer>
          <AppApiErrorDisplay error={apiError?.error} />
        </PageContainer>
    );
  }
  const item = response.data.data;

  return (
    <ExerciseViewPagePresenter exercise={item} />
  );
};
