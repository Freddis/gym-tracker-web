import {nativeEnum} from 'zod';
import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {ValidationErrorCode} from '../types/ValidationErrorCode';
import {validationErrorMessages} from './validationErrorMessages';

export const tryToTranslateValidationError = (code: string, lang: Language): string => {
  const validated = nativeEnum(ValidationErrorCode).safeParse(code);
  if (!validated.success) {
    return code;
  }
  return validationErrorMessages[lang][validated.data];
};
