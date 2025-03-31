import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';
import {OpenApiFieldError} from '../errors/OpenApiFieldError';
import {OpenApiBaseErrorResponse} from './OpenApiBaseErrorResponse';

export interface OpenApiValidationErrorResponse extends OpenApiBaseErrorResponse {
  code: OpenApiErrorCode.validationFailed
  fieldErrors?: OpenApiFieldError[]
  responseValidationErrors?: OpenApiFieldError[]
}
