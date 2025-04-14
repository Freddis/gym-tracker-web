import {OpenApiActionErrorResponse} from './OpenApiActionErrorResponse';
import {OpenApiBaseErrorResponse} from './OpenApiBaseErrorResponse';
import {OpenApiPermissionErrorResponse} from './OpenApiPermissionErrorResponse';
import {OpenApiUnknownMethodResponse} from './OpenApiUnknownMethodResponse';
import {OpenApiValidationErrorResponse} from './OpenApiValidationErrorResponse';

export interface OpenApiErrorResponse {
  error:
  | OpenApiActionErrorResponse
  | OpenApiValidationErrorResponse
  | OpenApiPermissionErrorResponse
  | OpenApiUnknownMethodResponse
  | OpenApiBaseErrorResponse
}

