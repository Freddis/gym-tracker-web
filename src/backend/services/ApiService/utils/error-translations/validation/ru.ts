import {ValidationErrorCode} from '../../../types/ValidationErrorCode';

export const ru: Record<ValidationErrorCode, string> = {
  [ValidationErrorCode.WorkoutEndDateBeforeStartDate]: 'Тренировка не может окончиться до своего начала',
  [ValidationErrorCode.IncorrectEmailOrPassword]: 'Направильный адрес почты или пароль',
  [ValidationErrorCode.PasswordHasToBeLonger]: 'Пароль должен быть более 5 символов',
  [ValidationErrorCode.InvalidEmail]: 'Неверная эл. почта',
};
