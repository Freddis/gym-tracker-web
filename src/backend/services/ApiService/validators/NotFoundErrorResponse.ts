import {z} from 'zod';
import {ApiErrorCode} from '../types/ApiErrorCode';

export const notFoundErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(`${ApiErrorCode.NotFound}`).openapi({description: 'Code to handle on the frontend'}),
  }).openapi({description: 'Error response'}),
});

export type NotFoundErrorResponseValidator = typeof notFoundErrorResponseValidator
export type NotFoundErrorResponse = z.TypeOf<NotFoundErrorResponseValidator>
