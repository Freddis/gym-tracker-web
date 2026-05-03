import {object, string, number} from 'zod';
import {imageUpsertDtoValidator} from '../../entries/validators/imageUpsertDtoValidator';
import {RouteFactory} from '../../../utils/RouteFactory';


export const foodUpsertDtoValidator = object({
  id: string().openapi({description: 'Id of the food'}),
  name: string().openapi({description: 'Name of the food'}),
  description: string().nullable().openapi({description: 'Description of the food'}),
  image: imageUpsertDtoValidator.optional().nullable().openapi({description: 'Image of the food'}),
  // calories: number().openapi({description: 'Calories of the food'}),
  protein: number().openapi({description: 'Protein of the food'}),
  carbs: number().openapi({description: 'Carbs of the food'}),
  fat: number().openapi({description: 'Fat of the food'}),
  servingSize: number().nullable().openapi({description: 'Serving size of the food'}),
  servingSizeUnit: string().openapi({description: 'Serving size unit of the food'}),
  createdAt: RouteFactory.validators.strings.datetime.openapi({description: 'Date the creation'}),
  updatedAt: RouteFactory.validators.strings.datetime.nullable().openapi({description: 'Date of last update'}),
  deletedAt: RouteFactory.validators.strings.datetime.nullable().openapi({description: 'Date of deletion'}),
}).openapi({ref: 'FoodUpsertDto', description: 'Food record to upsert'});
