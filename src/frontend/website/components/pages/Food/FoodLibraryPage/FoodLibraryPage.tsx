import {FC} from 'react';
import {FoodListPagePresenter} from '../FoodListPage/components/FoodListPagePresenter/FoodListPagePresenter';
import {useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {api} from '../../../../../common/utils/api';
import {route, RouteId} from '../../../../../common/utils/route';
import {FoodListQueryParams} from '../FoodListPage/components/FoodListPagePresenter/types/FoodListQueryParams';

export const FoodLibraryPage: FC = () => {
  const routeApi = getRouteApi(route(RouteId.FoodLibrary));
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const onPageChanged = (page: number) => {
    navigate({
      search: {
        ...searchParams,
        page,
      },
    });
  };
  const onClearFilters = () => {
    navigate({
      search: {
        ...searchParams,
        search: undefined,
        page: 1,
      },
    });
  };
  const onFilter = (filter: FoodListQueryParams) => {
    navigate({
      search: filter,
    });
  };
  const response = useQuery({
    queryFn: () => api.findFood({
      query: {
        query: searchParams.search,
        page: searchParams.page,
      },
    }),
    queryKey: ['food-list', searchParams],
  });
  return (
      <FoodListPagePresenter
        filters={searchParams}
        response={response}
        onPageChanged={onPageChanged}
        onClearFilters={onClearFilters}
        onFilter={onFilter}
        />
  );

};
