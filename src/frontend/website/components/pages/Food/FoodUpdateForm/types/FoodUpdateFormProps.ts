import {Food, FoodUpsertDto} from '../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../common/utils/useResponseErrors';

export type FoodUpdateFormProps = {
  food: Food;
  errors?: ErrorSlice<Food>;
  onSubmit: (food: FoodUpsertDto) => void;
};
