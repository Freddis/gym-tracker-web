import {ApiResponse} from '../../../../../../../../common/types/ApiResponse';
import {GetFoodListResponse, GetFoodListError} from '../../../../../../../../common/utils/openapi-client';

export interface FoodListPagePresenterProps {
  filters: {
    search?: string;
  };
  response: ApiResponse<GetFoodListResponse, GetFoodListError>;
  onPageChanged: (page: number) => void;
  onSearch: (search: string | null) => void;
  onClearFilters: () => void;
}
