
import {nativeEnum} from 'zod';
import {ServingSizeUnit} from '../../../../FoodService/types/ServingSizeUnit';

export const servingSizeUnitValidator = nativeEnum(ServingSizeUnit).openapi({
  ref: 'ServingSizeUnit',
  description: 'Unit in which the food is measured',
});
