import {OpenApiError} from 'strap-on-openapi';
import {ApiErrorCode} from '../types/ApiErrorCode';

export class ApiError extends OpenApiError<ApiErrorCode> {

}
