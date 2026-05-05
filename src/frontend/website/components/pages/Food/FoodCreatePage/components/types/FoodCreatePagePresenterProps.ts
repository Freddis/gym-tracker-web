import {Food, FoodUpsertDto} from '../../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../../common/utils/useResponseErrors';

export type FoodCreatePagePresenterProps = {
  isMeal?: boolean;
  errors?: ErrorSlice<Food>;
  onSave: (food: FoodUpsertDto) => void;
};
