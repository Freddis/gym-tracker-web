import {object, string, number, date, lazy, ZodType, boolean} from 'zod';
import {imageValidator} from '../../images/validators/imageValidator';
import {Food} from '../../../../FoodService/types/Food';
import {foodAmountUnitValidator} from './foodAmountUnitValidator';
import {servingSizeUnitValidator} from './servingSizeUnitValidator';
import {entryVisibilityValidator} from '../../entries/validators/entryVisibilityValidator';

const baseFoodValidator = object({
  id: string().openapi({description: 'Id of the food'}),
  name: string().openapi({description: 'Name of the food'}),
  description: string().nullable().openapi({description: 'Description of the food'}),
  image: imageValidator.nullable().openapi({description: 'Image of the food'}),
  calories: number().openapi({description: 'Calories of the food'}),
  protein: number().openapi({description: 'Protein of the food'}),
  carbs: number().openapi({description: 'Carbs of the food'}),
  fat: number().openapi({description: 'Fat of the food'}),
  servingSize: number().nullable().openapi({description: 'Serving size of the food'}),
  servingSizeUnit: servingSizeUnitValidator.openapi({description: 'Unit in which the food is measured'}),
  visibility: entryVisibilityValidator.openapi({description: 'Visibility of the food'}),
  barcode: number().nullable().openapi({description: 'Barcode of the food'}),
  copiedFromId: string().nullable().openapi({description: 'Id of the food that was copied from'}),
  createdAt: date().openapi({description: 'Date the creation'}),
  updatedAt: date().nullable().openapi({description: 'Date of last update'}),
  deletedAt: date().nullable().openapi({description: 'Date of deletion'}),
  isMeal: boolean().openapi({description: 'Is the food a meal'}),
  brand: string().nullable().openapi({description: 'Brand of the food'}),
});

const foodComponentValidator = object({
  food: lazy(() => foodValidator).openapi({description: 'Ingredient food'}),
  amount: number().openapi({description: 'Amount of the food component'}),
  unit: foodAmountUnitValidator.openapi({description: 'Unit of the food component'}),
}).openapi({ref: 'FoodComponent', description: 'Food component'});


export const foodValidator: ZodType<Food> = lazy(() =>
  baseFoodValidator.extend({
    components: foodComponentValidator.array().openapi({
      description: 'Components of the food',
    }),
  })

).openapi({ref: 'Food', description: 'Food record'});

