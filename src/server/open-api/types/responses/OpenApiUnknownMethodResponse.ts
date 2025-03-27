import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';
import {OpenApiBaseErrorResponse} from './OpenApiBaseErrorResponse';

export interface OpenApiUnknownMethodResponse extends OpenApiBaseErrorResponse {
  code: OpenApiErrorCode.unknownMethodError
  humanReadable?: string
}
