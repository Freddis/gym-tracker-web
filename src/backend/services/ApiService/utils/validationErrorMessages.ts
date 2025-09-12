import {ValidationErrorCode} from '../types/ValidationErrorCode';

export const validationErrorMessages: Record<ValidationErrorCode, string> = {
  [ValidationErrorCode.WorkoutEndDateBeforeStartDate]: 'Workout cannot end before it started',
  [ValidationErrorCode.IncorrectEmailOrPassword]: 'Incorrect email or password',
};
