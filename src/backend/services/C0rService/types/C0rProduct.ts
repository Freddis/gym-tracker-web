
import {any, boolean, number, object, string, TypeOf} from 'zod';
// {
//   id: 'p_1449352',
//   barcode: '0815196016298',
//   name: 'Unicorn Popcorn',
//   name_ru: null,
//   name_ar: null,
//   brands: 'Popcornopolis',
//   categories: 'Snacks, Sweet snacks, Popcorn, Sugared popcorn',
//   serving_g: null,
//   is_halal: null,
//   is_vegan: null,
//   nutrition: {
//     calories: 466.66666666667,
//     proteins: 3.3333333333333,
//     fats: 20,
//     carbs: 76.666666666667,
//     fiber: 3.3333333333333,
//     sugar: 53.333333333333,
//     sodium: 0.366666666666668,
//     nutrients: null
//   },
//   food_group: 'sweets',
//   image_url: 'https://images.c0r.ai/images/products/081/519/601/6298/1.400.jpg',
//   source: 'database',
//   verified: false,
//   enriched_by_ai: true
// },


/** -----------------------------
 * Nutrition
 * ----------------------------- */
const NutritionSchema = object({
  calories: number(),
  proteins: number(),
  fats: number(),
  carbs: number(),

  fiber: number().nullable(),
  sugar: number().nullable(),
  sodium: number().nullable(),

  nutrients: any().nullable(),
});

/** -----------------------------
 * Product Item
 * ----------------------------- */
export const C0rProductSchema = object({
  id: string(),
  barcode: string().nullable(),
  name: string(),
  name_ru: string().nullable(),
  name_ar: string().nullable(),
  brands: string().nullable(),
  categories: string().nullable(),
  serving_g: number().nullable(),
  is_halal: boolean().nullable(),
  is_vegan: boolean().nullable(),
  nutrition: NutritionSchema,
  food_group: string(),

  image_url: string().url(),

  source: string(),
  verified: boolean(),
  enriched_by_ai: boolean(),
});

export type C0rProduct = TypeOf<typeof C0rProductSchema>;
