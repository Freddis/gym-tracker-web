import {OpenApiActionErrorCode} from './OpenApiActionErrorCode';

export type ActionErrorDescriptions = {
  [key in OpenApiActionErrorCode]: string
}

export const actionErrorDescriptions: ActionErrorDescriptions = {
  [OpenApiActionErrorCode.invalidPassword]: 'Invalid password',
  [OpenApiActionErrorCode.emailAlreadyExists]: 'Email already exists',
};
