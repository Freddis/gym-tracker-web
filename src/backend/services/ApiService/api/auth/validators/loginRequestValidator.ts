import {object, string} from 'zod';
import {ValidationErrorCode} from '../../../types/ValidationErrorCode';

export const loginRequestValidator = object({
  email: string()
        .email(ValidationErrorCode.InvalidEmail)
        .openapi({description: 'Email for the user account'}),
  password: string()
        .min(5, ValidationErrorCode.PasswordHasToBeLonger)
        .openapi({description: 'Password for the user account'}),
});
