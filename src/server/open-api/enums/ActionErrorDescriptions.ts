import {OpenApiActionErrorCode} from './OpenApiActionErrorCode';

export type ActionErrorDescriptions = {
  [key in OpenApiActionErrorCode]: string
}

export const actionErrorDescriptions: ActionErrorDescriptions = {
  [OpenApiActionErrorCode.cannotCreateDeposit]: 'Cannot create a deposit',
  [OpenApiActionErrorCode.invalidPassword]: 'Invalid password',
  [OpenApiActionErrorCode.invalidTotpCode]: 'Invalid two-factor authentication (2FA) code',
  [OpenApiActionErrorCode.totpNotEnabled]: 'Two-factor authentication (2FA) is not enabled for this account',
  [OpenApiActionErrorCode.totpAlreadyEnabled]: 'Two-factor authentication (2FA) is already enabled for this account',
};
