import {OpenApiError} from 'snap-on-openapi';
import {ApiErrorCode} from '../types/ApiErrorCode';

export class ApiError extends OpenApiError<ApiErrorCode> {

}
