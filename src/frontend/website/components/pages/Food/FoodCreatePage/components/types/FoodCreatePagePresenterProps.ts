import {Food, FoodUpsertDto} from '../../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../../common/utils/useResponseErrors';

export type FoodCreatePagePresenterProps = {
  errors?: ErrorSlice<Food>;
  onSave: (food: FoodUpsertDto) => void;
};
