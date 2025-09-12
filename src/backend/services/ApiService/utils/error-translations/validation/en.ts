import {ValidationErrorCode} from '../../../types/ValidationErrorCode';

export const en: Record<ValidationErrorCode, string> = {
  [ValidationErrorCode.WorkoutEndDateBeforeStartDate]: 'Workout cannot end before it started',
  [ValidationErrorCode.IncorrectEmailOrPassword]: 'Incorrect email or password',
  [ValidationErrorCode.PasswordHasToBeLonger]: 'Password must be at least 5 characters long',
  [ValidationErrorCode.InvalidEmail]: 'Invalid Email',
};
