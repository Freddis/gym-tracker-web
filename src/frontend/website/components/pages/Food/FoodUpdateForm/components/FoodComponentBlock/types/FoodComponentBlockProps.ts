import {FoodComponent} from '../../../../../../../../common/utils/openapi-client';
import {Wrapped} from '../../../../../../../utils/wrap';

export interface FoodComponentBlockProps {
  item: Wrapped<FoodComponent>;
  onRemove: (ingredient: Wrapped<FoodComponent>) => void;
  onUpdate: (ingredient: Wrapped<FoodComponent>) => void;
}
