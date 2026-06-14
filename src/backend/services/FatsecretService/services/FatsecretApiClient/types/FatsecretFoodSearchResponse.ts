import {array, number, object, TypeOf} from 'zod';
import {FatsecretRecipeSchema} from './FatsecretRecipe';

export const FatsecretFoodSearchResponseSchema = object({
  totalresults: number(),
  currentpage: number(),
  resultsPerPage: number(),
  recipes: array(FatsecretRecipeSchema),
});


export type FatsecretFoodSearchResponse = TypeOf<typeof FatsecretFoodSearchResponseSchema>;
