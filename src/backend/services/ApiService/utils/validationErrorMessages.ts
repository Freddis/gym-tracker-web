import {Language} from '../../../../frontend/components/layout/LanguageProvider/enums/Language';
import {ValidationErrorCode} from '../types/ValidationErrorCode';
import {en} from './error-translations/validation/en';
import {ru} from './error-translations/validation/ru';

export const validationErrorMessages: Record<Language, Record<ValidationErrorCode, string>> = {
  [Language.English]: en,
  [Language.Russian]: ru,
};
