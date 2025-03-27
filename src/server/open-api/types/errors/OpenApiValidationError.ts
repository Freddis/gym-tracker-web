import {ZodError} from 'zod';
import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';
import {OpenApiError} from './OpenApiError';
import {ValidationLocations} from '../../enums/ValidationLocations';

export class OpenApiValidationError extends OpenApiError {
  private error: ZodError<unknown>;
  private location: ValidationLocations;

  constructor(error: ZodError<unknown>, location: ValidationLocations) {
    super(OpenApiErrorCode.validationFailed);
    this.error = error;
    this.location = location;
  }

  getZodError() {
    return this.error;
  }

  getLocation() {
    return this.location;
  }
}
