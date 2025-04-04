import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';
import {NonEmptyArray} from '../NonEmptyArray';
import {Permission} from '../Permission';
import {OpenApiError} from './OpenApiError';

export class OpenApiPermissionError extends OpenApiError {
  private requiredPermissions: NonEmptyArray<Permission>;
  constructor(requiredPermissions: NonEmptyArray<Permission>) {
    super(OpenApiErrorCode.unauthorized);
    this.requiredPermissions = requiredPermissions;
  }

  getRequiredPermissions(): Permission[] {
    return this.requiredPermissions;
  }
}
