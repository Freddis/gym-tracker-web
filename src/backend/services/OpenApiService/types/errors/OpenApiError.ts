import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';

export class OpenApiError extends Error {
  private code: OpenApiErrorCode;
  constructor(code: OpenApiErrorCode) {
    super(code);
    this.code = code;
  }
  getOpenApiCode() {
    return this.code;
  }
}
