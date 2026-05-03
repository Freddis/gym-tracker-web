import {ApiResponse} from '../../../../../../../../common/types/ApiResponse';
import {GetFoodResponse, GetFoodError, Food, FoodUpsertDto} from '../../../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../../../common/utils/useResponseErrors';

export type FoodUpdatePagePresenterProps = {
  response: ApiResponse<GetFoodResponse, GetFoodError>;
  errors?: ErrorSlice<Food>;
  onSave: (food: FoodUpsertDto) => void;
  onDelete: (food: FoodUpsertDto) => void;
};
