import {FC, useContext} from 'react';
import {getRouteApi} from '@tanstack/react-router';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getExercisesBuiltIn, GetExercisesBuiltInData} from '../../../../../common/utils/openapi-client';
import {LanguageContext} from '../../../../../common/components/layout/LanguageProvider/context/LanguageContext';
import {ExerciseLibraryPagePresenter} from './components/ExerciseLibraryPagePresenter/ExerciseLibraryPagePresenter';
import {ExerciseLibraryPageState} from './components/ExerciseLibraryPagePresenter/types/ExerciseLibraryPageState';
import {route, RouteId} from '../../../../../common/utils/route';

const routeApi = getRouteApi(route(RouteId.ExerciseLibrary));

export const ExerciseLibraryPage: FC = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const langauge = useContext(LanguageContext).language;
  const query: GetExercisesBuiltInData['query'] = {
    filter: searchParams.search,
    muscle: searchParams.muscles, // <=diff and I want to keep it like that as a sample!
    equipment: searchParams.equipment,
  };

  const response = useInfiniteQuery({
    queryFn: ({pageParam}) => getExercisesBuiltIn({
      query: {
        ...query,
        page: pageParam,
      },
    }),
    queryKey: [searchParams, 'exercises', langauge],
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

  const fetchNextPage = () => {
    if (response.hasNextPage && !response.isFetchingNextPage) {
      response.fetchNextPage();
    }
  };
  const items = response.data?.pages.flatMap((x) => x.data?.items).filter((x) => x !== undefined) ?? [];
  const apiError = response.data?.pages.find((x) => x.error !== undefined)?.error;
  const state: ExerciseLibraryPageState = (() => {
    if (response.isError || apiError) {
      return ExerciseLibraryPageState.Error;
    }
    return response.isPending ? ExerciseLibraryPageState.Loading : ExerciseLibraryPageState.Success;
  })();

  return (
    <ExerciseLibraryPagePresenter
      route={RouteId.ExerciseLibrary}
      filter={searchParams}
      onFilter={(filter) => navigate({search: filter})}
      onNextPage={fetchNextPage}
      state={{
        status: state,
        isLoadingNextPage: response.isFetchingNextPage,
      }}
      apiError={apiError}
      items={items}
    />
  );
};
