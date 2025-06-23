import {OpenApiError} from 'strap-on-openapi';
import {ApiErrorCode} from '../types/ApiErrorCode';
import {ActionErrorCode} from '../types/ActionErrorCode';


export class ActionError extends OpenApiError<ApiErrorCode> {
  private actionErrorCode: ActionErrorCode;

  constructor(actionErrorCode: ActionErrorCode) {
    super(ApiErrorCode.ActionError);
    this.actionErrorCode = actionErrorCode;
  }

  getActionErrorCode() {
    return this.actionErrorCode;
  }

}
