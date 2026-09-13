import z from 'zod';
import {ApiErrorCode} from '../types/ApiErrorCode';

export const apiVersionErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(ApiErrorCode.ApiVersionMismatch).openapi({description: 'Code to handle on the frontend'}),
    currentVersion: z.string().openapi({description: 'Current server version of API'}),
  }).openapi({description: 'Error response'}),
});


export type ApiVersionErrorResponse = z.TypeOf<typeof apiVersionErrorResponseValidator>
