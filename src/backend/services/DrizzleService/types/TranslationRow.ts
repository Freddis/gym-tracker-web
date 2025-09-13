import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const translationRowValidator = createSelectSchema(dbSchema.translations);
export type TranslationRowValidator = typeof translationRowValidator;
export type TranslationRow = z.TypeOf<TranslationRowValidator>;
