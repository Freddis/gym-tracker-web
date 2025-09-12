import {Language} from '../../../../frontend/components/layout/LanguageProvider/enums/Language';
import {en} from './error-translations/zod/en';
import {ru} from './error-translations/zod/ru';
import {ZodTranslations} from '../types/ZodTranslations';

export const zodErrorMessages: Record<Language, ZodTranslations> = {
  [Language.English]: en,
  [Language.Russian]: ru,
};
