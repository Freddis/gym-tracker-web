
import {useQuery} from '@tanstack/react-query';
import {FoodListPagePresenter} from './components/FoodListPagePresenter/FoodListPagePresenter';
import {api} from '../../../../../common/utils/api';
import {getRouteApi} from '@tanstack/react-router';
import {routeId, RouteId} from '../../../../../common/utils/route';


export const FoodListPage = () => {
  const routeApi = getRouteApi(routeId(RouteId.FoodList));
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
  const onSearch = (search: string | null) => {
    console.log(search);
    navigate({
      search: {
        ...searchParams,
        search: search ?? undefined,
        page: 1,
      },
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
      response={response}
      onPageChanged={onPageChanged}
      onClearFilters={onClearFilters}
      onSearch={onSearch}
      />
  );
};
