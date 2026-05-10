import {ApiResponse} from '../../../../../../../../common/types/ApiResponse';
import {GetFoodListResponse, GetFoodListError, User} from '../../../../../../../../common/utils/openapi-client';

export interface FoodListPagePresenterProps {
  filters: {
    search?: string;
  };
  user: User;
  response: ApiResponse<GetFoodListResponse, GetFoodListError>;
  onPageChanged: (page: number) => void;
  onSearch: (search: string | null) => void;
  onClearFilters: () => void;
}
