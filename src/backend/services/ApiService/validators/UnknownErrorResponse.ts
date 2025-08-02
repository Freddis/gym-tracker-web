import {z} from 'zod';
import {ApiErrorCode} from '../types/ApiErrorCode';

export const unknownErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(`${ApiErrorCode.UnknownError}`).openapi({description: 'Code to handle on the frontend'}),
  }).openapi({description: 'Error response', ref: 'UnknownErrorResponse'}),
});

export type UnknownErrorResponseValidator = typeof unknownErrorResponseValidator
export type UnknownErrorResponse = z.TypeOf<UnknownErrorResponseValidator>
