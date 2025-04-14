import {z} from 'zod';
import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';


export const openApiBaseFieldErrorValidator = z.object({
  field: z.string().openapi({description: 'Name of the field'}),
  message: z.string().openapi({description: 'Error message'}),
}).openapi({description: 'Field error'});

export const openApiFieldErrorValidator = openApiBaseFieldErrorValidator.extend({
  fieldErrors: z.array(openApiBaseFieldErrorValidator),
});

export type OpenApiFieldErrorValidator = typeof openApiBaseFieldErrorValidator
export type OpenApiFieldError = z.TypeOf<typeof openApiBaseFieldErrorValidator>


export const openApiValidationErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(OpenApiErrorCode.validationFailed).openapi({description: 'Code to handle on the frontend.'}),
    fieldErrors: z.array(openApiFieldErrorValidator).optional(),
  }),
}).openapi({description: 'Validation Error Response'});

export type OpenApiValidationErrorResponseValidator = typeof openApiValidationErrorResponseValidator
export type OpenApiValidationErrorResponse = z.TypeOf<OpenApiValidationErrorResponseValidator>
