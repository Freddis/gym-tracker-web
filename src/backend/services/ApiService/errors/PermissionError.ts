import {OpenApiError} from 'snap-on-openapi';
import {ApiErrorCode} from '../types/ApiErrorCode';
import {Permission} from '../types/Permission';
import {NonEmptyArray} from '../../../types/NonEmptyArray';


export class PermissionError extends OpenApiError<ApiErrorCode> {
  private requiredPermissions: NonEmptyArray<Permission>;
  constructor(requiredPermissions: NonEmptyArray<Permission>) {
    super(ApiErrorCode.MissingPermission);
    this.requiredPermissions = requiredPermissions;
  }

  getRequiredPermissions(): Permission[] {
    return this.requiredPermissions;
  }
}
