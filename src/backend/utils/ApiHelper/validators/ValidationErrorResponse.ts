import {z} from 'zod';
import {ApiErrorCode} from '../types/ApiErrorCode';
import {ValidationLocations} from 'strap-on-openapi';
import {fieldErrorValidator} from './FieldError';


export const validationErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(ApiErrorCode.ValidationFailed).openapi({description: 'Code to handle on the frontend'}),
    fieldErrors: fieldErrorValidator.array(),
    location: z.nativeEnum(ValidationLocations),
  }).openapi({description: 'Error response'}),
});

export type ValidationErrorResponseValidator = typeof validationErrorResponseValidator
export type ValidationErrorResponse = z.TypeOf<ValidationErrorResponseValidator>
