import {z} from 'zod';
import {OpenApiActionErrorCode} from '../../enums/OpenApiActionErrorCode';
import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';
import {extendZodWithOpenApi} from 'zod-openapi';
extendZodWithOpenApi(z);

export const openApiActionErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(OpenApiErrorCode.actionError).openapi({description: 'Code to handle on the frontend.'}),
    actionErrorCode: z.nativeEnum(OpenApiActionErrorCode).openapi({description: 'Subcategory of error.'}),
    humanReadable: z.string().openapi({description: 'Description of the error. Can be safely displayed.'}),
  }),
}).openapi({description: 'Action Error'});

export type OpenApiActionErrorResponseValidator = typeof openApiActionErrorResponseValidator
export type OpenApiActionError = z.TypeOf<OpenApiActionErrorResponseValidator>
