import {object, number, string, array, TypeOf} from 'zod';
import {C0rProductSchema} from './C0rProduct';
// {
//   results: [
//   {
//   id: 'c_08434408-fc94-43b2-8e43-4d6918cc4cc7',
//   barcode: null,
//   name: 'Ржаные хлопья',
//   name_ru: 'Ржаные хлопья',
//   name_ar: null,
//   brands: null,
//   categories: null,
//   serving_g: null,
//   is_halal: null,
//   is_vegan: null,
//   nutrition: {
//     calories: 343,
//     proteins: 6.4,
//     fats: 3.2,
//     carbs: 82.6,
//     fiber: null,
//     sugar: null,
//     sodium: null,
//     nutrients: null
//   },
//   food_group: 'other',
//   image_url: 'https://images.c0r.ai/images/curated/08434408-fc94-43b2-8e43-4d6918cc4cc7.png',
//   source: 'curated',
//   verified: true,
//   enriched_by_ai: false
//   },
//   {
//   id: 'p_923882',
//   barcode: '1000033292501',
//   name: 'Unicorn',
//   name_ru: null,
//   name_ar: null,
//   brands: '',
//   categories: '',
//   serving_g: null,
//   is_halal: null,
//   is_vegan: null,
//   nutrition: {
//     calories: 320,
//     proteins: 0,
//     fats: 0,
//     carbs: 80,
//     fiber: null,
//     sugar: 67,
//     sodium: 0,
//     nutrients: null
//   },
//   food_group: 'vegetables',
//   image_url: 'https://images.c0r.ai/images/products/100/003/329/2501/1.400.jpg',
//   source: 'database',
//   verified: false,
//   enriched_by_ai: true
//   },
//   {
//   id: 'u_2484381',
//   barcode: '2484381',
//   name: 'UNICORN CAKE',
//   name_ru: null,
//   name_ar: null,
//   brands: 'Rich Products Corporation',
//   categories: 'Cakes, Cupcakes, Snack Cakes',
//   serving_g: null,
//   is_halal: null,
//   is_vegan: null,
//   nutrition: {
//     calories: 430,
//     proteins: 2.53,
//     fats: 17.7,
//     carbs: 64.6,
//     fiber: null,
//     sugar: null,
//     sodium: null,
//     nutrients: null
//   },
//   food_group: 'Cakes, Cupcakes, Snack Cakes',
//   image_url: 'https://images.c0r.ai/images/curated/0dd1cada-bad4-4054-9bfb-c70d3fd071ce.png',
//   source: 'database',
//   verified: false,
//   enriched_by_ai: false
//   },
//   {
//   id: 'p_989638',
//   barcode: '5033904006910',
//   name: 'Unicorn Pops',
//   name_ru: null,
//   name_ar: null,
//   brands: '',
//   categories: '',
//   serving_g: null,
//   is_halal: null,
//   is_vegan: null,
//   nutrition: {
//     calories: 380,
//     proteins: 0,
//     fats: 0,
//     carbs: 95,
//     fiber: null,
//     sugar: 71,
//     sodium: 0,
//     nutrients: null
//   },
//   food_group: 'vegetables',
//   image_url: 'https://images.c0r.ai/images/products/503/390/400/6910/1.400.jpg',
//   source: 'database',
//   verified: false,
//   enriched_by_ai: true
//   },
//   {
//   ],
//   total: 10,
//   query: 'Unicorn хлопья',
//   lang: 'en',
//   region: null,
//   plan: 'developer'
//   }

export const C0rSearchResponseSchema = object({
  results: array(C0rProductSchema),

  total: number(),
  query: string(),

  lang: string(),

  region: string().nullable(),

  plan: string(),
});
export type C0rSearchResponse = TypeOf<typeof C0rSearchResponseSchema>;
