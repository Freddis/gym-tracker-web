import {getRouteApi} from '@tanstack/react-router';
import {FC} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getWorkoutTypes} from '../../../../../common/utils/openapi-client';
import {WorkoutTypeListPagePresenter} from './components/WorkoutTypeListPagePresenter';
import {useRequiredAuth} from '../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';

const routeApi = getRouteApi('/workouts/types/');
export const WorkoutTypeListPage: FC = () => {
  const searchParams = routeApi.useSearch();
  const {user} = useRequiredAuth();
  const response = useInfiniteQuery({
    queryFn: ({pageParam}) => getWorkoutTypes({
      query: {
        page: pageParam,
      },
    }),
    queryKey: ['workout-types', searchParams],
    getNextPageParam: (lastPage) => {
      if (!lastPage.data) {
        return null;
      }
      const left = lastPage.data.info.count - lastPage.data.info.page * lastPage.data.info.pageSize;
      if (left <= 0) {
        return null;
      }
      return lastPage.data.info.page + 1;
    },
    initialPageParam: 1,
  });

  const onRequireNextPage = () => {
    if (response.hasNextPage && !response.isFetchingNextPage) {
      response.fetchNextPage();
    }
  };
  return (
    <WorkoutTypeListPagePresenter response={response} user={user} onRequireNextPage={onRequireNextPage} />
  );
};
