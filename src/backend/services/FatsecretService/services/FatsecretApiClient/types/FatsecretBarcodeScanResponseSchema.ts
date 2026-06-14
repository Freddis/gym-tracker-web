import {boolean, number, object, TypeOf} from 'zod';

export const FatsecretBarcodeScanResponseSchema = object({
  foodId: number().nullable(),
  barcodeId: number().nullable(),
  shouldPrompt: boolean().nullable(),
});
export type FatsecretBarcodeScanResponse = TypeOf<typeof FatsecretBarcodeScanResponseSchema>;

