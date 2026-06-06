import {literal, object, string, TypeOf, discriminatedUnion} from 'zod';
import {C0rProductSchema} from './C0rProduct';

export const C0rBarcodeSearchSuccessfulResponseSchema = object({
  found: literal(true),
  barcode: string(),
  product: C0rProductSchema,
});
export const C0rBarcodeSearchUnsuccessfulResponseSchema = object({
  found: literal(false),
  barcode: string(),
  product: literal(null),
});
export const C0rBarcodeSearchResponseSchema = discriminatedUnion('found', [
  C0rBarcodeSearchSuccessfulResponseSchema,
  C0rBarcodeSearchUnsuccessfulResponseSchema,
]);
export type C0rBarcodeSearchResponse= TypeOf<typeof C0rBarcodeSearchResponseSchema>;
