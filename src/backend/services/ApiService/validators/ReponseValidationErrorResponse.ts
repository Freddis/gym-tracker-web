import {z} from 'zod';
import {ApiErrorCode} from '../types/ApiErrorCode';
import {ValidationLocations} from 'strap-on-openapi';
import {fieldErrorValidator} from './FieldError';


export const responseValidationErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(ApiErrorCode.ResponseValidationFailed).openapi({description: 'Code to handle on the frontend'}),
    fieldErrors: fieldErrorValidator.array(),
    location: z.literal(ValidationLocations.response),
  }).openapi({description: 'Error response'}),
});

export type ResponseValidationErrorResponseValidator = typeof responseValidationErrorResponseValidator
export type ResponseValidationErrorResponse = z.TypeOf<ResponseValidationErrorResponseValidator>
