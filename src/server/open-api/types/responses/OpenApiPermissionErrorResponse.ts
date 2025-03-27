import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';
import {Permission} from '../Permission';
import {OpenApiBaseErrorResponse} from './OpenApiBaseErrorResponse';

export interface OpenApiPermissionErrorResponse extends OpenApiBaseErrorResponse {
  code: OpenApiErrorCode.missingPermission
  requiredPermissions: Permission[]
}
