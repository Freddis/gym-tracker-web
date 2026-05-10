import {nativeEnum} from 'zod';
import {EntryVisibility} from '../../../../EntryService/types/EntryVisibility';

export const entryVisibilityValidator = nativeEnum(EntryVisibility).openapi({
  ref: 'Entry Visibility',
  description: 'Visibility of the entry',
});
