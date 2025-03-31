import {actionErrorDescriptions} from '../../enums/ActionErrorDescriptions';
import {OpenApiActionErrorCode} from '../../enums/OpenApiActionErrorCode';
import {OpenApiErrorCode} from '../../enums/OpenApiErrorCode';
import {OpenApiError} from './OpenApiError';

export class OpenApiActionError extends OpenApiError {
  private clientFriendlyMessage: string;
  private actionErrorCode: OpenApiActionErrorCode;

  constructor(actionErrorCode: OpenApiActionErrorCode) {
    super(OpenApiErrorCode.actionError);
    this.clientFriendlyMessage = actionErrorDescriptions[actionErrorCode];
    this.actionErrorCode = actionErrorCode;
  }

  getOpenApiCode(): OpenApiErrorCode.actionError {
    return OpenApiErrorCode.actionError;
  }
  getActionErrorCode() {
    return this.actionErrorCode;
  }

  getClientFriendlyMessage(): string {
    return this.clientFriendlyMessage;
  }
}
