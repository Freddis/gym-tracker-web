import {ApiResponse} from '../../../../../../../../common/types/ApiResponse';
import {GetFoodListResponse, GetFoodListError, User} from '../../../../../../../../common/utils/openapi-client';
import {FoodListQueryParams} from './FoodListQueryParams';

export interface FoodListPagePresenterProps {
  filters: FoodListQueryParams
  user?: User;
  response: ApiResponse<GetFoodListResponse, GetFoodListError>;
  onPageChanged: (page: number) => void;
  onFilter: (filter: FoodListQueryParams) => void;
  onClearFilters: () => void;
}
