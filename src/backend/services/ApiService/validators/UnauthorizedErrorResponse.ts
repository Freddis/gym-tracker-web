import {z} from 'zod';
import {ApiErrorCode} from '../types/ApiErrorCode';

export const unauthorizedErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(ApiErrorCode.Unauthorized).openapi({description: 'Code to handle on the frontend'}),
  }).openapi({description: 'Error response'}),
});

export type UnauthorizedErrorResponseValidator = typeof unauthorizedErrorResponseValidator;
export type UnauthorizedErrorResponse = z.TypeOf<UnauthorizedErrorResponseValidator>
