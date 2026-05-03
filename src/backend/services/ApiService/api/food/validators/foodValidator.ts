import {object, string, number, date} from 'zod';
import {imageValidator} from '../../images/validators/imageValidator';

export const foodValidator = object({
  id: string().openapi({description: 'Id of the food'}),
  name: string().openapi({description: 'Name of the food'}),
  description: string().nullable().openapi({description: 'Description of the food'}),
  image: imageValidator.nullable().openapi({description: 'Image of the food'}),
  calories: number().openapi({description: 'Calories of the food'}),
  protein: number().openapi({description: 'Protein of the food'}),
  carbs: number().openapi({description: 'Carbs of the food'}),
  fat: number().openapi({description: 'Fat of the food'}),
  servingSize: number().nullable().openapi({description: 'Serving size of the food'}),
  servingSizeUnit: string().openapi({description: 'Serving size unit of the food'}),
  createdAt: date().openapi({description: 'Date the creation'}),
  updatedAt: date().nullable().openapi({description: 'Date of last update'}),
}).openapi({ref: 'Food', description: 'Food record'});
