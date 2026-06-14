import {number, object, string, TypeOf} from 'zod';

export const FatsecretRecipeSchema = object({
  id: number(),

  title: string(),
  status: string(),
  source: string(),

  shortDescription: string().nullable(),

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

export type FatsecretRecipe = TypeOf<typeof FatsecretRecipeSchema>;
