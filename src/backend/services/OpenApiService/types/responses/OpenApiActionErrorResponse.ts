import {OpenApiActionErrorCode} from '../../enums/OpenApiActionErrorCode';
import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';
import {OpenApiBaseErrorResponse} from './OpenApiBaseErrorResponse';

export interface OpenApiActionErrorResponse extends OpenApiBaseErrorResponse {
  code: OpenApiErrorCode.actionError
  actionErrorCode: OpenApiActionErrorCode
  humanReadable: string
}
