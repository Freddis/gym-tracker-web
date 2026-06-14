import {FC} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {api} from '../../../../../common/utils/api';
import {route, RouteId} from '../../../../../common/utils/route';
import {FoodListQueryParams} from '../FoodListPage/components/FoodListPagePresenter/types/FoodListQueryParams';
import {FoodLibraryPagePresenter} from './components/FoodLibraryPagePresenter';

export const FoodLibraryPage: FC = () => {
  const routeApi = getRouteApi(route(RouteId.FoodLibrary));
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const onClearFilters = () => {
    navigate({
      search: {
        ...searchParams,
        search: undefined,
      },
    });
  };
  const onFilter = (filter: FoodListQueryParams) => {
    navigate({
      search: filter,
    });
  };
  const response = useInfiniteQuery({
    queryFn: ({pageParam}) => api.findFood({
      query: {
        query: searchParams.search,
        cursor: pageParam,
      },
    }),
    queryKey: ['food-list', searchParams],
    getNextPageParam: (lastPage) => {
      return lastPage.data?.info.nextCursor ?? null;
    },
    initialPageParam: searchParams.cursor,
  });

  function onRequireNextPage(): void {
    if (response.hasNextPage && !response.isFetchingNextPage) {
      response.fetchNextPage();
    }
  }

  return (
      <FoodLibraryPagePresenter
        filters={searchParams}
        response={response}
        onClearFilters={onClearFilters}
        onFilter={onFilter}
        onRequireNextPage={onRequireNextPage}
        />
  );

};
