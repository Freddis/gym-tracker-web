import {OpenApiError} from 'snap-on-openapi';
import {ApiErrorCode} from '../types/ApiErrorCode';

export class ApiVersionError extends OpenApiError<ApiErrorCode> {
  constructor() {
    super(ApiErrorCode.ApiVersionMismatch);
  }
}
