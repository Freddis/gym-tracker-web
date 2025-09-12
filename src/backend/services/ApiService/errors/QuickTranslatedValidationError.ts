import {OpenApiValidationError, OpenApiValidationLocation} from 'snap-on-openapi';
import {ZodRawShape, ZodObject, ZodError} from 'zod';
import {ValidationErrorCode} from '../types/ValidationErrorCode';

export class QuickTranslatedValidationError<
  T extends ZodRawShape,
  K extends keyof T
> extends OpenApiValidationError {
  constructor(schema: ZodObject<T> | undefined, field: K, code: ValidationErrorCode) {
    const zodError = ZodError.create([]);
    zodError.addIssue({
      code: 'custom',
      path: [field.toString()],
      message: code,
    });
    super(zodError, OpenApiValidationLocation.Body);
  }
}
