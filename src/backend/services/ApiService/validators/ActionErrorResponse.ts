import {z} from 'zod';
import {extendZodWithOpenApi} from 'zod-openapi';
import {ActionErrorCode} from '../types/ActionErrorCode';
import {ApiErrorCode} from '../types/ApiErrorCode';
extendZodWithOpenApi(z);

export const actionErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(ApiErrorCode.ActionError).openapi({description: 'Code to handle on the frontend.'}),
    actionErrorCode: z.nativeEnum(ActionErrorCode).openapi({description: 'Subcategory of error.'}),
    humanReadable: z.string().openapi({description: 'Description of the error. Can be safely displayed.'}),
  }),
}).openapi({description: 'Action Error'});

export type ActionErrorResponseValidator = typeof actionErrorResponseValidator
export type ActionErrorResponse = z.TypeOf<ActionErrorResponseValidator>
