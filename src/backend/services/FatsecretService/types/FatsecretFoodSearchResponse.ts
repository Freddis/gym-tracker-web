import {array, number, object, string, TypeOf} from 'zod';

/** -----------------------------
 * Recipe item
 * ----------------------------- */
const RecipeSchema = object({
  id: number(),

  title: string(),
  status: string(),
  source: string(),

  shortDescription: string(),

  energyPerPortion: number(),
  carbohydratePerPortion: number(),
  proteinPerPortion: number(),
  fatPerPortion: number(),

  gramsPerPortion: number(),

  userName: string(),

  pathName: string(),

  defaultPortionID: number(),
  defaultPortionAmount: number(),
  defaultPortionDescription: string(),

  defaultEnergyPerPortion: number(),
});

/** -----------------------------
 * Root response
 * ----------------------------- */
export const FatsecretFoodSearchResponseSchema = object({
  totalresults: number(),
  currentpage: number(),
  resultsPerPage: number(),
  recipes: array(RecipeSchema),
});


export type FatsecretFoodSearchResponse = TypeOf<typeof FatsecretFoodSearchResponseSchema>;
