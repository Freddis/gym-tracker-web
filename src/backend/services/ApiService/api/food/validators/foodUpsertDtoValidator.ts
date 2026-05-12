import {object, string, number, boolean} from 'zod';
import {imageUpsertDtoValidator} from '../../entries/validators/imageUpsertDtoValidator';
import {RouteFactory} from '../../../utils/RouteFactory';
import {foodAmountUnitValidator} from './foodAmountUnitValidator';
import {servingSizeUnitValidator} from './servingSizeUnitValidator';

const baseFoodUpsertDtoValidator = object({
  id: string().openapi({description: 'Id of the food'}),
  name: string().openapi({description: 'Name of the food'}),
  description: string().nullable().openapi({description: 'Description of the food'}),
  image: imageUpsertDtoValidator.optional().nullable().openapi({description: 'Image of the food'}),
  protein: number().openapi({description: 'Protein of the food'}),
  carbs: number().openapi({description: 'Carbs of the food'}),
  fat: number().openapi({description: 'Fat of the food'}),
  isMeal: boolean().openapi({description: 'Is the food a dish'}),
  servingSize: number().nullable().openapi({description: 'Serving size of the food'}),
  servingSizeUnit: servingSizeUnitValidator.openapi({description: 'Serving size unit of the food'}),
  createdAt: RouteFactory.validators.strings.datetime.openapi({description: 'Date the creation'}),
  updatedAt: RouteFactory.validators.strings.datetime.nullable().openapi({description: 'Date of last update'}),
  deletedAt: RouteFactory.validators.strings.datetime.nullable().openapi({description: 'Date of deletion'}),
});

export const foodComponentDtoValidator = object({
  food: baseFoodUpsertDtoValidator.pick({id: true}).openapi({description: 'Food to add as component'}),
  amount: number().openapi({description: 'Amount of the food component'}),
  unit: foodAmountUnitValidator.openapi({description: 'Unit of the food component'}),
}).openapi({ref: 'FoodComponentUpsertDto', description: 'Food component to upsert'});

export const foodUpsertDtoValidator = baseFoodUpsertDtoValidator.extend({
  components: foodComponentDtoValidator.array().openapi({description: 'Components of the food'}),
}).openapi({ref: 'FoodUpsertDto', description: 'Food record to upsert'});
