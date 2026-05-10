import {object, string} from 'zod';

export const changePasswordRequestValidator = object({
  oldPassword: string().min(5).openapi({description: 'Old password of the user'}),
  newPassword: string().min(5).openapi({description: 'New password of the user'}),
  confirmation: string().min(5).openapi({description: 'Confirmation of the new password'}),
}).openapi({
  ref: 'ChangePasswordRequest',
  description: 'Request to change the password of the user',
});
