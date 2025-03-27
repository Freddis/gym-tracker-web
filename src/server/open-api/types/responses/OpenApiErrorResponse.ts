import {OpenApiActionErrorResponse} from './OpenApiActionErrorResponse';
import {OpenApiBaseErrorResponse} from './OpenApiBaseErrorResponse';
import {OpenApiPermissionErrorResponse} from './OpenApiPermissionErrorResponse';
import {OpenApiUnknownMethodResponse} from './OpenApiUnknownMethodResponse';
import {OpenApiValidationErrorResponse} from './OpenApiValidationErrorResponse';

export type OpenApiErrorResponse =
  | OpenApiActionErrorResponse
  | OpenApiValidationErrorResponse
  | OpenApiPermissionErrorResponse
  | OpenApiUnknownMethodResponse
  | OpenApiBaseErrorResponse
