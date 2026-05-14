
import {useQuery} from '@tanstack/react-query';
import {FoodListPagePresenter} from './components/FoodListPagePresenter/FoodListPagePresenter';
import {api} from '../../../../../common/utils/api';
import {getRouteApi} from '@tanstack/react-router';
import {routeId, RouteId} from '../../../../../common/utils/route';
import {useRequiredAuth} from '../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';
import {FoodListQueryParams} from './components/FoodListPagePresenter/types/FoodListQueryParams';

export const FoodListPage = () => {
  const routeApi = getRouteApi(routeId(RouteId.FoodList));
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const {user} = useRequiredAuth();
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
    queryFn: () => api.getFoodList({
      query: searchParams,
    }),
    queryKey: ['food-list', searchParams],
  });
  return (
    <FoodListPagePresenter
      filters={searchParams}
      user={user}
      response={response}
      onPageChanged={onPageChanged}
      onClearFilters={onClearFilters}
      onFilter={onFilter}
      />
  );
};
